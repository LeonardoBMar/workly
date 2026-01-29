import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clients } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, or, ilike, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search");

        let whereConditions = [eq(clients.userId, session.user.id)];

        if (search) {
            whereConditions.push(
                or(
                    ilike(clients.name, `%${search}%`),
                    ilike(clients.phone, `%${search}%`),
                    ilike(clients.email, `%${search}%`)
                ) as any
            );
        }

        const result = await db
            .select()
            .from(clients)
            .where(and(...whereConditions));

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json(
            { error: "Failed to fetch clients" },
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
        const { name, email, phone, notes } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        const [newClient] = await db
            .insert(clients)
            .values({
                id: crypto.randomUUID(),
                userId: session.user.id,
                name,
                email,
                phone,
                notes,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return NextResponse.json(newClient, { status: 201 });
    } catch (error) {
        console.error("Error creating client:", error);
        return NextResponse.json(
            { error: "Failed to create client" },
            { status: 500 }
        );
    }
}
