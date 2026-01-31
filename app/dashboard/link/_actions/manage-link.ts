"use server";

import { db } from "@/lib/db";
import { shopper } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getMyShopper() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const result = await db
            .select()
            .from(shopper)
            .where(eq(shopper.userId, session.user.id))
            .limit(1);

        return { data: result[0] || null };
    } catch (error) {
        console.error("Error fetching shopper:", error);
        return { error: "Erro ao buscar dados" };
    }
}

export async function upsertShopper(formData: {
    slug: string;
    name: string;
    description?: string;
    bannerUrl?: string;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const existingSlug = await db
            .select()
            .from(shopper)
            .where(eq(shopper.slug, formData.slug))
            .limit(1);

        const currentShopper = await db
            .select()
            .from(shopper)
            .where(eq(shopper.userId, session.user.id))
            .limit(1);

        const isMyShopper = currentShopper[0];

        if (existingSlug.length > 0 && (!isMyShopper || existingSlug[0].id !== isMyShopper.id)) {
            return { error: "Este link já está em uso." };
        }

        const bannerUrl = formData.bannerUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop";

        if (isMyShopper) {
            await db
                .update(shopper)
                .set({
                    slug: formData.slug,
                    name: formData.name,
                    description: formData.description,
                    bannerUrl: bannerUrl,
                    updatedAt: new Date(),
                })
                .where(eq(shopper.id, isMyShopper.id));
        } else {
            const id = crypto.randomUUID();
            await db.insert(shopper).values({
                id,
                userId: session.user.id,
                slug: formData.slug,
                name: formData.name,
                description: formData.description,
                bannerUrl: bannerUrl,
                links: [],
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error saving shopper:", error);
        return { error: "Erro ao salvar informações" };
    }
}
