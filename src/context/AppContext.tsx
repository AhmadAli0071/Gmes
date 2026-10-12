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
import { ApiError, isAuthError } from '../lib/api';
import {
  createGift,
  deleteGift as deleteGiftApi,
  getGiftByCode,
  listGifts,
  recordGiftView,
  updateGift,
  type GiftPayload,
} from '../services/gifts';
import {
  fetchMe,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  updateMe,
} from '../services/auth';

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
  // User Auth (real sessions, backed by the API)
  user: User | null;
  authReady: boolean;
  setUser: (user: User | null) => void;
  signIn: (mode: 'login' | 'signup', input: { name?: string; email: string; password: string }) => Promise<User>;
  signOut: () => Promise<void>;
  updateProfile: (patch: { name?: string; avatarUrl?: string | null }) => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  // Gifts (API-backed)
  gifts: GiftData[];
  giftsLoaded: boolean;
  refreshGifts: () => Promise<void>;
  currentDraft: Partial<GiftData>;
  setCurrentDraft: React.Dispatch<React.SetStateAction<Partial<GiftData>>>;
  saveCurrentGift: () => Promise<GiftData>;
  deleteGift: (id: string) => Promise<void>;
  duplicateGift: (id: string) => Promise<void>;
  editGift: (id: string) => void;
  // Recipient Mode
  recipientGift: GiftData | null;
  recipientLoading: boolean;
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
/* Preferences (small, device-local). Gift data itself lives on the server.    */
/* -------------------------------------------------------------------------- */

const EVENTS_STORAGE_KEY = 'gems_events';
const SEASON_STORAGE_KEY = 'gems_season';

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

function buildPayload(draft: Partial<GiftData>): GiftPayload {
  return {
    recipientName: draft.recipientName?.trim() || 'Someone Special',
    senderName: draft.senderName?.trim() || 'A Friend',
    message:
      draft.message?.trim() ||
      'Wishing you endless joy, laughter, and sweet moments today and always!',
    templateId: draft.templateId || 'tpl-nordic-wonder',
    eventSlug: draft.eventSlug || 'other',
    mood: draft.mood || 'magical',
    fontStyle: draft.fontStyle || 'editorial',
    musicTrack: draft.musicTrack || 'ambient',
    animationEffect: draft.animationEffect || 'sparkles',
    photos: draft.photos || [],
    voiceNoteUrl: draft.voiceNoteUrl || null,
    voiceNoteDuration: draft.voiceNoteDuration || 0,
    videoUrl: draft.videoUrl || null,
    boxColor: draft.boxColor || '#6D28D9',
    ribbonColor: draft.ribbonColor || '#F59E0B',
    status: draft.status === 'draft' ? 'draft' : 'published',
  };
}

