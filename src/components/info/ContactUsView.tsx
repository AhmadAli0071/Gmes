import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../lib/api';
import { SiteFooter } from '../navigation/SiteFooter';
import { PageHero } from '../common/PageHero';
import { Mail, MessageSquare, Send, Clock, HelpCircle } from 'lucide-react';

const SUPPORT_EMAIL = 'support@gemsvg.com';

const QUICK_TOPICS = [
  {
    icon: HelpCircle,
    title: 'How GEMS works',
    body: 'Pick a design, add photos and a voice note, write your message, then share one link. No app needed for them.',
    href: '/how-it-works',
    cta: 'See how it works',
  },
  {
    icon: MessageSquare,
    title: 'Feedback & ideas',
    body: 'Found a bug or have a feature idea? Tell us what would make GEMS better for you.',
    href: '#contact-form',
    cta: 'Send feedback',
  },
  {
    icon: Clock,
    title: 'Quick replies',
    body: 'We usually reply within one business day. For account issues, include the email on your account.',
    href: '#contact-form',
    cta: 'Contact support',
  },
];

export const ContactUsView: React.FC = () => {
  const { showToast, user } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in your name, email and message.', 'error');
      return;
    }
    setSending(true);
    try {
      await api('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      showToast('Message sent! We will get back to you soon.');
      setMessage('');
    } catch (err: any) {
      showToast(err?.message || 'Could not send your message. Please email us directly.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        label="Contact Us"
        title="We Would Love to Hear From You"
        subtitle="Questions about a gift, an account issue or an idea to make GEMS better? Send us a message - we usually reply within one business day."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Direct email card */}
        <div className="mt-10 bg-white rounded-3xl border border-[#E4E4E7] shadow-xs p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Email us directly
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-lg font-extrabold text-[#6D28D9] hover:underline break-all"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Open Mail App</span>
          </a>
        </div>

        {/* Quick topics */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {QUICK_TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="bg-white rounded-3xl border border-[#E4E4E7] shadow-xs p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                <topic.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-zinc-900">{topic.title}</h3>
              <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed flex-1">{topic.body}</p>
              <a
                href={topic.href}
                className="mt-4 text-xs font-semibold text-[#6D28D9] hover:underline"
              >
                {topic.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div
          id="contact-form"
          className="mt-10 bg-white rounded-3xl border border-[#E4E4E7] shadow-xs p-6 sm:p-10 scroll-mt-24"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#18181B] tracking-tight">
                  Send a message
                </h2>
                <p className="text-xs text-[#71717A]">All fields are required.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-60 disabled:cursor-wait rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{sending ? 'Sending…' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
};
