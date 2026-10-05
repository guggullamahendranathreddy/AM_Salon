import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { connectDB } from "../db";
import { Blog } from "../models/Blog";
import { requireAdmin, AuthRequest, JWT_SECRET } from "../middleware/auth";

const router = Router();

// In-memory debounce set for views: ip + articleId -> timestamp
const recentViews = new Map<string, number>();

// Helper to check if requester is an authenticated admin
function isAdminRequest(req: Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role?: string };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}

// Helper to sanitize slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// GET /api/blogs (Public: only published. Admin: can fetch all if authenticated)
router.get("/", async (req: Request, res: Response) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      res.status(200).json({
        success: true,
        count: 0,
        posts: [],
      });
      return;
    }

    const isAdmin = isAdminRequest(req);
    const includeDrafts = req.query.includeDrafts === "true" && isAdmin;
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;

    const filter: Record<string, unknown> = {};

    // Public customers only see published articles
    if (!includeDrafts) {
      filter.published = true;
    }

    if (category && category !== "All" && category !== "all") {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    if (search) {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    const posts = await Blog.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    res.status(500).json({
      success: false,
      error: "Database error",
      message: "Could not retrieve articles from database.",
      posts: [],
    });
  }
});

// GET /api/blogs/:slug (Public: single article by slug or id)
router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    await connectDB();

    const isAdmin = isAdminRequest(req);
    let query: Record<string, unknown> = { slug };

    if (!isAdmin) {
      query.published = true;
    }

    let post = await Blog.findOne(query).lean();

    // Fallback: If not found by slug and slug looks like a Mongo ObjectId, try finding by _id
    if (!post && mongoose.Types.ObjectId.isValid(slug)) {
      const idQuery: Record<string, unknown> = { _id: slug };
      if (!isAdmin) idQuery.published = true;
      post = await Blog.findOne(idQuery).lean();
    }

    if (!post) {
      res.status(404).json({
        success: false,
        error: "Not found",
        message: `Article not found matching '${slug}'.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    console.error(`GET /api/blogs/${slug} error:`, err);
    res.status(500).json({
      success: false,
      error: "Database error",
      message: "Failed to retrieve article.",
    });
  }
});

// POST /api/blogs (Admin only: create new article)
router.post("/", requireAdmin, async (req: AuthRequest, res: Response) => {
  const {
    title,
    slug,
    excerpt,
    content,
    author,
    category,
    coverImage,
    featured_image,
    imageAltText,
    image_alt_text,
    tags,
    published,
    status,
    featured,
    seoTitle,
    seo_title,
    seoDescription,
    seo_description,
  } = req.body;

  if (!title || !content) {
    res.status(400).json({
      success: false,
      error: "Validation error",
      message: "Title and content are required fields.",
    });
    return;
  }

  try {
    await connectDB();

    let cleanSlug = slug ? slugify(slug) : slugify(title);
    if (!cleanSlug) cleanSlug = `article-${Date.now()}`;

    // Ensure slug uniqueness
    let existing = await Blog.findOne({ slug: cleanSlug });
    if (existing) {
      cleanSlug = `${cleanSlug}-${Date.now().toString(36)}`;
    }

    const isPublished =
      published !== undefined
        ? Boolean(published)
        : status === "PUBLISHED"
        ? true
        : false;

    const newBlog = new Blog({
      title: title.trim(),
      slug: cleanSlug,
      excerpt: excerpt?.trim() || "",
      content: content.trim(),
      author: author?.trim() || req.user?.name || "AM Master Stylist",
      category: category?.trim() || "Hair Care",
      coverImage: coverImage || featured_image || "",
      imageAltText: imageAltText || image_alt_text || title.trim(),
      tags: Array.isArray(tags) ? tags : [],
      published: isPublished,
      publishedAt: isPublished ? new Date() : null,
      seoTitle: seoTitle || seo_title || `${title.trim()} | AM Unisex Salon`,
      seoDescription: seoDescription || seo_description || excerpt?.trim() || "",
      views: 0,
    });

    const saved = await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Article created successfully.",
      post: saved,
    });
  } catch (err: unknown) {
    console.error("POST /api/blogs error:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to create article";
    res.status(500).json({
      success: false,
      error: "Database error",
      message: errorMsg,
    });
  }
});

// PUT /api/blogs/:id (Admin only: update article)
router.put("/:id", requireAdmin, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    await connectDB();

    const existing = await Blog.findById(id);
    if (!existing) {
      res.status(404).json({
        success: false,
        error: "Not found",
        message: `Article not found with ID '${id}'.`,
      });
      return;
    }

    const {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      coverImage,
      featured_image,
      imageAltText,
      image_alt_text,
      tags,
      published,
      status,
      seoTitle,
      seo_title,
      seoDescription,
      seo_description,
    } = req.body;

    if (title) existing.title = title.trim();
    if (slug) {
      const cleanSlug = slugify(slug);
      if (cleanSlug !== existing.slug) {
        const slugExists = await Blog.findOne({ slug: cleanSlug, _id: { $ne: id } });
        if (slugExists) {
          res.status(400).json({
            success: false,
            error: "Duplicate slug",
            message: "This slug is already used by another article. Please choose a unique slug.",
          });
          return;
        }
        existing.slug = cleanSlug;
      }
    }
    if (excerpt !== undefined) existing.excerpt = excerpt.trim();
    if (content !== undefined) existing.content = content.trim();
    if (author !== undefined) existing.author = author.trim();
    if (category !== undefined) existing.category = category.trim();
    if (coverImage !== undefined || featured_image !== undefined) {
      existing.coverImage = coverImage || featured_image || "";
    }
    if (imageAltText !== undefined || image_alt_text !== undefined) {
      existing.imageAltText = imageAltText || image_alt_text || "";
    }
    if (tags !== undefined) existing.tags = Array.isArray(tags) ? tags : [];

    // Publishing state transitions
    if (published !== undefined || status !== undefined) {
      const newPublishedState =
        published !== undefined ? Boolean(published) : status === "PUBLISHED";

      if (newPublishedState && !existing.published) {
        existing.publishedAt = new Date();
      }
      existing.published = newPublishedState;
    }

    if (seoTitle !== undefined || seo_title !== undefined) {
      existing.seoTitle = seoTitle || seo_title || "";
    }
    if (seoDescription !== undefined || seo_description !== undefined) {
      existing.seoDescription = seoDescription || seo_description || "";
    }

    const updated = await existing.save();

    res.status(200).json({
      success: true,
      message: "Article updated successfully.",
      post: updated,
    });
  } catch (err: unknown) {
    console.error(`PUT /api/blogs/${id} error:`, err);
    const errorMsg = err instanceof Error ? err.message : "Failed to update article";
    res.status(500).json({
      success: false,
      error: "Database error",
      message: errorMsg,
    });
  }
});

// DELETE /api/blogs/:id (Admin only: permanent deletion)
router.delete("/:id", requireAdmin, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    await connectDB();

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: "Not found",
        message: `Article not found with ID '${id}'.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (err) {
    console.error(`DELETE /api/blogs/${id} error:`, err);
    res.status(500).json({
      success: false,
      error: "Database error",
      message: "Failed to delete article.",
    });
  }
});

// POST /api/blogs/:id/view (Real database-backed view counter with rate debounce)
router.post("/:id/view", async (req: Request, res: Response) => {
  const { id } = req.params;
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "anonymous";

  const key = `${ip}-${id}`;
  const now = Date.now();
  const lastViewTime = recentViews.get(key) || 0;

  // Debounce: Only count 1 view per IP per article every 5 minutes to prevent rapid refreshing
  if (now - lastViewTime < 5 * 60 * 1000) {
    const current = await Blog.findById(id).select("views").lean();
    res.status(200).json({
      success: true,
      counted: false,
      views: current?.views || 0,
    });
    return;
  }

  recentViews.set(key, now);

  // Clean up cache periodically
  if (recentViews.size > 5000) {
    const expiry = now - 15 * 60 * 1000;
    for (const [k, ts] of recentViews.entries()) {
      if (ts < expiry) recentViews.delete(k);
    }
  }

  try {
    await connectDB();

    const query: Record<string, unknown> = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const updated = await Blog.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true, select: "views" }
    ).lean();

    if (!updated) {
      res.status(404).json({ success: false, error: "Article not found" });
      return;
    }

    res.status(200).json({
      success: true,
      counted: true,
      views: updated.views,
    });
  } catch (err) {
    console.error("View increment error:", err);
    res.status(500).json({ success: false, error: "Failed to increment view count" });
  }
});

export default router;
