import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage: string;
  imageAltText?: string;
  tags: string[];
  published: boolean;
  publishedAt: Date | null;
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    excerpt: { type: String, default: "", trim: true },
    content: { type: String, required: true },
    author: { type: String, default: "AM Master Stylist", trim: true },
    category: { type: String, default: "Hair Care", trim: true, index: true },
    coverImage: { type: String, default: "" },
    imageAltText: { type: String, default: "" },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null, index: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    views: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  }
);

export const Blog: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog>) ||
  mongoose.model<IBlog>("Blog", BlogSchema);
