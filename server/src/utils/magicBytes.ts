/**
 * Content sniffing for uploads. We never trust the client's `Content-Type`:
 * a "photo" that is actually an HTML file would be served back as HTML and
 * execute on our origin.
 */
export interface DetectedType {
  ext: string;
  mime: string;
  kind: 'image' | 'audio' | 'video';
}

const startsWith = (buf: Buffer, bytes: number[], offset = 0): boolean =>
  bytes.every((b, i) => buf[offset + i] === b);

const ascii = (buf: Buffer, offset: number, length: number): string =>
  buf.subarray(offset, offset + length).toString('latin1');

export function detectType(buf: Buffer): DetectedType | null {
  if (buf.length < 12) return null;

  if (startsWith(buf, [0xff, 0xd8, 0xff])) return { ext: 'jpg', mime: 'image/jpeg', kind: 'image' };
  if (startsWith(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    return { ext: 'png', mime: 'image/png', kind: 'image' };
  if (ascii(buf, 0, 4) === 'GIF8') return { ext: 'gif', mime: 'image/gif', kind: 'image' };

  if (ascii(buf, 0, 4) === 'RIFF') {
    const fourcc = ascii(buf, 8, 4);
    if (fourcc === 'WEBP') return { ext: 'webp', mime: 'image/webp', kind: 'image' };
    if (fourcc === 'WAVE') return { ext: 'wav', mime: 'audio/wav', kind: 'audio' };
    return null;
  }

  if (ascii(buf, 4, 4) === 'ftyp') {
    const brand = ascii(buf, 8, 4).trim();
    if (brand.startsWith('M4A') || brand.startsWith('M4B'))
      return { ext: 'm4a', mime: 'audio/mp4', kind: 'audio' };
    return { ext: 'mp4', mime: 'video/mp4', kind: 'video' };
  }

  if (startsWith(buf, [0x1a, 0x45, 0xdf, 0xa3])) return { ext: 'webm', mime: 'video/webm', kind: 'video' };
  if (ascii(buf, 0, 4) === 'OggS') return { ext: 'ogg', mime: 'audio/ogg', kind: 'audio' };
  if (ascii(buf, 0, 3) === 'ID3') return { ext: 'mp3', mime: 'audio/mpeg', kind: 'audio' };
  // MPEG frame sync (0xFF 0Ex / 0xFF 0Fx)
  if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) return { ext: 'mp3', mime: 'audio/mpeg', kind: 'audio' };

  return null;
}

export const MAX_UPLOAD_BYTES: Record<'photo' | 'voice' | 'video', number> = {
  photo: 8 * 1024 * 1024,
  voice: 5 * 1024 * 1024,
  video: 25 * 1024 * 1024,
};
