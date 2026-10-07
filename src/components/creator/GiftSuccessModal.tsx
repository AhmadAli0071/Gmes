import React, { useState } from 'react';
import { GiftData } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  QrCode,
  ExternalLink,
  MessageCircle,
  X,
  ArrowRight,
} from 'lucide-react';

interface GiftSuccessModalProps {
  gift: GiftData;
  onClose: () => void;
}

export const GiftSuccessModal: React.FC<GiftSuccessModalProps> = ({ gift, onClose }) => {
  const { showToast, openRecipientView, setCurrentView } = useApp();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const shareUrl = `${window.location.origin}/g/${gift.shareCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast('Link copied to clipboard! Ready to send.');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Copied share link!');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `✨ I made a special GEMS digital surprise for you! Open it here: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A gift for ${gift.recipientName}`,
          text: `A special GEMS digital gift created by ${gift.senderName}`,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration header */}
        <div className="w-16 h-16 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center mx-auto mb-4 shadow-sm border border-purple-200">
          <Sparkles className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
          Your GEMS is ready! 🎉
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          A wonderful surprise is waiting for <span className="font-semibold text-zinc-800">{gift.recipientName}</span>. Send the link to let them unwrap the magic.
        </p>

        {/* Shareable Link Box */}
        <div className="mt-6 p-3 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-between gap-2">
          <div className="font-mono text-xs text-zinc-700 truncate px-2 text-left">
            {shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6D28D9] text-white text-xs font-semibold rounded-xl hover:bg-[#5B21B6] transition-colors shrink-0 shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Primary Share Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] text-white text-xs font-semibold rounded-xl hover:bg-[#20BD5A] transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Secondary options: QR Code & Recipient Preview */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-around text-xs text-zinc-600 font-medium">
          <button
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
          >
            <QrCode className="w-4 h-4 text-purple-600" />
            <span>{showQr ? 'Hide QR Code' : 'View QR Code'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              openRecipientView(gift);
            }}
            className="inline-flex items-center gap-1.5 text-[#6D28D9] font-semibold hover:underline"
          >
            <span>Test as Recipient</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* QR Code view */}
        {showQr && (
          <div className="mt-4 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl animate-in fade-in">
            {/* SVG Simulated QR code with GEMS branding */}
            <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl shadow-sm border border-zinc-200 flex flex-col items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900 fill-current">
                <rect x="5" y="5" width="25" height="25" fill="#18181B" />
                <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
                <rect x="13" y="13" width="9" height="9" fill="#18181B" />
                <rect x="70" y="5" width="25" height="25" fill="#18181B" />
                <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
                <rect x="78" y="13" width="9" height="9" fill="#18181B" />
                <rect x="5" y="70" width="25" height="25" fill="#18181B" />
                <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
                <rect x="13" y="78" width="9" height="9" fill="#18181B" />
                {/* Patterns */}
                <rect x="36" y="8" width="8" height="8" fill="#6D28D9" />
                <rect x="50" y="16" width="10" height="8" fill="#18181B" />
                <rect x="36" y="36" width="14" height="14" fill="#6D28D9" />
                <rect x="55" y="38" width="8" height="8" fill="#18181B" />
                <rect x="70" y="45" width="12" height="12" fill="#18181B" />
                <rect x="38" y="60" width="12" height="8" fill="#18181B" />
                <rect x="58" y="68" width="8" height="14" fill="#6D28D9" />
                <rect x="74" y="74" width="16" height="8" fill="#18181B" />
              </svg>
            </div>
            <p className="mt-2 text-[11px] text-zinc-500">
              Scan with phone camera to instantly open gift
            </p>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => {
              onClose();
              setCurrentView('dashboard');
            }}
            className="w-full py-2.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center justify-center gap-1"
          >
            <span>Go to My Gifts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
