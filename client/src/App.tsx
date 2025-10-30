import { Switch, Route, useLocation } from "wouter";
import { queryClient, fetchReviews, createReview } from "./lib/queryClient";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import Overview from "@/pages/Overview";
import Reviews from "@/pages/Reviews";
import NotFound from "@/pages/not-found";

function Router() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      refetch();
      toast({
        title: 'Review submitted successfully!',
        description: 'Thank you for your feedback.',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleNavigate = (tab: 'overview' | 'reviews') => {
    setLocation(tab === 'overview' ? '/' : '/reviews');
  };

  const handleSubmitReview = (data: { name: string; rating: number; review: string }) => {
    mutation.mutate(data);
  };

  return (
    <Switch>
      <Route path="/">
        <Overview onNavigate={handleNavigate} onSubmitReview={handleSubmitReview} />
      </Route>
      <Route path="/reviews">
        <Reviews reviews={reviews} onNavigate={handleNavigate} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
