import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#18181B] text-white text-sm font-medium rounded-xl shadow-xl border border-zinc-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      {toast.type === 'error' ? (
        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
      ) : toast.type === 'info' ? (
        <Info className="w-4 h-4 text-sky-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      )}
      <span>{toast.message}</span>
    </div>
  );
};
