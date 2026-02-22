import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd/MM/yyyy', { locale: ptBR });
};

export const formatDateTime = (dateStr: string) => {
  return format(new Date(dateStr), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
};

export const formatMonthShort = (date: Date) => {
  return format(date, 'MMM', { locale: ptBR });
};

export const formatMonthYear = (date: Date) => {
  return format(date, "MMM'/'yy", { locale: ptBR });
};

export const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  completed: 'Concluído',
  canceled: 'Cancelado',
};

export const getStatusLabel = (status: string) => {
  return statusLabels[status] || status;
};

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    canceled: 'bg-red-50 text-red-700 border-red-200',
  };
  return colors[status] || 'bg-slate-50 text-slate-700 border-slate-200';
};
