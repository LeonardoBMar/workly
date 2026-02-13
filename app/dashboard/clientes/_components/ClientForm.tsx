'use client';

import { useState } from 'react';
import { User, Mail, Phone, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { createClient, updateClient } from '@/app/actions/clients';
import { useRouter } from 'next/navigation';
import { notifyError, notifySuccess } from '@/lib/toast';
import { Client } from '@/lib/schema';

interface ClientFormProps {
  onSuccess?: () => void;
  initialData?: Client | null;
}

export function ClientForm({ onSuccess, initialData }: ClientFormProps) {
  const isEditing = !!initialData;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const notes = formData.get('notes') as string;

    try {
      const data = {
        name,
        email: email || undefined,
        phone: phone || undefined,
        notes: notes || undefined,
      };

      const result = isEditing
        ? await updateClient(initialData.id, data)
        : await createClient(data);

      if (result.error) {
        notifyError(result.error);
      } else {
        notifySuccess(
          isEditing
            ? 'Cliente atualizado com sucesso!'
            : 'Cliente criado com sucesso!',
        );
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('/dashboard');
        }
        router.refresh();
      }
    } catch (error) {
      notifyError(
        `Ocorreu um erro ao ${isEditing ? 'atualizar' : 'salvar'} o cliente`,
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-100 bg-slate-50/50 p-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? 'Atualize as informações do seu cliente.'
                : 'Cadastre um novo cliente para gerenciar agendamentos e faturas.'}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-400 transition-all hover:border-indigo-300 hover:bg-indigo-100">
              <User className="h-8 w-8 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Adicionar Foto
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                name="name"
                label="Nome Completo"
                placeholder="Ex: João Silva"
                defaultValue={initialData?.name}
                required
                icon={<User className="h-4 w-4 text-slate-400" />}
              />
            </div>

            <Input
              name="email"
              label="E-mail"
              type="email"
              placeholder="joao@exemplo.com"
              defaultValue={initialData?.email || ''}
              icon={<Mail className="h-4 w-4 text-slate-400" />}
            />

            <Input
              name="phone"
              label="Telefone / WhatsApp"
              placeholder="(11) 99999-9999"
              defaultValue={initialData?.phone || ''}
              icon={<Phone className="h-4 w-4 text-slate-400" />}
            />

            <div className="md:col-span-2">
              <Textarea
                name="notes"
                label="Observações"
                placeholder="Adicione informações relevantes sobre o cliente..."
                defaultValue={initialData?.notes || ''}
                icon={<FileText className="h-4 w-4 text-slate-400" />}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              type="button"
              disabled={isLoading}
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  {isEditing ? 'Atualizar' : 'Cadastrar'} Cliente
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
