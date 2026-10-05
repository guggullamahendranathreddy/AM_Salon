export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  category: "men" | "women" | "skin" | "hair" | "bridal";
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "hair-styling" | "hair-wash" | "facial" | "interiors" | "products" | "menus";
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OfferItem {
  id: string;
  title: string;
  discount: string;
  description: string;
  code: string;
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
}

export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface BlogAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  image_alt_text?: string;
  category: string;
  author: string;
  status: BlogStatus;
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  view_count: number;
}

// UI-compatible unified model
export interface BlogPost extends BlogArticle {
  // Aliases for component convenience
  coverImage?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  views?: number;
  readTime?: string;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
}


