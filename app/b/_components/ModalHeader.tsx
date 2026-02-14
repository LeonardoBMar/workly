import { CalendarDays, X } from 'lucide-react';

type ModalHeaderProps = {
  onClose: () => void;
  subtitle?: string;
};

export default function ModalHeader({ onClose, subtitle }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4 md:pb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 md:h-10 md:w-10">
          <CalendarDays className="h-[18px] w-[18px] md:h-5 md:w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-gray-900 md:text-lg">
            Agendar serviço
          </h2>
          <p className="text-xs text-gray-400 md:text-sm">
            {subtitle || 'Selecione uma data disponível'}
          </p>
        </div>
      </div>
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 md:h-8 md:w-8 md:rounded-lg"
        onClick={onClose}
      >
        <X className="h-5 w-5 md:h-[18px] md:w-[18px]" />
      </button>
    </div>
  );
}
