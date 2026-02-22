export type ReportPeriod = '3m' | '6m' | '12m' | 'all';

export interface MonthlyRevenue {
  month: string; // "Jan", "Fev", etc.
  revenue: number;
  appointments: number;
}

export interface ServicePerformance {
  id: string;
  name: string;
  revenue: number;
  appointments: number;
  avgTicket: number;
  percentage: number;
}

export interface AppointmentReport {
  id: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  serviceName: string;
  servicePrice: number;
  startTime: string;
  endTime: string;
  status: string;
  notes: string | null;
  createdAt: string;
}

export interface ClientReport {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  totalAppointments: number;
  totalSpent: number;
  lastVisit: string | null;
  createdAt: string;
}

export interface ServiceReport {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  totalAppointments: number;
  totalRevenue: number;
}

export interface ReportsData {
  monthlyRevenue: MonthlyRevenue[];
  servicePerformance: ServicePerformance[];
  appointmentReports: AppointmentReport[];
  clientReports: ClientReport[];
  serviceReports: ServiceReport[];
  totals: {
    totalRevenue: number;
    totalAppointments: number;
    avgTicket: number;
    totalClients: number;
  };
}
