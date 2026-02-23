'use server';

import { getRequiredSession } from '@/lib/get-session';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { user as userTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { PLANS } from '@/lib/plans';
import { ApplicationError } from '@/lib/custom-error';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function createCheckoutSession(planId: string) {
  try {
    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(5, 60 * 1000);

    const user = await getRequiredSession();

    const planConfig = Object.values(PLANS).find(
      (p) => p.id === planId.toLowerCase(),
    );

    if (
      !planConfig ||
      !planConfig.priceId ||
      planConfig.priceId.includes('placeholder')
    ) {
      throw new ApplicationError(
        `Configuração de preço inválida para o plano: ${planId}. Verifique seu arquivo .env`,
      );
    }

    const priceId = planConfig.priceId;

    const dbUser = await db.query.user.findFirst({
      where: eq(userTable.id, user.id),
    });

    if (!dbUser) {
      throw new ApplicationError('Usuário não encontrado no banco de dados');
    }

    let customerId = dbUser.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      await db
        .update(userTable)
        .set({ stripeCustomerId: customerId })
        .where(eq(userTable.id, user.id));
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${APP_URL}/dashboard?checkout=success`,
      cancel_url: `${APP_URL}/dashboard?checkout=cancelled`,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao criar sessão de pagamento',
    };
  }
}

import { redirect } from 'next/navigation';

export async function createPortalSession() {
  const user = await getRequiredSession();

  const { rateLimit } = await import('@/lib/rate-limit');
  await rateLimit(5, 60 * 1000);

  const dbUser = await db.query.user.findFirst({
    where: eq(userTable.id, user.id),
  });

  if (!dbUser?.stripeCustomerId) {
    throw new ApplicationError('Cliente Stripe não encontrado');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId,
    return_url: `${APP_URL}/dashboard/billing`,
  });

  redirect(session.url);
}
