'use client';

import { useState, useTransition } from 'react';
import { Lock, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { updatePassword } from '@/app/actions/settings';
import { toast } from 'sonner';

export function PasswordSection() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updatePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Senha alterada com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    });
  };

  const canSubmit =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    confirmPassword.length > 0;

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
          <Lock className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Alterar Senha
          </h2>
          <p className="text-sm text-slate-500">
            Mantenha sua conta segura atualizando sua senha
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="current-password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Senha atual
          </label>
          <div className="relative">
            <input
              id="current-password"
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 transition-all outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showCurrent ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nova senha
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 transition-all outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              placeholder="Mínimo 8 caracteres"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showNew ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {newPassword.length > 0 && newPassword.length < 8 && (
            <p className="mt-1 text-xs text-amber-500">
              A senha deve ter no mínimo 8 caracteres
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Confirmar nova senha
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            placeholder="Repita a nova senha"
          />
          {confirmPassword.length > 0 && confirmPassword !== newPassword && (
            <p className="mt-1 text-xs text-rose-500">
              As senhas não coincidem
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
        <button
          type="submit"
          disabled={isPending || !canSubmit}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Alterar senha
        </button>
      </div>
    </form>
  );
}
