import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sportCategories = pgTable("sport_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sportCategoryId: integer("sport_category_id").notNull(),
  isOkb: boolean("is_okb").notNull().default(true),
  location: text("location").notNull(),
  schedule: text("schedule").notNull(),
  contact: text("contact").notNull(),
  icon: text("icon").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  time: text("time").notNull(),
  fee: text("fee").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(), // Store as text to handle date strings easier in forms
  category: text("category").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const joinRequests = pgTable("join_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  sportCategoryId: integer("sport_category_id").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSportCategorySchema = createInsertSchema(sportCategories).pick({
  name: true,
});

export const insertOrganizationSchema = createInsertSchema(organizations).pick({
  name: true,
  sportCategoryId: true,
  isOkb: true,
  location: true,
  schedule: true,
  contact: true,
  icon: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  date: true,
  location: true,
  time: true,
  fee: true,
  imageUrl: true,
});

// Override the date validation to accept string instead of Date
export const insertNewsSchema = createInsertSchema(news, {
  date: z.string(),
}).pick({
  title: true,
  date: true,
  category: true,
  content: true,
  excerpt: true,
  imageUrl: true,
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).pick({
  title: true,
  category: true,
  imageUrl: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertJoinRequestSchema = createInsertSchema(joinRequests).pick({
  name: true,
  email: true,
  phone: true,
  sportCategoryId: true,
  message: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSportCategory = z.infer<typeof insertSportCategorySchema>;
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertJoinRequest = z.infer<typeof insertJoinRequestSchema>;

export type User = typeof users.$inferSelect;
export type SportCategory = typeof sportCategories.$inferSelect;
export type Organization = typeof organizations.$inferSelect;
export type Event = typeof events.$inferSelect;
export type News = typeof news.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type JoinRequest = typeof joinRequests.$inferSelect;
