'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import ScheduleModal from './ScheduleModal';
import type { Service } from '@/lib/schema';
import { getServiceIcon } from '@/lib/service-icons';

interface ServiceCardProps {
  service: Service;
  shopperId: string;
}

export default function ServiceCard({ service, shopperId }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Icon = getServiceIcon(service.iconName);

  return (
    <>
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
        {service.imageUrl && (
          <div className="relative h-40 w-full overflow-hidden bg-neutral-100">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start gap-3">
            {!service.imageUrl && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="h-5 w-5" />
              </div>
            )}

            <div className="flex min-w-0 flex-col gap-1">
              <h2 className="text-base font-semibold text-neutral-900">
                {service.name}
              </h2>
              {service.description && (
                <p className="line-clamp-2 text-sm text-neutral-500">
                  {service.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-neutral-900">
              R$ {service.price}
            </span>
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              Agendar
            </Button>
          </div>
        </div>
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shopperId={shopperId}
        serviceId={service.id}
      />
    </>
  );
}
