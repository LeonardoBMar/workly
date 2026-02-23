'use client';

import { useState, useTransition } from 'react';
import { User, Save, Loader2, Camera } from 'lucide-react';
import { updateProfile, updateProfileImage } from '@/app/actions/settings';
import { toast } from 'sonner';
import type { SettingsData } from './SettingsClient';
import { UploadButton } from '@/lib/uploadthing';

export function ProfileSection({ settings }: { settings: SettingsData }) {
  const [name, setName] = useState(settings.name);
  const [email, setEmail] = useState(settings.email);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateProfile({ name, email });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Perfil atualizado com sucesso!');
      }
    });
  };

  const hasChanges = name !== settings.name || email !== settings.email;

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
          <User className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Editar Perfil
          </h2>
          <p className="text-sm text-slate-500">
            Atualize suas informações pessoais
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="group relative h-20 w-20 shrink-0">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700 ring-4 ring-indigo-50 transition-all group-hover:opacity-75">
              {settings.image ? (
                <img
                  src={settings.image}
                  alt={name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="uppercase">{name?.[0] || 'U'}</span>
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={async (res) => {
                  if (res?.[0]) {
                    const result = await updateProfileImage(res[0].url);
                    if (result.error) {
                      toast.error(result.error);
                    } else {
                      toast.success('Foto de perfil atualizada!');
                    }
                  }
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Erro: ${error.message}`);
                }}
                appearance={{
                  button: ({ isUploading }) => ({
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '0', // Hide text
                  }),
                  allowedContent: { display: 'none' }, // Hide text
                }}
                content={{
                  button: <Camera className="h-5 w-5" />,
                }}
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">{email}</p>
            <p className="mt-1 text-[10px] text-slate-400">
              Clique na foto para alterar (PNG, JPG até 4MB)
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="settings-name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nome
          </label>
          <input
            id="settings-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label
            htmlFor="settings-email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            E-mail
          </label>
          <input
            id="settings-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={isPending || !hasChanges}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Salvar alterações
        </button>
      </div>
    </form>
  );
}
