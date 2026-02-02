"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import type { Service } from "@/lib/schema"

interface ServiceCardProps {
    service: Service
    shopperId: string
}

export default function ServiceCard({ service, shopperId }: ServiceCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col gap-1">
                    <h2 className="text-base font-semibold text-neutral-900">
                        {service.name}
                    </h2>
                    {service.description && (
                        <p className="text-sm text-neutral-500">{service.description}</p>
                    )}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-neutral-900">
                        R$ {service.price}
                    </span>
                    <Button size="sm" onClick={() => setIsModalOpen(true)}>
                        Agendar
                    </Button>
                </div>
            </div>
        </>
    )
}