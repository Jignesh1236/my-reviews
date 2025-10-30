
import { z } from "zod";

export const insertReviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  rating: z.number().min(1).max(5),
  review: z.string().min(1, "Review is required"),
});

export const reviewSchema = insertReviewSchema.extend({
  _id: z.string(),
  date: z.date(),
});

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = z.infer<typeof reviewSchema>;
