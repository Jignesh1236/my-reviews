import { type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const db = drizzle({
  connection: process.env.DATABASE_URL,
  schema,
  ws: ws,
});

export interface IStorage {
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private reviews: Map<string, Review>;

  constructor() {
    this.reviews = new Map();
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      date: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();