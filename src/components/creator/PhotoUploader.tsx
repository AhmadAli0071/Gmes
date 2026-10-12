import React, { useRef, useState } from 'react';
import { Image as ImageIcon, Upload, X, Loader2, Check, Plus } from 'lucide-react';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (next: string[]) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const MAX_PHOTOS = 4;
const MAX_DIM = 1024;
const QUALITY = 0.75;
const MAX_BYTES = 20 * 1024 * 1024;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|bmp|avif)$/i;

const isImageFile = (f: File) =>
  f.type.startsWith('image/') || (f.type === '' && IMAGE_EXT.test(f.name));

const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T | null> =>
  Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);

const readFileAsDataUrl = (file: File): Promise<string | null> =>
  new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } catch {
      resolve(null);
    }
  });

/** Downscale + JPEG-compress so uploads stay small enough for localStorage.
    Returns null when the browser cannot decode the file (e.g. HEIC). */
const compressImage = (dataUrl: string): Promise<string | null> =>
  new Promise((resolve) => {
    let settled = false;
    const finish = (value: string | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), 12000);

    const img = new Image();
    img.onload = () => {
      clearTimeout(timer);
      try {
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return finish(null);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        finish(canvas.toDataURL('image/jpeg', QUALITY));
      } catch {
        finish(null);
      }
    };
    img.onerror = () => {
      clearTimeout(timer);
      finish(null);
    };
    img.src = dataUrl;
  });

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onChange,
  showToast,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  const full = photos.length >= MAX_PHOTOS;

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
    showToast('Photo removed', 'info');
  };

  const pick = () => {
    if (full) {
      showToast(`Maximum ${MAX_PHOTOS} photos reached`, 'info');
      return;
    }
    inputRef.current?.click();
  };

  const handleFiles = async (list: FileList | null) => {
    if (!list || list.length === 0) return;

    let room = MAX_PHOTOS - photos.length;
    if (room <= 0) {
      showToast(`Maximum ${MAX_PHOTOS} photos reached`, 'info');
      return;
    }

    setBusy(true);
    const added: string[] = [];
    let notImage = 0;
    let unreadable = 0;

    for (const file of Array.from(list)) {
      if (room <= 0) break;
      if (!isImageFile(file)) {
        notImage += 1;
        continue;
      }
      if (file.size > MAX_BYTES) {
        unreadable += 1;
        continue;
      }
      const raw = await withTimeout(readFileAsDataUrl(file), 15000);
      if (!raw) {
        unreadable += 1;
        continue;
      }
      const compressed = await compressImage(raw);
      if (!compressed) {
        unreadable += 1;
        continue;
      }
      added.push(compressed);
      room -= 1;
    }

    setBusy(false);
    if (inputRef.current) inputRef.current.value = '';

    if (added.length === 0) {
      if (notImage > 0) showToast('Those files are not images — use JPG or PNG.', 'error');
      else if (unreadable > 0)
        showToast('Could not read that image — convert it to JPG and retry.', 'error');
      return;
    }

    onChange([...photos, ...added].slice(0, MAX_PHOTOS));

    const left = MAX_PHOTOS - photos.length - added.length;
    if (unreadable > 0 || notImage > 0) {
      showToast(
        `${added.length} added · ${unreadable + notImage} skipped (not usable images)`,
        'info'
      );
    } else {
      showToast(`${added.length} photo${added.length > 1 ? 's' : ''} attached ✨`);
    }
    if (left <= 0) showToast(`All ${MAX_PHOTOS} photo slots are full`, 'info');
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className="rounded-xl p-3"
      style={{ border: '1px dashed var(--mood-border)', background: 'var(--mood-soft)' }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
          <ImageIcon className="w-4 h-4 text-[var(--mood-accent)]" />
          <span>Your photos</span>
          <span
            className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
            style={{ background: 'var(--mood-soft-strong)', color: 'var(--mood-accent)' }}
          >
            {photos.length}/{MAX_PHOTOS} attached
          </span>
        </span>

        <button
          type="button"
          onClick={pick}
          disabled={full || busy}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
            full || busy
              ? 'border-zinc-200 bg-white/70 text-zinc-400 cursor-not-allowed'
              : 'border-[var(--mood-border)] bg-white text-[var(--mood-accent)] hover:bg-[var(--mood-soft-strong)] cursor-pointer'
          }`}
        >
          {busy ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
          <span>{busy ? 'Adding…' : full ? 'Full' : 'Upload'}</span>
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {photos.length === 0 ? (
        <button
          type="button"
          onClick={pick}
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={`mt-3 w-full rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors cursor-pointer ${
            dragging
              ? 'border-[var(--mood-accent)] bg-white'
              : 'border-[var(--mood-border)] bg-white/70 hover:bg-white'
          }`}
        >
          <Upload className="w-5 h-5 mx-auto text-[var(--mood-accent)]" />
          <span className="mt-2 block text-xs font-bold text-zinc-700">
            {busy ? 'Adding your photos…' : 'Tap to upload, or drag photos here'}
          </span>
          <span className="mt-1 block text-[11px] text-zinc-500">
            From your gallery or camera · JPG, PNG, WebP
          </span>
        </button>
      ) : (
        <>
          <p className="text-[11px] text-zinc-500 mt-2.5">
            Ticked photos are attached to the gift. Tap ✕ to remove one.
          </p>

          <div className="mt-2 grid grid-cols-4 gap-2">
            {photos.map((url, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden border-2 border-[var(--mood-accent)] ring-2 ring-[var(--mood-ring)] bg-white"
              >
                <img
                  src={url}
                  alt={`Attached memory ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-[var(--mood-accent)] text-white flex items-center justify-center shadow">
                  <Check className="w-3 h-3" strokeWidth={3.5} />
                </span>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  aria-label={`Remove photo ${index + 1}`}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {!full && (
              <button
                type="button"
                onClick={pick}
                disabled={busy}
                className="relative aspect-square rounded-xl border-2 border-dashed border-[var(--mood-border)] bg-white/70 flex flex-col items-center justify-center gap-1 text-[var(--mood-accent)] hover:bg-white transition-colors cursor-pointer disabled:opacity-60"
              >
                {busy ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span className="text-[9px] font-bold">Add</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
