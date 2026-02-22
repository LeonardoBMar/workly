import { getRequiredSession } from '@/lib/get-session';
import { getReportsData } from './_queries/get-reports-data';
import { ReportsClient } from './_components/ReportsClient';

export default async function RelatoriosPage() {
  const user = await getRequiredSession();
  const data = await getReportsData(user.id);

  return <ReportsClient data={data} />;
}
