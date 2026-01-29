"use server";
import { db } from "@/lib/db";
import { services, clients, appointments } from "@/lib/schema";
import { eq, and, desc, gte, lte } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServices() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const result = await db
            .select()
            .from(services)
            .where(eq(services.userId, session.user.id));

        return { data: result };
    } catch (error) {
        console.error("Error fetching services:", error);
        return { error: "Erro ao buscar serviços" };
    }
}

export async function createService(formData: {
    name: string;
    description: string;
    price: string;
    duration: number;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const id = crypto.randomUUID();

        await db.insert(services).values({
            id,
            userId: session.user.id,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            duration: formData.duration,
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating service:", error);
        return { error: "Erro ao criar serviço" };
    }
}

export async function deleteService(id: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        await db
            .delete(services)
            .where(
                and(
                    eq(services.id, id),
                    eq(services.userId, session.user.id)
                )
            );

        return { success: true };
    } catch (error) {
        console.error("Error deleting service:", error);
        return { error: "Erro ao deletar serviço" };
    }
}

export async function getClients() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const result = await db
            .select()
            .from(clients)
            .where(eq(clients.userId, session.user.id))
            .orderBy(desc(clients.createdAt));

        return { data: result };
    } catch (error) {
        console.error("Error fetching clients:", error);
        return { error: "Erro ao buscar clientes" };
    }
}

export async function createClient(formData: {
    name: string;
    email?: string;
    phone?: string;
    notes?: string;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const id = crypto.randomUUID();

        await db.insert(clients).values({
            id,
            userId: session.user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            notes: formData.notes,
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating client:", error);
        return { error: "Erro ao criar cliente" };
    }
}

export async function updateClient(id: string, formData: {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        await db
            .update(clients)
            .set({
                ...formData,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(clients.id, id),
                    eq(clients.userId, session.user.id)
                )
            );

        return { success: true };
    } catch (error) {
        console.error("Error updating client:", error);
        return { error: "Erro ao atualizar cliente" };
    }
}

export async function deleteClient(id: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        await db
            .delete(clients)
            .where(
                and(
                    eq(clients.id, id),
                    eq(clients.userId, session.user.id)
                )
            );

        return { success: true };
    } catch (error) {
        console.error("Error deleting client:", error);
        return { error: "Erro ao deletar cliente" };
    }
}

export async function getAppointments(date: Date) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const result = await db.query.appointments.findMany({
            where: (appointments, { and, eq, gte, lte }) => and(
                eq(appointments.userId, session.user.id),
                gte(appointments.startTime, startOfDay),
                lte(appointments.startTime, endOfDay)
            ),
            with: {
                client: true,
                service: true,
            },
            orderBy: (appointments, { asc }) => [asc(appointments.startTime)],
        });

        return { data: result };
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return { error: "Erro ao buscar agendamentos" };
    }
}

export async function createAppointment(formData: {
    clientId: string;
    serviceId: string;
    startTime: Date;
    endTime: Date;
    notes?: string;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        const id = crypto.randomUUID();

        await db.insert(appointments).values({
            id,
            userId: session.user.id,
            clientId: formData.clientId,
            serviceId: formData.serviceId,
            startTime: formData.startTime,
            endTime: formData.endTime,
            notes: formData.notes,
            status: "confirmed", // ---- TROCAR -----
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating appointment:", error);
        return { error: "Erro ao criar agendamento" };
    }
}

export async function updateAppointmentStatus(id: string, status: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        await db.update(appointments)
            .set({ status })
            .where(and(eq(appointments.id, id), eq(appointments.userId, session.user.id)));

        return { success: true };
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return { error: "Erro ao atualizar status do agendamento" };
    }
}

export async function deleteAppointment(id: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { error: "Não autorizado" };
        }

        await db
            .delete(appointments)
            .where(
                and(
                    eq(appointments.id, id),
                    eq(appointments.userId, session.user.id)
                )
            );

        return { success: true };
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return { error: "Erro ao deletar agendamento" };
    }
}
