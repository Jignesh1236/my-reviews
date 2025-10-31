import { QueryClient } from "@tanstack/react-query";
import type { Review, InsertReview } from "@shared/schema";

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const queryClient = new QueryClient();

export async function fetchReviews(): Promise<Review[]> {
  const response = await fetch(`${API_BASE_URL}/api/reviews`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
}

export async function createReview(review: InsertReview): Promise<Review> {
  const response = await fetch(`${API_BASE_URL}/api/reviews`, {
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