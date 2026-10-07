import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Mic,
  Image as ImageIcon,
} from 'lucide-react';

/* =========================================================================
   1. EXPANDING 3D PHOTO DECK (ak k bad ak image bari ho k nazar ay)
   ========================================================================= */
interface ExpandingPhotoDeck3DProps {
  photos: string[];
  recipientName?: string;
  className?: string;
}

export const ExpandingPhotoDeck3D: React.FC<ExpandingPhotoDeck3DProps> = ({
  photos,
  recipientName = 'Sarah',
  className = '',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isZoomedModal, setIsZoomedModal] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Sequential automatic zoom & advancement
  useEffect(() => {
    if (!isAutoPlaying || photos.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % photos.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlaying, photos.length]);

  if (photos.length === 0) return null;

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header controls: Counter & Auto-Play indicator */}
      <div className="flex items-center justify-between mb-2 px-1 text-xs">
        <span className="font-bold text-zinc-700 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#6D28D9]" />
          <span>3D Photo Memories ({photos.length})</span>
        </span>

        <div className="flex items-center gap-2">
          {photos.length > 1 && (
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-[11px] font-semibold text-[#6D28D9] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isAutoPlaying ? 'Auto Slideshow' : 'Manual'}</span>
            </button>
          )}

          <span className="text-[11px] font-mono text-zinc-400">
            {activeIdx + 1} / {photos.length}
          </span>
        </div>
      </div>

      {/* 3D Interactive Fanned Deck Stage */}
      <div
        style={{ perspective: '1200px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-4/3 flex items-center justify-center select-none cursor-pointer"
        onClick={() => setIsZoomedModal(true)}
      >
        {/* Ambient Glow behind active photo */}
        <div className="absolute inset-4 rounded-3xl bg-purple-400/20 blur-2xl pointer-events-none" />

        {/* Previous Card (Stacked behind in 3D space with slight left angle) */}
        {photos.length > 1 && (
          <motion.div
            initial={false}
            animate={{
              scale: 0.88,
              x: -24,
              y: -8,
              rotateZ: -5,
              opacity: 0.45,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="absolute inset-3 rounded-2xl overflow-hidden bg-white/60 p-2 shadow-md border border-zinc-200 pointer-events-none"
          >
            <img
              src={photos[(activeIdx - 1 + photos.length) % photos.length]}
              alt="Previous memory"
              className="w-full h-full object-cover rounded-xl grayscale-30"
            />
          </motion.div>
        )}

        {/* Next Card (Stacked behind in 3D space with slight right angle) */}
        {photos.length > 2 && (
          <motion.div
            initial={false}
            animate={{
              scale: 0.88,
              x: 24,
              y: -8,
              rotateZ: 5,
              opacity: 0.45,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="absolute inset-3 rounded-2xl overflow-hidden bg-white/60 p-2 shadow-md border border-zinc-200 pointer-events-none"
          >
            <img
              src={photos[(activeIdx + 1) % photos.length]}
              alt="Next memory"
              className="w-full h-full object-cover rounded-xl grayscale-30"
            />
          </motion.div>
        )}

        {/* ACTIVE EXPANDED PHOTO CARD (Pops forward with 3D tilt & zoom animation) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`active-${activeIdx}`}
            initial={{ scale: 0.85, opacity: 0, y: 15, rotateY: 10 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              rotateX: tilt.y,
              rotateY: tilt.x,
            }}
            exit={{ scale: 0.9, opacity: 0, y: -15, rotateY: -10 }}
            transition={{
              scale: { type: 'spring', stiffness: 280, damping: 22 },
              rotateX: { type: 'spring', stiffness: 350, damping: 25 },
              rotateY: { type: 'spring', stiffness: 350, damping: 25 },
              duration: 0.45,
            }}
            className="relative w-full h-full rounded-2xl bg-white p-2.5 sm:p-3 border-2 border-white shadow-2xl overflow-hidden z-20 group"
          >
            {/* The Image Itself with subtle zoom animation */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full rounded-xl overflow-hidden relative bg-zinc-100"
            >
              <img
                src={photos[activeIdx]}
                alt={`Cherished memory ${activeIdx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />

              {/* Bottom Sentiment Badge */}
              <div className="absolute bottom-2.5 left-2.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
                <span>Memory #{activeIdx + 1} for {recipientName}</span>
              </div>

              {/* Tap to Enlarge Hint */}
              <div className="absolute top-2.5 right-2.5 p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Left / Right 3D Stepper Arrows */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-zinc-800 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-zinc-800 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row below with expanding active glow */}
      {photos.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {photos.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveIdx(idx);
              }}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                idx === activeIdx
                  ? 'w-12 h-12 ring-2 ring-[#6D28D9] scale-105 shadow-md -translate-y-0.5'
                  : 'w-8 h-8 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={p} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen High-Resolution 3D Zoom Modal */}
      <AnimatePresence>
        {isZoomedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomedModal(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-3 shadow-2xl border border-white/20 cursor-default"
            >
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-zinc-950">
                <img
                  src={photos[activeIdx]}
                  alt="Expanded memory"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-3 px-2 flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                  <span>Memory #{activeIdx + 1} of {photos.length}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsZoomedModal(false)}
                  className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================================
   2. 3D FLOATING MESSAGE CARD (Hover 3D tilt & gentle organic levitation)
   ========================================================================= */
interface MessageCard3DProps {
  message: string;
  recipientName: string;
  senderName: string;
  fontClass: string;
  ribbonColor?: string;
  className?: string;
}

export const MessageCard3D: React.FC<MessageCard3DProps> = ({
  message,
  recipientName,
  senderName,
  fontClass,
  ribbonColor = '#F59E0B',
  className = '',
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full cursor-pointer select-none ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotateX: tilt.y,
          rotateY: tilt.x,
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { type: 'spring', stiffness: 300, damping: 25 },
          rotateY: { type: 'spring', stiffness: 300, damping: 25 },
        }}
        className="relative p-6 sm:p-7 bg-gradient-to-b from-white via-white to-purple-50/30 rounded-3xl border border-purple-200/90 shadow-xl overflow-hidden text-center"
      >
        {/* Golden top ribbon highlight */}
        <div
          className="absolute top-0 inset-x-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${ribbonColor}, transparent)`,
          }}
        />

        {/* Ambient Corner Sparkle */}
        <div className="absolute top-3 right-3 text-amber-300 opacity-60">
          ✨
        </div>

        {/* Dearest Recipient Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-[11px] font-bold uppercase tracking-wider mb-2.5">
          <Heart className="w-3 h-3 text-[#6D28D9] fill-[#6D28D9]" />
          <span>Dearest {recipientName}</span>
        </div>

        {/* The Personal Note */}
        <p className={`${fontClass} text-zinc-800 my-3 leading-relaxed`}>
          "{message}"
        </p>

        {/* Sender Signature Seal */}
        <div className="mt-5 pt-3.5 border-t border-zinc-200/70 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
          <span>With all my love,</span>
          <span className="font-extrabold text-zinc-900">{senderName}</span>
        </div>
      </motion.div>
    </div>
  );
};

/* =========================================================================
   3. 3D FLOATING VOICE GREETING (3D Levitation + Equalizer Audio Waveform)
   ========================================================================= */
interface VoiceCard3DProps {
  senderName: string;
  voiceNoteUrl?: string;
  duration?: number;
  className?: string;
}

export const VoiceCard3D: React.FC<VoiceCard3DProps> = ({
  senderName,
  voiceNoteUrl,
  duration = 24,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  if (!voiceNoteUrl) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full cursor-pointer select-none ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotateX: tilt.y,
          rotateY: tilt.x,
        }}
        transition={{
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          rotateX: { type: 'spring', stiffness: 300, damping: 25 },
          rotateY: { type: 'spring', stiffness: 300, damping: 25 },
        }}
        className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-200/90 rounded-3xl shadow-lg flex items-center gap-4"
      >
        {/* Play Button with Pulsing Acoustic 3D Rings */}
        <div className="relative">
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#6D28D9]/25 animate-ping" />
              <span className="absolute -inset-1.5 rounded-full bg-purple-400/20 animate-pulse" />
            </>
          )}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative w-12 h-12 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shrink-0 shadow-md hover:bg-[#5B21B6] transition-transform active:scale-95 cursor-pointer z-10"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
        </div>

        {/* Audio Waveform Equalizer */}
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-zinc-900 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Voice Note from {senderName}</span>
            </span>
            <span className="text-zinc-500 font-mono text-[11px]">
              0:{seconds < 10 ? `0${seconds}` : seconds} / 0:{duration}
            </span>
          </div>

          {/* Dancing Audio Equalizer Spectrum Bars */}
          <div className="flex items-center gap-1 mt-2.5 h-4">
            {Array.from({ length: 26 }).map((_, i) => {
              const baseHeight = Math.max(20, Math.sin(i * 0.7) * 85 + 20);
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPlaying ? 'bg-[#6D28D9]' : 'bg-purple-200'
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.max(20, (Math.sin(i * 0.6 + seconds * 3.5) + 1) * 45 + 15)}%`
                      : `${baseHeight}%`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
