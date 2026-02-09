import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  channelName: text("channel_name").notNull(),
  subscriberCount: text("subscriber_count").notNull(),
  channelLink: text("channel_link").notNull(),
  videoEmbedHtml: text("video_embed_html").notNull(),
  iconUrl: text("icon_url").notNull(),
  description: text("description").notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  channelName: text("channel_name").notNull(),
  content: text("content").notNull(),
  avatarUrl: text("avatar_url"),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true });

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
