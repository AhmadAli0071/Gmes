import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventTheme, EventSlug } from '../../types';
import { TEMPLATES } from '../../data/templates';
import {
  Calendar,
  Sparkles,
  Palette,
  Check,
  Edit2,
  Eye,
  Sliders,
  ShieldAlert,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    allEvents,
    selectedEventSlug,
    setSelectedEventSlug,
    updateEventTheme,
    gifts,
    showToast,
  } = useApp();

  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EventTheme>>({});

  const handleStartEdit = (event: EventTheme) => {
    setEditingEventId(event.id);
    setFormData(event);
  };

  const handleSaveEdit = () => {
    if (!editingEventId) return;
    const existing = allEvents.find((e) => e.id === editingEventId);
    if (!existing) return;
    const updated: EventTheme = {
      ...existing,
      ...formData,
    } as EventTheme;
    updateEventTheme(updated);
    setEditingEventId(null);
  };

  const handleSetActiveSeasonal = (slug: EventSlug) => {
    setSelectedEventSlug(slug);
    showToast(`Set ${slug} as active seasonal spotlight!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E4E4E7]">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#6D28D9] uppercase">
            Internal Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight mt-1">
            GEMS Event & Template Engine
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Control dynamic seasonal event dates, accent color palettes, and hero campaigns.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 px-3 py-1.5 bg-purple-50 text-[#6D28D9] rounded-xl text-xs font-semibold border border-purple-200">
          Active Live Event: <span className="capitalize">{selectedEventSlug}</span>
        </div>
      </div>

      {/* Seasonal Event Simulator & Switcher */}
      <div className="mt-8 p-6 bg-white rounded-3xl border border-[#E4E4E7] shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-[#6D28D9]" />
          <h2 className="text-base font-bold text-zinc-900">
            Simulate Current Seasonal Highlight
          </h2>
        </div>
        <p className="text-xs text-zinc-500 mb-4">
          Click any event below to immediately update the live homepage hero, colors, and badge.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {allEvents.map((ev) => (
            <button
              key={ev.id}
              onClick={() => handleSetActiveSeasonal(ev.slug)}
              className={`p-3 rounded-2xl border text-xs text-left transition-all flex flex-col justify-between ${
                selectedEventSlug === ev.slug
                  ? 'border-[#6D28D9] bg-purple-50/60 ring-2 ring-[#6D28D9]/20 font-bold text-[#6D28D9]'
                  : 'border-[#E4E4E7] hover:border-zinc-300 bg-zinc-50/50 text-zinc-700'
              }`}
            >
              <span className="text-xl mb-1">{ev.emoji}</span>
              <span className="truncate">{ev.name}</span>
              <span className="text-[10px] text-zinc-400 font-normal mt-1">
                {ev.startDate} – {ev.endDate}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Event Configuration Table */}
      <div className="mt-8 bg-white rounded-3xl border border-[#E4E4E7] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-900">Seasonal Events Configuration</h3>
          <span className="text-xs text-zinc-500 font-mono tabular-nums">
            {allEvents.length} registered events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Event</th>
                <th className="py-3 px-4">Active Window</th>
                <th className="py-3 px-4">Primary Accent</th>
                <th className="py-3 px-4">Hero Title</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {allEvents.map((ev) => {
                const isEditing = editingEventId === ev.id;

                return (
                  <tr key={ev.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-zinc-900 flex items-center gap-2">
                      <span className="text-base">{ev.emoji}</span>
                      <span>{ev.name}</span>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600 font-mono">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={formData.startDate || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, startDate: e.target.value }))
                            }
                            className="w-16 p-1 border rounded text-xs"
                          />
                          <span>–</span>
                          <input
                            type="text"
                            value={formData.endDate || ''}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                            }
                            className="w-16 p-1 border rounded text-xs"
                          />
                        </div>
                      ) : (
                        <span>
                          {ev.startDate} to {ev.endDate}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={formData.primaryAccent || ev.primaryAccent}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, primaryAccent: e.target.value }))
                            }
                            className="w-6 h-6 rounded cursor-pointer border"
                          />
                          <span className="font-mono text-[11px]">{formData.primaryAccent}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10"
                            style={{ backgroundColor: ev.primaryAccent }}
                          />
                          <span className="font-mono text-zinc-700">{ev.primaryAccent}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600 max-w-xs truncate">
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.heroTitle || ''}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, heroTitle: e.target.value }))
                          }
                          className="w-full p-1 border rounded text-xs"
                        />
                      ) : (
                        <span>{ev.heroTitle}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={handleSaveEdit}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingEventId(null)}
                            className="px-2 py-1 text-zinc-500 rounded-lg text-xs hover:bg-zinc-100"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(ev)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#6D28D9] hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          Configure
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
