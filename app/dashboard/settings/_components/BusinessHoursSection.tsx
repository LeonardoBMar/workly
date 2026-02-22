'use client';

import { useState, useTransition } from 'react';
import { Clock, Save, Loader2, Globe } from 'lucide-react';
import { updateBusinessHours } from '@/app/actions/settings';
import { toast } from 'sonner';
import type { BusinessHours } from '@/lib/schema';
import type { SettingsData } from './SettingsClient';

const DAY_LABELS: Record<keyof BusinessHours, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

const DAY_SHORT: Record<keyof BusinessHours, string> = {
  monday: 'Seg',
  tuesday: 'Ter',
  wednesday: 'Qua',
  thursday: 'Qui',
  friday: 'Sex',
  saturday: 'Sáb',
  sunday: 'Dom',
};

const TIMEZONES = [
  'America/Sao_Paulo',
  'America/Fortaleza',
  'America/Manaus',
  'America/Rio_Branco',
  'America/Noronha',
  'America/Bahia',
  'America/Belem',
  'America/Cuiaba',
  'America/Recife',
  'America/Porto_Velho',
  'America/Campo_Grande',
  'America/Boa_Vista',
  'America/Maceio',
  'America/Araguaina',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Buenos_Aires',
  'America/Bogota',
  'America/Lima',
  'America/Santiago',
  'America/Mexico_City',
  'Europe/London',
  'Europe/Lisbon',
  'Europe/Madrid',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'Australia/Sydney',
];

const TIME_OPTIONS: string[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 30) {
    TIME_OPTIONS.push(
      `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
    );
  }
}

const DAYS = Object.keys(DAY_LABELS) as (keyof BusinessHours)[];

export function BusinessHoursSection({ settings }: { settings: SettingsData }) {
  const [hours, setHours] = useState<BusinessHours>(settings.businessHours);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (day: keyof BusinessHours) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleTimeChange = (
    day: keyof BusinessHours,
    field: 'start' | 'end',
    value: string,
  ) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateBusinessHours({
        businessHours: hours,
        timezone,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Horários atualizados com sucesso!');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
          <Clock className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Horários de Funcionamento
          </h2>
          <p className="text-sm text-slate-500">
            Defina os dias e horários de atendimento
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="timezone-select"
          className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700"
        >
          <Globe className="h-3.5 w-3.5 text-slate-400" />
          Fuso horário
        </label>
        <select
          id="timezone-select"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {DAYS.map((day) => {
          const schedule = hours[day];
          return (
            <div
              key={day}
              className={`flex flex-col gap-3 rounded-xl border p-4 transition-all sm:flex-row sm:items-center ${
                schedule.enabled
                  ? 'border-slate-200 bg-white'
                  : 'border-slate-100 bg-slate-50/50'
              }`}
            >
              <div className="flex min-w-[160px] items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle(day)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    schedule.enabled ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      schedule.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    schedule.enabled ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  <span className="hidden sm:inline">{DAY_LABELS[day]}</span>
                  <span className="sm:hidden">{DAY_SHORT[day]}</span>
                </span>
              </div>

              {schedule.enabled ? (
                <div className="flex items-center gap-2">
                  <select
                    value={schedule.start}
                    onChange={(e) =>
                      handleTimeChange(day, 'start', e.target.value)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-slate-400">até</span>
                  <select
                    value={schedule.end}
                    onChange={(e) =>
                      handleTimeChange(day, 'end', e.target.value)
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <span className="text-sm text-slate-400">Fechado</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Salvar horários
        </button>
      </div>
    </form>
  );
}
