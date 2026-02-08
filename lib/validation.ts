import { z } from "zod";

const emptyStringToUndefined = (value: unknown) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
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
        z.string().trim().max(max, `Campo deve ter no máximo ${max} caracteres`).optional()
    );

const priceSchema = z
    .union([z.string(), z.number()])
    .transform((value) => (typeof value === "number" ? value.toString() : value))
    .transform((value) => value.replace(",", ".").trim())
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), "Preço inválido")
    .refine((value) => Number(value) > 0, "Preço deve ser maior que zero");

const durationSchema = z.preprocess(
    (value) => (typeof value === "string" ? Number(value) : value),
    z
        .number({ error: "Duração inválida" })
        .int("Duração deve ser um número inteiro")
        .positive("Duração deve ser maior que zero")
);

export const createServiceInputSchema = z.object({
    name: requiredTrimmedString("Nome do serviço"),
    description: optionalTrimmedString(500),
    price: priceSchema,
    duration: durationSchema,
});

export const updateServiceInputSchema = z
    .object({
        name: z.preprocess(emptyStringToUndefined, requiredTrimmedString("Nome do serviço").optional()),
        description: optionalTrimmedString(500),
        price: z.preprocess(emptyStringToUndefined, priceSchema.optional()),
        duration: z.preprocess(
            emptyStringToUndefined,
            z.preprocess(
                (value) => (typeof value === "string" ? Number(value) : value),
                z
                    .number({ error: "Duração inválida" })
                    .int("Duração deve ser um número inteiro")
                    .positive("Duração deve ser maior que zero")
                    .optional()
            )
        ),
    })
    .refine(
        (data) =>
            data.name !== undefined ||
            data.description !== undefined ||
            data.price !== undefined ||
            data.duration !== undefined,
        { message: "Informe ao menos um campo para atualização" }
    );

export const createClientInputSchema = z.object({
    name: requiredTrimmedString("Nome", 120),
    email: z.preprocess(
        emptyStringToUndefined,
        z.string().trim().email("E-mail inválido").max(160, "E-mail muito longo").optional()
    ),
    phone: optionalTrimmedString(30),
    notes: optionalTrimmedString(1000),
});

export const updateClientInputSchema = z
    .object({
        name: z.preprocess(emptyStringToUndefined, requiredTrimmedString("Nome", 120).optional()),
        email: z.preprocess(
            emptyStringToUndefined,
            z.string().trim().email("E-mail inválido").max(160, "E-mail muito longo").optional()
        ),
        phone: optionalTrimmedString(30),
        notes: optionalTrimmedString(1000),
    })
    .refine(
        (data) =>
            data.name !== undefined ||
            data.email !== undefined ||
            data.phone !== undefined ||
            data.notes !== undefined,
        { message: "Informe ao menos um campo para atualização" }
    );

export const authSignInInputSchema = z.object({
    email: z.string().trim().email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
});

export const authSignUpInputSchema = z.object({
    name: requiredTrimmedString("Nome", 120),
    email: z.string().trim().email("E-mail inválido"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export const appointmentStatusSchema = z.enum(["pending", "confirmed", "cancelled"]);
export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;

export function getValidationErrorMessage(error: z.ZodError): string {
    return error.issues[0]?.message ?? "Dados inválidos";
}

