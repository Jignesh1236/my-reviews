import { Switch, Route, useLocation } from "wouter";
import { queryClient, fetchReviews, createReview } from "./lib/queryClient";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import Overview from "@/pages/Overview";
import Reviews from "@/pages/Reviews";
import NotFound from "@/pages/not-found";
import { REPOS } from "@/components/ReviewForm";

const VALID_REPOS = REPOS.map(r => r.name);

function Router() {
  const [location, setLocation] = useLocation();
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

  const handleSubmitReview = (data: { name: string; appName: string; rating: number; review: string }) => {
    mutation.mutate(data);
  };

  const handleRepoChange = (repo: string) => {
    if (VALID_REPOS.includes(repo)) {
      setLocation(`/repo/${repo}`);
    }
  };

  const getSelectedRepo = () => {
    if (location.startsWith('/repo/')) {
      const repo = location.replace('/repo/', '');
      if (VALID_REPOS.includes(repo)) {
        return repo;
      }
    }
    return undefined;
  };

  const isValidRepoRoute = (repoName: string) => {
    return VALID_REPOS.includes(repoName);
  };

  return (
    <Switch>
      <Route path="/">
        <Overview 
          onNavigate={handleNavigate} 
          onSubmitReview={handleSubmitReview}
          selectedRepo={getSelectedRepo()}
          onRepoChange={handleRepoChange}
        />
      </Route>
      <Route path="/repo/:repoName">
        {(params) => {
          if (!isValidRepoRoute(params.repoName)) {
            return <NotFound />;
          }
          return (
            <Overview 
              onNavigate={handleNavigate} 
              onSubmitReview={handleSubmitReview}
              selectedRepo={params.repoName}
              onRepoChange={handleRepoChange}
            />
          );
        }}
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
