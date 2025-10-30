import { useState } from 'react';
import StarRating from '../StarRating';

export default function StarRatingExample() {
  const [rating, setRating] = useState(3);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-md border border-card-border space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Interactive (click to rate)</p>
        <StarRating value={rating} onChange={setRating} size="lg" />
        <p className="text-sm text-foreground mt-2">Selected: {rating}/5</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Read-only</p>
        <StarRating value={4} readonly size="md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small size</p>
        <StarRating value={5} readonly size="sm" />
      </div>
    </div>
  );
}
