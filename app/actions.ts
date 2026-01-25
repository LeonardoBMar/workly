"use server";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";

export async function getUsers() {
    try {
        const result = await db.select().from(user);
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
