import { db } from '@/lib/db';
import { services } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import type { Service } from '@/lib/schema';

export async function getShopperServicesByUserId(
  id: string,
): Promise<Service[] | null> {
  const result = await db
    .select()
    .from(services)
    .where(eq(services.userId, id));

  return result ?? null;
}
