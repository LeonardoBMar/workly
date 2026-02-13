'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/app/components/ui/button';
import { upsertShopper } from '../_actions/manage-link';
import {
  Loader2,
  ExternalLink,
  Save,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';
import { notifyError, notifySuccess } from '@/lib/toast';
import { upsertShopperInputSchema } from '@/lib/validation';

interface LinkFormProps {
  initialData?: {
    slug: string;
    name: string;
    description?: string | null;
    bannerUrl?: string;
    logoUrl?: string | null;
  } | null;
}

type LinkFormInputValues = z.input<typeof upsertShopperInputSchema>;
type LinkFormOutputValues = z.output<typeof upsertShopperInputSchema>;

function sanitizeSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

function getDefaultValues(
  initialData?: LinkFormProps['initialData'],
): LinkFormInputValues {
  return {
    slug: initialData?.slug ?? '',
    name: initialData?.name ?? '',
    description: initialData?.description || '',
    bannerUrl: initialData?.bannerUrl || '',
    logoUrl: initialData?.logoUrl || '',
  };
}

export function LinkForm({ initialData }: LinkFormProps) {
  const [success, setSuccess] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const { startUpload } = useUploadThing('imageUploader');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormInputValues, unknown, LinkFormOutputValues>({
    resolver: zodResolver(upsertShopperInputSchema),
    defaultValues: useMemo(() => getDefaultValues(initialData), [initialData]),
    mode: 'onBlur',
  });

  useEffect(() => {
    reset(getDefaultValues(initialData));
  }, [initialData, reset]);

  const watchedSlug = useWatch({ control, name: 'slug' });
  const slugPreview = sanitizeSlug(watchedSlug ?? '');

  const logoPreview = useMemo(() => {
    return logoFile
      ? URL.createObjectURL(logoFile)
      : initialData?.logoUrl || '';
  }, [initialData?.logoUrl, logoFile]);

  const bannerPreview = useMemo(() => {
    return bannerFile
      ? URL.createObjectURL(bannerFile)
      : initialData?.bannerUrl || '';
  }, [bannerFile, initialData?.bannerUrl]);

  useEffect(() => {
    return () => {
      if (logoFile && logoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoFile, logoPreview]);

  useEffect(() => {
    return () => {
      if (bannerFile && bannerPreview.startsWith('blob:')) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [bannerFile, bannerPreview]);

  const onSubmit: SubmitHandler<LinkFormOutputValues> = async (values) => {
    setSuccess(false);

    try {
      let currentLogoUrl = initialData?.logoUrl || '';
      let currentBannerUrl = initialData?.bannerUrl || '';

      if (logoFile) {
        const uploadRes = await startUpload([logoFile]);
        if (uploadRes?.[0]?.url) {
          currentLogoUrl = uploadRes[0].url;
        }
      }

      if (bannerFile) {
        const uploadRes = await startUpload([bannerFile]);
        if (uploadRes?.[0]?.url) {
          currentBannerUrl = uploadRes[0].url;
        }
      }

      const result = await upsertShopper({
        slug: values.slug,
        name: values.name,
        description: values.description,
        bannerUrl: currentBannerUrl,
        logoUrl: currentLogoUrl,
      });

      if (result.error) {
        notifyError(result.error);
        return;
      }

      notifySuccess('Configuracoes salvas com sucesso!');
      setSuccess(true);
    } catch {
      notifyError('Ocorreu um erro inesperado.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">
          Configurar seu Link
        </h2>
        <p className="text-sm text-slate-500">
          Crie um link personalizado para compartilhar seus servicos e produtos
          com seus clientes.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <ImageIcon className="h-4 w-4 text-indigo-600" />
              Foto de Perfil / Logo
            </label>
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
              <input
                type="file"
                accept="image/*"
                hidden
                id="logo-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setLogoFile(file);
                }}
              />

              {logoPreview ? (
                <label
                  htmlFor="logo-upload"
                  className="group relative mb-4 cursor-pointer"
                >
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-[10px] font-medium text-white">
                      Trocar foto
                    </p>
                  </div>
                </label>
              ) : (
                <label
                  htmlFor="logo-upload"
                  className="mb-4 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-100 transition-colors hover:bg-slate-200"
                >
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                </label>
              )}

              <label
                htmlFor="logo-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Upload className="h-4 w-4" />
                Escolher Logo
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <ImageIcon className="h-4 w-4 text-indigo-600" />
              Banner da Pagina
            </label>
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
              <input
                type="file"
                accept="image/*"
                hidden
                id="banner-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setBannerFile(file);
                }}
              />

              {bannerPreview ? (
                <label
                  htmlFor="banner-upload"
                  className="group relative mb-4 h-24 w-full cursor-pointer"
                >
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="h-full w-full rounded-lg border border-slate-200 object-cover shadow-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-[10px] font-medium text-white">
                      Trocar banner
                    </p>
                  </div>
                </label>
              ) : (
                <label
                  htmlFor="banner-upload"
                  className="mb-4 flex h-24 w-full cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-100 transition-colors hover:bg-slate-200"
                >
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                </label>
              )}

              <label
                htmlFor="banner-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Upload className="h-4 w-4" />
                Escolher Banner
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              Link Personalizado (Slug)
            </label>
            <div className="flex items-center">
              <span className="flex h-10 items-center rounded-l-md border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                workly.com/b/
              </span>
              <input
                type="text"
                {...register('slug')}
                onInput={(e) => {
                  const sanitized = sanitizeSlug(e.currentTarget.value);
                  e.currentTarget.value = sanitized;
                }}
                className="h-10 flex-1 rounded-r-md border border-slate-200 bg-transparent px-3 text-sm transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="minha-loja"
              />
            </div>
            {errors.slug?.message ? (
              <p className="text-xs text-red-500">{errors.slug.message}</p>
            ) : (
              <p className="text-xs text-slate-500">
                Este sera o link que voce enviara para seus clientes. Use apenas
                letras, numeros e hifens.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              Nome do Negocio / Profissional
            </label>
            <input
              type="text"
              {...register('name')}
              className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              placeholder="Ex: Espaco Beleza, Dr. Joao Silva"
            />
            {errors.name?.message ? (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900">
              Descricao (Opcional)
            </label>
            <textarea
              {...register('description')}
              className="min-h-[80px] w-full resize-y rounded-md border border-slate-200 bg-white p-3 text-sm transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              placeholder="Uma breve descricao sobre o que voce oferece..."
            />
            {errors.description?.message ? (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            ) : null}
          </div>
        </div>

        {success && (
          <div className="flex items-center justify-between rounded-md border border-green-100 bg-green-50 p-3 text-sm text-green-600">
            <span>Configuracoes salvas com sucesso!</span>
            <a
              href={`/b/${slugPreview}`}
              target="_blank"
              className="flex items-center gap-1 text-xs font-semibold hover:underline"
            >
              Ver pagina <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          {slugPreview ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open(`/b/${slugPreview}`, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
          ) : null}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alteracoes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
