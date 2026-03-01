'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import {
  DollarSign,
  Clock,
  Loader2,
  Package,
  FileText,
  ArrowRight,
  ImagePlus,
  X,
  Check,
} from 'lucide-react';
import { createService, updateService } from '@/app/actions/services';
import { Service } from '@/lib/schema';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { notifyError, notifySuccess } from '@/lib/toast';
import { UploadButton } from '@/lib/uploadthing';
import { SERVICE_ICONS, getServiceIcon } from '@/lib/service-icons';

interface ServiceFormProps {
  initialData?: Service | null;
  onSuccess?: () => void;
}

export function ServiceForm({ initialData, onSuccess }: ServiceFormProps) {
  const isEditing = !!initialData;
  const [isLoading, setIsLoading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '60',
    imageUrl: '' as string | undefined,
    iconName: '' as string | undefined,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price.toString() || '',
        duration: initialData.duration.toString() || '60',
        imageUrl: initialData.imageUrl || undefined,
        iconName: initialData.iconName || undefined,
      });
    }
  }, [initialData]);

  function handleSelectIcon(iconName: string) {
    setFormData((prev) => ({
      ...prev,
      iconName: prev.iconName === iconName ? undefined : iconName,
      imageUrl: undefined,
    }));
    setShowIconPicker(false);
  }

  function handleImageUploaded(url: string) {
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
      iconName: undefined,
    }));
  }

  function handleRemoveImage() {
    setFormData((prev) => ({
      ...prev,
      imageUrl: undefined,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...formData,
      duration: parseInt(formData.duration),
      imageUrl: formData.imageUrl || undefined,
      iconName: formData.iconName || undefined,
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

  const SelectedIcon = formData.iconName
    ? getServiceIcon(formData.iconName)
    : null;

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
            {formData.imageUrl ? (
              <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-indigo-200 shadow-sm">
                  <Image
                    src={formData.imageUrl}
                    alt="Foto do serviço"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : SelectedIcon ? (
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-indigo-200 bg-indigo-50 shadow-sm">
                  <SelectedIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, iconName: undefined }))
                  }
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-transform hover:scale-110"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50 text-indigo-400 transition-all hover:border-indigo-300 hover:bg-indigo-100">
                <Package className="h-8 w-8 transition-transform group-hover:scale-110" />
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Imagem ou Ícone do Serviço
            </p>
            <p className="mb-4 text-xs text-slate-400">
              Escolha uma foto ou selecione um ícone para representar seu
              serviço.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <UploadButton
                endpoint="serviceImageUploader"
                appearance={{
                  button:
                    'ut-ready:bg-indigo-600 ut-ready:hover:bg-indigo-700 ut-uploading:bg-indigo-400 bg-indigo-600 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 after:ut-uploading:bg-indigo-400',
                  container: 'flex-row',
                  allowedContent: 'hidden',
                }}
                content={{
                  button({ ready, isUploading }) {
                    if (isUploading) return 'Enviando...';
                    if (ready)
                      return (
                        <span className="flex items-center gap-2">
                          <ImagePlus className="h-4 w-4" />
                          Enviar Foto
                        </span>
                      );
                    return 'Preparando...';
                  },
                }}
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.ufsUrl) {
                    handleImageUploaded(res[0].ufsUrl);
                    notifySuccess('Foto enviada com sucesso!');
                  }
                }}
                onUploadError={(error: Error) => {
                  notifyError(`Erro ao enviar foto: ${error.message}`);
                }}
              />

              <button
                type="button"
                onClick={() => setShowIconPicker(!showIconPicker)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Package className="h-4 w-4" />
                {showIconPicker ? 'Fechar Ícones' : 'Escolher Ícone'}
              </button>
            </div>

            {showIconPicker && (
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {SERVICE_ICONS.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = formData.iconName === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleSelectIcon(item.name)}
                      className={`group relative flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-500'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white shadow-sm">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <IconComponent className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] leading-tight font-medium">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
