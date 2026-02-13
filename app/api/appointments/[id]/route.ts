import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { appointments, clients, services } from '@/lib/schema';
import { getRequiredSessionForAPI } from '@/lib/get-session';
import { eq, and } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';
import { appointmentStatusSchema } from '@/lib/validation';

type AppointmentUpdatePayload = Partial<
  Pick<
    InferInsertModel<typeof appointments>,
    | 'startTime'
    | 'endTime'
    | 'status'
    | 'notes'
    | 'serviceId'
    | 'clientId'
    | 'updatedAt'
  >
>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getRequiredSessionForAPI();
    if (user instanceof NextResponse) return user;

    const { id } = await params;
    const body = await request.json();
    const { startTime, endTime, status, notes, serviceId, clientId } = body;

    const updateData: AppointmentUpdatePayload = {
      updatedAt: new Date(),
    };

    if (clientId) {
      const ownedClient = await db
        .select({ id: clients.id })
        .from(clients)
        .where(and(eq(clients.id, clientId), eq(clients.userId, user.id)))
        .limit(1);

      if (!ownedClient[0]) {
        return NextResponse.json(
          { error: 'Client does not belong to the authenticated user' },
          { status: 403 },
        );
      }
    }

    if (serviceId) {
      const ownedService = await db
        .select({ id: services.id })
        .from(services)
        .where(and(eq(services.id, serviceId), eq(services.userId, user.id)))
        .limit(1);

      if (!ownedService[0]) {
        return NextResponse.json(
          { error: 'Service does not belong to the authenticated user' },
          { status: 403 },
        );
      }
    }

    if (startTime) updateData.startTime = new Date(startTime);
    if (endTime) updateData.endTime = new Date(endTime);
    if (status) {
      const parsedStatus = appointmentStatusSchema.safeParse(status);
      if (!parsedStatus.success) {
        return NextResponse.json(
          { error: 'Invalid appointment status' },
          { status: 400 },
        );
      }
      updateData.status = parsedStatus.data;
    }
    if (notes !== undefined) updateData.notes = notes;
    if (serviceId) updateData.serviceId = serviceId;
    if (clientId) updateData.clientId = clientId;

    const [updatedAppointment] = await db
      .update(appointments)
      .set(updateData)
      .where(and(eq(appointments.id, id), eq(appointments.userId, user.id)))
      .returning();

    if (!updatedAppointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getRequiredSessionForAPI();
    if (user instanceof NextResponse) return user;

    const { id } = await params;

    const [deletedAppointment] = await db
      .delete(appointments)
      .where(and(eq(appointments.id, id), eq(appointments.userId, user.id)))
      .returning();

    if (!deletedAppointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 },
    );
  }
}
