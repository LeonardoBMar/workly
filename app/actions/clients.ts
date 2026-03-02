'use server';
import { db } from '@/lib/db';
import { ApplicationError } from '@/lib/custom-error';
import { clients, appointments, services } from '@/lib/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
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
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao buscar clientes',
    };
  }
}

export async function createClient(formData: {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  birthday?: string;
  tags?: string[];
}) {
  try {
    const parsed = createClientInputSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(10, 60 * 1000); // Max 10 per minute

    const user = await getRequiredSession();

    const id = crypto.randomUUID();

    await db.insert(clients).values({
      id,
      userId: user.id,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      notes: parsed.data.notes,
      birthday: parsed.data.birthday,
      tags: parsed.data.tags ?? [],
    });

    revalidatePath('/dashboard/clientes');
    return { success: true };
  } catch (error) {
    console.error('Error creating client:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao criar cliente',
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
    birthday?: string;
    tags?: string[];
  },
) {
  try {
    const parsed = updateClientInputSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: getValidationErrorMessage(parsed.error) };
    }

    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(20, 60 * 1000); // 20 per minute for updates

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
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao atualizar cliente',
    };
  }
}

export async function deleteClient(id: string) {
  try {
    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(10, 60 * 1000);

    const user = await getRequiredSession();

    await db
      .delete(clients)
      .where(and(eq(clients.id, id), eq(clients.userId, user.id)));

    revalidatePath('/dashboard/clientes');
    return { success: true };
  } catch (error) {
    console.error('Error deleting client:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao deletar cliente',
    };
  }
}

export type ClientWithStats = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  birthday: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  totalSpent: number;
  appointmentCount: number;
  firstAppointment: Date | null;
  lastAppointment: Date | null;
  relationshipStatus: 'Novo' | 'Recorrente' | 'VIP' | 'Inativo';
  topServices: string[];
};

function calculateRelationshipStatus(
  appointmentCount: number,
  lastAppointment: Date | null,
): 'Novo' | 'Recorrente' | 'VIP' | 'Inativo' {
  if (appointmentCount === 0) return 'Novo';

  if (lastAppointment) {
    const daysSinceLast = Math.floor(
      (Date.now() - lastAppointment.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysSinceLast > 90) return 'Inativo';
  }

  if (appointmentCount >= 10) return 'VIP';
  if (appointmentCount >= 3) return 'Recorrente';
  return 'Novo';
}

export async function getClientsWithStats() {
  try {
    const user = await getRequiredSession();

    const allClients = await db
      .select()
      .from(clients)
      .where(eq(clients.userId, user.id))
      .orderBy(desc(clients.createdAt));

    const allAppointments = await db
      .select({
        clientId: appointments.clientId,
        serviceId: appointments.serviceId,
        serviceName: services.name,
        servicePrice: services.price,
        startTime: appointments.startTime,
        status: appointments.status,
      })
      .from(appointments)
      .innerJoin(services, eq(appointments.serviceId, services.id))
      .where(eq(appointments.userId, user.id));

    const clientStats = new Map<
      string,
      {
        totalSpent: number;
        count: number;
        first: Date | null;
        last: Date | null;
        serviceCount: Map<string, number>;
      }
    >();

    for (const appt of allAppointments) {
      if (!clientStats.has(appt.clientId)) {
        clientStats.set(appt.clientId, {
          totalSpent: 0,
          count: 0,
          first: null,
          last: null,
          serviceCount: new Map(),
        });
      }
      const stats = clientStats.get(appt.clientId)!;
      stats.count++;

      if (appt.status === 'completed') {
        stats.totalSpent += Number(appt.servicePrice) || 0;
      }

      const d = new Date(appt.startTime);
      if (!stats.first || d < stats.first) stats.first = d;
      if (!stats.last || d > stats.last) stats.last = d;

      const sName = appt.serviceName;
      stats.serviceCount.set(sName, (stats.serviceCount.get(sName) || 0) + 1);
    }

    const result: ClientWithStats[] = allClients.map((c) => {
      const stats = clientStats.get(c.id);
      const topServices = stats
        ? [...stats.serviceCount.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([name]) => name)
        : [];

      return {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        notes: c.notes,
        birthday: c.birthday,
        tags: (c.tags as string[]) ?? [],
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        totalSpent: stats?.totalSpent ?? 0,
        appointmentCount: stats?.count ?? 0,
        firstAppointment: stats?.first ?? null,
        lastAppointment: stats?.last ?? null,
        relationshipStatus: calculateRelationshipStatus(
          stats?.count ?? 0,
          stats?.last ?? null,
        ),
        topServices,
      };
    });

    return { data: result };
  } catch (error) {
    console.error('Error fetching clients with stats:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao buscar clientes',
    };
  }
}

export type ClientProfileData = {
  client: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    notes: string | null;
    birthday: string | null;
    tags: string[];
    createdAt: Date;
  };
  stats: {
    totalSpent: number;
    appointmentCount: number;
    firstAppointment: Date | null;
    lastAppointment: Date | null;
    relationshipStatus: 'Novo' | 'Recorrente' | 'VIP' | 'Inativo';
  };
  appointments: {
    id: string;
    serviceName: string;
    servicePrice: string;
    startTime: Date;
    endTime: Date;
    status: string;
    notes: string | null;
  }[];
  topServices: string[];
};

