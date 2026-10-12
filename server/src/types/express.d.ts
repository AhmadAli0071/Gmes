/// <reference types="express" />

import type { PublicUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      /** Populated by attachUser; null for anonymous visitors. */
      user?: PublicUser & { _id?: any; role?: string } | any | null;
    }
  }
}

export {};
