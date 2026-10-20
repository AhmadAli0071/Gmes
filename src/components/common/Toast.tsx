import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  const isError = toast?.type === 'error';

  // The live region stays mounted so screen readers reliably announce
  // content that arrives after page load.
  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={
        toast
          ? 'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 mx-auto sm:mx-0 flex items-center gap-2.5 px-4 py-3 bg-[#18181B] text-white text-sm font-medium rounded-xl shadow-xl border border-zinc-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3'
          : 'sr-only'
      }
    >
      {toast && (
        <>
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
          )}
          <span>{toast.message}</span>
        </>
      )}
    </div>
  );
};
