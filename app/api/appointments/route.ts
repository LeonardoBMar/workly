import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, clients, services } from "@/lib/schema";
import { getRequiredSessionForAPI } from "@/lib/get-session";
import { eq, and, gte, lte } from "drizzle-orm";
import { appointmentStatusSchema } from "@/lib/validation";

export async function GET(request: NextRequest) {
    try {
        const user = await getRequiredSessionForAPI();
        if (user instanceof NextResponse) return user;

        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const dateRangeCondition =
            startDate && endDate
                ? and(
                    gte(appointments.startTime, new Date(startDate)),
                    lte(appointments.endTime, new Date(endDate))
                )
                : undefined;

        const whereCondition = dateRangeCondition
            ? and(eq(appointments.userId, user.id), dateRangeCondition)
            : eq(appointments.userId, user.id);

        const result = await db
            .select({
                id: appointments.id,
                clientId: appointments.clientId,
                serviceId: appointments.serviceId,
                startTime: appointments.startTime,
                endTime: appointments.endTime,
                status: appointments.status,
                notes: appointments.notes,
                clientName: clients.name,
                clientPhone: clients.phone,
            })
            .from(appointments)
            .leftJoin(clients, eq(appointments.clientId, clients.id))
            .where(whereCondition);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getRequiredSessionForAPI();
        if (user instanceof NextResponse) return user;

        const body = await request.json();
        const { clientId, serviceId, startTime, endTime, notes, status } = body;

        if (!clientId || !serviceId || !startTime || !endTime) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const [ownedClient, ownedService] = await Promise.all([
            db
                .select({ id: clients.id })
                .from(clients)
                .where(and(eq(clients.id, clientId), eq(clients.userId, user.id)))
                .limit(1),
            db
                .select({ id: services.id })
                .from(services)
                .where(and(eq(services.id, serviceId), eq(services.userId, user.id)))
                .limit(1),
        ]);

        if (!ownedClient[0] || !ownedService[0]) {
            return NextResponse.json(
                { error: "Client or service does not belong to the authenticated user" },
                { status: 403 }
            );
        }

        const parsedStatus = appointmentStatusSchema.safeParse(status ?? "pending");
        if (!parsedStatus.success) {
            return NextResponse.json(
                { error: "Invalid appointment status" },
                { status: 400 }
            );
        }

        const [newAppointment] = await db
            .insert(appointments)
            .values({
                id: crypto.randomUUID(),
                userId: user.id,
                clientId,
                serviceId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: parsedStatus.data,
                notes,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}
