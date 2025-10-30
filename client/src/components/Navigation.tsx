interface NavigationProps {
  activeTab: 'overview' | 'reviews';
  onTabChange: (tab: 'overview' | 'reviews') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="flex gap-2 border-b border-border -mb-px">
      <button
        onClick={() => onTabChange('overview')}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors relative top-px ${
          activeTab === 'overview'
            ? 'text-foreground border-destructive'
            : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
        } rounded-t-md`}
        data-testid="button-nav-overview"
      >
        Overview
      </button>
      <button
        onClick={() => onTabChange('reviews')}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors relative top-px ${
          activeTab === 'reviews'
            ? 'text-foreground border-destructive'
            : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50'
        } rounded-t-md`}
        data-testid="button-nav-reviews"
      >
        Reviews
      </button>
    </nav>
  );
}
