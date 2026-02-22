export interface DashboardData {
  allAppointments: Appointment[];
  allClients: Client[];
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  currentMonthAppointments: number;
  currentMonthClients: number;
  lastMonthClients: number;
  upcomingAppointments: Appointment[];
  configStatus: ConfigStatus;
}

export interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'canceled' | 'completed' | string;
  service: { price: string | number; name: string };
  client?: { name: string };
}

export interface Client {
  id: string;
  createdAt: string;
}

export interface ConfigStatus {
  hasAccount: boolean;
  hasProfile: boolean;
  hasServices: boolean;
  hasConnectedCalendar: boolean;
}

export type PeriodFilter = '7d' | 'daily';
