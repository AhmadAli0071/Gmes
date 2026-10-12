import { Schema, model } from 'mongoose';

/**
 * A gift is the unit the product shares: the same document backs the creator's
 * dashboard entry and the recipient's unboxing screen (looked up by shareCode).
 *
 * `photos` / `voiceNoteUrl` hold **URLs** (`/uploads/...`), never base64 — the
 * old localStorage build stored data URLs and blew the 5MB quota.
 */
const giftSchema = new Schema(
  {
    shareCode: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    // Device secret set by the client so a logged-out visitor keeps their own
    // gifts (and can attach them to an account later via /api/auth/claim).
    ownerToken: { type: String, default: null },

    recipientName: { type: String, required: true, trim: true, maxlength: 80 },
    senderName: { type: String, required: true, trim: true, maxlength: 80 },
    message: { type: String, default: '', maxlength: 4000 },

    templateId: { type: String, default: '', maxlength: 64 },
    eventSlug: { type: String, default: 'other', maxlength: 32 },
    mood: { type: String, default: 'magical', maxlength: 24 },
    fontStyle: { type: String, default: 'modern', maxlength: 24 },
    musicTrack: { type: String, default: 'none', maxlength: 24 },
    animationEffect: { type: String, default: 'confetti', maxlength: 24 },

    photos: { type: [String], default: [] },
    voiceNoteUrl: { type: String, default: null },
    voiceNoteDuration: { type: Number, default: 0 },
    videoUrl: { type: String, default: null },

    boxColor: { type: String, default: '#6D28D9', maxlength: 32 },
    ribbonColor: { type: String, default: '#F59E0B', maxlength: 32 },

    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

giftSchema.index({ shareCode: 1 }, { unique: true });
giftSchema.index({ ownerId: 1, createdAt: -1 });
giftSchema.index({ ownerToken: 1, createdAt: -1 });

export const Gift = model('Gift', giftSchema);
