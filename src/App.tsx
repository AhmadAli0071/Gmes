import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { HomeView } from './components/home/HomeView';
import { GiftCreator } from './components/creator/GiftCreator';
import { ExploreView } from './components/explore/ExploreView';
import { HowItWorksView } from './components/info/HowItWorksView';
import { PricingView } from './components/pricing/PricingView';
import { DashboardView } from './components/dashboard/DashboardView';
import { RecipientView } from './components/recipient/RecipientView';
import { AdminPanel } from './components/admin/AdminPanel';
import { SettingsView } from './components/settings/SettingsView';

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  // If in recipient mode, show pure full-screen distraction-free unboxing without standard navigation
  if (currentView === 'recipient') {
    return <RecipientView />;
  }

  // If in creator mode, show dedicated full-screen creation experience (no website navbar)
  if (currentView === 'create') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#18181B]">
        <GiftCreator />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#18181B]">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'how-it-works' && <HowItWorksView />}
        {currentView === 'pricing' && <PricingView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'admin' && <AdminPanel />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      {/* Global Modals & Notifications */}
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
