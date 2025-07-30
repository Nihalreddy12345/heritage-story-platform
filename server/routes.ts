import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { uploadMiddleware } from "./middleware/upload";
import { insertStorySchema, insertStoryInteractionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Story routes
  app.post('/api/stories', isAuthenticated, uploadMiddleware.array('media', 10), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const files = req.files as Express.Multer.File[];
      
      // Validate story data
      const storyData = insertStorySchema.parse({
        ...req.body,
        authorId: userId,
        eventDate: new Date(req.body.eventDate),
      });

      // Create the story
      const story = await storage.createStory(storyData);

      // Create media file records
      if (files && files.length > 0) {
        for (const file of files) {
          await storage.createMediaFile({
            storyId: story.id,
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            fileSize: file.size,
            filePath: `/uploads/${file.filename}`,
          });
        }
      }

      res.status(201).json({ 
        message: "Story created successfully",
        storyId: story.id 
      });
    } catch (error) {
      console.error("Error creating story:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to create story" });
      }
    }
  });

  app.get('/api/stories', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stories = await storage.getStoriesWithDetails(userId);
      res.json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  // Story interaction routes
  app.post('/api/stories/:id/like', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storyId = parseInt(req.params.id);

      // Check if user already liked this story
      const existingLike = await storage.getStoryInteraction(storyId, userId, 'like');
      
      if (existingLike) {
        // Unlike the story
        await storage.removeStoryInteraction(storyId, userId, 'like');
        res.json({ message: "Story unliked", liked: false });
      } else {
        // Like the story
        await storage.createStoryInteraction({
          storyId,
          userId,
          type: 'like',
        });
        res.json({ message: "Story liked", liked: true });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      res.status(500).json({ message: "Failed to toggle like" });
    }
  });

  app.post('/api/stories/:id/comment', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const storyId = parseInt(req.params.id);
      
      const commentData = insertStoryInteractionSchema.parse({
        storyId,
        userId,
        type: 'comment',
        content: req.body.content,
      });

      const comment = await storage.createStoryInteraction(commentData);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to create comment" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
