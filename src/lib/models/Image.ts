import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
  size: number;
  uploadedAt: Date;
}

const ImageSchema: Schema<IImage> = new Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const Image: Model<IImage> = mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
