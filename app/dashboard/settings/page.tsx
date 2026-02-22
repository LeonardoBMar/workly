import { getSettings } from '@/app/actions/settings';
import { SettingsClient } from './_components/SettingsClient';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const result = await getSettings();

  if (result.error || !result.data) {
    redirect('/login');
  }

  return <SettingsClient settings={result.data} />;
}
