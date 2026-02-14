'use client';

import { useState } from 'react';
import { User, Phone, ArrowLeft, CalendarCheck } from 'lucide-react';

interface CustomerInfoStepProps {
  customerName: string;
  customerPhone: string;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function CustomerInfoStep({
  customerName,
  customerPhone,
  onChangeName,
  onChangePhone,
  onBack,
  onConfirm,
}: CustomerInfoStepProps) {
  const [touched, setTouched] = useState({ name: false, phone: false });

  const nameValid = customerName.trim().length >= 2;
  const phoneDigits = customerPhone.replace(/\D/g, '');
  const phoneValid = phoneDigits.length >= 10;
  const canSubmit = nameValid && phoneValid;

  return (
    <div className="step-slide-in flex w-full flex-col gap-5 px-1 py-2 md:px-4">
      <div className="flex flex-col gap-4">
        {/* Name field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="customer-name"
            className="text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="customer-name"
              type="text"
              placeholder="Seu nome completo"
              value={customerName}
              onChange={(e) => onChangeName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={`schedule-input w-full rounded-xl border bg-white py-3 pr-4 pl-10 text-sm text-gray-800 transition-all duration-200 outline-none placeholder:text-gray-300 ${
                touched.name && !nameValid
                  ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
              }`}
            />
          </div>
          {touched.name && !nameValid && (
            <p className="text-xs text-red-400">
              Informe seu nome (mínimo 2 caracteres)
            </p>
          )}
        </div>

        {/* Phone field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="customer-phone"
            className="text-sm font-medium text-gray-700"
          >
            Telefone
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Phone className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="customer-phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={customerPhone}
              onChange={(e) => onChangePhone(formatPhone(e.target.value))}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              className={`schedule-input w-full rounded-xl border bg-white py-3 pr-4 pl-10 text-sm text-gray-800 transition-all duration-200 outline-none placeholder:text-gray-300 ${
                touched.phone && !phoneValid
                  ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
              }`}
            />
          </div>
          {touched.phone && !phoneValid && (
            <p className="text-xs text-red-400">Informe um telefone válido</p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canSubmit}
          className={`flex flex-2 cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 ${
            canSubmit
              ? 'bg-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300'
              : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          <CalendarCheck className="h-4 w-4" />
          Confirmar
        </button>
      </div>
    </div>
  );
}
