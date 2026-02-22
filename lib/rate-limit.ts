import { headers } from 'next/headers';

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

// In-memory store for rate limiting
// Note: This works best in environments where the Node.js process persists.
// In true serverless, this only scopes to the current function instance/container.
// Given Vercel/Next.js edge functions, it will reset often but still prevents burst attacks on the same instance.
const store = new Map<string, RateLimitRecord>();

/**
 * Basic in-memory rate limiter for server actions.
 * @param limit Maximum number of requests allowed in the window.
 * @param windowMs Time window in milliseconds.
 */
export async function rateLimit(
  limit: number,
  windowMs: number,
): Promise<void> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? 'unknown';

  const now = Date.now();
  const record = store.get(ip);

  if (record && now > record.resetAt) {
    store.delete(ip);
  }

  const currentRecord = store.get(ip) ?? { count: 0, resetAt: now + windowMs };

  if (currentRecord.count >= limit) {
    throw new Error('Muitas requisições. Tente novamente mais tarde.');
  }

  currentRecord.count += 1;
  store.set(ip, currentRecord);

  if (store.size > 10000) {
    for (const [key, value] of store.entries()) {
      if (now > value.resetAt) {
        store.delete(key);
      }
    }
  }
}
