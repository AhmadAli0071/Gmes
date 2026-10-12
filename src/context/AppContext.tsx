import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  EventSlug,
  EventTheme,
  GiftData,
  GiftTemplate,
  User,
  ViewRoute,
} from '../types';
import { EVENTS, getCurrentSeasonalEvent } from '../data/events';
import { INITIAL_GIFTS } from '../data/mockGifts';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentView: ViewRoute;
  setCurrentView: (view: ViewRoute, giftCode?: string) => void;
  openCreator: (preset?: Partial<GiftData>) => void;
  startNewGift: (preset?: Partial<GiftData>) => void;
  applyTemplate: (template: GiftTemplate) => void;
  // Events
  allEvents: EventTheme[];
  selectedEventSlug: EventSlug;
  setSelectedEventSlug: (slug: EventSlug) => void;
  activeEvent: EventTheme;
  updateEventTheme: (updated: EventTheme) => void;
  // User Auth
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  // Gifts
  gifts: GiftData[];
  currentDraft: Partial<GiftData>;
  setCurrentDraft: React.Dispatch<React.SetStateAction<Partial<GiftData>>>;
  saveCurrentGift: () => GiftData;
  deleteGift: (id: string) => void;
  duplicateGift: (id: string) => void;
  editGift: (id: string) => void;
  // Recipient Mode
  recipientGift: GiftData | null;
  openRecipientView: (gift: GiftData, options?: { countView?: boolean }) => void;
  closeRecipientView: () => void;
  // Created Success Modal
  justCreatedGift: GiftData | null;
  setJustCreatedGift: (gift: GiftData | null) => void;
  // Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/* Hash routing — URL is the source of truth, so back/forward, refresh and     */
/* shared `#/g/{shareCode}` links all resolve to the right screen.             */
/* -------------------------------------------------------------------------- */

const ROUTES: ViewRoute[] = [
  'home',
  'create',
  'explore',
  'how-it-works',
  'pricing',
  'dashboard',
  'admin',
  'settings',
];

function hashToRoute(hash: string): { view: ViewRoute; giftCode?: string } {
  const raw = hash.replace(/^#/, '').replace(/^\//, '');
  if (!raw) return { view: 'home' };
  if (raw.startsWith('g/')) {
    const code = decodeURIComponent(raw.slice(2)).trim();
    return code ? { view: 'recipient', giftCode: code } : { view: 'home' };
  }
  const match = ROUTES.find((route) => route === raw);
  return { view: match || 'home' };
}

function routeToHash(view: ViewRoute, giftCode?: string): string {
  if (view === 'recipient') {
    return giftCode ? `#/g/${encodeURIComponent(giftCode)}` : '#/';
  }
  if (view === 'home') return '#/';
  return `#/${view}`;
}

/* -------------------------------------------------------------------------- */
/* Persistence                                                                 */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'gems_gifts';
const EVENTS_STORAGE_KEY = 'gems_events';
const SEASON_STORAGE_KEY = 'gems_season';

function readStoredGifts(): GiftData[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_GIFTS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : INITIAL_GIFTS;
  } catch {
    return INITIAL_GIFTS;
  }
}

/** Drop media from every gift so the records themselves still survive a quota error. */
function stripMedia(gifts: GiftData[], keepOnePhoto: boolean): GiftData[] {
  return gifts.map((g) => ({
    ...g,
    photos: keepOnePhoto ? (g.photos || []).slice(0, 1) : [],
    voiceNoteUrl: undefined,
    voiceNoteDuration: undefined,
  }));
}

type PersistResult = 'full' | 'media-dropped' | 'metadata-only' | 'failed';

function persistGifts(gifts: GiftData[]): PersistResult {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
    return 'full';
  } catch {
    /* quota exceeded — try a smaller payload */
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stripMedia(gifts, true)));
    return 'media-dropped';
  } catch {
    /* still too big */
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stripMedia(gifts, false)));
    return 'metadata-only';
  } catch {
    return 'failed';
  }
}

/**
 * Admin console edits are merged back onto the built-in catalogue by id, so
 * events added by a later build still appear even if older edits are stored.
 */
