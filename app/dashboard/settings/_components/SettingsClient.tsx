'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, Lock, Clock } from 'lucide-react';
import { ProfileSection } from './ProfileSection';
import { PasswordSection } from './PasswordSection';
import { BusinessHoursSection } from './BusinessHoursSection';
import type { BusinessHours } from '@/lib/schema';

export type SettingsData = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  businessHours: BusinessHours;
  timezone: string;
};

const tabs = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'password', label: 'Senha', icon: Lock },
  { id: 'hours', label: 'Horários', icon: Clock },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function SettingsClient({ settings }: { settings: SettingsData }) {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabId) || 'profile';
  const [activeTab, setActiveTab] = useState<TabId>(
    tabs.some((t) => t.id === initialTab) ? initialTab : 'profile',
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gerencie seu perfil, senha e horários de funcionamento
        </p>
      </div>

      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        {activeTab === 'profile' && <ProfileSection settings={settings} />}
        {activeTab === 'password' && <PasswordSection />}
        {activeTab === 'hours' && <BusinessHoursSection settings={settings} />}
      </div>
    </div>
  );
}
