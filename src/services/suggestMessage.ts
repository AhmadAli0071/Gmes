import { AI_MESSAGE_TEMPLATES } from '../data/mockGifts';

export type MessageTone = keyof typeof AI_MESSAGE_TEMPLATES;

const TONE_PROMPT: Record<MessageTone, string> = {
  sweet: 'warm, affectionate and encouraging',
  funny: 'lighthearted and playful, gently teasing but never mean',
  romantic: 'deeply romantic and tender',
  heartfelt: 'sincere, grateful and emotionally genuine',
  short: 'very short (under 25 words) and punchy',
};

type Env = ImportMetaEnv & Record<string, string | undefined>;

function resolveApiKey(): string | undefined {
  const env = import.meta.env as Env | undefined;
  return (
    env?.VITE_GEMINI_API_KEY ||
    env?.GEMINI_API_KEY ||
    (typeof window !== 'undefined'
      ? ((window as unknown as Record<string, string | undefined>).GEMINI_API_KEY ?? undefined)
      : undefined)
  );
}

export interface SuggestionResult {
  text: string;
  source: 'ai' | 'templates';
}

function pickTemplate(tone: MessageTone): string {
  const options = AI_MESSAGE_TEMPLATES[tone];
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Asks Gemini for a personalised message. When no API key is configured the
 * caller falls back to curated templates and says so honestly.
 */
export async function suggestMessage(params: {
  tone: MessageTone;
  recipientName?: string;
  senderName?: string;
  occasion?: string;
}): Promise<SuggestionResult> {
  const template = pickTemplate(params.tone);
  const apiKey = resolveApiKey();
  if (!apiKey) return { text: template, source: 'templates' };

  const prompt = [
    `Write a short gift message (max 45 words) for a ${params.occasion || 'special occasion'} gift.`,
    `Tone: ${TONE_PROMPT[params.tone]}.`,
    params.recipientName ? `Recipient: ${params.recipientName}.` : '',
    params.senderName ? `Signed by: ${params.senderName}.` : '',
    'No quotes, no emoji clutter, no preamble — just the message itself.',
  ]
    .filter(Boolean)
    .join(' ');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 200 },
        }),
        signal: controller.signal,
      }
    );
    if (!response.ok) throw new Error(`Gemini responded ${response.status}`);
    const data = await response.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = text?.trim();
    if (!cleaned) throw new Error('Empty completion');
    return { text: cleaned.replace(/^["']|["']$/g, ''), source: 'ai' };
  } catch {
    return { text: template, source: 'templates' };
  } finally {
    clearTimeout(timer);
  }
}