function readStoredEvents(): EventTheme[] {
  try {
    const saved = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!saved) return EVENTS;
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return EVENTS;
    const edits = new Map<string, Partial<EventTheme>>();
    for (const entry of parsed) {
      if (entry && typeof entry === 'object' && typeof entry.id === 'string') {
        edits.set(entry.id, entry as Partial<EventTheme>);
      }
    }
    return EVENTS.map((event) => ({ ...event, ...(edits.get(event.id) || {}) }));
  } catch {
    return EVENTS;
  }
}

function readStoredSeason(fallback: EventSlug): EventSlug {
  try {
    const saved = localStorage.getItem(SEASON_STORAGE_KEY);
    if (saved && EVENTS.some((e) => e.slug === saved)) return saved as EventSlug;
  } catch {
    /* ignore */
  }
  return fallback;
}

function makeDraft(user: User | null, eventSlug: EventSlug): Partial<GiftData> {
  return {
    recipientName: 'Sarah Jenkins',
    senderName: user ? user.name : 'Ahmad',
    message:
      'Sarah, you make every ordinary day feel like an adventure! Wishing you the happiest celebration filled with love, laughter, and sweet moments. So grateful for you! ✨',
    templateId: 'tpl-confetti-pastel',
    eventSlug,
    mood: 'magical',
    fontStyle: 'editorial',
    musicTrack: 'ambient',
    animationEffect: getCurrentSeasonalEvent().defaultAnimation,
    photos: [],
    boxColor: '#6D28D9',
    ribbonColor: '#F59E0B',
    viewsCount: 0,
    status: 'published',
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialRoute] = useState(() => hashToRoute(window.location.hash));
  const initialSeason = getCurrentSeasonalEvent();

  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'error' = 'success') => {
      const id = Math.random().toString();
      setToast({ id, message, type });
      setTimeout(() => {
        setToast((prev) => (prev?.id === id ? null : prev));
      }, 3500);
    },
    []
  );

  const [allEvents, setAllEvents] = useState<EventTheme[]>(readStoredEvents);
  const [selectedEventSlug, setSelectedEventSlugState] = useState<EventSlug>(() =>
    readStoredSeason(initialSeason.slug)
  );

  const setSelectedEventSlug = (slug: EventSlug) => {
    setSelectedEventSlugState(slug);
    try {
      localStorage.setItem(SEASON_STORAGE_KEY, slug);
    } catch {
      /* season pick is a preference — a quota error is not worth a toast */
    }
  };

  const activeEvent = allEvents.find((e) => e.slug === selectedEventSlug) || initialSeason;

  // Mock User
  const [user, setUser] = useState<User | null>({
    id: 'u-1',
    name: 'Ahmad Ali',
    email: 'ahmad@gems.com',
    plan: 'pro',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // User's Gifts list
  const [gifts, setGifts] = useState<GiftData[]>(readStoredGifts);

  const [currentView, setCurrentViewState] = useState<ViewRoute>(initialRoute.view);
  const [recipientGift, setRecipientGift] = useState<GiftData | null>(() => {
    if (initialRoute.view !== 'recipient' || !initialRoute.giftCode) return null;
    return gifts.find((g) => g.shareCode === initialRoute.giftCode) || null;
  });

  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;
  const recipientGiftRef = useRef(recipientGift);
  recipientGiftRef.current = recipientGift;

  const viewBeforeRecipient = useRef<ViewRoute>('home');
  const persistNotice = useRef<PersistResult | null>(null);

  // Current draft in Gift Creator
  const [currentDraft, setCurrentDraft] = useState<Partial<GiftData>>(() =>
    makeDraft(user, initialSeason.slug)
  );

  // Recently created gift for success screen
  const [justCreatedGift, setJustCreatedGift] = useState<GiftData | null>(null);

  /* --------------------------------- persist -------------------------------- */

  useEffect(() => {
    const result = persistGifts(gifts);
    if (result === persistNotice.current) return;
    persistNotice.current = result === 'full' ? null : result;
    if (result === 'media-dropped' || result === 'metadata-only') {
      showToast(
        'Storage is full — some photos/voice notes could not be saved and will be lost after a refresh.',
        'info'
      );
    } else if (result === 'failed') {
      showToast('Storage is full — gifts are kept for this session only.', 'info');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gifts]);

  /* ------------------------------- navigation ------------------------------ */

  const writeHash = useCallback((view: ViewRoute, giftCode?: string) => {
    const target = routeToHash(view, giftCode);
    if (window.location.hash !== target) window.location.hash = target;
  }, []);

  const setCurrentView = useCallback(
    (view: ViewRoute, giftCode?: string) => {
      if (view !== 'recipient' && currentViewRef.current === 'recipient') {
        viewBeforeRecipient.current = 'home';
      }
      if (view !== 'recipient') setRecipientGift(null);
      setCurrentViewState(view);
      writeHash(view, giftCode);
    },
    [writeHash]
  );

  // Reflect external hash changes: back/forward buttons, pasted links, reloads.
  useEffect(() => {
    const onHashChange = () => {
      const { view, giftCode } = hashToRoute(window.location.hash);

      if (view === 'recipient') {
        const found = giftCode ? gifts.find((g) => g.shareCode === giftCode) : null;
        if (!found) {
          // Unknown / stale code — land on home instead of a blank screen.
          setRecipientGift(null);
          setCurrentViewState('home');
          return;
        }
        const arriving = currentViewRef.current !== 'recipient';
        if (arriving) {
          viewBeforeRecipient.current = currentViewRef.current;
          setGifts((prev) =>
            prev.map((g) => (g.id === found.id ? { ...g, viewsCount: g.viewsCount + 1 } : g))
          );
        }
        setRecipientGift(found);
        setCurrentViewState('recipient');
        return;
      }

      const alreadyThere =
        currentViewRef.current === view && recipientGiftRef.current === null;
      setRecipientGift(null);
      setCurrentViewState((prev) => (prev === view ? prev : view));
      if (!alreadyThere && currentViewRef.current === 'recipient') {
        viewBeforeRecipient.current = 'home';
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [gifts]);

  // Every new screen starts at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentView]);

  /* --------------------------------- events -------------------------------- */

  const updateEventTheme = (updated: EventTheme) => {
    const next = allEvents.map((e) => (e.id === updated.id ? updated : e));
    setAllEvents(next);
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(next));
      showToast(`Updated event settings for ${updated.name}`);
    } catch {
      showToast('Changes applied, but could not be saved (storage is full).', 'error');
    }
  };

  /* --------------------------------- gifts --------------------------------- */

  const saveCurrentGift = (): GiftData => {
    const newId = currentDraft.id || `gift-${Date.now()}`;
    const code = currentDraft.shareCode || `gems-${Math.random().toString(36).substring(2, 7)}`;
    const fullGift: GiftData = {
      id: newId,
      shareCode: code,
      recipientName: currentDraft.recipientName?.trim() || 'Someone Special',
      senderName: currentDraft.senderName?.trim() || (user ? user.name : 'A Friend'),
      message:
        currentDraft.message?.trim() ||
        'Wishing you endless joy, laughter, and sweet moments today and always!',
      templateId: currentDraft.templateId || 'tpl-nordic-wonder',
      eventSlug: currentDraft.eventSlug || selectedEventSlug,
      mood: currentDraft.mood || 'magical',
      fontStyle: currentDraft.fontStyle || 'editorial',
      musicTrack: currentDraft.musicTrack || 'ambient',
      animationEffect: currentDraft.animationEffect || 'sparkles',
      photos: currentDraft.photos || [],
      voiceNoteUrl: currentDraft.voiceNoteUrl,
      voiceNoteDuration: currentDraft.voiceNoteDuration,
      videoUrl: currentDraft.videoUrl,
      boxColor: currentDraft.boxColor || '#6D28D9',
      ribbonColor: currentDraft.ribbonColor || '#F59E0B',
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: currentDraft.viewsCount || 0,
      status: 'published',
    };

    setGifts((prev) => {
      const exists = prev.some((g) => g.id === fullGift.id);
      if (exists) {
        return prev.map((g) => (g.id === fullGift.id ? fullGift : g));
      }
      return [fullGift, ...prev];
    });

    // Detach so the next "Create" builds a brand-new gift instead of
    // silently overwriting the one we just saved.
    setCurrentDraft((prev) => ({
      ...prev,
      id: undefined,
      shareCode: undefined,
      viewsCount: 0,
      createdAt: undefined,
    }));

    setJustCreatedGift(fullGift);
    showToast('Your GEMS is ready! 🎉');
    return fullGift;
  };

  const startNewGift = (preset?: Partial<GiftData>) => {
    setCurrentDraft({ ...makeDraft(user, selectedEventSlug), ...preset });
    setJustCreatedGift(null);
    setCurrentView('create');
  };

  /**
   * Enter the creator keeping any work in progress, but always detached from a
   * saved gift so the next save cannot overwrite something the user edited.
   */
  const openCreator = (preset?: Partial<GiftData>) => {
    setCurrentDraft((prev) => ({
      ...prev,
      id: undefined,
      shareCode: undefined,
      viewsCount: 0,
      createdAt: undefined,
      ...preset,
    }));
    setJustCreatedGift(null);
    setCurrentView('create');
  };

  const applyTemplate = (template: GiftTemplate) => {
    // Merge — never clobber what the user already typed or uploaded — and
    // detach so applying a design can't overwrite a previously saved gift.
    setCurrentDraft((prev) => ({
      ...prev,
      id: undefined,
      shareCode: undefined,
      viewsCount: 0,
      createdAt: undefined,
      templateId: template.id,
      eventSlug: template.eventSlug,
      mood: template.mood,
      fontStyle: template.fontStyle,
      musicTrack: template.musicTrack,
      animationEffect: template.animationEffect,
      boxColor: template.boxColor,
      ribbonColor: template.ribbonColor,
    }));
    setSelectedEventSlug(template.eventSlug);
    setJustCreatedGift(null);
    setCurrentView('create');
  };

  const deleteGift = (id: string) => {
    setGifts((prev) => prev.filter((g) => g.id !== id));
    showToast('Gift deleted');
  };

  const duplicateGift = (id: string) => {
    const target = gifts.find((g) => g.id === id);
    if (!target) return;
    const duplicated: GiftData = {
      ...target,
      id: `gift-${Date.now()}`,
      shareCode: `gems-${Math.random().toString(36).substring(2, 7)}`,
      recipientName: `${target.recipientName} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 0,
    };
    setGifts((prev) => [duplicated, ...prev]);
    showToast('Gift duplicated successfully');
  };

  const editGift = (id: string) => {
    const target = gifts.find((g) => g.id === id);
    if (!target) return;
    setCurrentDraft(target);
    setJustCreatedGift(null);
    setCurrentView('create');
  };

  /* ----------------------------- recipient mode ---------------------------- */

  const openRecipientView = useCallback(
    (gift: GiftData, options?: { countView?: boolean }) => {
      const countView = options?.countView ?? true;
      if (currentViewRef.current !== 'recipient') {
        viewBeforeRecipient.current = currentViewRef.current;
      }
      if (countView) {
        setGifts((prev) =>
          prev.map((g) => (g.id === gift.id ? { ...g, viewsCount: g.viewsCount + 1 } : g))
        );
      }
      setRecipientGift({
        ...gift,
        viewsCount: countView ? gift.viewsCount + 1 : gift.viewsCount,
      });
      setCurrentViewState('recipient');
      writeHash('recipient', gift.shareCode);
    },
    [writeHash]
  );

  const closeRecipientView = useCallback(() => {
    setRecipientGift(null);
    const back = viewBeforeRecipient.current || 'home';
    viewBeforeRecipient.current = 'home';
    setCurrentViewState(back);
    writeHash(back);
  }, [writeHash]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        openCreator,
        startNewGift,
        applyTemplate,
        allEvents,
        selectedEventSlug,
        setSelectedEventSlug,
        activeEvent,
        updateEventTheme,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        gifts,
        currentDraft,
        setCurrentDraft,
        saveCurrentGift,
        deleteGift,
        duplicateGift,
        editGift,
        recipientGift,
        openRecipientView,
        closeRecipientView,
        justCreatedGift,
        setJustCreatedGift,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
