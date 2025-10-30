import { useState } from 'react';
import Navigation from '../Navigation';

export default function NavigationExample() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-md border border-card-border">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">
        <p className="text-muted-foreground">
          Active tab: <span className="text-foreground font-semibold">{activeTab}</span>
        </p>
      </div>
    </div>
  );
}
