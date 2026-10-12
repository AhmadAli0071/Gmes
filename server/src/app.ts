import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import fs from 'node:fs';
import path from 'node:path';
import { attachUser } from './middleware/session';
import { errorHandler, notFoundHandler } from './middleware/error';
import { apiLimiter, noStore } from './middleware/rateLimit';
import { authRouter } from './routes/auth';
import { giftsRouter } from './routes/gifts';
import { mediaRouter } from './routes/media';
import { healthRouter } from './routes/health';
import { uploadsRoot } from './routes/media';
import { env } from './config/env';

const distDir = path.resolve(process.cwd(), 'dist');

export function createApp(): express.Express {
  const app = express();

  app.set('trust proxy', 1);

  // CSP stays off for now: the SPA ships inline JSON-LD, Google Fonts and the
  // GIS script. Hardening that is a separate pass.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  app.use(express.json({ limit: '2mb' }));
  app.use(cookieParser());
  app.use(attachUser);

  app.use('/api/health', healthRouter);
  app.use('/api', apiLimiter, noStore);

  app.use('/api/auth', authRouter);
  app.use('/api/gifts', giftsRouter);
  app.use('/api/media', mediaRouter);
  app.use('/api', notFoundHandler);

  // Uploaded media is public: gift links are public by design.
  app.use(
    '/uploads',
    express.static(uploadsRoot, { maxAge: '365d', immutable: true, fallthrough: false })
  );

  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    app.use(express.static(distDir, { index: 'index.html', maxAge: '1h' }));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    app.use(notFoundHandler);
  }

  app.use(errorHandler);
  return app;
}
