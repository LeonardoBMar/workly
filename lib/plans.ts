export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Gratuito',
    priceId: '',
    price: 0,
    quota: 15,
  },
  SOLO: {
    id: 'solo',
    name: 'Solo (Fundador)',
    priceId: process.env.STRIPE_SOLO_PRICE_ID || 'price_placeholder_solo',
    price: 19.9,
    quota: Infinity,
  },
  BUSINESS: {
    id: 'business',
    name: 'Business',
    priceId:
      process.env.STRIPE_BUSINESS_PRICE_ID || 'price_placeholder_business',
    price: 59.9,
    quota: Infinity,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export function getPlanByPriceId(priceId: string | null | undefined) {
  if (!priceId) return PLANS.FREE;
  return (
    Object.values(PLANS).find((plan) => plan.priceId === priceId) || PLANS.FREE
  );
}

export function getCurrentPlan(
  stripePriceId: string | null | undefined,
  subscriptionStatus: string | null | undefined,
) {
  const isActive =
    subscriptionStatus === 'active' || subscriptionStatus === 'trialing';

  if (!isActive) {
    return PLANS.FREE;
  }

  return getPlanByPriceId(stripePriceId);
}