export async function getClientProfile(
  clientId: string,
): Promise<{ data?: ClientProfileData; error?: string }> {
  try {
    const user = await getRequiredSession();

    const clientArr = await db
      .select()
      .from(clients)
      .where(and(eq(clients.id, clientId), eq(clients.userId, user.id)))
      .limit(1);

    if (!clientArr[0]) {
      return { error: 'Cliente não encontrado' };
    }

    const client = clientArr[0];

    const appts = await db
      .select({
        id: appointments.id,
        serviceName: services.name,
        servicePrice: services.price,
        startTime: appointments.startTime,
        endTime: appointments.endTime,
        status: appointments.status,
        notes: appointments.notes,
      })
      .from(appointments)
      .innerJoin(services, eq(appointments.serviceId, services.id))
      .where(
        and(
          eq(appointments.clientId, clientId),
          eq(appointments.userId, user.id),
        ),
      )
      .orderBy(desc(appointments.startTime));

    let totalSpent = 0;
    let first: Date | null = null;
    let last: Date | null = null;
    const serviceCount = new Map<string, number>();

    for (const a of appts) {
      if (a.status === 'completed') {
        totalSpent += Number(a.servicePrice) || 0;
      }
      const d = new Date(a.startTime);
      if (!first || d < first) first = d;
      if (!last || d > last) last = d;
      serviceCount.set(
        a.serviceName,
        (serviceCount.get(a.serviceName) || 0) + 1,
      );
    }

    const topServices = [...serviceCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);

    return {
      data: {
        client: {
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          notes: client.notes,
          birthday: client.birthday,
          tags: (client.tags as string[]) ?? [],
          createdAt: client.createdAt,
        },
        stats: {
          totalSpent,
          appointmentCount: appts.length,
          firstAppointment: first,
          lastAppointment: last,
          relationshipStatus: calculateRelationshipStatus(appts.length, last),
        },
        appointments: appts,
        topServices,
      },
    };
  } catch (error) {
    console.error('Error fetching client profile:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao buscar perfil do cliente',
    };
  }
}

export async function updateClientTags(clientId: string, tags: string[]) {
  try {
    const { rateLimit } = await import('@/lib/rate-limit');
    await rateLimit(20, 60 * 1000);

    const user = await getRequiredSession();

    await db
      .update(clients)
      .set({ tags, updatedAt: new Date() })
      .where(and(eq(clients.id, clientId), eq(clients.userId, user.id)));

    revalidatePath('/dashboard/clientes');
    return { success: true };
  } catch (error) {
    console.error('Error updating client tags:', error);
    return {
      error:
        error instanceof ApplicationError
          ? error.message
          : 'Erro ao atualizar tags do cliente',
    };
  }
}
