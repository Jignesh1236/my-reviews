import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema } from "@shared/schema";
import { generateReviewWidget } from "./widget";

export function registerRoutes(app: Express): Server {
  // Get all reviews
  app.get("/api/reviews", async (_req, res) => {
    try {
      const allReviews = await storage.getReviews();
      res.json(allReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Create a new review
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const newReview = await storage.createReview(validatedData);
      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // Add widget endpoint
  app.get("/api/widget", async (req, res) => {
    try {
      const svg = await generateReviewWidget();
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "public, max-age=300"); // Cache for 5 minutes
      res.send(svg);
    } catch (error) {
      console.error("Error generating widget:", error);
      res.status(500).json({ message: "Failed to generate widget" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}