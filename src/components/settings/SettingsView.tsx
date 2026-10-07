import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Bell, CreditCard, Shield, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { user, setUser, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications'>('profile');
  const [name, setName] = useState(user?.name || 'Ahmad Ali');
  const [email, setEmail] = useState(user?.email || 'ahmad@gems.com');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [unboxingAlerts, setUnboxingAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, name, email });
    }
    showToast('Profile updated successfully');
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
        <div className="w-full md:w-52 flex md:flex-col gap-1 p-1 bg-zinc-200/50 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeTab === 'profile'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <User className="w-4 h-4 text-[#6D28D9]" />
            <span>Profile & Security</span>
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeTab === 'billing'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#6D28D9]" />
            <span>Subscription & Billing</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
              activeTab === 'notifications'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Bell className="w-4 h-4 text-[#6D28D9]" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E4E7] shadow-xs w-full">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h2 className="text-base font-bold text-zinc-900">Personal Information</h2>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:ring-2 focus:ring-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:ring-2 focus:ring-[#6D28D9]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-zinc-900">Active Membership</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Manage plan and invoice details.</p>
              </div>

              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6D28D9] tracking-wider">
                    Current Plan
                  </span>
                  <h3 className="text-lg font-extrabold text-zinc-900 mt-0.5">GEMS Pro Member</h3>
                  <p className="text-xs text-zinc-500 mt-1">Unlimited premium gifting & AI writer enabled.</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono text-zinc-900">$12</span>
                  <span className="text-xs text-zinc-500">/mo</span>
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-4 flex items-center justify-between text-xs text-zinc-600">
                <span>Next billing date: November 1, 2026</span>
                <button
                  type="button"
                  onClick={() => showToast('Invoices sent to email')}
                  className="text-[#6D28D9] font-semibold hover:underline"
                >
                  Download Invoices
                </button>
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
