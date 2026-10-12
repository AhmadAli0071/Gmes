import React, { Suspense, lazy, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { injectContentSchema, usePageMeta } from './lib/seo';
import { Navbar } from './components/navigation/Navbar';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { GiftSuccessModal } from './components/creator/GiftSuccessModal';

// Views
import { HomeView } from './components/home/HomeView';
import { RecipientView } from './components/recipient/RecipientView';

// Every screen after the landing page is split out so the home page — the one
// that has to rank — ships the smallest possible bundle.
const GiftCreator = lazy(() =>
  import('./components/creator/GiftCreator').then((m) => ({ default: m.GiftCreator }))
);
const ExploreView = lazy(() =>
  import('./components/explore/ExploreView').then((m) => ({ default: m.ExploreView }))
);
const HowItWorksView = lazy(() =>
  import('./components/info/HowItWorksView').then((m) => ({ default: m.HowItWorksView }))
);
const PricingView = lazy(() =>
  import('./components/pricing/PricingView').then((m) => ({ default: m.PricingView }))
);
const DashboardView = lazy(() =>
  import('./components/dashboard/DashboardView').then((m) => ({ default: m.DashboardView }))
);
const AdminPanel = lazy(() =>
  import('./components/admin/AdminPanel').then((m) => ({ default: m.AdminPanel }))
);
const SettingsView = lazy(() =>
  import('./components/settings/SettingsView').then((m) => ({ default: m.SettingsView }))
);

const ViewFallback = () => (
  <div className="min-h-[60vh] grid place-items-center" role="status">
    <div className="flex flex-col items-center gap-3">
      <span className="h-8 w-8 rounded-full border-2 border-violet-200 border-t-[#6D28D9] animate-spin" />
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
        Loading
      </span>
    </div>
  </div>
);

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  // Head tags follow the route: title, description, canonical and OG tags.
  usePageMeta(currentView);

  useEffect(() => {
    injectContentSchema();
  }, []);

  // Recipient mode: pure full-screen distraction-free unboxing, no site chrome.
  if (currentView === 'recipient') {
    return <RecipientView />;
  }

  // Creator mode: dedicated full-screen creation experience (no website navbar).
  if (currentView === 'create') {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#18181B]">
        <Suspense fallback={<ViewFallback />}>
          <GiftCreator />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#18181B]">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<ViewFallback />}>
          {currentView === 'home' && <HomeView />}
          {currentView === 'explore' && <ExploreView />}
          {currentView === 'how-it-works' && <HowItWorksView />}
          {currentView === 'pricing' && <PricingView />}
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'admin' && <AdminPanel />}
          {currentView === 'settings' && <SettingsView />}
        </Suspense>
      </main>

      <AuthModal />
    </div>
  );
};

/** Toasts + the post-create share dialog live above every screen, including
 *  the dashboard "Share" action and the recipient preview. */
const GlobalOverlays: React.FC = () => {
  const { justCreatedGift, setJustCreatedGift } = useApp();

  return (
    <>
      <Toast />
      {justCreatedGift && (
        <GiftSuccessModal
          gift={justCreatedGift}
          onClose={() => setJustCreatedGift(null)}
        />
      )}
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
      <GlobalOverlays />
    </AppProvider>
  );
}
