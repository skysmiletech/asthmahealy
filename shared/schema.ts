import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  isBot: boolean("is_bot").notNull().default(false),
  timestamp: text("timestamp").notNull(),
});

export const symptoms = pgTable("symptoms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  severity: integer("severity").notNull(),
  description: text("description").notNull(),
  triggers: text("triggers"),
  medication_used: text("medication_used"),
  timestamp: text("timestamp").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  isBot: true,
});

export const insertSymptomSchema = createInsertSchema(symptoms).pick({
  severity: true,
  description: true,
  triggers: true,
  medication_used: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Symptom = typeof symptoms.$inferSelect;
export type InsertSymptom = z.infer<typeof insertSymptomSchema>;