import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
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
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  // Clean path route - resolves inside the SPA, so the link opens the gift.
  const shareUrl = `${window.location.origin}/g/${gift.shareCode}`;

  useEffect(() => {
    if (!showQr || qrDataUrl) return;
    let cancelled = false;
    QRCode.toDataURL(shareUrl, {
      width: 320,
      margin: 1,
      color: { dark: '#18181B', light: '#FFFFFF' },
    })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) showToast('Could not generate a QR code for this link.', 'error');
      });
    return () => {
      cancelled = true;
    };
  }, [showQr, qrDataUrl, shareUrl, showToast]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast('Link copied to clipboard! Ready to send.');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      try {
        // Fallback for browsers/contexts without the async clipboard API.
        const input = document.createElement('textarea');
        input.value = shareUrl;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(input);
        if (ok) {
          setCopied(true);
          showToast('Link copied to clipboard! Ready to send.');
          setTimeout(() => setCopied(false), 2500);
          return;
        }
      } catch {
        /* fall through to the error toast */
      }
      showToast('Could not copy the link - please select and copy it manually.', 'error');
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
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative text-center max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2.5 text-zinc-400 hover:text-zinc-700 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration header */}
        <div className="w-16 h-16 rounded-2xl bg-[var(--mood-soft-strong)] text-[var(--mood-accent)] flex items-center justify-center mx-auto mb-4 shadow-sm border border-[var(--mood-border)]">
          <Sparkles className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
          Your GEMS is ready! 🎉
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          A wonderful surprise is waiting for <span className="font-semibold text-zinc-800">{gift.recipientName}</span>. Send the link to let them unwrap the magic.
        </p>

        {/* Shareable Link Box */}
        <div className="mt-6 p-3 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-wrap items-center justify-between gap-2">
          <div className="font-mono text-xs text-zinc-700 truncate px-2 text-left min-w-0 flex-1 basis-full sm:basis-0">
            {shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--mood-accent)] text-white text-xs font-semibold rounded-xl hover:bg-[var(--mood-accent-hover)] transition-colors shrink-0 shadow-xs"
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
        <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-around gap-3 text-xs text-zinc-600 font-medium">
          <button
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
          >
            <QrCode className="w-4 h-4 text-[var(--mood-strong)]" />
            <span>{showQr ? 'Hide QR Code' : 'View QR Code'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              // Own preview - don't inflate the recipient view counter.
              openRecipientView(gift, { countView: false });
            }}
            className="inline-flex items-center gap-1.5 text-[var(--mood-accent)] font-semibold hover:underline"
          >
            <span>Test as Recipient</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* QR Code view - a real, scannable code encoding the share link */}
        {showQr && (
          <div className="mt-4 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl animate-in fade-in duration-200">
            <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl shadow-sm border border-zinc-200 flex items-center justify-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="QR code linking to this gift"
                  className="w-full h-full"
                />
              ) : (
                <span className="text-[11px] text-zinc-500 animate-pulse">Generating…</span>
              )}
            </div>
            <p className="mt-2 text-[11px] text-zinc-500">
              Scan with a phone camera to open the gift
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
