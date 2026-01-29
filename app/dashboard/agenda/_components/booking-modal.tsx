"use client"

import React from "react"
import { useState, useEffect } from "react"
import { X, Trash2, Clock, FileText, Calendar } from "lucide-react"
import type { Booking } from "../types"
import { ClientSelect } from "./client-select"
import { useServices, useClients, type Client, type Service } from "../_hooks"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (booking: Omit<Booking, "id">) => void
    onDelete?: () => void
    booking?: Booking | null
    selectedSlot?: { start: Date; end: Date } | null
}

export function BookingModal({
    isOpen,
    onClose,
    onSave,
    onDelete,
    booking,
    selectedSlot,
}: BookingModalProps) {
    const { services, isLoading: servicesLoading } = useServices()
    const { searchClients, createClient } = useClients()
    const [serviceId, setServiceId] = useState("")
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const [notes, setNotes] = useState("")
    const [startTime, setStartTime] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        if (services.length > 0 && !serviceId) {
            setServiceId(services[0].id)
        }
    }, [services, serviceId])

    useEffect(() => {
        if (booking) {
            setServiceId(booking.serviceId)
            setSelectedClient(
                booking.clientName
                    ? {
                        id: "temp",
                        name: booking.clientName,
                        phone: booking.clientPhone,
                    }
                    : null
            )
            setNotes(booking.notes || "")
            setStartTime(formatTime(booking.start))
            setDate(formatDate(booking.start))
        } else if (selectedSlot) {
            if (services.length > 0) {
                setServiceId(services[0].id)
            }
            setSelectedClient(null)
            setNotes("")
            setStartTime(formatTime(selectedSlot.start))
            setDate(formatDate(selectedSlot.start))
        }
    }, [booking, selectedSlot, services])

    const formatTime = (date: Date) => {
        return date.toTimeString().slice(0, 5)
    }

    const formatDate = (date: Date) => {
        return date.toISOString().split("T")[0]
    }

    const formatDateDisplay = (dateStr: string) => {
        const date = new Date(dateStr + "T00:00:00")
        return date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedClient) {
            alert("Por favor, selecione um cliente")
            return
        }

        const service = services.find((s) => s.id === serviceId)
        if (!service) {
            alert("Por favor, selecione um serviço")
            return
        }

        const [hours, minutes] = startTime.split(":").map(Number)
        const start = new Date(date + "T00:00:00")
        start.setHours(hours, minutes, 0, 0)
        const end = new Date(start.getTime() + service.duration * 60000)

        onSave({
            serviceId,
            clientId: selectedClient.id,
            title: `${service.name} - ${selectedClient.name}`,
            start,
            end,
            clientName: selectedClient.name,
            clientPhone: selectedClient.phone,
            notes,
        })
    }

    if (!isOpen) return null

    const selectedService = services.find((s) => s.id === serviceId)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">
                        {booking ? "Editar Agendamento" : "Novo Agendamento"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto flex-1">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Serviço
                        </label>
                        {servicesLoading ? (
                            <div className="text-sm text-muted-foreground">Carregando serviços...</div>
                        ) : services.length === 0 ? (
                            <div className="text-sm text-muted-foreground">
                                Nenhum serviço cadastrado. Cadastre serviços primeiro.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => setServiceId(service.id)}
                                        className={`p-3 rounded-lg border text-left transition-all ${serviceId === service.id
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-muted-foreground"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                            <span className="text-sm font-medium text-foreground truncate">
                                                {service.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-muted-foreground">
                                                {service.duration} min
                                            </span>
                                            <span className="text-xs font-medium text-foreground">
                                                R$ {parseFloat(service.price).toFixed(2)}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4" />
                                Data
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
                                <Clock className="w-4 h-4" />
                                Horário
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                            />
                        </div>
                    </div>

                    {date && (
                        <p className="text-xs text-muted-foreground capitalize">
                            {formatDateDisplay(date)}
                            {selectedService && ` • Duração: ${selectedService.duration} min`}
                            {selectedService && ` • R$ ${parseFloat(selectedService.price).toFixed(2)}`}
                        </p>
                    )}

                    <ClientSelect
                        value={selectedClient}
                        onChange={setSelectedClient}
                        onCreateClient={createClient}
                        onSearchClients={searchClients}
                    />

                    <div>
                        <label className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mb-2">
                            <FileText className="w-4 h-4" />
                            Observações
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Alguma observação..."
                            rows={2}
                            className="w-full px-3 py-2 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        {booking && onDelete && (
                            <button
                                type="button"
                                onClick={onDelete}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4" />
                                Excluir
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={!selectedClient || !serviceId || servicesLoading}
                            className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {booking ? "Salvar Alterações" : "Agendar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
