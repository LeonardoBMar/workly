'use client';

import { Slider } from '@/app/components/ui/slider';
import type { CalendarView } from './types';

interface CalendarToolbarProps {
  timeRange: [number, number];
  onTimeRangeChange: (val: [number, number]) => void;
  currentView: CalendarView;
  onChangeView: (view: CalendarView) => void;
  onPrev: () => void;
  onToday: () => void;
  onNext: () => void;
}

export function CalendarToolbar({
  timeRange,
  onTimeRangeChange,
  currentView,
  onChangeView,
  onPrev,
  onToday,
  onNext,
}: CalendarToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-3 py-1.5 text-sm transition-colors"
        >
          Anterior
        </button>
        <button
          onClick={onToday}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-1.5 text-sm transition-colors"
        >
          Hoje
        </button>
        <button
          onClick={onNext}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center rounded-md px-3 py-1.5 text-sm transition-colors"
        >
          Próximo
        </button>
      </div>

      <div className="flex max-w-[400px] min-w-[200px] flex-1 items-center justify-center">
        <div className="bg-secondary/50 text-secondary-foreground flex w-full items-center gap-4 rounded-lg p-2 text-sm">
          <span className="font-medium whitespace-nowrap">Horários:</span>
          <Slider
            value={timeRange}
            min={0}
            max={24}
            step={1}
            onValueChange={(val: number[]) => {
              if (val.length === 2 && val[0] < val[1]) {
                onTimeRangeChange(val as [number, number]);
              }
            }}
            className="flex-1"
          />
          <span className="w-24 text-center font-medium whitespace-nowrap">
            {timeRange[0].toString().padStart(2, '0')}:00 -{' '}
            {timeRange[1].toString().padStart(2, '0')}:00
          </span>
        </div>
      </div>

      <div className="bg-secondary flex items-center gap-1 rounded-lg p-1">
        <button
          onClick={() => onChangeView('dayGridMonth')}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            currentView === 'dayGridMonth'
              ? 'bg-card text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Mês
        </button>
        <button
          onClick={() => onChangeView('timeGridWeek')}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            currentView === 'timeGridWeek'
              ? 'bg-card text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Semana
        </button>
        <button
          onClick={() => onChangeView('timeGridDay')}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            currentView === 'timeGridDay'
              ? 'bg-card text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Dia
        </button>
      </div>
    </div>
  );
}
