import Overview from '../../pages/Overview';
import { useToast } from '@/hooks/use-toast';

export default function OverviewExample() {
  const { toast } = useToast();

  const handleNavigate = (tab: 'overview' | 'reviews') => {
    console.log('Navigate to:', tab);
  };

  const handleSubmitReview = (data: { name: string; rating: number; review: string }) => {
    console.log('Review submitted:', data);
    toast({
      title: 'Review submitted successfully!',
      description: 'Thank you for your feedback.',
    });
  };

  return <Overview onNavigate={handleNavigate} onSubmitReview={handleSubmitReview} />;
}
