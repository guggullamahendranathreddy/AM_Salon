import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Check,
  MessageCircle,
  Sparkles,
  Calendar as CalendarIcon,
  Tag,
  BookOpen,
} from "lucide-react";
import { BlogArticle, BlogPost } from "../../types";
import BlogCard from "./BlogCard";

interface BlogDetailProps {
  post: BlogArticle | BlogPost;
  allPosts: (BlogArticle | BlogPost)[];
  onBack: () => void;
  onSelectPost: (post: BlogArticle | BlogPost) => void;
  onBookAppointment: () => void;
}

export default function BlogDetail({
  post,
  allPosts,
  onBack,
  onSelectPost,
  onBookAppointment,
}: BlogDetailProps) {
  const [copied, setCopied] = useState(false);

  const publishedDateStr = post.published_at || (post as BlogPost).publishedAt || post.created_at;
  const formattedDate = publishedDateStr
    ? new Date(publishedDateStr).toLocaleDateString("en-US", {
        month: "long",
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

  // STEP 12: Real SEO Metadata & BlogPosting Structured Data Injection
  useEffect(() => {
    const originalTitle = document.title;
    const pageTitle = post.seo_title || `${post.title} | AM Unisex Salon`;
    document.title = pageTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    const newDesc = post.seo_description || post.excerpt;
    if (metaDesc) {
      metaDesc.setAttribute("content", newDesc);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", newDesc);
      document.head.appendChild(metaDesc);
    }

    // OpenGraph Title & Image
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.setAttribute("content", pageTitle);
    document.head.appendChild(ogTitle);

    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.setAttribute("content", coverImage);
    document.head.appendChild(ogImage);

    // BlogPosting Structured Data JSON-LD
    const scriptId = "blog-schema-ld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": [coverImage],
      "datePublished": publishedDateStr,
      "dateModified": post.updated_at || publishedDateStr,
      "author": {
        "@type": "Person",
        "name": authorName,
      },
      "publisher": {
        "@type": "Organization",
        "name": "AM Unisex Salon",
        "url": window.location.origin,
      },
      "description": newDesc,
    });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute("content", originalDesc);
      const schemaScript = document.getElementById(scriptId);
      if (schemaScript) schemaScript.remove();
    };
  }, [post, coverImage, authorName, publishedDateStr]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out this article from AM Unisex Salon: "${post.title}"\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Find related articles in the same category (MUST be published only)
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.status === "PUBLISHED" || (p as BlogPost).isPublished === true)
    )
    .slice(0, 3);

  // Markdown-like content renderer
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];
    let tableBuffer: string[] = [];

    const flushList = (key: number) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="my-4 space-y-2 list-none pl-2">
            {listBuffer.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-luxury-cream/85 text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    const flushTable = (key: number) => {
      if (tableBuffer.length > 0) {
        const rows = tableBuffer
          .map((row) =>
            row
              .split("|")
              .map((c) => c.trim())
              .filter((c, i, arr) => i > 0 && i < arr.length - 1)
          )
          .filter((row) => row.length > 0 && !row.every((c) => /^:?-+:?$/.test(c)));

        if (rows.length > 0) {
          const header = rows[0];
          const body = rows.slice(1);

          elements.push(
            <div key={`table-${key}`} className="my-6 overflow-x-auto rounded-lg border border-secondary/20 shadow-md">
              <table className="w-full text-left text-xs sm:text-sm text-luxury-cream/85">
                <thead className="bg-bg-charcoal/90 text-secondary uppercase font-semibold border-b border-secondary/30">
                  <tr>
                    {header.map((col, idx) => (
                      <th key={idx} className="px-4 py-3">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-bg-charcoal/40">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        tableBuffer = [];
      }
    };

    for (let index = 0; index < lines.length; index++) {
      const line = lines[index].trim();

      if (line.startsWith("|") && line.endsWith("|")) {
        flushList(index);
        tableBuffer.push(line);
        continue;
      } else {
        flushTable(index);
      }

      if (line.startsWith("- ") || line.startsWith("* ")) {
        listBuffer.push(line.substring(2));
        continue;
      } else {
        flushList(index);
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream mt-8 mb-4 border-b border-secondary/20 pb-2"
          >
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="font-display text-xl sm:text-2xl font-semibold text-secondary mt-6 mb-3"
          >
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith("> ")) {
        elements.push(
          <div
            key={index}
            className="my-5 rounded-r-lg border-l-4 border-secondary bg-secondary/10 p-4 sm:p-5 backdrop-blur-sm"
          >
            <p className="font-body italic text-sm sm:text-base text-luxury-cream leading-relaxed">
              {line.substring(2)}
            </p>
          </div>
        );
      } else if (line.startsWith("---")) {
        elements.push(
          <hr key={index} className="my-8 border-t border-white/10" />
        );
      } else if (line.length > 0) {
        elements.push(
          <p
            key={index}
            className="font-body text-sm sm:text-base text-luxury-cream/80 leading-relaxed mb-4"
          >
            {line}
          </p>
        );
      }
    }

    flushList(lines.length);
    flushTable(lines.length);

    return elements;
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-bg-dark text-luxury-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-sm border border-secondary/30 bg-bg-charcoal/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:border-secondary hover:text-white transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-secondary" />
            <span>Back to All Articles</span>
          </button>

          {/* Share links */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#25D366]/20 border border-[#25D366]/40 px-3 py-2 text-xs font-medium text-[#25D366] hover:bg-[#25D366]/30 transition-colors cursor-pointer"
              title="Share via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-sm bg-white/5 border border-white/15 px-3 py-2 text-xs font-medium text-luxury-cream hover:border-secondary transition-colors cursor-pointer"
              title="Copy Article Link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-secondary" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Article Header Card */}
        <div className="rounded-2xl border border-secondary/25 bg-bg-charcoal/90 p-6 sm:p-10 shadow-2xl mb-8">
          
          <div className="flex items-center gap-3 flex-wrap text-xs text-luxury-cream/70 mb-4">
            <span className="rounded-full bg-secondary/15 border border-secondary/35 px-3 py-0.5 text-secondary font-semibold uppercase tracking-wider text-[11px]">
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
              {viewsCount} views
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-cream leading-tight mb-6">
            {post.title}
          </h1>

          <p className="font-body text-base sm:text-lg text-luxury-cream/80 leading-relaxed italic border-l-2 border-primary/60 pl-4 mb-6">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-12 h-12 rounded-full object-cover border border-secondary/40 shadow-sm"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary text-base">
                  {authorName.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-luxury-cream">{authorName}</p>
                <p className="text-xs text-luxury-cream/60">{authorRole}</p>
              </div>
            </div>

            <button
              onClick={onBookAppointment}
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Book This Service</span>
            </button>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative mb-10 overflow-hidden rounded-xl border border-secondary/25 shadow-2xl">
          <img
            src={coverImage}
            alt={imageAlt}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>

        {/* Main Content Body */}
        <article className="prose prose-invert max-w-none mb-12 bg-bg-charcoal/50 p-6 sm:p-10 rounded-xl border border-white/5">
          {renderFormattedContent(post.content)}
        </article>

        {/* Tag pills if present */}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-12 pb-6 border-b border-white/10">
            <Tag className="w-4 h-4 text-secondary shrink-0" />
            <span className="text-xs text-luxury-cream/60 font-semibold uppercase tracking-wider">
              Topic Tags:
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-luxury-cream/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Call to Action Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-secondary/40 bg-gradient-to-br from-bg-charcoal via-primary/10 to-bg-charcoal p-8 sm:p-10 shadow-2xl mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/15 mb-4">
            <Sparkles className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream mb-3">
            Ready to Experience This Transformation?
          </h3>
          <p className="font-body text-sm sm:text-base text-luxury-cream/75 max-w-xl mx-auto mb-6">
            Consult directly with our master stylists and skin therapists at AM Unisex Salon, Nallagandla, Hyderabad. We design customized sessions tailored precisely to your hair texture and skin goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBookAppointment}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>
            <a
              href="tel:+917569979965"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm border border-secondary/40 bg-bg-charcoal px-6 py-3 text-sm font-semibold uppercase tracking-wider text-luxury-cream hover:border-secondary hover:text-white transition-all"
            >
              <span>Call Us: +91 75699 79965</span>
            </a>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-secondary" />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-luxury-cream">
                Related Articles & Insights
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard
                  key={related.id}
                  post={related}
                  onReadClick={(p) => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    onSelectPost(p);
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
