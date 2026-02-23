'use server';
import { db } from '@/lib/db';
import { ApplicationError } from '@/lib/custom-error';
import { services } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { getRequiredSession } from '@/lib/get-session';
import { revalidatePath } from 'next/cache';
import {
  createServiceInputSchema,
  getValidationErrorMessage,
  updateServiceInputSchema,
} from '@/lib/validation';

export async function getServices() {
  try {
    const user = await getRequiredSession();

    const result = await db
      .select()
      .from(services)
      .where(eq(services.userId, user.id));

    return { data: result };
  } catch (error) {
    console.error('Error fetching services:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao buscar serviços',
    };
  }
}

export async function createService(formData: {
  name: string;
  description?: string;
  price: string | number;
  duration: number | string;
}) {
  try {
    const parsed = createServiceInputSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(10, 60 * 1000);

    const user = await getRequiredSession();

    const id = crypto.randomUUID();

    await db.insert(services).values({
      id,
      userId: user.id,
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      duration: parsed.data.duration,
    });

    revalidatePath('/dashboard/servicos');
    return { success: true };
  } catch (error) {
    console.error('Error creating service:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao criar serviço',
    };
  }
}

export async function updateService(
  id: string,
  formData: {
    name?: string;
    description?: string;
    price?: string | number;
    duration?: number | string;
  },
) {
  try {
    const parsed = updateServiceInputSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(20, 60 * 1000); // 20 per minute

    const user = await getRequiredSession();

    await db
      .update(services)
      .set({
        ...parsed.data,
        updatedAt: new Date(),
      })
      .where(and(eq(services.id, id), eq(services.userId, user.id)));

    revalidatePath('/dashboard/servicos');
    return { success: true };
  } catch (error) {
    console.error('Error updating service:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao atualizar serviço',
    };
  }
}

export async function deleteService(id: string) {
  try {
    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(10, 60 * 1000); // 10 per minute

    const user = await getRequiredSession();

    await db
      .delete(services)
      .where(and(eq(services.id, id), eq(services.userId, user.id)));

    revalidatePath('/dashboard/servicos');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao deletar serviço',
    };
  }
}
