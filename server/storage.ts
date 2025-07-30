import {
  users,
  stories,
  mediaFiles,
  storyInteractions,
  type User,
  type UpsertUser,
  type InsertStory,
  type Story,
  type InsertMediaFile,
  type MediaFile,
  type InsertStoryInteraction,
  type StoryInteraction,
  type StoryWithDetails,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Story operations
  createStory(story: InsertStory): Promise<Story>;
  getStoriesWithDetails(userId?: string): Promise<StoryWithDetails[]>;
  getStoryById(id: number): Promise<Story | undefined>;
  
  // Media operations
  createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile>;
  getMediaFilesByStoryId(storyId: number): Promise<MediaFile[]>;
  
  // Interaction operations
  createStoryInteraction(interaction: InsertStoryInteraction): Promise<StoryInteraction>;
  removeStoryInteraction(storyId: number, userId: string, type: string): Promise<void>;
  getStoryInteraction(storyId: number, userId: string, type: string): Promise<StoryInteraction | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createStory(story: InsertStory): Promise<Story> {
    const [newStory] = await db
      .insert(stories)
      .values(story)
      .returning();
    return newStory;
  }

  async getStoriesWithDetails(userId?: string): Promise<StoryWithDetails[]> {
    const storiesWithAuthor = await db
      .select({
        story: stories,
        author: users,
      })
      .from(stories)
      .innerJoin(users, eq(stories.authorId, users.id))
      .orderBy(desc(stories.eventDate));

    const result: StoryWithDetails[] = [];

    for (const { story, author } of storiesWithAuthor) {
      const mediaFilesList = await this.getMediaFilesByStoryId(story.id);
      
      // Get all interactions for this story
      const interactions = await db
        .select()
        .from(storyInteractions)
        .where(eq(storyInteractions.storyId, story.id));

      // Count likes and comments
      const likesCount = interactions.filter(i => i.type === 'like').length;
      const commentsCount = interactions.filter(i => i.type === 'comment').length;
      
      // Check if current user has liked this story
      const userHasLiked = userId ? 
        interactions.some(i => i.type === 'like' && i.userId === userId) : 
        false;

      result.push({
        ...story,
        author,
        mediaFiles: mediaFilesList,
        interactions,
        likesCount,
        commentsCount,
        userHasLiked,
      });
    }

    return result;
  }

  async getStoryById(id: number): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story;
  }

  async createMediaFile(mediaFile: InsertMediaFile): Promise<MediaFile> {
    const [newMediaFile] = await db
      .insert(mediaFiles)
      .values(mediaFile)
      .returning();
    return newMediaFile;
  }

  async getMediaFilesByStoryId(storyId: number): Promise<MediaFile[]> {
    return await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.storyId, storyId));
  }

  async createStoryInteraction(interaction: InsertStoryInteraction): Promise<StoryInteraction> {
    const [newInteraction] = await db
      .insert(storyInteractions)
      .values(interaction)
      .returning();
    return newInteraction;
  }

  async removeStoryInteraction(storyId: number, userId: string, type: string): Promise<void> {
    await db
      .delete(storyInteractions)
      .where(
        and(
          eq(storyInteractions.storyId, storyId),
          eq(storyInteractions.userId, userId),
          eq(storyInteractions.type, type)
        )
      );
  }

  async getStoryInteraction(storyId: number, userId: string, type: string): Promise<StoryInteraction | undefined> {
    const [interaction] = await db
      .select()
      .from(storyInteractions)
      .where(
        and(
          eq(storyInteractions.storyId, storyId),
          eq(storyInteractions.userId, userId),
          eq(storyInteractions.type, type)
        )
      );
    return interaction;
  }
}

export const storage = new DatabaseStorage();
