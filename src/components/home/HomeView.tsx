import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { GiftIdeasSection } from './sections/GiftIdeasSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { PerfectForSection } from './sections/PerfectForSection';
import { TrustSection } from './sections/TrustSection';
import { PricingBannerSection } from './sections/PricingBannerSection';
import { FaqSection } from './sections/FaqSection';
import { GiftTipsSection } from './sections/GiftTipsSection';
import { FinalCtaSection } from './sections/FinalCtaSection';
import { SiteFooter } from '../navigation/SiteFooter';

export const HomeView: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
      <div className="relative z-10">
        <HeroSection />
        <HowItWorksSection />
        <GiftIdeasSection />
        <ComparisonSection />
        <PerfectForSection />
        <TrustSection />
        <PricingBannerSection />
        <FaqSection />
        <GiftTipsSection />
        <FinalCtaSection />
      </div>

      <SiteFooter />
    </div>
  );
};
