'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import {
  DollarSign,
  Clock,
  Loader2,
  Package,
  Save,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { createService, updateService } from '@/app/actions/services';
import { Service } from '@/lib/schema';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { notifyError, notifySuccess } from '@/lib/toast';

interface ServiceFormProps {
  initialData?: Service | null;
  onSuccess?: () => void;
}

export function ServiceForm({ initialData, onSuccess }: ServiceFormProps) {
  const isEditing = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '60',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price.toString() || '',
        duration: initialData.duration.toString() || '60',
      });
    }
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...formData,
      duration: parseInt(formData.duration),
    };

    try {
      const res = isEditing
        ? await updateService(initialData.id, data)
        : await createService(data);

      if (res.success) {
        notifySuccess(
          isEditing
            ? 'Serviço atualizado com sucesso!'
            : 'Serviço criado com sucesso!',
        );
        onSuccess?.();
      } else {
        notifyError(res.error || 'Erro ao salvar serviço');
      }
    } catch (error) {
      notifyError(
        `Ocorreu um erro ao ${isEditing ? 'atualizar' : 'salvar'} o serviço`,
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-100 bg-slate-50/50 p-8 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? 'Atualize as informações do seu serviço.'
                : 'Cadastre um novo serviço para seu catálogo.'}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-400 transition-all hover:border-indigo-300 hover:bg-indigo-100">
              <Package className="h-8 w-8 transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Nome do serviço"
                placeholder="Ex: Corte de Cabelos"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                icon={<Package className="h-4 w-4 text-slate-400" />}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Descrição (opcional)"
                placeholder="Descreva os detalhes do serviço..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                icon={<FileText className="h-4 w-4 text-slate-400" />}
              />
            </div>

            <Input
              label="Preço (R$)"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              icon={<DollarSign className="h-4 w-4 text-slate-400" />}
            />

            <Input
              label="Duração (minutos)"
              type="number"
              placeholder="60"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              icon={<Clock className="h-4 w-4 text-slate-400" />}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="submit" className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  {isEditing ? 'Atualizar' : 'Cadastrar'} Serviço
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
