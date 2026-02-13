'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import ScheduleModal from './ScheduleModal';
import type { Service } from '@/lib/schema';

interface ServiceCardProps {
  service: Service;
  shopperId: string;
}

export default function ServiceCard({ service, shopperId }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-neutral-900">
            {service.name}
          </h2>
          {service.description && (
            <p className="text-sm text-neutral-500">{service.description}</p>
          )}
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

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shopperId={shopperId}
        serviceId={service.id}
      />
    </>
  );
}
