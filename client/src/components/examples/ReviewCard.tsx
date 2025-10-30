import ReviewCard from '../ReviewCard';

export default function ReviewCardExample() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-md border border-card-border space-y-4">
      <ReviewCard
        name="John Doe"
        rating={5}
        review="Excellent service! Highly recommend to everyone. The attention to detail and quality of work exceeded my expectations."
        date={new Date(Date.now() - 2 * 60 * 60 * 1000)}
      />
      <ReviewCard
        name="Sarah Smith"
        rating={4}
        review="Great experience overall. Would definitely use again. Minor improvements could be made but nothing major."
        date={new Date(Date.now() - 24 * 60 * 60 * 1000)}
      />
      <ReviewCard
        name="Mike Johnson"
        rating={3}
        review="Good, but there's room for improvement in communication and delivery time."
        date={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
      />
    </div>
  );
}
