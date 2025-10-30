import ProfileHeader from '@/components/ProfileHeader';
import Navigation from '@/components/Navigation';
import ReviewForm from '@/components/ReviewForm';

interface OverviewProps {
  onNavigate: (tab: 'overview' | 'reviews') => void;
  onSubmitReview: (data: { name: string; rating: number; review: string }) => void;
}

export default function Overview({ onNavigate, onSubmitReview }: OverviewProps) {
  return (
    <div className="min-h-screen bg-background p-5">
      <div className="max-w-[900px] mx-auto bg-card border border-card-border rounded-md p-8">
        <ProfileHeader
          avatarUrl="https://avatars.githubusercontent.com/u/186457314?v=4"
          name="Jignesh D Maru"
          username="jignesh1236"
        />
        <div className="mt-6">
          <Navigation activeTab="overview" onTabChange={onNavigate} />
        </div>
        <div className="mt-8">
          <ReviewForm onSubmit={onSubmitReview} />
        </div>
      </div>
    </div>
  );
}
