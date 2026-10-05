import { BlogArticle, BlogPost } from "../types";

const API_BASE = "/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: AuthUser;
  error?: string;
  message?: string;
}

// ==============================================================================
// POST NORMALIZATION HELPER
// ==============================================================================

export function normalizePost(raw: any): BlogArticle & BlogPost {
  const id = raw._id ? String(raw._id) : String(raw.id || "");
  const isPub = raw.published !== undefined ? Boolean(raw.published) : raw.status === "PUBLISHED";
  const status = raw.status || (isPub ? "PUBLISHED" : "DRAFT");
  const createdAtIso = raw.createdAt ? new Date(raw.createdAt).toISOString() : raw.created_at || new Date().toISOString();
  const publishedAtIso = raw.publishedAt ? new Date(raw.publishedAt).toISOString() : raw.published_at || (isPub ? createdAtIso : null);
  const cover = raw.coverImage || raw.featured_image || "";
  const views = typeof raw.views === "number" ? raw.views : (typeof raw.view_count === "number" ? raw.view_count : 0);

  return {
    ...raw,
    id,
    _id: id,
    title: raw.title || "",
    slug: raw.slug || "",
    excerpt: raw.excerpt || "",
    content: raw.content || "",
    category: raw.category || "Hair Care",
    author: raw.author || "AM Master Stylist",
    status,
    published: isPub,
    isPublished: isPub,
    featured: Boolean(raw.featured || raw.isFeatured),
    isFeatured: Boolean(raw.featured || raw.isFeatured),
    featured_image: cover,
    coverImage: cover,
    image_alt_text: raw.imageAltText || raw.image_alt_text || raw.title || "",
    seo_title: raw.seoTitle || raw.seo_title || raw.title || "",
    seo_description: raw.seoDescription || raw.seo_description || raw.excerpt || "",
    created_at: createdAtIso,
    createdAt: createdAtIso,
    published_at: publishedAtIso,
    publishedAt: publishedAtIso || undefined,
    updated_at: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : raw.updated_at || createdAtIso,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : raw.updated_at || createdAtIso,
    view_count: views,
    views: views,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
  };
}

// ==============================================================================
// PUBLIC CUSTOMER API
// ==============================================================================

/**
 * Fetch published blogs for public customers.
 */
export async function fetchPublishedBlogs(options?: {
  category?: string;
  search?: string;
}): Promise<BlogArticle[]> {
  try {
    const params = new URLSearchParams();
    if (options?.category && options.category !== "All") {
      params.set("category", options.category);
    }
    if (options?.search) {
      params.set("search", options.search);
    }

    const qs = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${API_BASE}/blogs${qs}`);
    if (!res.ok) {
      console.warn("Public blogs API returned status:", res.status);
      return [];
    }

    const data = await res.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];
    return posts.map(normalizePost);
  } catch (err) {
    console.error("fetchPublishedBlogs error:", err);
    return [];
  }
}

/**
 * Fetch single blog article by slug.
 */
export async function fetchBlogBySlug(slug: string): Promise<BlogArticle | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;

    const data = await res.json();
    return data.post ? normalizePost(data.post) : null;
  } catch (err) {
    console.error(`fetchBlogBySlug(${slug}) error:`, err);
    return null;
  }
}

/**
 * Increment real database view count.
 */
export async function recordBlogView(id: string): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}/view`, {
      method: "POST",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.views === "number" ? data.views : null;
  } catch {
    return null;
  }
}

// ==============================================================================
// AUTHENTICATED ADMIN API
// ==============================================================================

/**
 * Log in admin via real server authentication.
 */
export async function loginAdmin(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || data.error || "Login failed.",
      };
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
      message: data.message,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Network error";
    return { success: false, error: `Connection failed: ${errorMsg}` };
  }
}

/**
 * Verify current admin session token.
 */
export async function fetchCurrentAdmin(token: string): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}

/**
 * Fetch all articles (including drafts and archived) for admin dashboard.
 */
export async function fetchAdminBlogs(token: string): Promise<BlogArticle[]> {
  try {
    const res = await fetch(`${API_BASE}/blogs?includeDrafts=true`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`Failed to load admin blogs: ${res.statusText}`);
    }
    const data = await res.json();
    const posts = Array.isArray(data.posts) ? data.posts : [];
    return posts.map(normalizePost);
  } catch (err) {
    console.error("fetchAdminBlogs error:", err);
    throw err;
  }
}

/**
 * Create new blog article in MongoDB.
 */
export async function createAdminBlog(
  article: Partial<BlogArticle>,
  token: string
): Promise<BlogArticle> {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || "Failed to create article");
  }

  return normalizePost(data.post);
}

/**
 * Update existing article in MongoDB.
 */
export async function updateAdminBlog(
  id: string,
  updates: Partial<BlogArticle>,
  token: string
): Promise<BlogArticle> {
  const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || "Failed to update article");
  }

  return normalizePost(data.post);
}

/**
 * Delete article from MongoDB.
 */
export async function deleteAdminBlog(id: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to delete article");
  }

  return true;
}

/**
 * Upload cover image to Cloudinary via server API.
 */
export async function uploadImageToCloudinary(
  file: File,
  token: string
): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || "Failed to upload image");
  }

  return data.url;
}
