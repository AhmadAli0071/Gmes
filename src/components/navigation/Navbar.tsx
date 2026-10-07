import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { ViewRoute, EventSlug } from '../../types';
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  CreditCard,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    activeEvent,
    allEvents,
    selectedEventSlug,
    setSelectedEventSlug,
    user,
    setUser,
    setIsAuthModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Exact links requested: Explore, My Gifts, How It Works
  const navLinks: { label: string; view: ViewRoute }[] = [
    { label: 'Explore', view: 'explore' },
    { label: 'My Gifts', view: 'dashboard' },
    { label: 'How It Works', view: 'how-it-works' },
  ];

  const handleNavClick = (view: ViewRoute) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E4E4E7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: 💎 GEMS */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-lg cursor-pointer"
            aria-label="GEMS home"
          >
            <BrandLogo size="md" />
          </button>
        </div>

        {/* Center: Explore | My Gifts | How It Works */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className={`hover:text-[#18181B] transition-colors py-1 cursor-pointer ${
                currentView === link.view
                  ? 'text-[#6D28D9] font-semibold border-b-2 border-[#6D28D9]'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Create Gift & Profile avatar when logged in */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('create')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] active:bg-[#4C1D95] rounded-xl shadow-xs transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Create Gift</span>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6D28D9] font-bold flex items-center justify-center text-xs border border-purple-200">
                  {user.name.charAt(0)}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E4E4E7] py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-zinc-100">
                    <p className="text-xs font-semibold text-zinc-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-zinc-500" />
                    <span>My Gifts</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('pricing')}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Pricing & Plans</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('settings')}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>Admin Simulator</span>
                  </button>
                  <div className="border-t border-zinc-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setUser(null);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('create')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#6D28D9] rounded-xl shadow-xs"
          >
            Create Gift
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4E4E7] bg-[#FAFAF9] px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === link.view
                  ? 'bg-purple-100/60 text-[#6D28D9] font-semibold'
                  : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-zinc-200">
            {user ? (
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-zinc-600 font-medium">
                  {user.name}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-xs font-semibold text-zinc-800 bg-white border border-zinc-200 rounded-xl"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
