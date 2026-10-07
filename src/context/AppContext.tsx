import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  EventSlug,
  EventTheme,
  GiftData,
  GiftTemplate,
  User,
  ViewRoute,
} from '../types';
import { EVENTS, getCurrentSeasonalEvent, getEventBySlug } from '../data/events';
import { TEMPLATES } from '../data/templates';
import { INITIAL_GIFTS } from '../data/mockGifts';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentView: ViewRoute;
  setCurrentView: (view: ViewRoute) => void;
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
  openRecipientView: (gift: GiftData) => void;
  closeRecipientView: () => void;
  // Created Success Modal
  justCreatedGift: GiftData | null;
  setJustCreatedGift: (gift: GiftData | null) => void;
  // Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewRoute>('home');
  const [allEvents, setAllEvents] = useState<EventTheme[]>(EVENTS);

  // Default to seasonal current event
  const initialSeason = getCurrentSeasonalEvent();
  const [selectedEventSlug, setSelectedEventSlug] = useState<EventSlug>(initialSeason.slug);

  // Active event object
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
  const [gifts, setGifts] = useState<GiftData[]>(() => {
    try {
      const saved = localStorage.getItem('gems_gifts');
      return saved ? JSON.parse(saved) : INITIAL_GIFTS;
    } catch {
      return INITIAL_GIFTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gems_gifts', JSON.stringify(gifts));
    } catch {
      // ignore
    }
  }, [gifts]);

  // Current draft in Gift Creator
  const [currentDraft, setCurrentDraft] = useState<Partial<GiftData>>(() => ({
    recipientName: 'Sarah Jenkins',
    senderName: user ? user.name : 'Ahmad',
    message:
      'Sarah, you make every ordinary day feel like an adventure! Wishing you the happiest celebration filled with love, laughter, and sweet moments. So grateful for you! ✨',
    templateId: 'tpl-confetti-pastel',
    eventSlug: initialSeason.slug,
    mood: 'magical',
    fontStyle: 'editorial',
    musicTrack: 'ambient',
    animationEffect: initialSeason.defaultAnimation,
    photos: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=80',
    ],
    voiceNoteUrl: 'mock-voice.mp3',
    voiceNoteDuration: 24,
    boxColor: '#6D28D9',
    ribbonColor: '#F59E0B',
    viewsCount: 0,
    status: 'published',
  }));

  // Recipient viewing
  const [recipientGift, setRecipientGift] = useState<GiftData | null>(null);

  // Recently created gift for success screen
  const [justCreatedGift, setJustCreatedGift] = useState<GiftData | null>(null);

  // Toast
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3500);
  };

  const updateEventTheme = (updated: EventTheme) => {
    setAllEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    showToast(`Updated event settings for ${updated.name}`);
  };

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

    setJustCreatedGift(fullGift);
    showToast('Your GEMS is ready! 🎉');
    return fullGift;
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
    setCurrentView('create');
  };

  const openRecipientView = (gift: GiftData) => {
    // Increment view count
    setGifts((prev) =>
      prev.map((g) => (g.id === gift.id ? { ...g, viewsCount: g.viewsCount + 1 } : g))
    );
    setRecipientGift({ ...gift, viewsCount: gift.viewsCount + 1 });
    setCurrentView('recipient');
  };

  const closeRecipientView = () => {
    setRecipientGift(null);
    setCurrentView('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
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
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
