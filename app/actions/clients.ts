'use server';
import { db } from '@/lib/db';
import { clients } from '@/lib/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getRequiredSession } from '@/lib/get-session';
import { revalidatePath } from 'next/cache';
import {
  createClientInputSchema,
  getValidationErrorMessage,
  updateClientInputSchema,
} from '@/lib/validation';

export async function getClients() {
  try {
    const user = await getRequiredSession();

    const result = await db
      .select()
      .from(clients)
      .where(eq(clients.userId, user.id))
      .orderBy(desc(clients.createdAt));

    return { data: result };
  } catch (error) {
    console.error('Error fetching clients:', error);
    return {
      error: error instanceof Error ? error.message : 'Erro ao buscar clientes',
    };
  }
}

export async function createClient(formData: {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}) {
  try {
    const parsed = createClientInputSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const user = await getRequiredSession();

    const id = crypto.randomUUID();

    await db.insert(clients).values({
      id,
      userId: user.id,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      notes: parsed.data.notes,
    });

    revalidatePath('/dashboard/clientes');
    return { success: true };
  } catch (error) {
    console.error('Error creating client:', error);
    return {
      error: error instanceof Error ? error.message : 'Erro ao criar cliente',
    };
  }
}

export async function updateClient(
  id: string,
  formData: {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
  },
) {
  try {
    const parsed = updateClientInputSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const user = await getRequiredSession();

    await db
      .update(clients)
      .set({
        ...parsed.data,
        updatedAt: new Date(),
      })
      .where(and(eq(clients.id, id), eq(clients.userId, user.id)));

    revalidatePath('/dashboard/clientes');
    return { success: true };
  } catch (error) {
    console.error('Error updating client:', error);
    return {
      error:
        error instanceof Error ? error.message : 'Erro ao atualizar cliente',
    };
  }
}

export async function deleteClient(id: string) {
  try {
    const user = await getRequiredSession();

    await db
      .delete(clients)
      .where(and(eq(clients.id, id), eq(clients.userId, user.id)));

    revalidatePath('/dashboard/clientes');
    return { success: true };
  } catch (error) {
    console.error('Error deleting client:', error);
    return {
      error: error instanceof Error ? error.message : 'Erro ao deletar cliente',
    };
  }
}
