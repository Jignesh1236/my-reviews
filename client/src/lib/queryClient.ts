import { QueryClient } from "@tanstack/react-query";
import type { Review, InsertReview } from "@shared/schema";

export const queryClient = new QueryClient();

export async function fetchReviews(): Promise<Review[]> {
  const response = await fetch("/api/reviews");
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
}

export async function createReview(review: InsertReview): Promise<Review> {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    throw new Error("Failed to create review");
  }
  return response.json();
}