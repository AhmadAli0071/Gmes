import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { GiftData } from '../../types';
import { getEventBySlug } from '../../data/events';
import { ThreeGiftBox, BG_THEMES, BgThemeId } from '../common/ThreeGiftBox';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
  Heart,
  Image as ImageIcon,
  Mic,
  Palette,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface RecipientViewProps {
  gift?: GiftData | null;
}

export const RecipientView: React.FC<RecipientViewProps> = ({ gift: propGift }) => {
  const { recipientGift, closeRecipientView, setCurrentView } = useApp();

  const gift = propGift || recipientGift;

  const [opened, setOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioSeconds, setAudioSeconds] = useState(0);

  const defaultThemeId: BgThemeId =
    gift?.mood === 'romantic'
      ? 'romantic-rose'
      : gift?.mood === 'elegant'
      ? 'midnight-gold'
      : gift?.mood === 'festive'
      ? 'festive-emerald'
      : gift?.mood === 'playful'
      ? 'sunset-dream'
      : 'cosmic';

  const [bgThemeId, setBgThemeId] = useState<BgThemeId>(defaultThemeId);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  // 3D Tilt for photo card
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds((prev) => (prev >= (gift?.voiceNoteDuration || 24) ? 0 : prev + 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, gift?.voiceNoteDuration]);

  if (!gift) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center p-6 text-center">
        <Sparkles className="w-10 h-10 text-[#6D28D9] mb-3" />
        <h2 className="text-xl font-bold text-zinc-900">No gift found</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-4 py-2 bg-[#6D28D9] text-white text-xs font-semibold rounded-xl cursor-pointer"
        >
          Go to GEMS
        </button>
      </div>
    );
  }

  const eventTheme = getEventBySlug(gift.eventSlug || 'birthday');
  const effect = gift.animationEffect || 'confetti';

  const recipientName = gift.recipientName || 'Sarah';
  const senderName = gift.senderName || 'Ahmad';
  const message =
    gift.message ||
    'Wishing you endless moments of happiness, laughter with friends, and peace in your heart.';
  const photos = gift.photos || [];
  const totalDeckCards = 1 + photos.length;
  const activeTheme = BG_THEMES.find((t) => t.id === bgThemeId) || BG_THEMES[0];

  const handleOpen = () => {
    setOpened(true);
  };

  const handleReplay = () => {
    setOpened(false);
    setIsPlayingAudio(false);
    setActiveCardIdx(0);
    setAudioSeconds(0);
  };

  const handleCreateOwn = () => {
    closeRecipientView();
    setCurrentView('create');
  };

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setPhotoTilt({ x, y });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex flex-col justify-between selection:bg-purple-200 transition-all duration-700"
      style={{
        background: activeTheme.cssBg,
        color: activeTheme.isDark ? '#F4F4F5' : '#18181B',
      }}
    >
      {/* Top Floating Mini-Bar with Theme Switcher */}
      <header className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <button
          onClick={closeRecipientView}
          className="p-2 text-white/70 hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close gift preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dynamic Theme Switcher Pills */}
        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/15 text-xs">
          <Palette className="w-3.5 h-3.5 text-white/70 mr-0.5" />
          <span className="text-[10px] text-white/70 font-semibold hidden sm:inline mr-1">
            Theme:
          </span>
          {BG_THEMES.map((t) => (
            <button
              key={t.id}
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

        <div className="flex items-center gap-2">
          {opened && (
            <button
              onClick={handleReplay}
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-2xs transition-colors cursor-pointer"
              title="Replay gift unboxing"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 text-white/80 hover:text-white rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-2xs transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-purple-200" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/50" />
            )}
          </button>
        </div>
      </header>

      {/* Particle Explosions when opened */}
      <AnimatePresence>
        {opened && (
          <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {effect === 'snow' &&
              Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`snw-${i}`}
                  initial={{ opacity: 0, y: -20, x: Math.random() * window.innerWidth }}
                  animate={{
                    opacity: [0, 1, 0.7, 0],
                    y: [0, window.innerHeight],
                    x: `+=${Math.random() * 60 - 30}`,
                  }}
                  transition={{
                    duration: 4.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  className="absolute top-0 w-2 h-2 rounded-full bg-white shadow-xs"
                />
              ))}

            {effect === 'hearts' &&
              Array.from({ length: 22 }).map((_, i) => (
                <motion.div
                  key={`hrt-${i}`}
                  initial={{
                    opacity: 0,
                    scale: 0.4,
                    y: window.innerHeight * 0.7,
                    x: Math.random() * window.innerWidth,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.3, 0.7],
                    y: -80,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                  }}
                  className="absolute text-rose-400 text-xl"
                >
                  ❤️
                </motion.div>
              ))}

            {effect === 'confetti' &&
              Array.from({ length: 36 }).map((_, i) => {
                const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#DC2626'];
                return (
                  <motion.div
                    key={`cnf-${i}`}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      y: window.innerHeight * 0.45,
                      x: window.innerWidth * 0.5,
                    }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1.2, 0.7],
                      y: (Math.random() - 0.5) * window.innerHeight * 0.9,
                      x: (Math.random() - 0.5) * window.innerWidth * 0.95,
                      rotate: Math.random() * 720,
                    }}
                    transition={{
                      duration: 2.2 + Math.random() * 1.5,
                      repeat: Infinity,
                      delay: Math.random() * 0.6,
                    }}
                    style={{ backgroundColor: colors[i % colors.length] }}
                    className="absolute w-3 h-3 rounded-xs shadow-xs"
                  />
                );
              })}

            {effect === 'sparkles' &&
              Array.from({ length: 26 }).map((_, i) => (
                <motion.div
                  key={`spk-${i}`}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.3, 1.4, 0.2],
                    y: Math.random() * window.innerHeight,
                    x: Math.random() * window.innerWidth,
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 1.5,
                  }}
                  className="absolute text-amber-300 text-xl"
                >
                  ✨
                </motion.div>
              ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Experience Body (Full-screen, mobile-first present) */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-md mx-auto w-full z-30">
        {!opened ? (
          /* UNOPENED STATE (The cinematic invitation) */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center flex flex-col items-center my-auto"
          >
            <p className="text-xs sm:text-sm font-medium text-zinc-500 tracking-wide mb-2">
              Someone special made this for you...
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
              {recipientName}
            </h1>

            {/* Floating 3D Three.js Present Box */}
            <div className="w-full relative my-2 flex items-center justify-center">
              <ThreeGiftBox
                boxColor={gift.boxColor}
                ribbonColor={gift.ribbonColor}
                isOpened={opened}
                onOpen={handleOpen}
                interactive={true}
                effect={effect}
                recipientName={recipientName}
                senderName={senderName}
                message={message}
                photos={photos}
                voiceNoteUrl={gift.voiceNoteUrl}
                voiceNoteDuration={gift.voiceNoteDuration}
                isPlayingAudio={isPlayingAudio}
                onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
                activeCardIdx={activeCardIdx}
                onSelectCard={(idx) => setActiveCardIdx(idx)}
                fontStyle={gift.fontStyle}
                bgThemeId={bgThemeId}
                className="h-72 sm:h-84"
              />
            </div>

            <div className="flex flex-col items-center gap-2 mt-2">
              <button
                onClick={handleOpen}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#6D28D9] hover:bg-[#5B21B6] active:bg-[#4C1D95] text-white text-base font-bold rounded-2xl shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>🎁 Open Your Gift</span>
              </button>
              <span className="text-xs text-zinc-400">
                Drag to spin in 3D · Tap to unwrap
              </span>
            </div>
          </motion.div>
        ) : (
          /* OPENED STATE (Emotional story keepsake with 3D open present & animated cards) */
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 relative text-center my-auto space-y-4"
          >
            {/* Occasion Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-[#6D28D9] rounded-full text-xs font-semibold">
              <span>{eventTheme.emoji}</span>
              <span>{eventTheme.name} Surprise</span>
            </div>

            {/* 3D Card Deck Quick Navigation */}
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>3D Floating Cards ({totalDeckCards})</span>
              </span>

              {totalDeckCards > 1 && (
                <div className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                  <span>
                    {activeCardIdx === 0 ? '💌 Message Card' : `📸 Photo #${activeCardIdx}`}
                  </span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <button
                      onClick={() =>
                        setActiveCardIdx((prev) => (prev - 1 + totalDeckCards) % totalDeckCards)
                      }
                      className="p-1 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                      title="Previous Card"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveCardIdx((prev) => (prev + 1) % totalDeckCards)
                      }
                      className="p-1 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                      title="Next Card"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3D Opened Present Viewport (Box vanishes, cards float) */}
            <div
              className="w-full relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-zinc-700/20 shadow-inner my-1 flex items-center justify-center transition-all duration-700"
              style={{ background: activeTheme.cssBg }}
            >
              <ThreeGiftBox
                boxColor={gift.boxColor}
                ribbonColor={gift.ribbonColor}
                isOpened={true}
                interactive={true}
                effect={effect}
                recipientName={recipientName}
                senderName={senderName}
                message={message}
                photos={photos}
                voiceNoteUrl={gift.voiceNoteUrl}
                voiceNoteDuration={gift.voiceNoteDuration}
                isPlayingAudio={isPlayingAudio}
                onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
                activeCardIdx={activeCardIdx}
                onSelectCard={setActiveCardIdx}
                fontStyle={gift.fontStyle}
                bgThemeId={bgThemeId}
                className="h-80 sm:h-96"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {recipientName}
            </h2>

            {/* Personalized Emotional Message Card with Shimmering Border */}
            <div className="p-6 bg-gradient-to-b from-[#FAFAF9] to-purple-50/20 rounded-2xl border border-purple-100 shadow-inner text-center">
              <p className="font-serif text-base sm:text-lg text-zinc-800 leading-relaxed italic">
                "{message}"
              </p>
              <div className="mt-4 pt-3 border-t border-zinc-200/60 text-xs text-zinc-500">
                <span>With love, </span>
                <span className="font-bold text-zinc-900">{senderName}</span>
              </div>
            </div>

            {/* 3D Photos Deck with Parallax Tilt */}
            {photos.length > 0 && (
              <div className="my-4">
                <div
                  onMouseMove={handlePhotoMouseMove}
                  onMouseLeave={handlePhotoMouseLeave}
                  style={{ perspective: '1000px' }}
                  className="w-full cursor-pointer"
                >
                  <motion.div
                    animate={{
                      rotateX: photoTilt.y,
                      rotateY: photoTilt.x,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative rounded-2xl overflow-hidden aspect-4/3 bg-white p-2.5 border border-zinc-200 shadow-lg"
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden relative bg-zinc-100">
                      <img
                        src={photos[activeCardIdx > 0 ? activeCardIdx - 1 : 0]}
                        alt={`Photo memory ${activeCardIdx > 0 ? activeCardIdx : 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-medium flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                        <span>Memory #{activeCardIdx > 0 ? activeCardIdx : 1}</span>
                      </div>
                    </div>

                    {photos.length > 1 && (
                      <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                        {photos.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCardIdx(idx + 1);
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              activeCardIdx === idx + 1 ? 'bg-white w-6 shadow' : 'bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            )}

            {/* Voice Message Player with Dancing Waveform Frequency */}
            {gift.voiceNoteUrl && (
              <div className="p-4 bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-200 rounded-2xl shadow-xs flex items-center gap-3.5 text-left">
                <div className="relative">
                  {isPlayingAudio && (
                    <span className="absolute inset-0 rounded-full bg-[#6D28D9]/20 animate-ping" />
                  )}
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="relative w-11 h-11 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-[#5B21B6] transition-transform active:scale-95 cursor-pointer z-10"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Voice Note from {senderName}</span>
                    </span>
                    <span className="text-zinc-500 font-mono text-[11px]">
                      0:{audioSeconds < 10 ? `0${audioSeconds}` : audioSeconds} / 0:
                      {gift.voiceNoteDuration || 24}
                    </span>
                  </div>

                  {/* Dancing Waveform Frequency Bars */}
                  <div className="flex items-center gap-1 mt-2 h-3.5">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const baseHeight = Math.max(20, Math.sin(i * 0.7) * 80 + 20);
                      return (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-150 ${
                            isPlayingAudio ? 'bg-[#6D28D9]' : 'bg-purple-300'
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

            {/* Final Greeting */}
            <div className="pt-4 border-t border-zinc-100">
              <p className="text-base font-bold text-zinc-900">
                Happy {eventTheme.name}, {recipientName} ❤️
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Made with love by {senderName}.
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Recipient Experience Viral Growth Footer (The Loop) */}
      <footer className="w-full py-5 px-4 text-center z-40 bg-white/80 backdrop-blur-md border-t border-zinc-200/70">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="text-left">
            <span className="font-bold text-zinc-900 block">Make someone smile today</span>
            <span className="text-[11px] text-zinc-500">Send an interactive digital gift in 60s.</span>
          </div>

          <button
            onClick={handleCreateOwn}
            className="px-4 py-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Create your own GEMS →
          </button>
        </div>
      </footer>
    </div>
  );
};
