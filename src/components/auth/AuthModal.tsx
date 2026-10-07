import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { X, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setUser, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `u-${Date.now()}`,
      name: name.trim() || (email ? email.split('@')[0] : 'Ahmad Ali'),
      email: email.trim() || 'user@gems.com',
      plan: 'pro',
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome ${mode === 'signup' ? 'to GEMS' : 'back'}! 🎉`);
  };

  const handleGoogleAuth = () => {
    setUser({
      id: 'u-google',
      name: 'Ahmad Ali',
      email: 'ahmadalibusiness0071@gmail.com',
      plan: 'pro',
    });
    setIsAuthModalOpen(false);
    showToast('Signed in with Google');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <BrandLogo size="md" className="justify-center mb-3" />
          <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create Your GEMS Account'}
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            {mode === 'login'
              ? 'Sign in to access and manage your sent gifts.'
              : 'Start creating memorable unboxing moments in seconds.'}
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full py-2.5 px-4 bg-white border border-[#E4E4E7] hover:bg-zinc-50 rounded-xl text-xs font-semibold text-zinc-700 shadow-2xs flex items-center justify-center gap-2.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase">
            <span className="bg-white px-2 text-zinc-400">or with email</span>
          </div>
        </div>

        {/* Simple Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Ahmad Ali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-zinc-100 text-center text-xs text-zinc-500">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#6D28D9] font-bold hover:underline"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#6D28D9] font-bold hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