const errorMessage = (err: unknown, fallback: string): string =>
  err instanceof ApiError ? err.message : fallback;

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

  /* ---------------------------------- auth --------------------------------- */

  const [user, setUserState] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await fetchMe();
        if (alive) setUserState(me);
      } catch {
        if (alive) setUserState(null);
      } finally {
        if (alive) setAuthReady(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* --------------------------------- gifts --------------------------------- */

  const [gifts, setGifts] = useState<GiftData[]>([]);
  const [giftsLoaded, setGiftsLoaded] = useState(false);

  const refreshGifts = useCallback(async () => {
    try {
      const list = await listGifts();
      setGifts(list);
    } catch (err) {
      if (isAuthError(err)) setGifts([]);
      // A transient network failure keeps whatever we already had on screen.
    } finally {
      setGiftsLoaded(true);
    }
  }, []);

  useEffect(() => {
    void refreshGifts();
  }, [refreshGifts]);

  const signIn = useCallback(
    async (
      mode: 'login' | 'signup',
      input: { name?: string; email: string; password: string }
    ): Promise<User> => {
      const next =
        mode === 'signup'
          ? await registerApi(input.name || '', input.email, input.password)
          : await loginApi(input.email, input.password);
      setUserState(next);
      // Logging in claims the gifts this device created while signed out.
      await refreshGifts();
      return next;
    },
    [refreshGifts]
  );

  const signOut = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      /* the cookie may already be gone */
    }
    setUserState(null);
    await refreshGifts();
    showToast('Signed out', 'info');
  }, [refreshGifts, showToast]);

  const setUser = (next: User | null) => setUserState(next);

  const updateProfile = useCallback(async (patch: { name?: string; avatarUrl?: string | null }) => {
    try {
      setUserState(await updateMe(patch));
    } catch (err) {
      showToast(errorMessage(err, 'Could not save your profile.'), 'error');
      throw err;
    }
  }, [showToast]);

  const [currentView, setCurrentViewState] = useState<ViewRoute>(initialRoute.view);
  const [recipientGift, setRecipientGift] = useState<GiftData | null>(null);
  const [recipientLoading, setRecipientLoading] = useState(false);

  const currentViewRef = useRef(currentView);
  currentViewRef.current = currentView;
  const recipientGiftRef = useRef(recipientGift);
  recipientGiftRef.current = recipientGift;
  const giftsRef = useRef(gifts);
  giftsRef.current = gifts;

  const viewBeforeRecipient = useRef<ViewRoute>('home');
  const routeSeq = useRef(0);

  // Current draft in Gift Creator
  const [currentDraft, setCurrentDraft] = useState<Partial<GiftData>>(() =>
    makeDraft(null, initialSeason.slug)
  );

  // Recently created gift for success screen
  const [justCreatedGift, setJustCreatedGift] = useState<GiftData | null>(null);

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

  /**
   * Resolves a share code. Local copy first (instant preview from the
   * dashboard), otherwise the API — which is what makes links work on any
   * device instead of only in the browser that created them.
   */
  const loadRecipient = useCallback(
    async (giftCode: string, options?: { countView?: boolean }) => {
      const seq = (routeSeq.current += 1);
      const local = giftsRef.current.find((g) => g.shareCode === giftCode);

      if (local) {
        setRecipientGift(local);
        setCurrentViewState('recipient');
        if (options?.countView) recordGiftView(giftCode);
        return;
      }

      setRecipientLoading(true);
      setCurrentViewState('recipient');
      try {
        const gift = await getGiftByCode(giftCode);
        if (seq !== routeSeq.current) return;
        setRecipientGift(gift);
        if (options?.countView !== false) recordGiftView(giftCode);
      } catch (err) {
        if (seq !== routeSeq.current) return;
        // Unknown / stale code — land on home instead of a blank screen.
        setRecipientGift(null);
        if (currentViewRef.current === 'recipient') {
          setCurrentViewState('home');
          writeHash('home');
        }
        if (!(err instanceof ApiError && err.status === 404)) {
          showToast(errorMessage(err, 'Could not load this gift.'), 'error');
        }
      } finally {
        if (seq === routeSeq.current) setRecipientLoading(false);
      }
    },
    [writeHash, showToast]
  );

  // Reflect external hash changes: back/forward buttons, pasted links, reloads.
  useEffect(() => {
    const onHashChange = () => {
      const { view, giftCode } = hashToRoute(window.location.hash);

      if (view === 'recipient') {
        if (!giftCode) return;
        const arriving = currentViewRef.current !== 'recipient';
        if (arriving) viewBeforeRecipient.current = currentViewRef.current;
        void loadRecipient(giftCode, { countView: arriving });
        return;
      }

      routeSeq.current += 1;
      setRecipientLoading(false);
      const alreadyThere = currentViewRef.current === view && recipientGiftRef.current === null;
      setRecipientGift(null);
      setCurrentViewState((prev) => (prev === view ? prev : view));
      if (!alreadyThere && currentViewRef.current === 'recipient') {
        viewBeforeRecipient.current = 'home';
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [loadRecipient]);

  // Deep link on first paint: #/g/{code} before anything else has happened.
  useEffect(() => {
    const { view, giftCode } = hashToRoute(window.location.hash);
    if (view === 'recipient' && giftCode) void loadRecipient(giftCode, { countView: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const saveCurrentGift = async (): Promise<GiftData> => {
    const payload = buildPayload(currentDraft);
    const existingId = currentDraft.id;

    try {
      const saved = existingId ? await updateGift(existingId, payload) : await createGift(payload);

      setGifts((prev) => {
        const index = prev.findIndex((g) => g.id === saved.id);
        if (index >= 0) {
          const next = [...prev];
          next[index] = saved;
          return next;
        }
        return [saved, ...prev];
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

      setJustCreatedGift(saved);
      showToast('Your GEMS is ready! 🎉');
      return saved;
    } catch (err) {
      showToast(errorMessage(err, 'Could not save your gift. Please try again.'), 'error');
      throw err;
    }
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

  const deleteGift = async (id: string) => {
    const snapshot = giftsRef.current;
    setGifts((prev) => prev.filter((g) => g.id !== id));
    try {
      await deleteGiftApi(id);
      showToast('Gift deleted');
    } catch (err) {
      setGifts(snapshot);
      showToast(errorMessage(err, 'Could not delete that gift.'), 'error');
    }
  };

  const duplicateGift = async (id: string) => {
    const target = giftsRef.current.find((g) => g.id === id);
    if (!target) return;
    try {
      const created = await createGift({
        ...buildPayload(target),
        recipientName: `${target.recipientName} (Copy)`,
      });
      setGifts((prev) => [created, ...prev]);
      showToast('Gift duplicated successfully');
    } catch (err) {
      showToast(errorMessage(err, 'Could not duplicate that gift.'), 'error');
    }
  };

  const editGift = (id: string) => {
    const target = giftsRef.current.find((g) => g.id === id);
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
      if (countView) recordGiftView(gift.shareCode);
      setRecipientGift(countView ? { ...gift, viewsCount: gift.viewsCount + 1 } : gift);
      setCurrentViewState('recipient');
      writeHash('recipient', gift.shareCode);
    },
    [writeHash]
  );

  const closeRecipientView = useCallback(() => {
    routeSeq.current += 1;
    setRecipientGift(null);
    setRecipientLoading(false);
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
        authReady,
        setUser,
        signIn,
        signOut,
        updateProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        gifts,
        giftsLoaded,
        refreshGifts,
        currentDraft,
        setCurrentDraft,
        saveCurrentGift,
        deleteGift,
        duplicateGift,
        editGift,
        recipientGift,
        recipientLoading,
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
