import { useCallback, useEffect, useRef, useState } from 'react';

export interface RealAudio {
  /** Whether the audio element is currently playing. */
  playing: boolean;
  /** Current playhead in seconds (fractional). */
  seconds: number;
  /** Real media duration in seconds, falling back to the supplied estimate. */
  duration: number;
  /** True once metadata loaded and the media is actually playable. */
  ready: boolean;
  /** Set when the source failed to load or playback was blocked. */
  error: string | null;
  toggle: () => void;
  stop: () => void;
}

/**
 * Real `HTMLAudioElement` playback for a voice note (data URL or remote URL).
 * Replaces the fake one-second timers so a recorded greeting actually plays.
 */
export const useRealAudio = (src?: string, fallbackDuration = 0): RealAudio => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPlaying(false);
    setSeconds(0);
    setReady(false);
    setError(null);
    setDuration(fallbackDuration || 0);

    if (!src) return undefined;

    const el = new Audio();
    el.preload = 'metadata';

    const onLoaded = () => {
      const d = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : 0;
      if (d > 0) setDuration(d);
      setReady(true);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setSeconds(el.currentTime);
    const onEnded = () => {
      setPlaying(false);
      setSeconds(0);
      try {
        el.currentTime = 0;
      } catch {
        /* ignore */
      }
    };
    const onError = () => {
      setReady(false);
      setError('This audio could not be loaded.');
    };

    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('canplay', onLoaded);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);

    audioRef.current = el;
    el.src = src;

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('canplay', onLoaded);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
      el.pause();
      el.removeAttribute('src');
      el.load();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => setError('Tap again to allow audio.'));
    } else {
      el.pause();
    }
  }, []);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
    setPlaying(false);
    setSeconds(0);
  }, []);

  return {
    playing,
    seconds,
    duration: duration || fallbackDuration || 0,
    ready,
    error,
    toggle,
    stop,
  };
};

/** Reads a Blob/File into a base64 data URL so it can be persisted. */
export const blobToDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.readAsDataURL(blob);
  });

/** Real duration (seconds) of an audio source, via metadata load. */
export const probeAudioDuration = (src: string): Promise<number> =>
  new Promise((resolve) => {
    const el = new Audio();
    let settled = false;
    const done = (value: number) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('error', onErr);
      el.removeAttribute('src');
      resolve(value);
    };
    const onMeta = () => done(Number.isFinite(el.duration) ? el.duration : 0);
    const onErr = () => done(0);
    const timer = window.setTimeout(() => done(0), 6000);

    el.preload = 'metadata';
    el.addEventListener('loadedmetadata', onMeta, { once: true });
    el.addEventListener('error', onErr, { once: true });
    el.src = src;
  });
