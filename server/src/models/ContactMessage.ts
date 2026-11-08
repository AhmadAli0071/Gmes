import { Schema, model } from 'mongoose';

/** Messages sent from the /contact-us page. Admin-only read. */
const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });

export const ContactMessage = model('ContactMessage', contactMessageSchema);
