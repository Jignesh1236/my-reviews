import StarRating from './StarRating';
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  date: Date;
}

export default function ReviewCard({ name, rating, review, date }: ReviewCardProps) {
  return (
    <div
      className="bg-background border border-border rounded-md p-4 transition-all hover-elevate"
      data-testid={`card-review-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
        <h3 className="text-base font-semibold text-primary" data-testid="text-reviewer-name">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <StarRating value={rating} readonly size="sm" />
          <span className="text-xs font-semibold text-muted-foreground" data-testid="text-rating">
            ({rating}/5)
          </span>
        </div>
      </div>
      <p className="text-sm text-foreground leading-relaxed mb-3" data-testid="text-review-content">
        {review}
      </p>
      <p className="text-xs text-muted-foreground text-right" data-testid="text-review-date">
        {formatDistanceToNow(date, { addSuffix: true })}
      </p>
    </div>
  );
}
