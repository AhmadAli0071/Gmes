import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

sessionSchema.index({ token: 1 }, { unique: true });
sessionSchema.index({ userId: 1 });
// Mongo drops expired sessions on its own.
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = model('Session', sessionSchema);
