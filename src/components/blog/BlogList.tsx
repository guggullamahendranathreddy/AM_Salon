import React, { useState, useMemo } from "react";
import { Search, Sparkles, SlidersHorizontal, Lock, BookOpen, RefreshCw } from "lucide-react";
import { BlogArticle, BlogPost } from "../../types";
import { BLOG_CATEGORIES } from "./blogData";
import BlogCard from "./BlogCard";

interface BlogListProps {
  posts: (BlogArticle | BlogPost)[];
  onSelectPost: (post: BlogArticle | BlogPost) => void;
  onOpenAdmin: () => void;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export default function BlogList({
  posts,
  onSelectPost,
  onOpenAdmin,
  isLoading = false,
  onRefresh,
}: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Must be PUBLISHED for public customers
      const isPublished =
        post.status === "PUBLISHED" || (post as BlogPost).isPublished === true;
      if (!isPublished) return false;

      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Determine featured post
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery.trim() !== "") {
      return null;
    }
    return filteredPosts.find((p) => p.featured || (p as BlogPost).isFeatured) || filteredPosts[0] || null;
  }, [filteredPosts, selectedCategory, searchQuery]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  const hasNoArticlesAtAll = posts.length === 0;

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-bg-dark text-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="relative mb-12 rounded-3xl border border-secondary/25 bg-gradient-to-br from-bg-charcoal via-bg-dark to-bg-charcoal p-8 sm:p-14 shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 border border-secondary/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-secondary mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AM Unisex Salon Journal</span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-cream leading-tight mb-4">
                Hair Wisdom, Skin Science & Salon Stories
              </h1>
              
              <p className="font-body text-sm sm:text-base text-luxury-cream/70 leading-relaxed">
                Expert tips, treatment guides, bridal roadmaps, and latest announcements directly from our master stylists and certified aesthetic practitioners at AM Unisex Salon, Pragathi Nagar, Hyderabad.
              </p>
            </div>

            {/* Quick Actions / Admin portal access */}
            <div className="flex items-center gap-3 shrink-0">
              {onRefresh && (
                <button
                  onClick={onRefresh}
                  className="p-2.5 rounded-sm border border-white/10 bg-bg-charcoal/80 text-luxury-cream/70 hover:text-white hover:border-secondary transition-all"
                  title="Refresh articles from database"
                  aria-label="Refresh articles"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-secondary" : ""}`} />
                </button>
              )}
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 rounded-sm border border-secondary/35 bg-bg-charcoal/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:border-secondary hover:bg-secondary/15 hover:text-white transition-all shadow-sm cursor-pointer"
                title="Salon Staff & Digital Team Admin Portal"
              >
                <Lock className="w-3.5 h-3.5 text-secondary" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Categories Container */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-secondary text-white shadow-md shadow-secondary/20"
                    : "bg-white/5 text-luxury-cream/75 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                All Articles
              </button>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-secondary text-white shadow-md shadow-secondary/20"
                    : "bg-white/5 text-luxury-cream/75 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-luxury-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hair care, skin, bridal tips..."
                className="w-full rounded-sm border border-secondary/25 bg-bg-charcoal/90 pl-10 pr-4 py-2.5 text-xs text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-luxury-cream/40 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Content Section */}
        {isLoading && posts.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <RefreshCw className="w-8 h-8 text-secondary animate-spin mb-3" />
            <p className="text-sm text-luxury-cream/70">Connecting to database...</p>
          </div>
        ) : hasNoArticlesAtAll ? (
          /* STEP 10: Professional Empty State for Production Initial Zero Articles */
          <div className="py-20 text-center rounded-2xl border border-secondary/25 p-12 bg-bg-charcoal/60 shadow-xl max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/15 border border-secondary/30 text-secondary mb-5">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream mb-3">
              Beauty & Grooming Insights Coming Soon
            </h3>
            <p className="font-body text-sm sm:text-base text-luxury-cream/70 max-w-lg mx-auto mb-6 leading-relaxed">
              Our team is preparing helpful hair, skin and beauty guides for you. Check back soon for expert styling advice, treatments, and salon updates!
            </p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 rounded-sm border border-secondary/35 bg-bg-dark px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:border-secondary hover:text-white transition-all cursor-pointer shadow-sm"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Digital Team Login</span>
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          /* Search returned no results */
          <div className="py-20 text-center rounded-2xl border border-dashed border-white/10 p-12 bg-bg-charcoal/40">
            <BookOpen className="w-12 h-12 text-secondary/50 mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold text-luxury-cream mb-2">
              No matching articles found
            </h3>
            <p className="font-body text-sm text-luxury-cream/60 max-w-md mx-auto mb-6">
              We couldn't find any articles matching your search query. Try clearing your search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 rounded-sm bg-secondary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow hover:brightness-110 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Article Card (if present) */}
            {featuredPost && (
              <div>
                <BlogCard
                  post={featuredPost}
                  onReadClick={onSelectPost}
                  featured={true}
                />
              </div>
            )}

            {/* Grid of Other Articles */}
            {regularPosts.length > 0 && (
              <div>
                {featuredPost && (
                  <div className="flex items-center gap-2 mb-6">
                    <SlidersHorizontal className="w-4 h-4 text-secondary" />
                    <h2 className="font-display text-xl font-bold text-luxury-cream">
                      All Stories & Guides ({filteredPosts.length})
                    </h2>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {regularPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onReadClick={onSelectPost}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
