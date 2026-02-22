import { auth } from './auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { ApplicationError } from '@/lib/custom-error';

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

export async function getRequiredSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new ApplicationError('Não autorizado');
  }

  return session.user;
}

export async function getRequiredSessionForAPI() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return session.user;
}
