'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { X, Trash2, Clock, FileText, Calendar } from 'lucide-react';
import type { Booking } from '../types';
import { ClientSelect } from './client-select';
import { useServices, useClients, type Client } from '../_actions';
import Link from 'next/link';
import type { AppointmentStatus } from '@/lib/validation';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (booking: Omit<Booking, 'id'>) => void;
  onDelete?: () => void;
  booking?: Booking | null;
  selectedSlot?: { start: Date; end: Date } | null;
}

export function BookingModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  booking,
  selectedSlot,
}: BookingModalProps) {
  const { services, isLoading: servicesLoading } = useServices();
  const { searchClients, createClient } = useClients();
  const [serviceId, setServiceId] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<AppointmentStatus>('pending');
  const [startTime, setStartTime] = useState('');
  const [date, setDate] = useState('');

  const formatTime = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (services.length > 0 && !serviceId) {
        setServiceId(services[0].id);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [services, serviceId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (booking) {
        setServiceId(booking.serviceId);
        setSelectedClient(
          booking.clientName
            ? {
                id: 'temp',
                name: booking.clientName,
                phone: booking.clientPhone,
              }
            : null,
        );
        setNotes(booking.notes || '');
        setStatus(booking.status ?? 'pending');
        setStartTime(formatTime(booking.start));
        setDate(formatDate(booking.start));
      } else if (selectedSlot) {
        if (services.length > 0) {
          setServiceId(services[0].id);
        }
        setSelectedClient(null);
        setNotes('');
        setStatus('pending');
        setStartTime(formatTime(selectedSlot.start));
        setDate(formatDate(selectedSlot.start));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [booking, selectedSlot, services]);

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) {
      alert('Por favor, selecione um cliente');
      return;
    }

    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      alert('Por favor, selecione um serviço');
      return;
    }

    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(date + 'T00:00:00');
    start.setHours(hours, minutes, 0, 0);
    const end = new Date(start.getTime() + service.duration * 60000);

    onSave({
      serviceId,
      clientId: selectedClient.id,
      title: `${service.name} - ${selectedClient.name}`,
      start,
      end,
      clientName: selectedClient.name,
      clientPhone: selectedClient.phone,
      notes,
      status,
    });
  };

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === serviceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-card border-border relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl border shadow-2xl">
        <div className="border-border flex items-center justify-between border-b p-4">
          <h2 className="text-foreground text-lg font-semibold">
            {booking ? 'Editar Agendamento' : 'Novo Agendamento'}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-secondary text-muted-foreground hover:text-foreground rounded-md p-1.5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-4 overflow-y-auto p-4"
        >
          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              Serviço
            </label>
            {servicesLoading ? (
              <div className="text-muted-foreground text-sm">
                Carregando serviços...
              </div>
            ) : services.length === 0 ? (
              <div className="text-muted-foreground flex flex-col gap-2 text-sm">
                Nenhum serviço cadastrado. Cadastre serviços primeiro.
                <Link
                  href="/dashboard/servicos"
                  className="max-w-[200px] rounded-md border border-blue-400 p-2 text-center text-sm text-blue-400"
                >
                  Cadastrar
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setServiceId(service.id)}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      serviceId === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-primary h-3 w-3 rounded-full" />
                      <span className="text-foreground truncate text-sm font-medium">
                        {service.name}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">
                        {service.duration} min
                      </span>
                      <span className="text-foreground text-xs font-medium">
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
              <label className="text-muted-foreground mb-2 flex items-center gap-1.5 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border-border text-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-muted-foreground mb-2 flex items-center gap-1.5 text-sm font-medium">
                <Clock className="h-4 w-4" />
                Horário
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="border-border text-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          {date && (
            <p className="text-muted-foreground text-xs capitalize">
              {formatDateDisplay(date)}
              {selectedService && ` • Duração: ${selectedService.duration} min`}
              {selectedService &&
                ` • R$ ${parseFloat(selectedService.price).toFixed(2)}`}
            </p>
          )}

          <ClientSelect
            value={selectedClient}
            onChange={setSelectedClient}
            onCreateClient={createClient}
            onSearchClients={searchClients}
          />

          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              Status inicial
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
              className="border-border text-foreground focus:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            >
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="cancelled">Cancelado</option>
              <option value="completed">Finalizado</option>
              <option value="no_show">Não Compareceu</option>
            </select>
          </div>

          <div>
            <label className="text-muted-foreground mb-2 flex items-center gap-1.5 text-sm font-medium">
              <FileText className="h-4 w-4" />
              Observações
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Alguma observação..."
              rows={2}
              className="border-border text-foreground placeholder:text-muted-foreground focus:ring-ring w-full resize-none rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            {booking && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
            )}
            <button
              type="submit"
              disabled={!selectedClient || !serviceId || servicesLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {booking ? 'Salvar Alterações' : 'Agendar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
