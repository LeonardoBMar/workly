import { z } from 'zod';

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
};

const requiredTrimmedString = (fieldName: string, max = 120) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} é obrigatório`)
    .max(max, `${fieldName} deve ter no máximo ${max} caracteres`);

const optionalTrimmedString = (max = 500) =>
  z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .max(max, `Campo deve ter no máximo ${max} caracteres`)
      .optional(),
  );

const priceSchema = z
  .union([z.string(), z.number()])
  .transform((value) => (typeof value === 'number' ? value.toString() : value))
  .transform((value) => value.replace(',', '.').trim())
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), 'Preço inválido')
  .refine((value) => Number(value) > 0, 'Preço deve ser maior que zero');

const durationSchema = z.preprocess(
  (value) => (typeof value === 'string' ? Number(value) : value),
  z
    .number({ error: 'Duração inválida' })
    .int('Duração deve ser um número inteiro')
    .positive('Duração deve ser maior que zero'),
);

export const createServiceInputSchema = z.object({
  name: requiredTrimmedString('Nome do serviço'),
  description: optionalTrimmedString(500),
  imageUrl: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().url('URL inválida').optional(),
  ),
  iconName: optionalTrimmedString(60),
  price: priceSchema,
  duration: durationSchema,
});

export const updateServiceInputSchema = z
  .object({
    name: z.preprocess(
      emptyStringToUndefined,
      requiredTrimmedString('Nome do serviço').optional(),
    ),
    description: optionalTrimmedString(500),
    imageUrl: z
      .preprocess(
        emptyStringToUndefined,
        z.string().trim().url('URL inválida').optional(),
      )
      .optional(),
    iconName: optionalTrimmedString(60).optional(),
    price: z.preprocess(emptyStringToUndefined, priceSchema.optional()),
    duration: z.preprocess(
      emptyStringToUndefined,
      z.preprocess(
        (value) => (typeof value === 'string' ? Number(value) : value),
        z
          .number({ error: 'Duração inválida' })
          .int('Duração deve ser um número inteiro')
          .positive('Duração deve ser maior que zero')
          .optional(),
      ),
    ),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.description !== undefined ||
      data.imageUrl !== undefined ||
      data.iconName !== undefined ||
      data.price !== undefined ||
      data.duration !== undefined,
    { message: 'Informe ao menos um campo para atualização' },
  );

export const createClientInputSchema = z.object({
  name: requiredTrimmedString('Nome', 120),
  email: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .email('E-mail inválido')
      .max(160, 'E-mail muito longo')
      .optional(),
  ),
  phone: optionalTrimmedString(30),
  notes: optionalTrimmedString(1000),
  birthday: optionalTrimmedString(10),
  tags: z.array(z.string().trim().max(50)).max(20).optional(),
});

export const updateClientInputSchema = z
  .object({
    name: z.preprocess(
      emptyStringToUndefined,
      requiredTrimmedString('Nome', 120).optional(),
    ),
    email: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .trim()
        .email('E-mail inválido')
        .max(160, 'E-mail muito longo')
        .optional(),
    ),
    phone: optionalTrimmedString(30),
    notes: optionalTrimmedString(1000),
    birthday: optionalTrimmedString(10),
    tags: z.array(z.string().trim().max(50)).max(20).optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.email !== undefined ||
      data.phone !== undefined ||
      data.notes !== undefined ||
      data.birthday !== undefined ||
      data.tags !== undefined,
    { message: 'Informe ao menos um campo para atualização' },
  );

const slugSchema = z
  .string()
  .trim()
  .transform((value) => value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
  .transform((value) => value.replace(/-{2,}/g, '-').replace(/^-|-$/g, ''))
  .refine((value) => value.length >= 3, 'Slug deve ter no minimo 3 caracteres')
  .refine(
    (value) => value.length <= 60,
    'Slug deve ter no maximo 60 caracteres',
  )
  .refine(
    (value) => /^[a-z0-9-]+$/.test(value),
    'Use apenas letras minusculas, numeros e hifens',
  );

const optionalUrlSchema = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().url('URL invalida').optional(),
);

export const upsertShopperInputSchema = z.object({
  slug: slugSchema,
  name: requiredTrimmedString('Nome', 120),
  description: optionalTrimmedString(500),
  bannerUrl: optionalUrlSchema,
  logoUrl: optionalUrlSchema,
});

export const authSignInInputSchema = z.object({
  email: z.string().trim().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const authSignUpInputSchema = z.object({
  name: requiredTrimmedString('Nome', 120),
  email: z.string().trim().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export const appointmentStatusSchema = z.enum([
  'pending',
  'confirmed',
  'cancelled',
  'completed',
  'no_show',
]);
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;

export function getValidationErrorMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Dados inválidos';
}

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório')
    .max(120, 'Nome deve ter no máximo 120 caracteres'),
  email: z
    .string()
    .trim()
    .email('E-mail inválido')
    .max(160, 'E-mail muito longo'),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(8, 'A nova senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

const dayScheduleSchema = z.object({
  enabled: z.boolean(),
  start: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido'),
  end: z.string().regex(/^\d{2}:\d{2}$/, 'Horário inválido'),
});

export const updateBusinessHoursSchema = z.object({
  businessHours: z.object({
    monday: dayScheduleSchema,
    tuesday: dayScheduleSchema,
    wednesday: dayScheduleSchema,
    thursday: dayScheduleSchema,
    friday: dayScheduleSchema,
    saturday: dayScheduleSchema,
    sunday: dayScheduleSchema,
  }),
  timezone: z.string().min(1, 'Timezone é obrigatório'),
});
