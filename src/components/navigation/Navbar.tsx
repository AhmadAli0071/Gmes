import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { ViewRoute } from '../../types';
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
    openCreator,
    user,
    setUser,
    setIsAuthModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Glass fogs up + gains depth once the page starts moving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the profile menu on outside click or Escape.
  useEffect(() => {
    if (!userDropdownOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setUserDropdownOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [userDropdownOpen]);

  // Exact links requested: Explore, My Gifts, How It Works, Pricing
  const navLinks: { label: string; view: ViewRoute }[] = [
    { label: 'Explore', view: 'explore' },
    { label: 'My Gifts', view: 'dashboard' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Pricing', view: 'pricing' },
  ];

  const hrefFor = (view: ViewRoute) => (view === 'home' ? '#/' : `#/${view}`);

  const handleNavClick = (view: ViewRoute) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  // Home has a dark gradient hero — at the very top the bar is fully
  // transparent so the hero runs straight through it (the navbar sits *on*
  // the hero instead of above it), then it fogs up once the page moves.
  const isHome = currentView === 'home';
  const atTop = isHome && !scrolled;

  const glassBg = atTop
    ? 'bg-transparent'
    : isHome
      ? 'bg-[#171033]/75'
      : scrolled
        ? 'bg-white/85'
        : 'bg-white/60';

  const glassBorder = atTop
    ? 'border-transparent'
    : isHome
      ? 'border-white/15'
      : 'border-zinc-900/10';

  const glassShadow = atTop
    ? 'shadow-none'
    : scrolled
      ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_26px_60px_-32px_rgba(23,16,51,0.9)]'
      : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_34px_-28px_rgba(23,16,51,0.6)]';

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Full-width glass bar: flush at the top, softly rounded at the bottom */}
      <div
        className={`w-full rounded-b-[1.75rem] border-x border-b border-t-0 backdrop-blur-xl transition-all duration-300 ${glassBg} ${glassBorder} ${glassShadow}`}
      >
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: 💎 GEMS */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-lg cursor-pointer"
            aria-label="GEMS home"
          >
            <BrandLogo size="md" light={isHome} />
          </button>
        </div>

        {/* Center: Explore | My Gifts | How It Works */}
        <nav
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${
            isHome ? 'text-white/75' : 'text-zinc-600'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={hrefFor(link.view)}
              className={`transition-colors py-1 cursor-pointer ${
                currentView === link.view
                  ? isHome
                    ? 'text-amber-300 font-semibold border-b-2 border-amber-300'
                    : 'text-[#6D28D9] font-semibold border-b-2 border-[#6D28D9]'
                  : isHome
                    ? 'hover:text-white'
                    : 'hover:text-[#18181B]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Create Gift & Profile avatar when logged in */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              setUserDropdownOpen(false);
              openCreator();
            }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer ${
              isHome
                ? 'text-[#4C1D95] bg-white hover:bg-amber-100 shadow-[0_12px_30px_-14px_rgba(255,255,255,0.9)]'
                : 'text-white bg-gradient-to-r from-[#6D28D9] to-fuchsia-500 hover:from-[#5B21B6] hover:to-fuchsia-600 shadow-[0_14px_32px_-14px_rgba(109,40,217,0.9)]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isHome ? 'text-amber-500' : 'text-amber-300'}`} />
            <span>Create Gift</span>
          </button>

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6D28D9] font-bold flex items-center justify-center text-xs border border-purple-200">
                  {user.name.charAt(0)}
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 ${isHome ? 'text-white/60' : 'text-zinc-400'}`}
                />
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
              className={`px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                isHome
                  ? 'text-white/85 hover:text-white'
                  : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openCreator();
            }}
            className={`px-3.5 py-2 text-xs font-bold rounded-full shadow-xs ${
              isHome
                ? 'text-[#4C1D95] bg-white'
                : 'text-white bg-gradient-to-r from-[#6D28D9] to-fuchsia-500'
            }`}
          >
            Create Gift
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 focus:outline-none ${
              isHome ? 'text-white/85 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden max-w-7xl mx-auto border-t px-4 pt-3 pb-5 space-y-2 ${
            isHome ? 'border-white/10' : 'border-zinc-900/8'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={hrefFor(link.view)}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === link.view
                  ? isHome
                    ? 'bg-white/10 text-amber-300 font-semibold'
                    : 'bg-purple-100/60 text-[#6D28D9] font-semibold'
                  : isHome
                    ? 'text-white/75 hover:bg-white/10'
                    : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => handleNavClick('settings')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              currentView === 'settings'
                ? isHome
                  ? 'bg-white/10 text-amber-300 font-semibold'
                  : 'bg-purple-100/60 text-[#6D28D9] font-semibold'
                : isHome
                  ? 'text-white/75 hover:bg-white/10'
                  : 'text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            Settings
          </button>
          {user && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentView === 'admin'
                  ? isHome
                    ? 'bg-white/10 text-amber-300 font-semibold'
                    : 'bg-purple-100/60 text-[#6D28D9] font-semibold'
                  : isHome
                    ? 'text-white/75 hover:bg-white/10'
                    : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              Admin Simulator
            </button>
          )}

          <div className={`pt-2 border-t ${isHome ? 'border-white/10' : 'border-zinc-200'}`}>
            {user ? (
              <div className="flex items-center justify-between py-1">
                <span
                  className={`text-xs font-medium ${
                    isHome ? 'text-white/70' : 'text-zinc-600'
                  }`}
                >
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
                className={`w-full text-center py-2 text-xs font-semibold rounded-xl border ${
                  isHome
                    ? 'text-white bg-white/10 border-white/15'
                    : 'text-zinc-800 bg-white border-zinc-200'
                }`}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </header>
  );
};
