"use server";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { getRequiredSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";

export async function getServices() {
    try {
        const user = await getRequiredSession();

        const result = await db
            .select()
            .from(services)
            .where(eq(services.userId, user.id));

        return { data: result };
    } catch (error) {
        console.error("Error fetching services:", error);
        return { error: error instanceof Error ? error.message : "Erro ao buscar serviços" };
    }
}

export async function createService(formData: {
    name: string;
    description: string;
    price: string;
    duration: number;
}) {
    try {
        const user = await getRequiredSession();

        const id = crypto.randomUUID();

        await db.insert(services).values({
            id,
            userId: user.id,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            duration: formData.duration,
        });

        revalidatePath("/dashboard/servicos");
        return { success: true };
    } catch (error) {
        console.error("Error creating service:", error);
        return { error: error instanceof Error ? error.message : "Erro ao criar serviço" };
    }
}

export async function updateService(id: string, formData: {
    name?: string;
    description?: string;
    price?: string;
    duration?: number;
}) {
    try {
        const user = await getRequiredSession();

        await db
            .update(services)
            .set({
                ...formData,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(services.id, id),
                    eq(services.userId, user.id)
                )
            );

        revalidatePath("/dashboard/servicos");
        return { success: true };
    } catch (error) {
        console.error("Error updating service:", error);
        return { error: error instanceof Error ? error.message : "Erro ao atualizar serviço" };
    }
}

export async function deleteService(id: string) {
    try {
        const user = await getRequiredSession();

        await db
            .delete(services)
            .where(
                and(
                    eq(services.id, id),
                    eq(services.userId, user.id)
                )
            );

        revalidatePath("/dashboard/servicos");
        return { success: true };
    } catch (error) {
        console.error("Error deleting service:", error);
        return { error: error instanceof Error ? error.message : "Erro ao deletar serviço" };
    }
}
