import { pgTable, text, timestamp, boolean, integer, decimal, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm"

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
});

export const clients = pgTable("clients", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    notes: text("notes"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const clientsRelations = relations(clients, ({ many }) => ({
    appointments: many(appointments),
}));

export const services = pgTable("services", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    duration: integer("duration").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const servicesRelations = relations(services, ({ many }) => ({
    appointments: many(appointments),
}));

export const appointments = pgTable("appointments", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    clientId: text("clientId")
        .notNull()
        .references(() => clients.id, { onDelete: "cascade" }),
    serviceId: text("serviceId")
        .notNull()
        .references(() => services.id, { onDelete: "cascade" }),
    startTime: timestamp("startTime").notNull(),
    endTime: timestamp("endTime").notNull(),
    status: text("status").notNull().default("pending"),
    notes: text("notes"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
    client: one(clients, {
        fields: [appointments.clientId],
        references: [clients.id],
    }),
    service: one(services, {
        fields: [appointments.serviceId],
        references: [services.id],
    }),
}));


type ShopperLink = {
    id: string
    title: string
    url: string
}

export const shopper = pgTable("shopper", {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    bannerUrl: text("bannerUrl").notNull(),
    links: json("links").$type<ShopperLink[]>().notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Shopper = InferSelectModel<typeof shopper>