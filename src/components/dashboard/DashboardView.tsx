import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GiftData } from '../../types';
import { getEventBySlug } from '../../data/events';
import {
  Sparkles,
  Plus,
  Play,
  Edit2,
  Share2,
  Copy,
  Trash2,
  Gift,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    gifts,
    giftsLoaded,
    startNewGift,
    editGift,
    duplicateGift,
    deleteGift,
    openRecipientView,
    setJustCreatedGift,
  } = useApp();

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleShareClick = (gift: GiftData) => {
    setJustCreatedGift(gift);
  };

  const handleDelete = (gift: GiftData) => {
    if (confirmDeleteId !== gift.id) {
      setConfirmDeleteId(gift.id);
      return;
    }
    setConfirmDeleteId(null);
    deleteGift(gift.id);
  };

  // Own preview: don't count it as a recipient view.
  const preview = (gift: GiftData) => openRecipientView(gift, { countView: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-[#E4E4E7]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#18181B] tracking-tight">
            My Gifts
          </h1>
          <p className="mt-1 text-xs text-[#71717A]">
            All the digital gifts you've sent and saved.
          </p>
        </div>

        <button
          onClick={() => startNewGift()}
          className="inline-flex items-center gap-2 self-start px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Gift</span>
        </button>
      </div>

      {/* Empty State */}
      {!giftsLoaded ? (
        <div className="my-16 grid place-items-center" role="status">
          <div className="flex flex-col items-center gap-3">
            <span className="h-8 w-8 rounded-full border-2 border-violet-200 border-t-[#6D28D9] animate-spin" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
              Loading your gifts
            </span>
          </div>
        </div>
      ) : gifts.length === 0 ? (
        <div className="my-16 p-12 text-center bg-white rounded-3xl border border-[#E4E4E7] max-w-sm mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No gifts yet</h3>
          <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
            Create your first GEMS and send an unforgettable surprise.
          </p>
          <button
            onClick={() => startNewGift()}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Create a Gift</span>
          </button>
        </div>
      ) : (
        /* Visual Gift Cards Grid */
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => {
            const eventInfo = getEventBySlug(gift.eventSlug || 'birthday');

            return (
              <div
                key={gift.id}
                className="bg-white rounded-3xl border border-[#E4E4E7] shadow-xs hover:shadow-lg hover:border-purple-200 transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Present Card Artwork */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open preview for ${gift.recipientName}`}
                  className="h-44 relative flex items-center justify-center cursor-pointer overflow-hidden group focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#6D28D9]"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${gift.boxColor}25 0%, #FFFFFF 85%)`,
                  }}
                  onClick={() => preview(gift)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      preview(gift);
                    }
                  }}
                >
                  {/* Miniature 3D Gift Present */}
                  <div
                    className="w-24 h-20 rounded-2xl shadow-lg relative overflow-hidden flex items-center justify-center transform group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: gift.boxColor }}
                  >
                    <div
                      className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4"
                      style={{ backgroundColor: gift.ribbonColor }}
                    />
                    <div
                      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4"
                      style={{ backgroundColor: gift.ribbonColor }}
                    />
                  </div>

                  {/* Occasion pill */}
                  <div className="absolute top-3 left-3 text-[11px] font-semibold text-zinc-700 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-black/5 flex items-center gap-1.5 shadow-2xs">
                    <span>{eventInfo.emoji}</span>
                    <span>{eventInfo.name}</span>
                  </div>

                  {/* Open Preview badge — always shown on touch (no hover), hover-revealed on desktop */}
                  <div className="absolute bottom-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    <span>Open</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">
                        Recipient
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {gift.createdAt}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-zinc-900 mt-0.5 truncate">
                      {gift.recipientName}
                    </h3>

                    <p className="mt-2 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      "{gift.message}"
                    </p>
                  </div>

                  {/* Direct Actions: Open, Share, Edit, Duplicate, Delete */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 grid grid-cols-3 sm:grid-cols-5 gap-1 text-center text-[11px]">
                    <button
                      onClick={() => preview(gift)}
                      className="py-2 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[44px]"
                      title="Open gift"
                    >
                      <Play className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Open</span>
                    </button>

                    <button
                      onClick={() => handleShareClick(gift)}
                      className="py-2 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[44px]"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => editGift(gift.id)}
                      className="py-2 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[44px]"
                      title="Edit details"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => duplicateGift(gift.id)}
                      className="py-2 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[44px]"
                      title="Duplicate gift"
                    >
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Copy</span>
                    </button>

                    <button
                      onClick={() => handleDelete(gift)}
                      onBlur={() => setConfirmDeleteId((id) => (id === gift.id ? null : id))}
                      className={`py-2 px-1 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer min-h-[44px] ${
                        confirmDeleteId === gift.id
                          ? 'bg-red-600 text-white'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                      title={confirmDeleteId === gift.id ? 'Click again to confirm' : 'Delete gift'}
                      aria-label={
                        confirmDeleteId === gift.id
                          ? `Confirm deleting gift for ${gift.recipientName}`
                          : `Delete gift for ${gift.recipientName}`
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{confirmDeleteId === gift.id ? 'Sure?' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
