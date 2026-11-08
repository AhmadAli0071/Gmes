import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Bell, CreditCard } from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile & Security', icon: User },
  { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
] as const;

type SettingsTab = (typeof TABS)[number]['id'];

export const SettingsView: React.FC = () => {
  const { user, updateProfile, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [unboxingAlerts, setUnboxingAlerts] = useState(true);

  const userId = user?.id;
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    // Re-sync only when the signed-in account changes, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Sign in first to update your profile.', 'error');
      return;
    }
    if (!name.trim()) {
      showToast('Name is required.', 'error');
      return;
    }
    const nextEmail = email.trim();
    if (!nextEmail) {
      showToast('Email is required.', 'error');
      return;
    }
    setSaving(true);
    try {
      const patch: { name: string; email?: string } = { name: name.trim() };
      if (nextEmail.toLowerCase() !== user.email.toLowerCase()) patch.email = nextEmail;
      await updateProfile(patch);
      showToast('Profile updated successfully');
    } catch {
      /* the context surfaced the server error */
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="pb-6 border-b border-[#E4E4E7]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
          Account Settings
        </h1>
        <p className="mt-1 text-xs text-[#71717A]">
          Manage your personal details, subscription tier, and delivery alerts.
        </p>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-8 items-start">
        {/* Settings Tab Sidebar (Anti-pill: functional button tabs) */}
        <div
          role="tablist"
          aria-label="Settings sections"
          className="w-full md:w-52 flex md:flex-col gap-1 p-1 bg-zinc-200/50 rounded-2xl shrink-0"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              aria-controls={`settings-panel-${id}`}
              id={`settings-tab-${id}`}
              onClick={() => setActiveTab(id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === id ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Icon className="w-4 h-4 text-[#6D28D9]" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div
          role="tabpanel"
          id={`settings-panel-${activeTab}`}
          aria-labelledby={`settings-tab-${activeTab}`}
          className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E4E7] shadow-xs w-full"
        >
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h2 className="text-base font-bold text-zinc-900">Personal Information</h2>
              <div>
                <label
                  htmlFor="settings-name"
                  className="block text-xs font-semibold text-zinc-700 uppercase mb-1"
                >
                  Full Name
                </label>
                <input
                  id="settings-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:ring-2 focus:ring-[#6D28D9]"
                />
              </div>

              <div>
                <label
                  htmlFor="settings-email"
                  className="block text-xs font-semibold text-zinc-700 uppercase mb-1"
                >
                  Email Address
                </label>
                <input
                  id="settings-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:ring-2 focus:ring-[#6D28D9]"
                />
                <p className="mt-1 text-[11px] text-zinc-400">
                  Used to sign in and recover your account.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-60 rounded-xl shadow-xs transition-colors"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-zinc-900">Active Membership</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Premium and Pro features are free for everyone right now during early access.
                </p>
              </div>

              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6D28D9] tracking-wider">
                    Current Plan
                  </span>
                  <h3 className="text-lg font-extrabold text-zinc-900 mt-0.5">
                    {user?.plan === 'pro'
                      ? 'GEMS Pro'
                      : user?.plan === 'premium'
                        ? 'Premium'
                        : 'Free Plan'}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {user?.plan === 'free'
                      ? 'Basic gifting is free forever - and Premium templates are unlocked during early access.'
                      : 'Full access to every premium template and unboxing effect.'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-zinc-900">$0</span>
                  <span className="text-xs text-zinc-500">/ now</span>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-4 flex items-center justify-between text-xs text-zinc-600">
                <span>You will not be charged during early access.</span>
                <a
                  href="/pricing"
                  className="text-[#6D28D9] font-semibold hover:underline"
                >
                  View plans
                </a>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-zinc-900">Notification Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 bg-[#FAFAF9] border border-zinc-200 rounded-xl cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-zinc-900 block">
                      Recipient Unboxing Alerts
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Receive an instant ping the moment your recipient opens their GEMS.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={unboxingAlerts}
                    onChange={(e) => setUnboxingAlerts(e.target.checked)}
                    className="accent-[#6D28D9] w-4 h-4 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-[#FAFAF9] border border-zinc-200 rounded-xl cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-zinc-900 block">
                      Seasonal Holiday Reminders
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Get reminded 2 weeks before major events like Christmas & Valentine's.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={(e) => setEmailNotifs(e.target.checked)}
                    className="accent-[#6D28D9] w-4 h-4 rounded"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
