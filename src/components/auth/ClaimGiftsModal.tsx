import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, X } from 'lucide-react';

/**
 * Shown right after sign-in when this browser still holds gifts that were
 * created while signed out. Nothing is moved to the account until the user
 * explicitly confirms - a different person using the same computer must
 * never inherit someone else's gifts by just signing in.
 */
export const ClaimGiftsModal: React.FC = () => {
  const { pendingClaimCount, confirmDeviceClaims, dismissDeviceClaims } = useApp();
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pendingClaimCount) return undefined;
    panelRef.current?.querySelector<HTMLElement>('button')?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissDeviceClaims();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pendingClaimCount, dismissDeviceClaims]);

  if (!pendingClaimCount) return null;

  const handleConfirm = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await confirmDeviceClaims();
    } finally {
      setBusy(false);
    }
  };

  const singular = pendingClaimCount === 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) dismissDeviceClaims();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-modal-title"
        className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative"
      >
        <button
          type="button"
          onClick={dismissDeviceClaims}
          className="absolute top-3 right-3 p-2.5 text-zinc-400 hover:text-zinc-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto mb-3">
            <Gift className="w-7 h-7" aria-hidden="true" />
          </div>
          <h2 id="claim-modal-title" className="text-xl font-extrabold text-zinc-900 tracking-tight">
            {singular ? 'One gift found' : `${pendingClaimCount} gifts found`}
          </h2>
          <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
            {singular
              ? 'A gift was created on this device before you signed in. Add it to your account?'
              : `Gifts were created on this device before you signed in. Add them to your account?`}
          </p>
          <p className="mt-1.5 text-[11px] text-zinc-400">
            Nothing moves to your account until you confirm.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={busy}
            className="w-full py-2.5 text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] disabled:opacity-60 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {busy ? 'Adding…' : `Add ${singular ? 'it' : 'them'} to my account`}
          </button>
          <button
            type="button"
            onClick={dismissDeviceClaims}
            disabled={busy}
            className="w-full py-2.5 text-xs font-semibold text-zinc-600 bg-white border border-[#E4E4E7] hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};
