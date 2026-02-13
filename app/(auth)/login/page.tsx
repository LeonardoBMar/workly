'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { LogIn, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  authSignInInputSchema,
  getValidationErrorMessage,
} from '@/lib/validation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const parsed = authSignInInputSchema.safeParse({ email, password });
      if (!parsed.success) {
        setError(getValidationErrorMessage(parsed.error));
        return;
      }

      const { error } = await authClient.signIn.email({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) {
        setError(
          error.message || 'Falha ao entrar. Verifique suas credenciais.',
        );
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="mb-6 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
          <LogIn className="h-6 w-6 text-white" />
        </div>
      </div>

      <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
        Bem-vindo de volta
      </h2>
      <p className="mt-2 text-center text-sm text-slate-600">
        Não tem uma conta?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 transition-colors hover:text-blue-500"
        >
          Crie uma gratuitamente
        </Link>
      </p>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-white bg-white/80 px-4 py-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-10 leading-5 placeholder-slate-400 shadow-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Senha
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-10 leading-5 placeholder-slate-400 shadow-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Entrar <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
