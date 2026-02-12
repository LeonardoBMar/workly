import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { user as userTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const subscriptionId = session.subscription as string;

                if (!subscriptionId) break;

                const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                const userId = session.metadata?.userId || (subscription.metadata as any)?.userId;

                if (userId) {
                    const priceId = subscription.items.data[0]?.price.id;
                    const currentPeriodEnd = (subscription as any).current_period_end;
                    const endsAt = currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null;

                    await db.update(userTable)
                        .set({
                            stripeSubscriptionId: subscription.id,
                            stripePriceId: priceId,
                            subscriptionStatus: subscription.status,
                            subscriptionEndsAt: endsAt,
                        })
                        .where(eq(userTable.id, userId));
                }
                break;
            }

            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = (subscription.metadata as any)?.userId;

                if (userId) {
                    const priceId = subscription.items.data[0]?.price.id;
                    const currentPeriodEnd = (subscription as any).current_period_end;
                    const endsAt = currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null;

                    await db.update(userTable)
                        .set({
                            stripeSubscriptionId: subscription.id,
                            stripePriceId: priceId,
                            subscriptionStatus: subscription.status,
                            subscriptionEndsAt: endsAt,
                        })
                        .where(eq(userTable.id, userId));
                }
                break;
            }
        }
    } catch (err: any) {
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
