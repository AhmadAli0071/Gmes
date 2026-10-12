/**
 * Local MongoDB for development: boots an ephemeral-but-persistent mongod on
 * 27017 so `npm run dev` + `npm run server` work without a system install.
 *
 *   npm run db:dev
 */
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const dbPath = path.join(root, '.data', 'mongo');
await fs.mkdir(dbPath, { recursive: true });

const mongod = await MongoMemoryServer.create({
  instance: { port: 27017, dbName: 'gems', dbPath, storageEngine: 'wiredTiger' },
});

console.log(`[db] MongoDB ready at ${mongod.getUri()}`);
console.log('[db] Press Ctrl+C to stop.');

const stop = async () => {
  await mongod.stop();
  process.exit(0);
};
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
setInterval(() => {}, 1 << 30);
