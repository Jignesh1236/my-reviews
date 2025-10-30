import { useState } from 'react';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ReviewFormProps {
  onSubmit: (data: { name: string; rating: number; review: string }) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && rating > 0 && review) {
      onSubmit({ name, rating, review });
      setName('');
      setRating(0);
      setReview('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3" data-testid="form-review">
      <div className="flex flex-wrap gap-2 items-center">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="min-w-[200px] flex-shrink-0 bg-background border-border text-sm"
          data-testid="input-name"
        />
        <div className="px-2 py-1.5 border border-border rounded-md bg-background flex items-center gap-1">
          <StarRating value={rating} onChange={setRating} size="md" />
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <Textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          className="flex-1 min-h-[60px] resize-y bg-background border-border text-sm"
          data-testid="input-review"
        />
        <Button
          type="submit"
          className="bg-success hover:bg-success/90 text-white border border-success/20 self-end"
          data-testid="button-submit"
        >
          Post
        </Button>
      </div>
    </form>
  );
}
