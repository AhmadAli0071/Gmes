import React, { Suspense, lazy, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { injectContentSchema, usePageMeta } from './lib/seo';
import { Navbar } from './components/navigation/Navbar';
import { Toast } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { GiftSuccessModal } from './components/creator/GiftSuccessModal';
import { LANDING_VIEWS, LandingView } from './types';

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
const LandingPageView = lazy(() =>
  import('./components/landing/LandingPageView').then((m) => ({
    default: m.LandingPageView,
  }))
);
const BlogView = lazy(() =>
  import('./components/blog/BlogView').then((m) => ({ default: m.BlogView }))
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

const AdminGate: React.FC = () => {
  const { user, authReady, setIsAuthModalOpen } = useApp();

  if (!authReady) return <ViewFallback />;
  if (user && user.role === 'admin') return <AdminPanel />;

  return (
    <div className="max-w-md mx-auto my-20 text-center px-6">
      <h1 className="text-2xl font-extrabold text-[#18181B] tracking-tight">Admins only</h1>
      <p className="mt-2 text-sm text-[#71717A]">
        {user
          ? `Signed in as ${user.email} — this account doesn't have admin access.`
          : 'Sign in with an admin account to open the console.'}
      </p>
      {!user && (
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(true)}
          className="mt-5 px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

const MainRouter: React.FC = () => {
  const { currentView } = useApp();

  // Head tags follow the route: title, description, canonical and OG tags.
  usePageMeta(currentView);

  useEffect(() => {
    injectContentSchema({ includeFaq: currentView === 'home' });
  }, [currentView]);

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
          {currentView === 'admin' && <AdminGate />}
          {currentView === 'settings' && <SettingsView />}
          {currentView === 'blog' && <BlogView />}
          {LANDING_VIEWS.includes(currentView as LandingView) && (
            <LandingPageView slug={currentView as LandingView} />
          )}
        </Suspense>
      </main>
    </div>
  );
};

/** Toasts + the post-create share dialog live above every screen, including
 *  the dashboard "Share" action and the recipient preview. Auth lives here too
 *  so a sign-in prompt works from the creator and the recipient view, and so
 *  the form's mode/email survive open→close instead of resetting on unmount. */
const GlobalOverlays: React.FC = () => {
  const { justCreatedGift, setJustCreatedGift } = useApp();

  return (
    <>
      <Toast />
      <AuthModal />
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
