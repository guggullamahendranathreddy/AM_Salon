import React, { useState } from "react";
import {
  Lock,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Image as ImageIcon,
  Save,
  X,
  FileText,
  BarChart3,
  ExternalLink,
  LogOut,
  Upload,
  Globe,
  Archive,
  Search,
} from "lucide-react";
import { BlogArticle, BlogPost, BlogStatus } from "../../types";
import { BLOG_CATEGORIES, PRESET_BLOG_IMAGES } from "./blogData";
import { renderMarkdownBlocks } from "../../lib/markdown";

interface BlogAdminProps {
  posts: (BlogArticle | BlogPost)[];
  onBackToBlog: () => void;
  onPreviewPost: (post: BlogArticle | BlogPost) => void;
  onCreatePost: (post: Partial<BlogArticle>) => Promise<boolean>;
  onUpdatePost: (id: string, updates: Partial<BlogArticle>) => Promise<boolean>;
  onDeletePost: (id: string) => Promise<boolean>;
  onUploadImage?: (file: File) => Promise<string>;
  adminUser: { email?: string; name?: string } | null;
  onLoginWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onLogout: () => void;
}

export default function BlogAdmin({
  posts,
  onBackToBlog,
  onPreviewPost,
  onCreatePost,
  onUpdatePost,
  onDeletePost,
  onUploadImage,
  adminUser,
  onLoginWithCredentials,
  onLogout,
}: BlogAdminProps) {
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Editor form state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "seo" | "preview">("write");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filter state in dashboard
  const [statusFilter, setStatusFilter] = useState<"all" | "PUBLISHED" | "DRAFT" | "ARCHIVED">("all");
  const [searchFilter, setSearchFilter] = useState("");

  // Editor Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Hair Care");
  const [formAuthor, setFormAuthor] = useState("AM Master Stylist");
  const [formCoverImage, setFormCoverImage] = useState(PRESET_BLOG_IMAGES[0]?.url || "");
  const [formImageAlt, setFormImageAlt] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState<BlogStatus>("DRAFT");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formSeoTitle, setFormSeoTitle] = useState("");
  const [formSeoDesc, setFormSeoDesc] = useState("");

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    const res = await onLoginWithCredentials(email, password);
    if (!res.success) {
      setLoginError(res.error || "Invalid credentials. Please verify your email and password.");
    }
    setIsLoggingIn(false);
  };

  // Helper to generate SEO-friendly slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (newTitle: string) => {
    setFormTitle(newTitle);
    if (!editingPostId) {
      setFormSlug(generateSlug(newTitle));
      setFormSeoTitle(`${newTitle} | AM Unisex Salon`);
    }
  };

  const openNewPostEditor = () => {
    setEditingPostId(null);
    setFormTitle("");
    setFormSlug("");
    setFormCategory("Hair Care");
    setFormAuthor("AM Master Stylist");
    setFormCoverImage(PRESET_BLOG_IMAGES[0]?.url || "");
    setFormImageAlt("");
    setFormExcerpt("");
    setFormContent(
      `## Introduction\n\nShare professional hair, beauty, or grooming advice with your customers.\n\n### Key Highlights\n\n- Tip 1: Deep hydration therapy\n- Tip 2: Scalp nourishing botanicals\n\n> **Stylist Tip:** Always consult our salon experts before applying chemical treatments!`
    );
    setFormStatus("DRAFT");
    setFormFeatured(false);
    setFormSeoTitle("");
    setFormSeoDesc("");
    setActiveTab("write");
    setIsEditorOpen(true);
  };

  const openEditPostEditor = (post: BlogArticle | BlogPost) => {
    setEditingPostId(post.id);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormAuthor(
      typeof post.author === "string"
        ? post.author
        : (post.author as { name?: string })?.name || "AM Master Stylist"
    );
    setFormCoverImage(post.featured_image || (post as BlogPost).coverImage || "");
    setFormImageAlt(post.image_alt_text || "");
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormStatus(post.status || ((post as BlogPost).isPublished ? "PUBLISHED" : "DRAFT"));
    setFormFeatured(post.featured || (post as BlogPost).isFeatured || false);
    setFormSeoTitle(post.seo_title || "");
    setFormSeoDesc(post.seo_description || "");
    setActiveTab("write");
    setIsEditorOpen(true);
  };

  // Handle Real Image File Upload with graceful fallback
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      if (onUploadImage) {
        try {
          const publicUrl = await onUploadImage(file);
          setFormCoverImage(publicUrl);
          setFeedbackMsg({ type: "success", text: "Image uploaded to Cloudinary successfully!" });
          setTimeout(() => setFeedbackMsg(null), 3000);
          return;
        } catch (uploadErr: unknown) {
          const msg = uploadErr instanceof Error ? uploadErr.message : String(uploadErr);
          if (msg.toLowerCase().includes("cloudinary")) {
            // Graceful fallback to local FileReader if Cloudinary is not yet configured in .env
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormCoverImage(reader.result as string);
              setFeedbackMsg({
                type: "success",
                text: "Image loaded preview! (Add Cloudinary keys to .env for permanent CDN storage).",
              });
              setTimeout(() => setFeedbackMsg(null), 4000);
            };
            reader.readAsDataURL(file);
            return;
          }
          throw uploadErr;
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormCoverImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to upload image";
      alert("Image upload failed: " + errorMsg);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Save / Update Article
  const handleSavePost = async (targetStatus?: BlogStatus) => {
    if (!formTitle.trim()) {
      alert("Please provide an article title.");
      return;
    }
    if (!formContent.trim()) {
      alert("Please provide article content.");
      return;
    }

    const finalStatus = targetStatus || formStatus;
    const finalSlug = formSlug.trim() || generateSlug(formTitle);

    setIsSaving(true);

    const postPayload: Partial<BlogArticle> = {
      title: formTitle.trim(),
      slug: finalSlug,
      category: formCategory,
      author: formAuthor.trim() || "AM Master Stylist",
      featured_image: formCoverImage,
      image_alt_text: formImageAlt.trim() || formTitle.trim(),
      excerpt: formExcerpt.trim() || formTitle.trim(),
      content: formContent.trim(),
      status: finalStatus,
      featured: formFeatured,
      seo_title: formSeoTitle.trim() || `${formTitle.trim()} | AM Unisex Salon`,
      seo_description: formSeoDesc.trim() || formExcerpt.trim(),
    };

    let success = false;
    if (editingPostId) {
      success = await onUpdatePost(editingPostId, postPayload);
    } else {
      success = await onCreatePost(postPayload);
    }

    setIsSaving(false);
    if (success) {
      setIsEditorOpen(false);
      setFeedbackMsg({
        type: "success",
        text: editingPostId
          ? "Article updated successfully in database!"
          : finalStatus === "PUBLISHED"
          ? "Article published live to AM Unisex Salon Blog!"
          : "Draft saved to database.",
      });
      setTimeout(() => setFeedbackMsg(null), 3500);
    } else {
      setFeedbackMsg({
        type: "error",
        text: "Could not save article. Please check database connection.",
      });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      const ok = await onDeletePost(id);
      if (ok) {
        setFeedbackMsg({ type: "success", text: "Article permanently deleted from database." });
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    }
  };

  const handleStatusChange = async (post: BlogArticle | BlogPost, newStatus: BlogStatus) => {
    await onUpdatePost(post.id, { status: newStatus });
    setFeedbackMsg({
      type: "success",
      text: `Article status changed to ${newStatus}.`,
    });
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const insertText = (syntax: string) => {
    setFormContent((prev) => prev + "\n" + syntax + "\n");
  };

  // STEP 11: Real Database Statistics (No fake numbers!)
  const totalArticles = posts.length;
  const publishedCount = posts.filter(
    (p) => p.status === "PUBLISHED" || (p as BlogPost).isPublished === true
  ).length;
  const draftsCount = posts.filter(
    (p) => p.status === "DRAFT" || (p.status !== "PUBLISHED" && p.status !== "ARCHIVED")
  ).length;
  const archivedCount = posts.filter((p) => p.status === "ARCHIVED").length;
  const totalViews = posts.reduce(
    (acc, p) => acc + (p.view_count !== undefined ? p.view_count : (p as BlogPost).views || 0),
    0
  );

  // Filtered posts for the table
  const displayedPosts = posts.filter((p) => {
    const currentStatus = p.status || ((p as BlogPost).isPublished ? "PUBLISHED" : "DRAFT");
    if (statusFilter !== "all" && currentStatus !== statusFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const authorStr = typeof p.author === "string" ? p.author : (p.author as { name?: string })?.name || "";
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        authorStr.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // 1. Unauthenticated Login Gate
  if (!adminUser) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 bg-bg-dark text-luxury-cream">
        <div className="w-full max-w-md rounded-2xl border border-secondary/30 bg-bg-charcoal/95 p-8 shadow-2xl backdrop-blur-md">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/20 text-secondary mb-4 border border-secondary/40">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-display text-2xl font-bold text-luxury-cream">
              AM Unisex Salon Portal
            </h2>
            <p className="font-body text-xs text-luxury-cream/65 mt-1">
              Digital Marketing & Management Authentication
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                autoComplete="off"
                className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-sm text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                Password / Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-sm text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none"
                required
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 rounded bg-red-500/15 border border-red-500/30 p-2.5 text-xs text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-sm bg-gradient-to-r from-primary to-secondary py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In to Studio"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <button
              onClick={onBackToBlog}
              className="inline-flex items-center gap-1.5 text-xs text-luxury-cream/70 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Blog</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Studio Dashboard
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-bg-dark text-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Notification Toast */}
        {feedbackMsg && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-lg p-4 text-xs font-semibold uppercase tracking-wider shadow-xl ${
              feedbackMsg.type === "success"
                ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                : "bg-red-950/80 border border-red-500/50 text-red-300"
            }`}
          >
            {feedbackMsg.type === "success" ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                AM Unisex Salon • Production CMS
              </span>
              {adminUser.email && (
                <span className="text-[11px] text-luxury-cream/50 ml-2">
                  ({adminUser.email})
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl font-bold text-luxury-cream mt-1">
              Blog Management Studio
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={openNewPostEditor}
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>

            <button
              onClick={onBackToBlog}
              className="inline-flex items-center gap-2 rounded-sm border border-secondary/35 bg-bg-charcoal px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-luxury-cream hover:border-secondary hover:text-white transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-secondary" />
              <span>View Public Blog</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-sm border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-300 hover:bg-red-500/20 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* STEP 11: Real Performance Metrics (No fake numbers!) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="rounded-xl border border-secondary/20 bg-bg-charcoal/80 p-5 shadow">
            <div className="flex items-center justify-between text-luxury-cream/60 mb-2">
              <span className="text-xs uppercase font-semibold">Total</span>
              <FileText className="w-4 h-4 text-secondary" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream">
              {totalArticles}
            </p>
          </div>

          <div className="rounded-xl border border-secondary/20 bg-bg-charcoal/80 p-5 shadow">
            <div className="flex items-center justify-between text-luxury-cream/60 mb-2">
              <span className="text-xs uppercase font-semibold">Published</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
              {publishedCount}
            </p>
          </div>

          <div className="rounded-xl border border-secondary/20 bg-bg-charcoal/80 p-5 shadow">
            <div className="flex items-center justify-between text-luxury-cream/60 mb-2">
              <span className="text-xs uppercase font-semibold">Drafts</span>
              <EyeOff className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-amber-400">
              {draftsCount}
            </p>
          </div>

          <div className="rounded-xl border border-secondary/20 bg-bg-charcoal/80 p-5 shadow">
            <div className="flex items-center justify-between text-luxury-cream/60 mb-2">
              <span className="text-xs uppercase font-semibold">Archived</span>
              <Archive className="w-4 h-4 text-luxury-cream/40" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream/60">
              {archivedCount}
            </p>
          </div>

          <div className="rounded-xl border border-secondary/20 bg-bg-charcoal/80 p-5 shadow col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-luxury-cream/60 mb-2">
              <span className="text-xs uppercase font-semibold">Total Reads</span>
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-bold text-secondary">
              {totalViews}
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === "all"
                  ? "bg-secondary text-white shadow"
                  : "bg-white/5 text-luxury-cream/70 hover:text-white"
              }`}
            >
              All ({totalArticles})
            </button>
            <button
              onClick={() => setStatusFilter("PUBLISHED")}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === "PUBLISHED"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-white/5 text-luxury-cream/70 hover:text-white"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("DRAFT")}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === "DRAFT"
                  ? "bg-amber-600 text-white shadow"
                  : "bg-white/5 text-luxury-cream/70 hover:text-white"
              }`}
            >
              Drafts ({draftsCount})
            </button>
            <button
              onClick={() => setStatusFilter("ARCHIVED")}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === "ARCHIVED"
                  ? "bg-stone-600 text-white shadow"
                  : "bg-white/5 text-luxury-cream/70 hover:text-white"
              }`}
            >
              Archived ({archivedCount})
            </button>
          </div>

          <div className="relative max-w-xs">
            <Search className="w-3.5 h-3.5 text-luxury-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-sm border border-secondary/20 bg-bg-charcoal pl-8 pr-3 py-1.5 text-xs text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        {/* Article Table */}
        <div className="overflow-hidden rounded-xl border border-secondary/20 bg-bg-charcoal/80 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-luxury-cream">
              <thead className="bg-bg-charcoal text-secondary uppercase font-semibold border-b border-white/10 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayedPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-luxury-cream/50">
                      No articles in database matching current filter. Click "Create Article" to publish your first post!
                    </td>
                  </tr>
                ) : (
                  displayedPosts.map((post) => {
                    const currentStatus =
                      post.status || ((post as BlogPost).isPublished ? "PUBLISHED" : "DRAFT");
                    const cover =
                      post.featured_image || (post as BlogPost).coverImage || "/images/reception-01.webp";
                    const authorName =
                      typeof post.author === "string"
                        ? post.author
                        : (post.author as { name?: string })?.name || "AM Master Stylist";

                    return (
                      <tr key={post.id} className="hover:bg-white/5 transition-colors">
                        {/* Cover & Title */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={cover}
                              alt={post.image_alt_text || post.title}
                              className="w-12 h-10 rounded object-cover border border-secondary/20 shrink-0"
                            />
                            <div className="max-w-xs sm:max-w-md">
                              <p className="font-semibold text-luxury-cream truncate">
                                {post.title}
                              </p>
                              <p className="text-[10px] text-luxury-cream/50 truncate">
                                /{post.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-semibold text-secondary">
                            {post.category}
                          </span>
                        </td>

                        {/* Author */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-luxury-cream/80">
                          {authorName}
                        </td>

                        {/* Status Lifecycle Dropdown / Toggle */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(post, e.target.value as BlogStatus)}
                            className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-bg-dark border cursor-pointer focus:outline-none ${
                              currentStatus === "PUBLISHED"
                                ? "text-emerald-400 border-emerald-500/40"
                                : currentStatus === "DRAFT"
                                ? "text-amber-400 border-amber-500/40"
                                : "text-luxury-cream/50 border-white/20"
                            }`}
                          >
                            <option value="DRAFT">DRAFT</option>
                            <option value="PUBLISHED">PUBLISHED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-luxury-cream/60">
                          {(() => {
                            const rawDate = post.published_at || (post as BlogPost).publishedAt || post.created_at || (post as BlogPost).createdAt;
                            if (!rawDate) return new Date().toLocaleDateString();
                            const parsed = new Date(rawDate);
                            return isNaN(parsed.getTime()) ? new Date().toLocaleDateString() : parsed.toLocaleDateString();
                          })()}
                        </td>

                        {/* Real Views */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-luxury-cream/70">
                          {post.view_count !== undefined ? post.view_count : (post as BlogPost).views || 0}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => onPreviewPost(post)}
                              className="p-1.5 rounded text-luxury-cream/70 hover:text-white hover:bg-white/10 cursor-pointer"
                              title="Preview Article"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openEditPostEditor(post)}
                              className="p-1.5 rounded text-secondary hover:text-white hover:bg-secondary/20 cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id, post.title)}
                              className="p-1.5 rounded text-red-400 hover:text-red-200 hover:bg-red-500/20 cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Comprehensive Article Editor Modal */}
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-4xl my-8 rounded-2xl border border-secondary/35 bg-bg-charcoal p-6 sm:p-8 shadow-2xl max-h-[92vh] flex flex-col">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-secondary/15 text-secondary">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-luxury-cream">
                      {editingPostId ? "Edit Article" : "Create New Article"}
                    </h2>
                    <p className="text-xs text-luxury-cream/60">
                      AM Unisex Salon Production CMS
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Tabs: Write | SEO | Preview */}
                  <div className="flex rounded-sm border border-secondary/30 bg-bg-dark p-0.5">
                    <button
                      onClick={() => setActiveTab("write")}
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        activeTab === "write"
                          ? "bg-secondary text-white shadow"
                          : "text-luxury-cream/70 hover:text-white"
                      }`}
                    >
                      Content
                    </button>
                    <button
                      onClick={() => setActiveTab("seo")}
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        activeTab === "seo"
                          ? "bg-secondary text-white shadow"
                          : "text-luxury-cream/70 hover:text-white"
                      }`}
                    >
                      SEO & Meta
                    </button>
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                        activeTab === "preview"
                          ? "bg-secondary text-white shadow"
                          : "text-luxury-cream/70 hover:text-white"
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  <button
                    onClick={() => setIsEditorOpen(false)}
                    className="p-1.5 rounded text-luxury-cream/60 hover:text-white cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-1">
                {activeTab === "write" ? (
                  <>
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Essential Hair Care Routine for Hyderabad Weather"
                        className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-sm text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none"
                      />
                    </div>

                    {/* Slug & Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                          SEO URL Slug *
                        </label>
                        <div className="flex items-center rounded-sm border border-secondary/30 bg-bg-dark px-3 py-2 text-xs">
                          <span className="text-luxury-cream/40 mr-1 select-none">/blog/</span>
                          <input
                            type="text"
                            value={formSlug}
                            onChange={(e) => setFormSlug(generateSlug(e.target.value))}
                            placeholder="article-slug"
                            className="flex-1 bg-transparent text-luxury-cream focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                          Category
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-3 py-2.5 text-xs text-luxury-cream focus:border-secondary focus:outline-none cursor-pointer"
                        >
                          {BLOG_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Author & Publishing Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                          Author
                        </label>
                        <input
                          type="text"
                          value={formAuthor}
                          onChange={(e) => setFormAuthor(e.target.value)}
                          placeholder="e.g. AM Master Stylist"
                          className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-xs text-luxury-cream focus:border-secondary focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                          Status Lifecycle
                        </label>
                        <select
                          value={formStatus}
                          onChange={(e) => setFormStatus(e.target.value as BlogStatus)}
                          className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-3 py-2.5 text-xs text-luxury-cream focus:border-secondary focus:outline-none cursor-pointer"
                        >
                          <option value="DRAFT">DRAFT (Internal only, not public)</option>
                          <option value="PUBLISHED">PUBLISHED (Visible to public customers)</option>
                          <option value="ARCHIVED">ARCHIVED (Hidden from public)</option>
                        </select>
                      </div>
                    </div>

                    {/* STEP 7: Real Image Upload to Supabase Storage */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-secondary">
                          Featured Image (Upload or URL)
                        </label>
                        {isUploadingImage && (
                          <span className="text-xs text-secondary animate-pulse">
                            Uploading to Cloud Storage...
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
                        <div className="sm:col-span-8">
                          <input
                            type="text"
                            value={formCoverImage}
                            onChange={(e) => setFormCoverImage(e.target.value)}
                            placeholder="https://... image CDN URL"
                            className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-xs text-luxury-cream focus:border-secondary focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-4 flex items-center">
                          <label className="w-full inline-flex items-center justify-center gap-2 rounded-sm border border-secondary/40 bg-secondary/15 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:bg-secondary/25 transition-all cursor-pointer">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              disabled={isUploadingImage}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Image Alt Text */}
                      <input
                        type="text"
                        value={formImageAlt}
                        onChange={(e) => setFormImageAlt(e.target.value)}
                        placeholder="Image descriptive alt text (for SEO & accessibility)"
                        className="w-full rounded-sm border border-white/10 bg-bg-dark px-3 py-2 text-xs text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none mb-3"
                      />

                      {/* Presets Gallery */}
                      <div>
                        <p className="text-[11px] text-luxury-cream/60 mb-2 flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-secondary" />
                          <span>Or select a curated AM Unisex Salon photography preset:</span>
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PRESET_BLOG_IMAGES.map((preset, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setFormCoverImage(preset.url);
                                if (!formImageAlt) setFormImageAlt(preset.label);
                              }}
                              className={`group relative rounded overflow-hidden cursor-pointer border transition-all h-16 ${
                                formCoverImage === preset.url
                                  ? "border-secondary ring-2 ring-secondary"
                                  : "border-white/10 hover:border-secondary/60 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                                <span className="text-[9px] font-semibold text-white leading-tight">
                                  {preset.label}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                        Excerpt / Summary *
                      </label>
                      <textarea
                        rows={2}
                        value={formExcerpt}
                        onChange={(e) => setFormExcerpt(e.target.value)}
                        placeholder="A concise 2-sentence summary displayed on article cards..."
                        className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2 text-xs text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none"
                      />
                    </div>

                    {/* Article Content */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-secondary">
                          Article Body Content *
                        </label>
                        <div className="flex items-center gap-1 text-[11px]">
                          <button
                            type="button"
                            onClick={() => insertText("## Section Heading")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-luxury-cream/70 cursor-pointer"
                          >
                            + H2 Heading
                          </button>
                          <button
                            type="button"
                            onClick={() => insertText("> **Stylist Tip:** Enter beauty tip here")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-luxury-cream/70 cursor-pointer"
                          >
                            + Tip Callout
                          </button>
                          <button
                            type="button"
                            onClick={() => insertText("- Step 1\n- Step 2")}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-luxury-cream/70 cursor-pointer"
                          >
                            + List
                          </button>
                        </div>
                      </div>

                      <textarea
                        rows={12}
                        value={formContent}
                        onChange={(e) => setFormContent(e.target.value)}
                        placeholder="Full article content in Markdown format..."
                        className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-3 font-mono text-xs text-luxury-cream placeholder:text-luxury-cream/40 focus:border-secondary focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="pt-1">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formFeatured}
                          onChange={(e) => setFormFeatured(e.target.checked)}
                          className="rounded border-secondary/40 text-secondary focus:ring-0 w-4 h-4"
                        />
                        <span className="text-xs font-semibold text-secondary">
                          Pin as Featured Article on public blog hero
                        </span>
                      </label>
                    </div>
                  </>
                ) : activeTab === "seo" ? (
                  /* STEP 12: SEO & Meta Settings Tab */
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-bg-dark border border-secondary/20">
                      <div className="flex items-center gap-2 text-secondary mb-2">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          Search Engine Preview
                        </span>
                      </div>
                      <p className="text-blue-400 text-sm font-semibold truncate hover:underline cursor-pointer">
                        {formSeoTitle || `${formTitle || "Article Title"} | AM Unisex Salon`}
                      </p>
                      <p className="text-emerald-500 text-xs truncate">
                        https://amsalon.com/blog/{formSlug || "slug"}
                      </p>
                      <p className="text-xs text-luxury-cream/70 line-clamp-2 mt-1">
                        {formSeoDesc || formExcerpt || "Meta description preview for Google search..."}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                        SEO Meta Title
                      </label>
                      <input
                        type="text"
                        value={formSeoTitle}
                        onChange={(e) => setFormSeoTitle(e.target.value)}
                        placeholder="e.g. Keratin vs Hair Botox: Complete Guide | AM Unisex Salon"
                        className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-xs text-luxury-cream focus:border-secondary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                        SEO Meta Description
                      </label>
                      <textarea
                        rows={3}
                        value={formSeoDesc}
                        onChange={(e) => setFormSeoDesc(e.target.value)}
                        placeholder="Concise 150-character meta description for search engines..."
                        className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2 text-xs text-luxury-cream focus:border-secondary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5">
                        Image Alt Text
                      </label>
                      <input
                        type="text"
                        value={formImageAlt}
                        onChange={(e) => setFormImageAlt(e.target.value)}
                        placeholder="Descriptive image text"
                        className="w-full rounded-sm border border-secondary/30 bg-bg-dark px-4 py-2.5 text-xs text-luxury-cream focus:border-secondary focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  /* Preview Tab */
                  <div className="space-y-6">
                    <div className="p-5 rounded-lg bg-bg-dark border border-secondary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded bg-secondary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                          {formCategory}
                        </span>
                        <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase font-semibold text-luxury-cream/60">
                          {formStatus}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-luxury-cream">
                        {formTitle || "Untitled Article"}
                      </h2>
                      <p className="text-xs text-luxury-cream/60 mt-1">
                        By {formAuthor}
                      </p>
                      {formCoverImage && (
                        <img
                          src={formCoverImage}
                          alt={formImageAlt || formTitle}
                          className="w-full h-48 sm:h-64 object-cover rounded-lg mt-4 border border-white/10"
                        />
                      )}
                      <p className="text-sm italic text-luxury-cream/80 mt-4 border-l-2 border-secondary pl-3">
                        {formExcerpt || "No excerpt provided."}
                      </p>
                    </div>

                    <div className="p-5 rounded-lg bg-bg-dark/70 border border-white/5 font-body leading-relaxed">
                      {formContent ? (
                        renderMarkdownBlocks(formContent)
                      ) : (
                        <p className="text-xs text-luxury-cream/40 italic">No content written yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 shrink-0 flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider text-luxury-cream/70 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSavePost("DRAFT")}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-sm border border-secondary/40 bg-bg-dark px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:border-secondary hover:text-white transition-all cursor-pointer"
                  >
                    <span>Save Draft</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSavePost("PUBLISHED")}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? "Publishing..." : "Publish Article"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
