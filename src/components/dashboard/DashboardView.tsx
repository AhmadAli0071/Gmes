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
  ExternalLink,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    gifts,
    setCurrentView,
    editGift,
    duplicateGift,
    deleteGift,
    openRecipientView,
    showToast,
    setJustCreatedGift,
  } = useApp();

  const handleShareClick = (gift: GiftData) => {
    setJustCreatedGift(gift);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-8 border-b border-[#E4E4E7]">
        <div>
          <h1 className="text-3xl font-extrabold text-[#18181B] tracking-tight">
            My Gifts
          </h1>
          <p className="mt-1 text-xs text-[#71717A]">
            All the digital gifts you've sent and saved.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('create')}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] rounded-xl shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Gift</span>
        </button>
      </div>

      {/* Empty State */}
      {gifts.length === 0 ? (
        <div className="my-16 p-12 text-center bg-white rounded-3xl border border-[#E4E4E7] max-w-sm mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">No gifts yet</h3>
          <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
            Create your first GEMS and send an unforgettable surprise.
          </p>
          <button
            onClick={() => setCurrentView('create')}
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
                  className="h-44 relative flex items-center justify-center cursor-pointer overflow-hidden group"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${gift.boxColor}25 0%, #FFFFFF 85%)`,
                  }}
                  onClick={() => openRecipientView(gift)}
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

                  {/* Open Preview Hover Badge */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
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

                  {/* Direct Actions: Open, Share, Edit, Duplicate */}
                  <div className="mt-5 pt-3 border-t border-zinc-100 grid grid-cols-4 gap-1 text-center text-xs">
                    <button
                      onClick={() => openRecipientView(gift)}
                      className="py-1.5 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Open gift"
                    >
                      <Play className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Open</span>
                    </button>

                    <button
                      onClick={() => handleShareClick(gift)}
                      className="py-1.5 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => editGift(gift.id)}
                      className="py-1.5 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Edit details"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => duplicateGift(gift.id)}
                      className="py-1.5 px-1 rounded-lg text-zinc-700 hover:bg-zinc-100 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Duplicate gift"
                    >
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Copy</span>
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
