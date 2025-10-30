import ReviewForm from '../ReviewForm';
import { useToast } from '@/hooks/use-toast';

export default function ReviewFormExample() {
  const { toast } = useToast();

  const handleSubmit = (data: { name: string; rating: number; review: string }) => {
    console.log('Review submitted:', data);
    toast({
      title: 'Review submitted!',
      description: `Thank you, ${data.name}! Your ${data.rating}-star review has been received.`,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-md border border-card-border">
      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
}
