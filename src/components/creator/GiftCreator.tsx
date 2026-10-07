import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { GiftBoxInteractive } from '../common/GiftBoxInteractive';
import { GiftSuccessModal } from './GiftSuccessModal';
import { AI_MESSAGE_TEMPLATES, SAMPLE_PHOTO_PRESETS } from '../../data/mockGifts';
import { EventSlug, GiftMood } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Mic,
  Video,
  X,
  RotateCcw,
  Check,
  Plus,
} from 'lucide-react';

export const GiftCreator: React.FC = () => {
  const {
    currentDraft,
    setCurrentDraft,
    saveCurrentGift,
    justCreatedGift,
    setJustCreatedGift,
    setCurrentView,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // AI writer popover & optional toggles
  const [showAiWriter, setShowAiWriter] = useState(false);
  const [showPhotos, setShowPhotos] = useState(
    Boolean(currentDraft.photos && currentDraft.photos.length > 0)
  );
  const [showVoice, setShowVoice] = useState(Boolean(currentDraft.voiceNoteUrl));
  const [showVideo, setShowVideo] = useState(Boolean(currentDraft.videoUrl));

  // Live preview unbox state
  const [previewUnboxed, setPreviewUnboxed] = useState(false);

  // Step 1: Occasions Visual Cards
  const occasions: { slug: EventSlug; name: string; emoji: string; desc: string }[] = [
    { slug: 'christmas', name: 'Christmas', emoji: '🎄', desc: 'Holiday snow & warmth' },
    { slug: 'birthday', name: 'Birthday', emoji: '🎂', desc: 'Confetti & celebration' },
    { slug: 'valentines', name: "Valentine's", emoji: '❤️', desc: 'Romantic heartfelt love' },
    { slug: 'halloween', name: 'Halloween', emoji: '🎃', desc: 'Playful spooky surprise' },
    { slug: 'anniversary', name: 'Anniversary', emoji: '💍', desc: 'Cherished memories together' },
    { slug: 'graduation', name: 'Graduation', emoji: '🎓', desc: 'Milestones & congratulations' },
    { slug: 'other', name: 'Other / Just Because', emoji: '✨', desc: 'Spontaneous loving gesture' },
  ];

  // Step 3: Mood visual choices
  const moods: {
    id: GiftMood;
    name: string;
    emoji: string;
    desc: string;
    color: string;
    ribbon: string;
    anim: 'sparkles' | 'hearts' | 'confetti' | 'snow';
  }[] = [
    { id: 'magical', name: 'Magical', emoji: '✨', desc: 'Shimmering amethyst & gold', color: '#6D28D9', ribbon: '#F59E0B', anim: 'sparkles' },
    { id: 'romantic', name: 'Romantic', emoji: '❤️', desc: 'Rose petals & floating hearts', color: '#E11D48', ribbon: '#FDA4AF', anim: 'hearts' },
    { id: 'playful', name: 'Playful', emoji: '🎉', desc: 'Bursting confetti & joy', color: '#8B5CF6', ribbon: '#EC4899', anim: 'confetti' },
    { id: 'elegant', name: 'Elegant', emoji: '🤍', desc: 'Timeless velvet & champagne', color: '#27272A', ribbon: '#F59E0B', anim: 'sparkles' },
    { id: 'festive', name: 'Festive', emoji: '🎄', desc: 'Pine needles & gentle snow', color: '#DC2626', ribbon: '#15803D', anim: 'snow' },
  ];

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

  const handleApplyAiMessage = (tone: keyof typeof AI_MESSAGE_TEMPLATES) => {
    const options = AI_MESSAGE_TEMPLATES[tone];
    const chosen = options[Math.floor(Math.random() * options.length)];
    setCurrentDraft((prev) => ({
      ...prev,
      message: chosen,
    }));
    setShowAiWriter(false);
    showToast(`Generated ${tone} message! ✨`);
  };

  const handleTogglePhoto = (url: string) => {
    setCurrentDraft((prev) => {
      const list = prev.photos || [];
      if (list.includes(url)) {
        return { ...prev, photos: list.filter((p) => p !== url) };
      }
      if (list.length >= 4) {
        showToast('Maximum 4 photos reached', 'info');
        return prev;
      }
      return { ...prev, photos: [...list, url] };
    });
  };

  const handleToggleVoice = () => {
    if (currentDraft.voiceNoteUrl) {
      setCurrentDraft((prev) => ({ ...prev, voiceNoteUrl: undefined }));
      showToast('Removed voice note');
    } else {
      setCurrentDraft((prev) => ({
        ...prev,
        voiceNoteUrl: 'mock-voice.mp3',
        voiceNoteDuration: 24,
      }));
      showToast('Added voice note audio');
    }
  };

  const handleFinishCreate = () => {
    saveCurrentGift();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-between">
      {/* 1. DEDICATED CREATOR HEADER (No normal website navbar!) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* ← Back button */}
          <button
            onClick={() => {
              if (step > 1) {
                setStep((prev) => (prev - 1) as any);
              } else {
                setCurrentView('home');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step > 1 ? 'Back' : 'Exit to GEMS'}</span>
          </button>

          {/* 💎 GEMS Logo */}
          <div className="flex items-center">
            <BrandLogo size="sm" showWordmark={true} />
          </div>

          {/* Step X of 4 */}
          <div className="text-xs font-semibold text-[#6D28D9] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            Step {step} of 4
          </div>
        </div>
      </header>

      {/* 2. CREATOR WORKSPACE */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP LEFT: Small Step Indicator */}
          <aside className="hidden lg:block lg:col-span-2 space-y-3 pt-2">
            {[
              { num: 1, label: 'Recipient' },
              { num: 2, label: 'Personalize' },
              { num: 3, label: 'Mood & Vibe' },
              { num: 4, label: 'Preview' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num as any)}
                className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                  step === s.num
                    ? 'bg-white text-[#6D28D9] shadow-2xs border border-purple-100'
                    : step > s.num
                    ? 'text-zinc-800 hover:text-zinc-950'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    step === s.num
                      ? 'bg-[#6D28D9] text-white'
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
            <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-zinc-200 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-zinc-700 uppercase tracking-wider text-[11px]">
                    Live Unboxing Preview
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] font-mono text-[9px] font-bold">
                    3D WEBGL
                  </span>
                </div>
                <button
                  onClick={() => setPreviewUnboxed(!previewUnboxed)}
                  className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{previewUnboxed ? 'Reset Box' : 'Unwrap Box'}</span>
                </button>
              </div>

              <GiftBoxInteractive
                gift={currentDraft}
                isOpened={previewUnboxed}
                onOpen={() => setPreviewUnboxed(!previewUnboxed)}
                interactive={true}
                mode="preview"
              />

              <div className="mt-2 text-center flex flex-col items-center gap-0.5">
                <p className="text-[11px] font-medium text-zinc-500">
                  Tap the box to test how it opens for them.
                </p>
                <p className="text-[10px] text-zinc-400">
                  Drag to rotate in 3D · Photos, voice & message move in 3D space
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT: Simple Editing Controls */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
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
                    className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] font-medium"
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
                              ? 'border-[#6D28D9] bg-purple-50/70 ring-2 ring-[#6D28D9]/20 shadow-xs'
                              : 'border-[#E4E4E7] hover:border-zinc-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl">{occ.emoji}</span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-[10px]">
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
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
                    className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-xs focus:ring-2 focus:ring-[#6D28D9]"
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
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#6D28D9] hover:underline cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>✨ Help me write</span>
                    </button>
                  </div>

                  {/* AI Writing Helper Popover (Sweet, Funny, Romantic, Heartfelt, Short) */}
                  {showAiWriter && (
                    <div className="p-3 mb-3 bg-purple-50/90 border border-purple-200 rounded-2xl animate-in fade-in">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-purple-900">
                          Select inspiration tone:
                        </span>
                        <button
                          onClick={() => setShowAiWriter(false)}
                          className="text-zinc-400 hover:text-zinc-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['sweet', 'funny', 'romantic', 'heartfelt', 'short'] as const).map(
                          (tone) => (
                            <button
                              key={tone}
                              type="button"
                              onClick={() => handleApplyAiMessage(tone)}
                              className="px-2.5 py-1.5 text-xs font-medium bg-white text-zinc-800 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors capitalize text-center cursor-pointer"
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
                    className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E4E4E7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] resize-none"
                  />
                </div>

                {/* Optional Actions: Add Photos, Add Voice, Add Video */}
                <div className="pt-2 border-t border-zinc-100 space-y-3">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Optional Additions
                  </span>

                  {/* Photos */}
                  <div className="border border-zinc-200 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                        <ImageIcon className="w-4 h-4 text-[#6D28D9]" />
                        <span>Add Photos ({currentDraft.photos?.length || 0}/4)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPhotos(!showPhotos)}
                        className="text-xs text-[#6D28D9] font-semibold hover:underline cursor-pointer"
                      >
                        {showPhotos ? 'Hide' : 'Select'}
                      </button>
                    </div>

                    {showPhotos && (
                      <div className="mt-3 pt-3 border-t border-zinc-100">
                        <p className="text-[11px] text-zinc-500 mb-2">Tap photos to attach to unboxing:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {SAMPLE_PHOTO_PRESETS.map((p) => {
                            const isAttached = currentDraft.photos?.includes(p.url);
                            return (
                              <div
                                key={p.id}
                                onClick={() => handleTogglePhoto(p.url)}
                                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                  isAttached
                                    ? 'border-[#6D28D9] ring-2 ring-purple-200'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={p.url}
                                  alt={p.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                                {isAttached && (
                                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-[10px]">
                                    ✓
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Voice */}
                  <div className="border border-zinc-200 rounded-xl p-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                      <Mic className="w-4 h-4 text-[#6D28D9]" />
                      <span>Voice Greeting {currentDraft.voiceNoteUrl ? '(Attached 0:24)' : ''}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleVoice}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-purple-200 bg-purple-50 text-[#6D28D9] hover:bg-purple-100 cursor-pointer"
                    >
                      {currentDraft.voiceNoteUrl ? 'Remove' : '+ Add Voice'}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
                        className={`w-full p-4 text-left rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-[#6D28D9] bg-purple-50/70 ring-2 ring-[#6D28D9]/20 shadow-xs'
                            : 'border-[#E4E4E7] hover:border-zinc-300'
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
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: m.color }}
                          />
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
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

                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-xs space-y-2.5">
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
                    className="w-full py-3 text-xs font-semibold text-zinc-800 bg-[#FAFAF9] border border-[#E4E4E7] hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Preview Gift Unboxing
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishCreate}
                    className="w-full py-3.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-md transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
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
      <div className="lg:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E4E7] p-3 px-4">
        {step < 4 ? (
          <button
            onClick={() => setStep((prev) => (prev + 1) as any)}
            className="w-full py-3 text-xs font-semibold text-white bg-[#6D28D9] rounded-xl shadow-sm cursor-pointer"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleFinishCreate}
            className="w-full py-3 text-xs font-semibold text-white bg-[#6D28D9] rounded-xl shadow-sm cursor-pointer"
          >
            Create My Gift →
          </button>
        )}
      </div>

      {/* Success Modal */}
      {justCreatedGift && (
        <GiftSuccessModal
          gift={justCreatedGift}
          onClose={() => setJustCreatedGift(null)}
        />
      )}
    </div>
  );
};
