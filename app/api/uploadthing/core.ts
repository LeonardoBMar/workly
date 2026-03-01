import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth as betterAuth } from '@/lib/auth';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await betterAuth.api.getSession({
        headers: await headers(),
      });

      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),

  serviceImageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await betterAuth.api.getSession({
        headers: await headers(),
      });

      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
