import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Play,
  Pause,
  Image as ImageIcon,
  RotateCcw,
  Volume2,
  Mic,
  ChevronLeft,
  ChevronRight,
  Compass,
  Palette,
} from 'lucide-react';
import { GiftData } from '../../types';
import { ThreeGiftBox, BG_THEMES, BgThemeId } from './ThreeGiftBox';

interface GiftBoxInteractiveProps {
  gift: Partial<GiftData>;
  isOpened?: boolean;
  onOpen?: () => void;
  interactive?: boolean;
  mode?: 'preview' | 'full';
  className?: string;
}

export const GiftBoxInteractive: React.FC<GiftBoxInteractiveProps> = ({
  gift,
  isOpened = false,
  onOpen,
  interactive = true,
  mode = 'preview',
  className = '',
}) => {
  const [openedInternal, setOpenedInternal] = useState(isOpened);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeCardIdx, setActiveCardIdx] = useState(0); // 0 = Story Card with text, 1..N = Photo cards
  const [audioSeconds, setAudioSeconds] = useState(0);

  // Dynamic mood theming
  const mood = gift.mood || 'magical';
  const moodPresets = {
    magical: { box: '#6D28D9', ribbon: '#F59E0B', effect: 'sparkles' as const, theme: 'cosmic' as BgThemeId },
    romantic: { box: '#E11D48', ribbon: '#FDA4AF', effect: 'hearts' as const, theme: 'romantic-rose' as BgThemeId },
    playful: { box: '#8B5CF6', ribbon: '#EC4899', effect: 'confetti' as const, theme: 'sunset-dream' as BgThemeId },
    elegant: { box: '#27272A', ribbon: '#F59E0B', effect: 'sparkles' as const, theme: 'midnight-gold' as BgThemeId },
    festive: { box: '#DC2626', ribbon: '#15803D', effect: 'snow' as const, theme: 'festive-emerald' as BgThemeId },
  };

  const preset = moodPresets[mood] || moodPresets.magical;
  const boxColor = gift.boxColor || preset.box;
  const ribbonColor = gift.ribbonColor || preset.ribbon;
  const effect = gift.animationEffect || preset.effect;

  const [bgThemeId, setBgThemeId] = useState<BgThemeId>(preset.theme || 'cosmic');

  // Reactively sync background atmospheric theme when mood changes
  useEffect(() => {
    const activePreset = moodPresets[gift.mood || 'magical'] || moodPresets.magical;
    if (activePreset.theme) {
      setBgThemeId(activePreset.theme);
    }
  }, [gift.mood]);

  // Sync internal state when external isOpened changes
  useEffect(() => {
    setOpenedInternal(isOpened);
  }, [isOpened]);

  // Audio play timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds((prev) => {
          if (prev >= (gift.voiceNoteDuration || 24)) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, gift.voiceNoteDuration]);

  const opened = onOpen ? isOpened : openedInternal;

  const handleToggleOpen = () => {
    if (!interactive) return;
    if (onOpen) {
      onOpen();
    } else {
      setOpenedInternal(!openedInternal);
    }
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  const recipient = gift.recipientName || 'Someone Special';
  const sender = gift.senderName || 'Ahmad';
  const message =
    gift.message ||
    'Wishing you moments of pure happiness, laughter with friends, and peace in your heart.';
  const photos = gift.photos || [];
  const fontStyle = gift.fontStyle || 'editorial';

  const fontClass =
    fontStyle === 'handwritten'
      ? 'font-["Caveat",cursive] text-2xl tracking-normal leading-relaxed'
      : fontStyle === 'editorial'
      ? 'font-serif text-base sm:text-lg leading-relaxed'
      : 'font-sans text-sm sm:text-base leading-relaxed';

  const activeTheme = BG_THEMES.find((t) => t.id === bgThemeId) || BG_THEMES[0];
  const totalDeckCards = 1 + photos.length;

  const handlePrevCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIdx((prev) => (prev - 1 + totalDeckCards) % totalDeckCards);
  };

  const handleNextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardIdx((prev) => (prev + 1) % totalDeckCards);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none overflow-hidden ${
        mode === 'full' ? 'w-full max-w-2xl mx-auto py-2' : 'w-full py-2'
      } ${className}`}
    >
      {/* 1. Main 3D Three.js Interactive Stage */}
      <div className="w-full relative flex flex-col items-center">
        {/* Top Control Hints */}
        <div className="w-full flex items-center justify-between px-2 mb-1.5 text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5 font-medium">
            <Compass className="w-3.5 h-3.5 text-[#6D28D9] animate-spin" style={{ animationDuration: '8s' }} />
            <span>3D Interactive Stage</span>
          </div>

          <div className="flex items-center gap-2">
            {opened && (
              <button
                type="button"
                onClick={handleToggleOpen}
                className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Wrap Box</span>
              </button>
            )}
          </div>
        </div>

        {/* 3D Canvas Viewport with Dynamic Atmospheric Background */}
        <div
          className="w-full relative rounded-2xl overflow-hidden border border-zinc-700/30 shadow-2xl transition-all duration-700"
          style={{ background: activeTheme.cssBg }}
        >
          {/* Top Bar inside Viewport: Theme Switcher Pills */}
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 bg-black/45 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-xs">
            <Palette className="w-3 h-3 text-white/70 mr-0.5" />
            <span className="text-[10px] text-white/70 font-semibold hidden sm:inline mr-1">
              Theme:
            </span>
            {BG_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setBgThemeId(t.id)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  bgThemeId === t.id
                    ? 'bg-white text-zinc-900 shadow-md font-bold scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                title={t.name}
              >
                <span>{t.emoji}</span>
                <span className="hidden md:inline">{t.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Floating Card Deck Next/Prev Controls when Opened */}
          {opened && totalDeckCards > 1 && (
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                {activeCardIdx === 0 ? 'Card: Message' : `Card: Photo #${activeCardIdx}`}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  title="Previous Card"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextCard}
                  className="p-1 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                  title="Next Card"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 3D Three.js Engine */}
          <ThreeGiftBox
            boxColor={boxColor}
            ribbonColor={ribbonColor}
            isOpened={opened}
            onOpen={handleToggleOpen}
            interactive={interactive}
            effect={effect}
            recipientName={recipient}
            senderName={sender}
            message={message}
            photos={photos}
            voiceNoteUrl={gift.voiceNoteUrl}
            voiceNoteDuration={gift.voiceNoteDuration || 24}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={handleToggleAudio}
            activeCardIdx={activeCardIdx}
            onSelectCard={setActiveCardIdx}
            fontStyle={fontStyle}
            bgThemeId={bgThemeId}
            className={opened ? 'h-80 sm:h-96' : 'h-64 sm:h-76'}
          />

          {/* Bottom Overlay Hint */}
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center pointer-events-none z-10">
            <span className="px-3.5 py-1 bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-medium rounded-full shadow-xs border border-white/10">
              {opened
                ? 'Box removed · Cards & moving text float in 3D · Drag to orbit'
                : 'Drag to spin 3D · Tap box to unwrap'}
            </span>
          </div>
        </div>

        {/* Sealed Box Call to Action */}
        {!opened && (
          <div className="mt-3 text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Special Delivery for {recipient}
            </span>
            {interactive && (
              <button
                type="button"
                onClick={handleToggleOpen}
                className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Tap to Open Gift</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Unboxed Interactive Controller Panel (When Opened) */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35 }}
            className="w-full mt-3.5 space-y-3"
          >
            {/* Quick 3D Card Deck Selector Toolbar */}
            <div className="p-3 bg-white rounded-2xl border border-zinc-200/90 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-zinc-800">
                    3D Floating Cards ({totalDeckCards})
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    Enlarging one after another in 3D
                  </p>
                </div>
              </div>

              {/* Thumbnails / Pills to jump 3D focus */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {/* Card 0: Message Story Card with text */}
                <button
                  type="button"
                  onClick={() => setActiveCardIdx(0)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                    activeCardIdx === 0
                      ? 'bg-[#6D28D9] text-white shadow-md ring-2 ring-purple-300 scale-105'
                      : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  }`}
                >
                  <span>💌</span>
                  <span>Message Card</span>
                </button>

                {/* Cards 1..N: Photo Cards */}
                {photos.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveCardIdx(i + 1)}
                    className={`relative w-8 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeCardIdx === i + 1
                        ? 'border-[#6D28D9] scale-110 shadow-md ring-2 ring-[#6D28D9]/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={`Memory Photo #${i + 1}`}
                  >
                    <img
                      src={url}
                      alt={`Memory ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Personalized Emotional Letter Card (Always clearly visible with Recipient, Message, and Sender) */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-b from-white to-[#FAF5FF]/60 rounded-2xl border border-purple-200 shadow-sm text-center overflow-hidden">
              <div
                className="absolute top-0 inset-x-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ribbonColor}, transparent)`,
                }}
              />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>Dearest {recipient}</span>
              </div>

              <p className={`${fontClass} text-zinc-900 my-2.5 text-base sm:text-lg leading-relaxed text-balance italic`}>
                "{message}"
              </p>

              <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-center gap-1.5 text-xs text-zinc-600">
                <span>With all my love,</span>
                <span className="font-bold text-zinc-900">{sender}</span>
              </div>
            </div>

            {/* 3D Voice Player Controller */}
            {gift.voiceNoteUrl && (
              <div className="p-3.5 bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-200 rounded-2xl shadow-sm flex items-center gap-3">
                <div className="relative">
                  {isPlayingAudio && (
                    <span className="absolute inset-0 rounded-full bg-[#6D28D9]/20 animate-ping" />
                  )}
                  <button
                    type="button"
                    onClick={handleToggleAudio}
                    className="relative w-10 h-10 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shrink-0 shadow-md hover:bg-[#5B21B6] transition-transform active:scale-95 cursor-pointer z-10"
                    aria-label={isPlayingAudio ? 'Pause voice message' : 'Play voice message'}
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-800 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Voice Greeting from {sender}</span>
                    </span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      0:{audioSeconds < 10 ? `0${audioSeconds}` : audioSeconds} / 0:
                      {gift.voiceNoteDuration || 24}
                    </span>
                  </div>

                  {/* Frequency Waveform */}
                  <div className="flex items-center gap-1 mt-2 h-3">
                    {Array.from({ length: 22 }).map((_, i) => {
                      const baseHeight = Math.max(20, Math.sin(i * 0.7) * 85 + 20);
                      return (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isPlayingAudio ? 'bg-[#6D28D9]' : 'bg-purple-200'
                          }`}
                          style={{
                            height: isPlayingAudio
                              ? `${Math.max(20, (Math.sin(i * 0.6 + audioSeconds * 3) + 1) * 45 + 15)}%`
                              : `${baseHeight}%`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
