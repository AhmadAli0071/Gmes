import { createApp } from './app';
import { connectDb, disconnectDb } from './config/db';
import { env } from './config/env';

async function main(): Promise<void> {
  await connectDb();
  const app = createApp();

  const server = app.listen(env.port, () => {
    console.log(`[api] listening on http://localhost:${env.port} (${env.isProd ? 'prod' : 'dev'})`);
  });

  const shutdown = async (signal: string) => {
    console.log(`[api] ${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDb();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 8000).unref();
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

main().catch((err) => {
  console.error('[api] failed to start:', err);
  process.exit(1);
});
