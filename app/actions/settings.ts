'use server';

import { db } from '@/lib/db';
import { user } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { getRequiredSession } from '@/lib/get-session';
import { revalidatePath } from 'next/cache';
import { ApplicationError } from '@/lib/custom-error';
import {
  updateProfileSchema,
  updatePasswordSchema,
  updateBusinessHoursSchema,
  getValidationErrorMessage,
} from '@/lib/validation';
import type { BusinessHours } from '@/lib/schema';
import { DEFAULT_BUSINESS_HOURS } from '@/lib/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getSettings() {
  try {
    const sessionUser = await getRequiredSession();

    const result = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        businessHours: user.businessHours,
        timezone: user.timezone,
      })
      .from(user)
      .where(eq(user.id, sessionUser.id))
      .limit(1);

    if (!result[0]) {
      return { error: 'Usuário não encontrado' };
    }

    return {
      data: {
        ...result[0],
        businessHours: result[0].businessHours ?? DEFAULT_BUSINESS_HOURS,
        timezone: result[0].timezone ?? 'America/Sao_Paulo',
      },
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao buscar configurações',
    };
  }
}

export async function updateProfile(formData: { name: string; email: string }) {
  try {
    const parsed = updateProfileSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(5, 60 * 1000);

    const sessionUser = await getRequiredSession();

    await db
      .update(user)
      .set({
        name: parsed.data.name,
        email: parsed.data.email,
        updatedAt: new Date(),
      })
      .where(eq(user.id, sessionUser.id));

    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao atualizar perfil',
    };
  }
}

export async function updatePassword(formData: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const parsed = updatePasswordSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(3, 60 * 1000);

    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating password:', error);

    const message =
      error instanceof Error &&
      error.message.toLowerCase().includes('credential')
        ? 'Senha atual incorreta'
        : error instanceof ApplicationError
          ? error.message
          : 'Erro ao alterar senha';

    return { error: message };
  }
}

export async function updateBusinessHours(formData: {
  businessHours: BusinessHours;
  timezone: string;
}) {
  try {
    const parsed = updateBusinessHoursSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(10, 60 * 1000);

    const sessionUser = await getRequiredSession();

    await db
      .update(user)
      .set({
        businessHours: parsed.data.businessHours,
        timezone: parsed.data.timezone,
        updatedAt: new Date(),
      })
      .where(eq(user.id, sessionUser.id));

    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('Error updating business hours:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao atualizar horários',
    };
  }
}

export async function updateProfileImage(imageUrl: string) {
  try {
    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(10, 60 * 1000);

    const sessionUser = await getRequiredSession();

    await db
      .update(user)
      .set({
        image: imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(user.id, sessionUser.id));

    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile image:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao atualizar foto de perfil',
    };
  }
}
