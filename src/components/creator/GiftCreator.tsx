import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { GiftBoxInteractive } from '../common/GiftBoxInteractive';
import { GiftCardArt } from '../common/GiftCardArt';
import { PhotoUploader } from './PhotoUploader';
import { VoiceRecorder } from './VoiceRecorder';
import { suggestMessage, MessageTone } from '../../services/suggestMessage';
import { MOOD_THEMES, CARD_DESIGNS, MoodTheme } from '../../data/moodThemes';
import { EventSlug, GiftMood } from '../../types';
import {
  ArrowLeft,
  Sparkles,
  X,
  Gift,
  Mail,
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

const STEPS: { num: Step; label: string }[] = [
  { num: 1, label: 'Recipient' },
  { num: 2, label: 'Personalize' },
  { num: 3, label: 'Mood & Vibe' },
  { num: 4, label: 'Preview' },
];

export const GiftCreator: React.FC = () => {
  const {
    currentDraft,
    setCurrentDraft,
    saveCurrentGift,
    setCurrentView,
    showToast,
  } = useApp();

  const [step, setStep] = useState<Step>(1);

  // Message helper popover
  const [showAiWriter, setShowAiWriter] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  // Live preview unbox state
  const [previewUnboxed, setPreviewUnboxed] = useState(false);

  // Live preview mode: 3D box vs flat card artwork
  const [previewMode, setPreviewMode] = useState<'box' | 'card'>('box');

  // Step 3 = the "Pick a vibe" step → show the finished card so the whole
  // design language per mood is immediately visible.
  useEffect(() => {
    setPreviewMode(step === 3 ? 'card' : 'box');
    if (step === 3) setPreviewUnboxed(false);
  }, [step]);

  // The flat card has no box state — resealing keeps the toggle honest.
  useEffect(() => {
    if (previewMode === 'card') setPreviewUnboxed(false);
  }, [previewMode]);

  // Step 1: every occasion the platform supports (mirrors `EventSlug`).
  const occasions: { slug: EventSlug; name: string; emoji: string; desc: string }[] = [
    { slug: 'birthday', name: 'Birthday', emoji: '🎂', desc: 'Confetti & celebration' },
    { slug: 'christmas', name: 'Christmas', emoji: '🎄', desc: 'Holiday snow & warmth' },
    { slug: 'valentines', name: "Valentine's", emoji: '❤️', desc: 'Romantic heartfelt love' },
    { slug: 'halloween', name: 'Halloween', emoji: '🎃', desc: 'Playful spooky surprise' },
    { slug: 'mothers-day', name: "Mother's Day", emoji: '💐', desc: 'Gratitude for Mom' },
    { slug: 'fathers-day', name: "Father's Day", emoji: '👨', desc: 'Thanks to Dad' },
    { slug: 'anniversary', name: 'Anniversary', emoji: '🥂', desc: 'Cherished memories' },
    { slug: 'wedding', name: 'Wedding', emoji: '💍', desc: 'Toast the newlyweds' },
    { slug: 'graduation', name: 'Graduation', emoji: '🎓', desc: 'Milestones & pride' },
    { slug: 'thank-you', name: 'Thank You', emoji: '🙏', desc: 'Sincere appreciation' },
    { slug: 'congratulations', name: 'Congrats', emoji: '🎉', desc: 'Big wins & new starts' },
    { slug: 'other', name: 'Just Because', emoji: '✨', desc: 'No occasion needed' },
  ];


  // Step 3: Mood visual choices — `theme` repaints the whole screen, not just the box
  const moods: {
    id: GiftMood;
    name: string;
    emoji: string;
    desc: string;
    color: string;
    ribbon: string;
    anim: 'sparkles' | 'hearts' | 'confetti' | 'snow';
    theme: MoodTheme;
  }[] = [
    { id: 'magical', name: 'Magical', emoji: '✨', desc: 'Shimmering amethyst & gold', color: '#6D28D9', ribbon: '#F59E0B', anim: 'sparkles', theme: MOOD_THEMES.magical },
    { id: 'romantic', name: 'Romantic', emoji: '❤️', desc: 'Rose petals & floating hearts', color: '#E11D48', ribbon: '#FDA4AF', anim: 'hearts', theme: MOOD_THEMES.romantic },
    { id: 'playful', name: 'Playful', emoji: '🎉', desc: 'Bursting confetti & joy', color: '#8B5CF6', ribbon: '#EC4899', anim: 'confetti', theme: MOOD_THEMES.playful },
    { id: 'elegant', name: 'Elegant', emoji: '🤍', desc: 'Timeless velvet & champagne', color: '#27272A', ribbon: '#F59E0B', anim: 'sparkles', theme: MOOD_THEMES.elegant },
    { id: 'festive', name: 'Festive', emoji: '🎄', desc: 'Pine needles & gentle snow', color: '#DC2626', ribbon: '#15803D', anim: 'snow', theme: MOOD_THEMES.festive },
  ];

  const activeMood = moods.find((m) => m.id === (currentDraft.mood || 'magical')) || moods[0];
  const activeTheme = activeMood.theme;
  const activeCardDesign = CARD_DESIGNS[currentDraft.mood || 'magical'];

  const handleSelectOccasion = (slug: EventSlug) => {
    setCurrentDraft((prev) => ({
      ...prev,
      eventSlug: slug,
    }));
  };

  const handleSelectMood = (moodOption: typeof moods[0]) => {
    setCurrentDraft((prev) => ({
      ...prev,
      mood: moodOption.id,
      boxColor: moodOption.color,
      ribbonColor: moodOption.ribbon,
      animationEffect: moodOption.anim,
    }));
  };

  const handleApplyAiMessage = async (tone: MessageTone) => {
    if (isSuggesting) return;
    setIsSuggesting(true);
    try {
      const result = await suggestMessage({
        tone,
        recipientName: currentDraft.recipientName,
        senderName: currentDraft.senderName,
        occasion: currentDraft.eventSlug,
      });
      setCurrentDraft((prev) => ({ ...prev, message: result.text }));
      setShowAiWriter(false);
      showToast(
        result.source === 'ai'
          ? 'Wrote a fresh message just for you ✨'
          : 'No AI key configured — showing a saved example instead.',
        result.source === 'ai' ? 'success' : 'info'
      );
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleFinishCreate = () => {
    saveCurrentGift();
    setStep(1);
    setPreviewUnboxed(false);
  };

  return (
    <div
      className="min-h-screen bg-[var(--mood-page)] flex flex-col justify-between transition-colors duration-500"
      style={
        {
          '--mood-accent': activeTheme.accent,
          '--mood-accent-hover': activeTheme.accentHover,
          '--mood-accent-deep': activeTheme.accentDeep,
          '--mood-soft': activeTheme.soft,
          '--mood-soft-strong': activeTheme.softStrong,
          '--mood-ring': activeTheme.ring,
          '--mood-border': activeTheme.border,
          '--mood-strong': activeTheme.strong,
          '--mood-page': activeTheme.page,
          '--mood-glow': activeTheme.glow,
        } as React.CSSProperties
      }
    >
      {/* 1. DEDICATED CREATOR HEADER (No normal website navbar!) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--mood-border)] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* ← Back button */}
          <button
            onClick={() => {
              if (step > 1) {
                setStep((prev) => (Math.max(1, prev - 1) as Step));
              } else {
                setCurrentView('home');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{step > 1 ? 'Back' : 'Exit to GEMS'}</span>
            <span className="sm:hidden">{step > 1 ? 'Back' : 'Exit'}</span>
          </button>

          {/* ◆ GEMS Logo (wordmark hides on narrow phones so nothing overflows) */}
          <div className="flex items-center min-w-0">
            <div className="sm:hidden">
              <BrandLogo size="sm" showWordmark={false} />
            </div>
            <div className="hidden sm:flex">
              <BrandLogo size="sm" showWordmark={true} />
            </div>
          </div>

          {/* Step X of 4 */}
          <div className="text-xs font-semibold text-[var(--mood-accent)] bg-[var(--mood-soft)] px-2.5 sm:px-3 py-1 rounded-full border border-[var(--mood-border)] shrink-0 whitespace-nowrap">
            Step {step} of 4
          </div>
        </div>
      </header>

      {/* 2. CREATOR WORKSPACE */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP LEFT: Small Step Indicator */}
          <aside className="hidden lg:block lg:col-span-2 space-y-3 pt-2">
            {STEPS.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                  step === s.num
                    ? 'bg-white text-[var(--mood-accent)] shadow-2xs border border-[var(--mood-border)]'
                    : step > s.num
                    ? 'text-zinc-800 hover:text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    step === s.num
                      ? 'bg-[var(--mood-accent)] text-white'
                      : step > s.num
                      ? 'bg-zinc-200 text-zinc-800'
                      : 'bg-zinc-100 text-zinc-400'
                  }`}
                >
                  {s.num}
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </aside>

          {/* CENTER: Large Live Gift Preview (Sticky on desktop) */}
          <section className="lg:col-span-5 flex flex-col items-center">
            <div
              className="relative w-full max-w-lg rounded-[2rem] p-3.5 sm:p-4 shadow-[0_34px_70px_-28px_rgba(109,40,217,0.85)] ring-1 ring-[#ffc95c]/40 overflow-hidden lg:sticky lg:top-24"
              style={{ background: 'linear-gradient(165deg,#3b1f7a 0%,#22124f 45%,#150d33 100%)' }}
            >
              {/* Ribbon across the top — same pink/gold as the box bow */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff4f8b] via-[#ffc95c] to-[#ff4f8b]"
              />
              {/* Mood ambient glow behind the live preview */}
              <div
                aria-hidden
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60"
                style={{ background: 'var(--mood-glow)' }}
              />

              <div className="relative flex items-center justify-between gap-3 px-1 pt-2 pb-2.5 border-b border-white/10 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-bold text-white/80 uppercase tracking-wider text-[11px] truncate">
                    Live Preview
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[#ffc95c] text-[9px] font-bold uppercase tracking-[0.14em] shrink-0">
                    {activeMood.emoji} {activeMood.name}
                  </span>
                </div>

                {/* Box / Card segmented toggle */}
                <div className="flex items-center gap-0.5 p-0.5 bg-white/10 rounded-full shrink-0">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('box')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      previewMode === 'box'
                        ? 'bg-[#ff4f8b] text-white shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Gift className="w-3 h-3" />
                    Box
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('card')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      previewMode === 'card'
                        ? 'bg-[#ff4f8b] text-white shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Mail className="w-3 h-3" />
                    Card
                  </button>
                </div>
              </div>

              {previewMode === 'card' ? (
                <div className="relative pt-3.5">
                  <div className="mx-auto w-full max-w-[360px]">
                    <GiftCardArt gift={currentDraft} design={activeCardDesign} />
                  </div>
                  <p className="mt-3 text-center text-[10px] text-white/55">
                    Card artwork restyles itself with every mood you pick.
                  </p>
                </div>
              ) : (
                <GiftBoxInteractive
                  gift={currentDraft}
                  isOpened={previewUnboxed}
                  onOpen={() => setPreviewUnboxed(!previewUnboxed)}
                  interactive={true}
                  mode="preview"
                  heightClass="h-[clamp(420px,56vh,540px)]"
                />
              )}
            </div>
          </section>

          {/* RIGHT: Simple Editing Controls */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[var(--mood-border)] shadow-xs transition-colors duration-500">
            {/* STEP 1: Who are you gifting to? */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18181B] tracking-tight">
                    Who are you gifting to?
                  </h2>
                  <p className="mt-1 text-xs text-[#71717A]">
                    Enter their name and choose their special occasion.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Their name
                  </label>
                  <input
                    type="text"
                    placeholder="Sarah"
                    value={currentDraft.recipientName || ''}
                    onChange={(e) =>
                      setCurrentDraft((prev) => ({ ...prev, recipientName: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-[var(--mood-soft)] border border-[var(--mood-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mood-accent)] font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    What's the occasion?
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {occasions.map((occ) => {
                      const isSelected = (currentDraft.eventSlug || 'birthday') === occ.slug;
                      return (
                        <button
                          key={occ.slug}
                          type="button"
                          onClick={() => handleSelectOccasion(occ.slug)}
                          className={`p-3 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[var(--mood-accent)] bg-[var(--mood-soft)] ring-2 ring-[var(--mood-ring)] shadow-xs'
                              : 'border-[var(--mood-border)] hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{occ.emoji}</span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-[var(--mood-accent)] text-white flex items-center justify-center text-[10px]">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="mt-2">
                            <p className="text-xs font-bold text-zinc-900">{occ.name}</p>
                            <p className="text-[10px] text-zinc-500">{occ.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[var(--mood-accent)] hover:bg-[var(--mood-accent-hover)] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Message →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Make it personal */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18181B] tracking-tight">
                    Make it personal
                  </h2>
                  <p className="mt-1 text-xs text-[#71717A]">
                    Write from the heart. Add photos or voice notes if you like.
                  </p>
                </div>

                {/* Sender Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Ahmad"
                    value={currentDraft.senderName || ''}
                    onChange={(e) =>
                      setCurrentDraft((prev) => ({ ...prev, senderName: e.target.value }))
                    }
                    className="w-full px-4 py-2.5 bg-[var(--mood-soft)] border border-[var(--mood-border)] rounded-xl text-xs focus:ring-2 focus:ring-[var(--mood-accent)]"
                  />
                </div>

                {/* Message + Tiny AI button */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                      Your message
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAiWriter(!showAiWriter)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--mood-accent)] hover:underline cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>✨ Help me write</span>
                    </button>
                  </div>

                  {/* Message helper popover (Sweet, Funny, Romantic, Heartfelt, Short) */}
                  {showAiWriter && (
                    <div className="p-3 mb-3 bg-[var(--mood-soft)] border border-[var(--mood-border)] rounded-2xl animate-in fade-in duration-150">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[var(--mood-strong)]">
                          {isSuggesting ? 'Writing a message…' : 'Select a tone:'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAiWriter(false)}
                          className="text-zinc-400 hover:text-zinc-600"
                          aria-label="Close message helper"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['sweet', 'funny', 'romantic', 'heartfelt', 'short'] as MessageTone[]).map(
                          (tone) => (
                            <button
                              key={tone}
                              type="button"
                              disabled={isSuggesting}
                              onClick={() => handleApplyAiMessage(tone)}
                              className="px-2.5 py-1.5 text-xs font-medium bg-white text-zinc-800 border border-[var(--mood-border)] rounded-xl hover:bg-[var(--mood-soft-strong)] transition-colors capitalize text-center cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                            >
                              {tone}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <textarea
                    rows={4}
                    placeholder="Write something from the heart..."
                    value={currentDraft.message || ''}
                    onChange={(e) =>
                      setCurrentDraft((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-[var(--mood-soft)] border border-[var(--mood-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mood-accent)] resize-none"
                  />
                </div>

                {/* Optional Actions: real photo upload + real voice recording */}
                <div className="pt-2 border-t border-zinc-100 space-y-3">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Your memories
                  </span>

                  <PhotoUploader
                    photos={currentDraft.photos || []}
                    onChange={(next) =>
                      setCurrentDraft((prev) => ({ ...prev, photos: next }))
                    }
                    showToast={showToast}
                  />

                  <VoiceRecorder
                    value={currentDraft.voiceNoteUrl}
                    duration={currentDraft.voiceNoteDuration}
                    onChange={(url, seconds) =>
                      setCurrentDraft((prev) => ({
                        ...prev,
                        voiceNoteUrl: url,
                        voiceNoteDuration: seconds,
                      }))
                    }
                    showToast={showToast}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[var(--mood-accent)] hover:bg-[var(--mood-accent-hover)] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Choose Mood & Vibe →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Choose the mood */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18181B] tracking-tight">
                    Choose the mood
                  </h2>
                  <p className="mt-1 text-xs text-[#71717A]">
                    Select a vibe to transform colors, ambient lighting, and particles.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {moods.map((m) => {
                    const isSelected = (currentDraft.mood || 'magical') === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectMood(m)}
                        style={
                          isSelected
                            ? ({
                                borderColor: m.theme.accent,
                                background: m.theme.soft,
                                boxShadow: `0 0 0 3px ${m.theme.ring}`,
                              } as React.CSSProperties)
                            : undefined
                        }
                        className={`w-full p-4 text-left rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                          isSelected
                            ? 'shadow-xs'
                            : 'border-[var(--mood-border)] hover:border-zinc-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{m.emoji}</span>
                          <div>
                            <p className="text-sm font-bold text-zinc-900">{m.name}</p>
                            <p className="text-xs text-zinc-500">{m.desc}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Full palette preview: box + ribbon + effect */}
                          <span className="flex items-center gap-1 pr-2 border-r border-zinc-200">
                            <span
                              className="w-4 h-4 rounded-full border border-black/10"
                              style={{ backgroundColor: m.color }}
                              title="Gift box"
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/10"
                              style={{ backgroundColor: m.ribbon }}
                              title="Ribbon"
                            />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors">
                            {m.anim}
                          </span>
                          {isSelected && (
                            <span
                              className="w-5 h-5 rounded-full text-white flex items-center justify-center text-xs"
                              style={{ backgroundColor: m.theme.accent }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live theme readout — proves the whole palette moved with the mood */}
                <div className="p-3.5 rounded-2xl border border-[var(--mood-border)] bg-[var(--mood-soft)] transition-colors duration-500">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--mood-strong)] mb-2.5">
                    {activeMood.emoji} {activeMood.name} theme applied
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Accent', color: activeTheme.accent },
                      { label: 'Soft', color: activeTheme.soft },
                      { label: 'Border', color: activeTheme.border },
                      { label: 'Page', color: activeTheme.page },
                    ].map((sw) => (
                      <div key={sw.label} className="text-center">
                        <span
                          className="block h-8 rounded-lg border border-black/10 shadow-inner transition-colors duration-500"
                          style={{ backgroundColor: sw.color }}
                        />
                        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                          {sw.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[var(--mood-accent)] hover:bg-[var(--mood-accent-hover)] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Final Review →</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Your gift is ready */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18181B] tracking-tight">
                    Your gift is ready
                  </h2>
                  <p className="mt-1 text-xs text-[#71717A]">
                    Review the unboxing flow and generate your private link.
                  </p>
                </div>

                <div className="p-4 bg-[var(--mood-soft)] rounded-2xl border border-zinc-200 text-xs space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">To:</span>
                    <span className="font-bold text-zinc-900">
                      {currentDraft.recipientName || 'Sarah'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">From:</span>
                    <span className="font-bold text-zinc-900">
                      {currentDraft.senderName || 'Ahmad'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Occasion:</span>
                    <span className="font-semibold text-zinc-800 capitalize">
                      {currentDraft.eventSlug || 'birthday'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Mood:</span>
                    <span className="font-semibold text-zinc-800 capitalize">
                      {currentDraft.mood || 'magical'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={() => setPreviewUnboxed(true)}
                    className="w-full py-3 text-xs font-semibold text-zinc-800 bg-[var(--mood-soft)] border border-[var(--mood-border)] hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Preview Gift Unboxing
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishCreate}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[var(--mood-accent)] hover:bg-[var(--mood-accent-hover)] rounded-xl shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Create My Gift →</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* 3. MOBILE STICKY BOTTOM BAR (Under 15% viewport height) */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[var(--mood-border)] p-3 px-4">
        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => (Math.min(4, prev + 1) as Step))}
            className="w-full py-3 text-xs font-semibold text-white bg-[var(--mood-accent)] rounded-xl shadow-sm cursor-pointer"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinishCreate}
            className="w-full py-3 text-xs font-semibold text-white bg-[var(--mood-accent)] rounded-xl shadow-sm cursor-pointer"
          >
            Create My Gift →
          </button>
        )}
      </div>
    </div>
  );
};
