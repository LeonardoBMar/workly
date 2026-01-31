import { db } from "@/lib/db"
import { shopper } from "@/lib/schema"
import { eq } from "drizzle-orm"
import type { Shopper } from "@/lib/schema"

export async function getShopperBySlug(slug: string): Promise<Shopper | null> {
    const result = await db
        .select()
        .from(shopper)
        .where(eq(shopper.slug, slug))
        .limit(1)

    return result[0] ?? null
}
