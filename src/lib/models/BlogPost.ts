import mongoose, { Schema } from 'mongoose';
import { User } from './User';

// Force reference to ensure User model is compiled and registered with Mongoose
const _UserRegistered = User;

const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    summary: {
      type: String,
      required: [true, 'SEO Summary is required'],
      trim: true,
      maxlength: [200, 'Summary should be under 200 characters'],
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
      required: true,
      index: true,
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.pre('save', function (this: any) {
  if (this.isModified('status') && this.status === 'Published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
