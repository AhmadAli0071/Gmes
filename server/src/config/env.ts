import dotenv from 'dotenv';

dotenv.config();

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') return fallback;
  return value === 'true' || value === '1';
}

function num(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const env = {
  isProd: process.env.NODE_ENV === 'production',
  port: num(process.env.PORT, 3001),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gems',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:8080',
  uploadsDir: process.env.UPLOADS_DIR || 'uploads',
  cookieSecure: bool(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production'),
  sessionDays: num(process.env.SESSION_DAYS, 30),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
};
