import { api } from '../lib/api';

export type MediaKind = 'photo' | 'voice' | 'video';

const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'audio/webm': 'webm',
  'audio/mp4': 'm4a',
  'audio/ogg': 'ogg',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};

/**
 * Sends the file to the API which sniffs its magic bytes, stores it under
 * /uploads/<year>/<month>/ and hands back the URL. Media never lives in
 * localStorage — that was the source of the old 5MB quota drops.
 */
export async function uploadMedia(
  file: Blob,
  kind: MediaKind,
  filename?: string
): Promise<string> {
  const ext = EXT_BY_TYPE[(file as Blob).type] || (kind === 'photo' ? 'jpg' : 'bin');
  const form = new FormData();
  form.append('kind', kind);
  form.append('file', file, filename || `upload-${Date.now().toString(36)}.${ext}`);

  const data = await api<{ url: string }>('/api/media', { method: 'POST', body: form });
  return data.url;
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [header, body] = dataUrl.split(',');
  const mime = /data:(.*?);/.exec(header)?.[1] || 'application/octet-stream';
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}
