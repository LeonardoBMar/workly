import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, clients } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, gte, lte } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        let whereConditions = [eq(appointments.userId, session.user.id)];

        if (startDate && endDate) {
            whereConditions.push(
                gte(appointments.startTime, new Date(startDate)),
                lte(appointments.endTime, new Date(endDate))
            );
        }

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
            .where(and(...whereConditions));

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
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { clientId, serviceId, startTime, endTime, notes } = body;

        if (!clientId || !serviceId || !startTime || !endTime) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const [newAppointment] = await db
            .insert(appointments)
            .values({
                id: crypto.randomUUID(),
                userId: session.user.id,
                clientId,
                serviceId,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                status: "pending",
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
