import React from 'react';
import { SiteFooter } from '../navigation/SiteFooter';

const SECTIONS: { title: string; paragraphs: string[]; bullets?: string[] }[] = [
  {
    title: '1. What we collect',
    paragraphs: [
      'GEMS is built to need as little information as possible. When you create or open a virtual gift, we handle the following:',
    ],
    bullets: [
      'Account details - your name and email address, only if you choose to create an account.',
      'Gift content - the message, recipient name, photos, voice note and design choices you put inside a gift box.',
      'Device ownership token - a random secret stored in your browser so your gifts stay yours before you sign in. They only move to your account after you confirm it - signing in never adds them automatically.',
      'Technical basics - session cookie, IP address and browser type used for security and rate limiting.',
    ],
  },
  {
    title: '2. How we use it',
    paragraphs: [
      'We use this information only to run the service: to save your drafts and gifts, show them in your My Gifts page, deliver the share link to your recipient, keep accounts secure and prevent abuse such as spam or over-use of the API.',
    ],
  },
  {
    title: '3. Who can see your gift',
    paragraphs: [
      'A gift is private to you. Only your account (or the browser that created it before you signed in) can see it in the My Gifts page.',
      'The share link you send is the only way anyone else can open the gift - anyone who has the link can view it, so treat it like a password. Gift links stay active until you delete the gift from your dashboard.',
      'We never sell your data and never show your gifts to other users.',
    ],
  },
  {
    title: '4. Photos and voice notes',
    paragraphs: [
      'Photos and voice recordings you upload are stored so the recipient can see and hear them inside the gift box. They are served from the same domain as your share link and are not listed publicly anywhere on the site.',
    ],
  },
  {
    title: '5. Cookies',
    paragraphs: [
      'We use one session cookie (gems_sid) to keep you signed in. It is HttpOnly, which means only the server can read it. Local storage on your device holds your gift drafts, your device ownership token and UI preferences. You can clear both at any time through your browser settings - note that clearing storage means gifts you created while signed out can no longer be claimed.',
    ],
  },
  {
    title: '6. Payments',
    paragraphs: [
      'GEMS is free to use. Premium features are currently free during early access. When paid plans launch, payments will be handled by a certified payment provider - we never see or store your full card number.',
    ],
  },
  {
    title: '7. Data retention and deletion',
    paragraphs: [
      'Gifts stay on your account until you delete them - deleting a gift from My Gifts permanently removes its content and disables the share link. You can also delete your account by contacting us, which removes your profile and gifts.',
    ],
  },
  {
    title: '8. Children',
    paragraphs: [
      'GEMS is not directed at children under 13, and we do not knowingly collect information from them. If you believe a child has created an account, contact us and we will remove it.',
    ],
  },
  {
    title: '9. Your rights',
    paragraphs: [
      'You can view and update your name and email any time in Settings, export or delete your data, and object to processing where applicable. To exercise any of these rights, email us at support@gemsvg.com and we will respond within one business day.',
    ],
  },
  {
    title: '10. Changes to this policy',
    paragraphs: [
      'If we change how we handle data, we will update this page and revise the date below. Continued use of GEMS after an update means you accept the revised policy.',
    ],
  },
];

export const PrivacyPolicyView: React.FC = () => (
  <>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-wider text-[#6D28D9] uppercase">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="mt-3 text-base text-[#71717A]">
          Your trust matters. Here is exactly what GEMS collects, why we collect it and the
          control you have over it.
        </p>
        <p className="mt-2 text-xs text-zinc-400">Last updated: November 2026</p>
      </div>

      <div className="mt-12 space-y-8">
        {SECTIONS.map((section) => (
          <section
            key={section.title}
            className="bg-white rounded-3xl border border-[#E4E4E7] shadow-xs p-6 sm:p-8"
          >
            <h2 className="text-base sm:text-lg font-extrabold text-[#18181B] tracking-tight">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((p) => (
                <p key={p} className="text-sm text-[#71717A] leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 pt-1">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-sm text-[#71717A] leading-relaxed flex gap-2.5"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6D28D9] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        <section className="bg-white rounded-3xl border border-[#E4E4E7] shadow-xs p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-extrabold text-[#18181B] tracking-tight">
            Questions about your data?
          </h2>
          <p className="mt-3 text-sm text-[#71717A] leading-relaxed">
            Email{' '}
            <a href="mailto:support@gemsvg.com" className="text-[#6D28D9] font-semibold hover:underline">
              support@gemsvg.com
            </a>{' '}
            or use our{' '}
            <a href="/contact-us" className="text-[#6D28D9] font-semibold hover:underline">
              contact page
            </a>{' '}
            and we will get back to you within one business day.
          </p>
        </section>
      </div>
    </div>
    <SiteFooter />
  </>
);
