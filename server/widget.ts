
import { storage } from './storage';

export async function generateReviewWidget(): Promise<string> {
  // Get all reviews
  const allReviews = await storage.getReviews();
  
  // Calculate statistics
  const totalReviews = allReviews.length;
  const avgRating = totalReviews > 0 
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
    : 0;

  // Get latest 3 reviews
  const latestReviews = allReviews.slice(0, 3);

  // Generate SVG
  const width = 400;
  const height = 200 + (latestReviews.length * 60);

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #0d1117; }
      .border { stroke: #30363d; stroke-width: 1; fill: none; }
      .title { fill: #c9d1d9; font-size: 18px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .stat { fill: #8b949e; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .review-name { fill: #c9d1d9; font-size: 13px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .review-text { fill: #8b949e; font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .star { fill: #f0ad4e; }
      .star-empty { fill: #30363d; }
    </style>
  </defs>
  
  <!-- Background -->
  <rect class="bg" width="${width}" height="${height}" rx="6"/>
  <rect class="border" width="${width}" height="${height}" rx="6"/>
  
  <!-- Title -->
  <text class="title" x="20" y="35">⭐ My Reviews</text>
  
  <!-- Stats -->
  <text class="stat" x="20" y="65">
    <tspan font-weight="600" fill="#c9d1d9">${totalReviews}</tspan> reviews
  </text>
  <text class="stat" x="150" y="65">
    <tspan font-weight="600" fill="#c9d1d9">${avgRating.toFixed(1)}</tspan> average rating
  </text>
  
  <!-- Stars for average rating -->
  ${generateStars(Math.round(avgRating), 20, 80)}
  
  <!-- Recent Reviews -->
  <text class="stat" x="20" y="120" font-weight="600">Recent Reviews:</text>
`;

  let yPos = 150;
  latestReviews.forEach((review, index) => {
    const reviewText = review.review.length > 50 
      ? review.review.substring(0, 50) + '...' 
      : review.review;
    
    svg += `
  <!-- Review ${index + 1} -->
  <text class="review-name" x="20" y="${yPos}">${escapeXml(review.name)}</text>
  ${generateStars(review.rating, 20, yPos + 10)}
  <text class="review-text" x="20" y="${yPos + 35}">${escapeXml(reviewText)}</text>
`;
    yPos += 60;
  });

  svg += `
</svg>`;

  return svg;
}

function generateStars(rating: number, x: number, y: number): string {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    const starX = x + (i * 18);
    stars += `<text class="${i < rating ? 'star' : 'star-empty'}" x="${starX}" y="${y}" font-size="16">★</text>`;
  }
  return stars;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
