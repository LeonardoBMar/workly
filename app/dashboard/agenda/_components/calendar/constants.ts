export const DEFAULT_TIME_RANGE: [number, number] = [8, 18];

export const SERVICE_COLORS = [
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
] as const;

export const STATUS_COLORS: Record<string, string> = {
  cancelled: '#ef4444', // Vermelho
  completed: '#3b82f6', // Azul
  pending: '#eab308', // Amarelo
  confirmed: '#22c55e', // Verde
  no_show: '#374151', // Cinza Escuro
};
