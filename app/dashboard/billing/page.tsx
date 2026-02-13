import { getRequiredSession } from '@/lib/get-session';
import { db } from '@/lib/db';
import { user as userTable } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { PLANS, getCurrentPlan } from '@/lib/plans';
import { Button } from '@/app/components/ui/button';
import { createPortalSession } from '@/app/actions/stripe';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function BillingPage() {
  const user = await getRequiredSession();

  const dbUser = await db.query.user.findFirst({
    where: eq(userTable.id, user.id),
  });

  if (!dbUser) {
    return <div>Usuário não encontrado</div>;
  }

  const currentPlan = getCurrentPlan(
    dbUser.stripePriceId,
    dbUser.subscriptionStatus,
  );
  const isFree = currentPlan.id === 'free';

  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Assinatura e Faturamento
        </h1>
        <p className="mt-2 text-slate-600">
          Gerencie seu plano e visualize suas faturas do Stripe.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
            Seu Plano Atual:{' '}
            <span className="text-indigo-600">{currentPlan.name}</span>
            {!isFree && <Sparkles className="h-5 w-5 text-amber-500" />}
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Check className="h-5 w-5 text-indigo-500" />
              <span>
                Agendamentos:{' '}
                {currentPlan.quota === Infinity
                  ? 'Ilimitados'
                  : `Até ${currentPlan.quota}/mês`}
              </span>
            </div>
            {dbUser.subscriptionEndsAt && (
              <div className="mt-4 text-sm text-slate-500">
                Próxima renovação em:{' '}
                {new Date(dbUser.subscriptionEndsAt).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="mt-8">
            {isFree ? (
              <Link href="/#pricing">
                <Button className="w-full rounded-2xl bg-indigo-600 py-6 font-bold text-white hover:bg-indigo-700">
                  Fazer Upgrade
                </Button>
              </Link>
            ) : (
              <form action={createPortalSession}>
                <Button className="w-full rounded-2xl bg-slate-900 py-6 font-bold text-white hover:bg-slate-800">
                  Gerenciar no Stripe
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-lg font-bold text-slate-900">Por que assinar?</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Check className="h-3 w-3" />
              </div>
              <span>Remova todos os limites de agendamentos</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Check className="h-3 w-3" />
              </div>
              <span>Link de agendamento personalizado</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Check className="h-3 w-3" />
              </div>
              <span>Selo de Fundador (Apenas Plano Solo)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
