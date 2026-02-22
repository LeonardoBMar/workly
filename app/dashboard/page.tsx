import { DashboardHome } from './_components/DashboardHome';
import { getRequiredSession } from '@/lib/get-session';
import { getDashboardData } from './_queries/get-dashboard-data';

export default async function DashboardPage() {
  const user = await getRequiredSession();
  const data = await getDashboardData(user.id);

  return <DashboardHome data={data} />;
}
