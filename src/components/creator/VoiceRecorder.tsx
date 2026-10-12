import React, { useEffect, useRef, useState } from 'react';
import {
  Mic,
  Square,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react';
import { probeAudioDuration, useRealAudio } from '../../hooks/useRealAudio';
import { uploadMedia } from '../../services/media';

interface VoiceRecorderProps {
  value?: string;
  duration?: number;
  onChange: (url: string | undefined, seconds: number | undefined) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const MAX_SECONDS = 60;

/** Safari records `audio/mp4`, Chrome/Firefox `audio/webm` — pick what this
 *  browser actually supports instead of hard-coding WebM. */
const pickMimeType = (): string | undefined => {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') {
    return undefined;
  }
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type));
};

const fmt = (s: number) => {
  const total = Math.max(0, Math.floor(s));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  value,
  duration = 0,
  onChange,
  showToast,
}) => {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [busy, setBusy] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number>(0);
  const elapsedRef = useRef(0);
  const discardRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const player = useRealAudio(value, duration);

  const cleanup = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = 0;
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      rec.onstop = null;
      try {
        rec.stop();
      } catch {
        /* already stopped */
      }
    }
    recorderRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => cleanup, []);

  const stopRecording = () => {
    const rec = recorderRef.current;
    if (rec && rec.state !== 'inactive') {
      rec.stop();
    } else {
      cleanup();
      setRecording(false);
    }
  };

  const startRecording = async () => {
    if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      showToast('Mic is not available — upload an audio file instead.', 'error');
      return;
    }
    let stream: MediaStream;
    try {
      player.stop();
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      showToast('Microphone permission denied.', 'error');
      return;
    }

    let rec: MediaRecorder;
    try {
      const mimeType = pickMimeType();
      rec = mimeType
        ? new MediaRecorder(stream, { mimeType, audioBitsPerSecond: 24000 })
        : new MediaRecorder(stream, { audioBitsPerSecond: 24000 });
    } catch {
      try {
        rec = new MediaRecorder(stream);
      } catch {
        stream.getTracks().forEach((t) => t.stop());
        showToast('Recording is not supported in this browser.', 'error');
        return;
      }
    }

    try {
      chunksRef.current = [];
      discardRef.current = false;
      elapsedRef.current = 0;
      setElapsed(0);

      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      rec.onstop = async () => {
        const discarded = discardRef.current;
        const secs = Math.max(1, elapsedRef.current);
        const blob = new Blob(chunksRef.current, {
          type: rec.mimeType || pickMimeType() || 'audio/webm',
        });
        chunksRef.current = [];
        cleanup();
        setRecording(false);
        setElapsed(0);
        elapsedRef.current = 0;

        if (discarded) {
          showToast('Recording cancelled', 'info');
          return;
        }
        if (blob.size === 0) {
          showToast('Nothing was recorded — try again.', 'error');
          return;
        }
        try {
          setBusy(true);
          const url = await uploadMedia(blob, 'voice');
          onChange(url, secs);
          showToast('Voice note recorded ✅');
        } catch (err) {
          showToast((err as Error)?.message || 'Could not save the recording.', 'error');
        } finally {
          setBusy(false);
        }
      };

      rec.start();
      recorderRef.current = rec;
      streamRef.current = stream;
      setRecording(true);

      timerRef.current = window.setInterval(() => {
        elapsedRef.current += 1;
        setElapsed(elapsedRef.current);
        if (elapsedRef.current >= MAX_SECONDS) stopRecording();
      }, 1000);
    } catch {
      stream.getTracks().forEach((t) => t.stop());
      recorderRef.current = null;
      setRecording(false);
      showToast('Could not start recording — try again.', 'error');
    }
  };

  const cancelRecording = () => {
    discardRef.current = true;
    stopRecording();
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('audio/')) {
      showToast('Please choose an audio file (mp3, m4a, webm…).', 'error');
      return;
    }
    setBusy(true);
    try {
      const url = await uploadMedia(file, 'voice', file.name);
      const secs = Math.round(await probeAudioDuration(url));
      onChange(url, secs > 0 ? secs : 10);
      showToast('Voice note attached ✅');
    } catch (err) {
      showToast((err as Error)?.message || 'Could not read that audio file.', 'error');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const removeNote = () => {
    player.stop();
    onChange(undefined, undefined);
    showToast('Voice note removed', 'info');
  };

  const progress = player.duration > 0 ? Math.min(100, (player.seconds / player.duration) * 100) : 0;

  return (
    <div className="border border-zinc-200 rounded-xl p-3 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
          <Mic className="w-4 h-4 text-[var(--mood-accent)]" />
          <span>Voice greeting {value ? `· ${fmt(player.duration || duration)}` : ''}</span>
        </span>
        {value && !recording && (
          <button
            type="button"
            onClick={removeNote}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:text-rose-600 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        )}
      </div>

      {/* Recording in progress */}
      {recording && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <span className="text-xs font-bold text-rose-600 tabular-nums">
              Recording {fmt(elapsed)} / {fmt(MAX_SECONDS)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={cancelRecording}
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-100 cursor-pointer"
              aria-label="Cancel recording"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold cursor-pointer"
            >
              <Square className="w-3 h-3 fill-current" />
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Saved playback */}
      {!recording && value && (
        <div
          className="rounded-xl p-3 flex items-center gap-3"
          style={{ background: 'var(--mood-soft)', border: '1px solid var(--mood-border)' }}
        >
          <button
            type="button"
            onClick={player.toggle}
            className="w-10 h-10 rounded-full bg-[var(--mood-accent)] text-white flex items-center justify-center shrink-0 hover:bg-[var(--mood-accent-hover)] transition-transform active:scale-95 cursor-pointer"
            aria-label={player.playing ? 'Pause voice note' : 'Play voice note'}
          >
            {player.playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-600">
              <span className="truncate">Your recording</span>
              <span className="tabular-nums text-zinc-500">
                {fmt(player.seconds)} / {fmt(player.duration)}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--mood-accent)] transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            {player.error && (
              <p className="mt-1 text-[10px] text-rose-500">{player.error}</p>
            )}
          </div>

          <button
            type="button"
            onClick={startRecording}
            className="p-2 rounded-lg text-[var(--mood-accent)] hover:bg-white cursor-pointer"
            aria-label="Record again"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Idle */}
      {!recording && !value && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={startRecording}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--mood-accent)] hover:bg-[var(--mood-accent-hover)] text-white text-xs font-bold cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
            Start recording
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--mood-border)] bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-50 cursor-pointer disabled:opacity-60"
          >
            <Upload className="w-3.5 h-3.5" />
            {busy ? 'Loading…' : 'Upload audio'}
          </button>
          <span className="text-[11px] text-zinc-400">Up to {MAX_SECONDS}s</span>
        </div>
      )}

      {!recording && value && (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--mood-accent)] hover:underline cursor-pointer disabled:opacity-60"
        >
          <Upload className="w-3.5 h-3.5" />
          Replace with an audio file
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />
    </div>
  );
};
