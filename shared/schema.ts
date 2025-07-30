import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Stories table
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  authorId: varchar("author_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Media files table
export const mediaFiles = pgTable("media_files", {
  id: serial("id").primaryKey(),
  storyId: integer("story_id").notNull().references(() => stories.id, { onDelete: 'cascade' }),
  filename: varchar("filename", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Story interactions table (likes, etc.)
export const storyInteractions = pgTable("story_interactions", {
  id: serial("id").primaryKey(),
  storyId: integer("story_id").notNull().references(() => stories.id, { onDelete: 'cascade' }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar("type", { length: 20 }).notNull(), // 'like', 'comment'
  content: text("content"), // for comments
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  stories: many(stories),
  interactions: many(storyInteractions),
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
  author: one(users, {
    fields: [stories.authorId],
    references: [users.id],
  }),
  mediaFiles: many(mediaFiles),
  interactions: many(storyInteractions),
}));

export const mediaFilesRelations = relations(mediaFiles, ({ one }) => ({
  story: one(stories, {
    fields: [mediaFiles.storyId],
    references: [stories.id],
  }),
}));

export const storyInteractionsRelations = relations(storyInteractions, ({ one }) => ({
  story: one(stories, {
    fields: [storyInteractions.storyId],
    references: [stories.id],
  }),
  user: one(users, {
    fields: [storyInteractions.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMediaFileSchema = createInsertSchema(mediaFiles).omit({
  id: true,
  uploadedAt: true,
});

export const insertStoryInteractionSchema = createInsertSchema(storyInteractions).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
export type InsertMediaFile = z.infer<typeof insertMediaFileSchema>;
export type MediaFile = typeof mediaFiles.$inferSelect;
export type InsertStoryInteraction = z.infer<typeof insertStoryInteractionSchema>;
export type StoryInteraction = typeof storyInteractions.$inferSelect;

// Extended types for API responses
export type StoryWithDetails = Story & {
  author: User;
  mediaFiles: MediaFile[];
  interactions: StoryInteraction[];
  likesCount: number;
  commentsCount: number;
  userHasLiked: boolean;
};
