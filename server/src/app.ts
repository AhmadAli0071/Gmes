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
import { SEO_PAGES, renderSeoPage } from './seo/pages';

const distDir = path.resolve(process.cwd(), 'dist');

export function createApp(): express.Express {
  const app = express();

  app.set('trust proxy', 1);

  // CSP stays off for now: the SPA ships inline JSON-LD, Google Fonts and the
  // GIS script. Hardening that is a separate pass.
  // HSTS lives in nginx (the TLS terminator) so there is exactly one source.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      hsts: false,
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
    const indexHtml = path.join(distDir, 'index.html');
    const shell = fs.readFileSync(indexHtml, 'utf8');
    const seoHtml = new Map<string, string>();

    for (const route of Object.keys(SEO_PAGES)) {
      const html = renderSeoPage(route, shell);
      if (html) seoHtml.set(route, html);
    }

    // Search and social crawlers get route-specific HTML and meta before the
    // SPA boots. Browser visitors still get the full React experience.
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();
      const route = req.path === '/' ? '/' : req.path.replace(/\/+$/, '');
      const html = seoHtml.get(route);
      if (!html) return next();

      res.setHeader('Cache-Control', 'no-cache');
      res.type('html').send(html);
    });

    // Vite fingerprints the bundles, so they can be cached hard. index.html
    // must never be, or a deploy would hand out references to assets that no
    // longer exist.
    app.use(
      express.static(distDir, {
        index: 'index.html',
        maxAge: '1h',
        setHeaders: (res, filePath) => {
          if (filePath === indexHtml) res.setHeader('Cache-Control', 'no-cache');
        },
      })
    );

    // Path routing: /pricing, /g/abc, ... all render the SPA shell.
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(indexHtml);
    });
  } else {
    app.use(notFoundHandler);
  }

  app.use(errorHandler);
  return app;
}
