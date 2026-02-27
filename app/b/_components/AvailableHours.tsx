import { Clock, CalendarDays } from 'lucide-react';

interface AvailableHoursProps {
  selectedDate: string | null;
  horarios: string[] | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function AvailableHours({
  selectedDate,
  horarios,
  selectedTime,
  onSelectTime,
}: AvailableHoursProps) {
  if (!selectedDate) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <CalendarDays className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-center text-sm text-gray-400">
          Selecione uma data para ver os horários disponíveis
        </p>
      </div>
    );
  }

  const formattedDate = new Date(selectedDate).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 md:p-5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
          <Clock className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            Horários disponíveis
          </h3>
          <p className="text-xs text-gray-400 capitalize">{formattedDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
        {horarios?.map((item) => {
          // If the get-available-times action was updated to return objects like { time: '08:00', available: true }
          // This allows us to handle both simple string arrays (backwards compatible) or object arrays.
          const hora = typeof item === 'string' ? item : (item as any).time;
          const isSelected = hora === selectedTime;
          const isPast = typeof item === 'object' && (item as any).isPast;
          const isAvailable =
            typeof item === 'string'
              ? true
              : (item as any).available && !isPast;

          return (
            <button
              key={hora}
              onClick={() => {
                if (isAvailable) onSelectTime(hora);
              }}
              disabled={!isAvailable}
              className={`group relative rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none ${
                !isAvailable
                  ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300'
                  : isSelected
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'cursor-pointer border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm'
              }`}
            >
              <span className={!isAvailable ? 'opacity-50' : ''}>{hora}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
