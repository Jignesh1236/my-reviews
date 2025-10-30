import ProfileHeader from '@/components/ProfileHeader';
import Navigation from '@/components/Navigation';
import ReviewCard from '@/components/ReviewCard';

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: Date | string;
}

interface ReviewsProps {
  reviews: Review[];
  onNavigate: (tab: 'overview' | 'reviews') => void;
}

export default function Reviews({ reviews, onNavigate }: ReviewsProps) {
  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-[900px] mx-auto bg-card border border-card-border rounded-md p-8">
        <ProfileHeader
          avatarUrl="https://avatars.githubusercontent.com/u/186457314?v=4"
          name="Jignesh D Maru"
          username="jignesh1236"
        />
        <div className="mt-6">
          <Navigation activeTab="reviews" onTabChange={onNavigate} />
        </div>
        <div className="mt-8">
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-background border border-border rounded-md">
              <p className="text-sm text-muted-foreground" data-testid="text-no-reviews">
                No reviews yet. Be the first to write one!
              </p>
            </div>
          ) : (
            <div className="space-y-4" data-testid="list-reviews">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  rating={review.rating}
                  review={review.review}
                  date={typeof review.date === 'string' ? new Date(review.date) : review.date}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
