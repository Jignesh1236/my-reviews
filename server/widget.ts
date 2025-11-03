
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
  const width = 450;
  const height = 220 + (latestReviews.length * 80);

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #0d1117; }
      .card-bg { fill: #161b22; }
      .border { stroke: #30363d; stroke-width: 1.5; fill: none; }
      .title { fill: #58a6ff; font-size: 20px; font-weight: bold; font-family: 'Segoe UI', -apple-system, sans-serif; }
      .stat-label { fill: #8b949e; font-size: 13px; font-family: 'Segoe UI', -apple-system, sans-serif; }
      .stat-value { fill: #f0883e; font-size: 16px; font-weight: bold; font-family: 'Segoe UI', -apple-system, sans-serif; }
      .section-title { fill: #c9d1d9; font-size: 15px; font-weight: 600; font-family: 'Segoe UI', -apple-system, sans-serif; }
      .review-name { fill: #58a6ff; font-size: 14px; font-weight: 600; font-family: 'Segoe UI', -apple-system, sans-serif; }
      .review-text { fill: #8b949e; font-size: 12px; font-family: 'Segoe UI', -apple-system, sans-serif; line-height: 1.4; }
      .star { fill: #f0ad4e; }
      .star-empty { fill: #30363d; }
      .divider { stroke: #21262d; stroke-width: 1; }
    </style>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1117;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#161b22;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background with gradient -->
  <rect fill="url(#grad1)" width="${width}" height="${height}" rx="8"/>
  <rect class="border" width="${width}" height="${height}" rx="8"/>
  
  <!-- Header Section -->
  <text class="title" x="20" y="35">⭐ Reviews Dashboard</text>
  
  <!-- Stats Cards -->
  <rect class="card-bg" x="20" y="50" width="200" height="70" rx="6"/>
  <rect class="border" x="20" y="50" width="200" height="70" rx="6"/>
  <text class="stat-label" x="30" y="75">Total Reviews</text>
  <text class="stat-value" x="30" y="100">${totalReviews}</text>
  
  <rect class="card-bg" x="230" y="50" width="200" height="70" rx="6"/>
  <rect class="border" x="230" y="50" width="200" height="70" rx="6"/>
  <text class="stat-label" x="240" y="75">Average Rating</text>
  <text class="stat-value" x="240" y="100">${avgRating.toFixed(1)} / 5.0</text>
  ${generateStars(Math.round(avgRating), 240, 105, 14)}
  
  <!-- Divider -->
  <line class="divider" x1="20" y1="140" x2="${width - 20}" y2="140"/>
  
  <!-- Recent Reviews Section -->
  <text class="section-title" x="20" y="170">📝 Latest Reviews</text>
`;

  let yPos = 200;
  if (latestReviews.length === 0) {
    svg += `
  <text class="review-text" x="20" y="${yPos}">No reviews yet. Be the first to leave one!</text>
`;
  } else {
    latestReviews.forEach((review, index) => {
      const reviewText = review.review.length > 60 
        ? review.review.substring(0, 60) + '...' 
        : review.review;
      
      svg += `
  <!-- Review ${index + 1} Card -->
  <rect class="card-bg" x="20" y="${yPos - 10}" width="${width - 40}" height="70" rx="6"/>
  <rect class="border" x="20" y="${yPos - 10}" width="${width - 40}" height="70" rx="6"/>
  <text class="review-name" x="30" y="${yPos + 10}">${escapeXml(review.name)}</text>
  ${generateStars(review.rating, 30, yPos + 18, 12)}
  <text class="review-text" x="30" y="${yPos + 45}">${escapeXml(reviewText)}</text>
`;
      yPos += 80;
    });
  }

  svg += `
</svg>`;

  return svg;
}

function generateStars(rating: number, x: number, y: number, size: number = 16): string {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    const starX = x + (i * (size + 2));
    stars += `<text class="${i < rating ? 'star' : 'star-empty'}" x="${starX}" y="${y}" font-size="${size}">★</text>`;
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
