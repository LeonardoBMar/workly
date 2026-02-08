"use server";

import { db } from "@/lib/db";
import { shopper } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { getRequiredSession } from "@/lib/get-session";
import { getValidationErrorMessage, upsertShopperInputSchema } from "@/lib/validation";

export async function getMyShopper() {
    try {
        const user = await getRequiredSession();

        const result = await db
            .select()
            .from(shopper)
            .where(eq(shopper.userId, user.id))
            .limit(1);

        return { data: result[0] || null };
    } catch (error) {
        console.error("Error fetching shopper:", error);
        return { error: error instanceof Error ? error.message : "Erro ao buscar dados" };
    }
}

export async function upsertShopper(formData: {
    slug: string;
    name: string;
    description?: string;
    bannerUrl?: string;
    logoUrl?: string;
}) {
    try {
        const parsed = upsertShopperInputSchema.safeParse(formData);
        if (!parsed.success) {
            return { error: getValidationErrorMessage(parsed.error) };
        }

        const data = parsed.data;
        const user = await getRequiredSession();

        const existingSlug = await db
            .select()
            .from(shopper)
            .where(eq(shopper.slug, data.slug))
            .limit(1);

        const currentShopper = await db
            .select()
            .from(shopper)
            .where(eq(shopper.userId, user.id))
            .limit(1);

        const isMyShopper = currentShopper[0];

        if (existingSlug.length > 0 && (!isMyShopper || existingSlug[0].id !== isMyShopper.id)) {
            return { error: "Este link já está em uso." };
        }

        const bannerUrl = data.bannerUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop";
        const logoUrl = data.logoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";




        if (isMyShopper) {
            await db
                .update(shopper)
                .set({
                    slug: data.slug,
                    name: data.name,
                    description: data.description,
                    bannerUrl: bannerUrl,
                    logoUrl: logoUrl,
                    updatedAt: new Date(),
                })
                .where(eq(shopper.id, isMyShopper.id));
        } else {
            const id = crypto.randomUUID();
            await db.insert(shopper).values({
                id,
                userId: user.id,
                slug: data.slug,
                name: data.name,
                description: data.description,
                bannerUrl: bannerUrl,
                logoUrl: logoUrl,
                links: [],
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error saving shopper:", error);
        return { error: error instanceof Error ? error.message : "Erro ao salvar informações" };
    }
}
