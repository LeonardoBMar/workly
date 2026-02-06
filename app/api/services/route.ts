import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { getRequiredSessionForAPI } from "@/lib/get-session";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const user = await getRequiredSessionForAPI();
        if (user instanceof NextResponse) return user;

        const result = await db
            .select()
            .from(services)
            .where(eq(services.userId, user.id));

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getRequiredSessionForAPI();
        if (user instanceof NextResponse) return user;

        const body = await request.json();
        const { name, description, price, duration } = body;

        if (!name || !price || !duration) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const [newService] = await db
            .insert(services)
            .values({
                id: crypto.randomUUID(),
                userId: user.id,
                name,
                description,
                price: price.toString(),
                duration,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();

        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json(
            { error: "Failed to create service" },
            { status: 500 }
        );
    }
}
