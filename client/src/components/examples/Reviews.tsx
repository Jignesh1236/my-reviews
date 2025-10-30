import Reviews from '../../pages/Reviews';

export default function ReviewsExample() {
  const handleNavigate = (tab: 'overview' | 'reviews') => {
    console.log('Navigate to:', tab);
  };

  const mockReviews = [
    {
      id: '1',
      name: 'Alice Johnson',
      rating: 5,
      review: 'Outstanding work! The project was delivered on time and exceeded all expectations. Would highly recommend!',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'Bob Williams',
      rating: 4,
      review: 'Great experience working together. Professional and responsive throughout the entire process.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: 'Carol Martinez',
      rating: 5,
      review: 'Absolutely fantastic! The attention to detail and quality of work is unmatched.',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      name: 'David Chen',
      rating: 3,
      review: 'Good work overall. Some minor issues with communication but the final result was satisfactory.',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  ];

  return <Reviews reviews={mockReviews} onNavigate={handleNavigate} />;
}
