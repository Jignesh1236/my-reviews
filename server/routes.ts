
import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./storage";
import { reviews, insertReviewSchema } from "@shared/schema";
import { desc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get all reviews
  app.get("/api/reviews", async (_req, res) => {
    try {
      const allReviews = await db.select().from(reviews).orderBy(desc(reviews.date));
      res.json(allReviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Create a new review
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const [newReview] = await db.insert(reviews).values(validatedData).returning();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
