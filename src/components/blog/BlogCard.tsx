import React from "react";
import { Clock, Calendar, ArrowRight, Eye, Sparkles } from "lucide-react";
import { BlogArticle, BlogPost } from "../../types";

interface BlogCardProps {
  key?: React.Key;
  post: BlogArticle | BlogPost;
  onReadClick: (post: BlogArticle | BlogPost) => void;
  featured?: boolean;
}

export default function BlogCard({ post, onReadClick, featured = false }: BlogCardProps) {
  const publishedDateStr = post.published_at || (post as BlogPost).publishedAt || post.created_at;
  const formattedDate = publishedDateStr
    ? new Date(publishedDateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

  const coverImage = post.featured_image || (post as BlogPost).coverImage || "/images/reception-01.webp";
  const imageAlt = post.image_alt_text || post.title;
  const readTime =
    (post as BlogPost).readTime ||
    `${Math.max(1, Math.ceil((post.content || "").split(/\s+/).length / 180))} min read`;

  const authorName =
    typeof post.author === "string"
      ? post.author
      : (post.author as { name?: string })?.name || "AM Master Stylist";

  const authorRole =
    typeof post.author === "object" && (post.author as { role?: string })?.role
      ? (post.author as { role?: string }).role
      : "AM Salon Specialist";

  const authorAvatar =
    typeof post.author === "object" ? (post.author as { avatar?: string })?.avatar : null;

  const viewsCount = post.view_count !== undefined ? post.view_count : (post as BlogPost).views || 0;
  const tags = (post as BlogPost).tags || [];

  if (featured) {
    return (
      <div
        onClick={() => onReadClick(post)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-secondary/25 bg-bg-charcoal/90 shadow-xl transition-all duration-300 hover:border-secondary/60 hover:shadow-2xl hover:shadow-primary/10 grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        {/* Cover Image Container */}
        <div className="relative lg:col-span-7 h-64 sm:h-80 lg:h-full overflow-hidden">
          <img
            src={coverImage}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-bg-charcoal" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Featured Insight</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-luxury-cream/70 mb-3 flex-wrap">
              <span className="rounded-full bg-secondary/15 border border-secondary/30 px-3 py-0.5 text-secondary font-semibold uppercase tracking-wider text-[11px]">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                {readTime}
              </span>
              <span className="flex items-center gap-1 text-luxury-cream/50">
                <Eye className="w-3.5 h-3.5" />
                {viewsCount}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream group-hover:text-secondary transition-colors duration-200 leading-tight mb-3">
              {post.title}
            </h3>

            <p className="font-body text-sm text-luxury-cream/75 line-clamp-3 leading-relaxed mb-4">
              {post.excerpt}
            </p>

            {/* Tags if present */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-luxury-cream/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Author & Action */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex items-center gap-3">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-9 h-9 rounded-full object-cover border border-secondary/40"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-xs">
                  {authorName.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-luxury-cream">{authorName}</p>
                <p className="text-[10px] text-luxury-cream/50">{authorRole}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-wider">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onReadClick(post)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-secondary/20 bg-bg-charcoal/80 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-xl cursor-pointer"
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden">
          <img
            src={coverImage}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal/90 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-bg-charcoal/90 backdrop-blur-md border border-secondary/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-[11px] text-luxury-cream/60 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-secondary" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-secondary" />
              {readTime}
            </span>
            <span className="flex items-center gap-1 text-luxury-cream/50">
              <Eye className="w-3 h-3" />
              {viewsCount}
            </span>
          </div>

          <h3 className="font-display text-lg font-bold text-luxury-cream group-hover:text-secondary transition-colors duration-200 leading-snug line-clamp-2 mb-2">
            {post.title}
          </h3>

          <p className="font-body text-xs text-luxury-cream/70 line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-7 h-7 rounded-full object-cover border border-secondary/30"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-[10px]">
              {authorName.charAt(0)}
            </div>
          )}
          <span className="text-[11px] text-luxury-cream/80 truncate max-w-[130px]">
            {authorName}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary group-hover:text-primary transition-colors uppercase tracking-wider">
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}
