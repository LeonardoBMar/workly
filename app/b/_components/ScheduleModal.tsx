"use client"

import { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { format, addDays } from "date-fns"
import { ptBR } from "date-fns/locale"


interface ScheduleModalProps {
    isOpen: boolean
    onClose: () => void
    shopperId: string
    serviceId: string
}

const fetchAvailableSlots = async (
    shopperId: string,
    serviceId: string,
    date: string
): Promise<string[]> => {
    return ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
}

export default function ScheduleModal({
    isOpen,
    onClose,
    shopperId,
    serviceId
}: ScheduleModalProps) {
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
    const [slots, setSlots] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isOpen) return

        const load = async () => {
            setLoading(true)
            const data = await fetchAvailableSlots(shopperId, serviceId, selectedDate)
            setSlots(data)
            setLoading(false)
        }

        load()
    }, [selectedDate, isOpen, shopperId, serviceId])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xl space-y-4">

                <div className="flex justify-between">
                    <h2 className="text-lg font-semibold">Agendar serviço</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    height="auto"
                    selectable
                    dateClick={(info) => setSelectedDate(info.dateStr)}
                    events={[
                        {
                            start: selectedDate,
                            display: "background"
                        }
                    ]}
                    validRange={{
                        start: format(new Date(), "yyyy-MM-dd"),
                        end: format(addDays(new Date(), 30), "yyyy-MM-dd")
                    }}
                    headerToolbar={{
                        left: "prev",
                        center: "title",
                        right: "next"
                    }}
                />


                <div>
                    <p className="text-sm font-medium mb-2">
                        Horários para{" "}
                        {format(new Date(selectedDate), "dd/MM/yyyy", { locale: ptBR })}
                    </p>

                    {loading ? (
                        <p>Carregando...</p>
                    ) : slots.length ? (
                        <div className="grid grid-cols-3 gap-2">
                            {slots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => {
                                        alert(`Agendado ${selectedDate} às ${slot}`)
                                        onClose()
                                    }}
                                    className="border rounded-md py-2 text-sm hover:bg-black hover:text-white transition"
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-500">
                            Nenhum horário disponível
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
