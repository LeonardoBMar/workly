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
  completed: '#6b7280',
  no_show: '#ef4444',
  cancelled: '#9ca3af',
};
