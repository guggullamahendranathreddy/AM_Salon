// server/serverless.ts
import express from "express";
import dotenv from "dotenv";

// server/routes/authRoutes.ts
import { Router } from "express";
import bcrypt from "bcryptjs";

// server/db.ts
import dns from "node:dns";
import mongoose from "mongoose";
if (!process.env.VERCEL) {
  try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch {
  }
}
var isConnected = false;
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("\u26A0\uFE0F Warning: MONGODB_URI is not set. Database operations will fail until configured.");
    return null;
  }
  if (isConnected || mongoose.connection.readyState === 1) {
    return mongoose;
  }
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5e3
    });
    isConnected = true;
    console.log(`\u2705 MongoDB Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error("\u274C MongoDB connection error:", error);
    return null;
  }
}

// server/models/User.ts
import mongoose2, { Schema } from "mongoose";
var UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);
var User = mongoose2.models.User || mongoose2.model("User", UserSchema);

// server/middleware/auth.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "am-unisex-salon-super-secure-jwt-secret-key-2026";
function generateToken(user) {
  return jwt.sign(
    {
      id: String(user._id),
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Authentication token missing or invalid."
    });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Session token expired or invalid. Please log in again."
    });
  }
}
function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({
        success: false,
        error: "Forbidden",
        message: "Admin privileges are strictly required to perform this action."
      });
      return;
    }
    next();
  });
}

// server/routes/authRoutes.ts
var router = Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Missing credentials",
      message: "Both email and password are required."
    });
    return;
  }
  try {
    const conn = await connectDB();
    if (!conn) {
      res.status(503).json({
        success: false,
        error: "Database unavailable",
        message: "Database is not connected. Please set MONGODB_URI in your environment variables."
      });
      return;
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
        message: "Invalid email or password."
      });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
        message: "Invalid email or password."
      });
      return;
    }
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "An internal error occurred during login. Please try again."
    });
  }
});
router.get("/me", requireAuth, async (req, res) => {
  try {
    await connectDB();
    const user = await User.findById(req.user?.id).select("-passwordHash");
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error("Auth me error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
var authRoutes_default = router;

// server/routes/blogRoutes.ts
import { Router as Router2 } from "express";
import jwt2 from "jsonwebtoken";
import mongoose4 from "mongoose";

// server/models/Blog.ts
import mongoose3, { Schema as Schema2 } from "mongoose";
var BlogSchema = new Schema2(
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
    views: { type: Number, default: 0, min: 0 }
  },
  {
    timestamps: true
  }
);
var Blog = mongoose3.models.Blog || mongoose3.model("Blog", BlogSchema);

// server/routes/blogRoutes.ts
var router2 = Router2();
var recentViews = /* @__PURE__ */ new Map();
function isAdminRequest(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt2.verify(token, JWT_SECRET);
    return decoded.role === "admin";
  } catch {
    return false;
  }
}
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}
router2.get("/", async (req, res) => {
  try {
    const conn = await connectDB();
    if (!conn) {
      res.status(200).json({
        success: true,
        count: 0,
        posts: []
      });
      return;
    }
    const isAdmin = isAdminRequest(req);
    const includeDrafts = req.query.includeDrafts === "true" && isAdmin;
    const category = req.query.category;
    const search = req.query.search;
    const filter = {};
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
        { content: { $regex: q, $options: "i" } }
      ];
    }
    const posts = await Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    res.status(500).json({
      success: false,
      error: "Database error",
      message: "Could not retrieve articles from database.",
      posts: []
    });
  }
});
router2.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    await connectDB();
    const isAdmin = isAdminRequest(req);
    let query = { slug };
    if (!isAdmin) {
      query.published = true;
    }
    let post = await Blog.findOne(query).lean();
    if (!post && mongoose4.Types.ObjectId.isValid(slug)) {
      const idQuery = { _id: slug };
      if (!isAdmin) idQuery.published = true;
      post = await Blog.findOne(idQuery).lean();
    }
    if (!post) {
      res.status(404).json({
        success: false,
        error: "Not found",
        message: `Article not found matching '${slug}'.`
      });
      return;
    }
    res.status(200).json({
      success: true,
      post
    });
  } catch (err) {
    console.error(`GET /api/blogs/${slug} error:`, err);
    res.status(500).json({
      success: false,
      error: "Database error",
      message: "Failed to retrieve article."
    });
  }
});
router2.post("/", requireAdmin, async (req, res) => {
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
    seo_description
  } = req.body;
  if (!title || !content) {
    res.status(400).json({
      success: false,
      error: "Validation error",
      message: "Title and content are required fields."
    });
    return;
  }
  try {
    await connectDB();
    let cleanSlug = slug ? slugify(slug) : slugify(title);
    if (!cleanSlug) cleanSlug = `article-${Date.now()}`;
    let existing = await Blog.findOne({ slug: cleanSlug });
    if (existing) {
      cleanSlug = `${cleanSlug}-${Date.now().toString(36)}`;
    }
    const isPublished = published !== void 0 ? Boolean(published) : status === "PUBLISHED" ? true : false;
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
      publishedAt: isPublished ? /* @__PURE__ */ new Date() : null,
      seoTitle: seoTitle || seo_title || `${title.trim()} | AM Unisex Salon`,
      seoDescription: seoDescription || seo_description || excerpt?.trim() || "",
      views: 0
    });
    const saved = await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Article created successfully.",
      post: saved
    });
  } catch (err) {
    console.error("POST /api/blogs error:", err);
    const errorMsg = err instanceof Error ? err.message : "Failed to create article";
    res.status(500).json({
      success: false,
      error: "Database error",
      message: errorMsg
    });
  }
});
router2.put("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();
    const existing = await Blog.findById(id);
    if (!existing) {
      res.status(404).json({
        success: false,
        error: "Not found",
        message: `Article not found with ID '${id}'.`
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
      seo_description
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
            message: "This slug is already used by another article. Please choose a unique slug."
          });
          return;
        }
        existing.slug = cleanSlug;
      }
    }
    if (excerpt !== void 0) existing.excerpt = excerpt.trim();
    if (content !== void 0) existing.content = content.trim();
    if (author !== void 0) existing.author = author.trim();
    if (category !== void 0) existing.category = category.trim();
    if (coverImage !== void 0 || featured_image !== void 0) {
      existing.coverImage = coverImage || featured_image || "";
    }
    if (imageAltText !== void 0 || image_alt_text !== void 0) {
      existing.imageAltText = imageAltText || image_alt_text || "";
    }
    if (tags !== void 0) existing.tags = Array.isArray(tags) ? tags : [];
    if (published !== void 0 || status !== void 0) {
      const newPublishedState = published !== void 0 ? Boolean(published) : status === "PUBLISHED";
      if (newPublishedState && !existing.published) {
        existing.publishedAt = /* @__PURE__ */ new Date();
      }
      existing.published = newPublishedState;
    }
    if (seoTitle !== void 0 || seo_title !== void 0) {
      existing.seoTitle = seoTitle || seo_title || "";
    }
    if (seoDescription !== void 0 || seo_description !== void 0) {
      existing.seoDescription = seoDescription || seo_description || "";
    }
    const updated = await existing.save();
    res.status(200).json({
      success: true,
      message: "Article updated successfully.",
      post: updated
    });
  } catch (err) {
    console.error(`PUT /api/blogs/${id} error:`, err);
    const errorMsg = err instanceof Error ? err.message : "Failed to update article";
    res.status(500).json({
      success: false,
      error: "Database error",
      message: errorMsg
    });
  }
});
router2.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await connectDB();
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: "Not found",
        message: `Article not found with ID '${id}'.`
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Article deleted successfully."
    });
  } catch (err) {
    console.error(`DELETE /api/blogs/${id} error:`, err);
    res.status(500).json({
      success: false,
      error: "Database error",
      message: "Failed to delete article."
    });
  }
});
router2.post("/:id/view", async (req, res) => {
  const { id } = req.params;
  const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress || "anonymous";
  const key = `${ip}-${id}`;
  const now = Date.now();
  const lastViewTime = recentViews.get(key) || 0;
  if (now - lastViewTime < 5 * 60 * 1e3) {
    const current = await Blog.findById(id).select("views").lean();
    res.status(200).json({
      success: true,
      counted: false,
      views: current?.views || 0
    });
    return;
  }
  recentViews.set(key, now);
  if (recentViews.size > 5e3) {
    const expiry = now - 15 * 60 * 1e3;
    for (const [k, ts] of recentViews.entries()) {
      if (ts < expiry) recentViews.delete(k);
    }
  }
  try {
    await connectDB();
    const query = mongoose4.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
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
      views: updated.views
    });
  } catch (err) {
    console.error("View increment error:", err);
    res.status(500).json({ success: false, error: "Failed to increment view count" });
  }
});
var blogRoutes_default = router2;

// server/routes/uploadRoutes.ts
import { Router as Router3 } from "express";
import multer from "multer";

// server/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
var isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);
function uploadBufferToCloudinary(buffer, folder = "am-unisex-salon/blogs") {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      reject(
        new Error(
          "Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        )
      );
      return;
    }
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto"
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
}

// server/routes/uploadRoutes.ts
var router3 = Router3();
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  }
});
router3.post(
  "/",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "Missing file",
        message: "Please select an image file to upload."
      });
      return;
    }
    if (!isCloudinaryConfigured) {
      res.status(503).json({
        success: false,
        error: "Cloudinary not configured",
        message: "Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env or Vercel dashboard."
      });
      return;
    }
    try {
      const result = await uploadBufferToCloudinary(req.file.buffer);
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully to Cloudinary.",
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      const errorMsg = err instanceof Error ? err.message : "Image upload failed";
      res.status(500).json({
        success: false,
        error: "Upload failed",
        message: errorMsg
      });
    }
  }
);
var uploadRoutes_default = router3;

// server/serverless.ts
dotenv.config();
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
var rateLimiters = {};
function createRateLimiter(config) {
  return (req, res, next) => {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress || "anonymous";
    const now = Date.now();
    const windowStart = now - config.windowMs;
    if (!rateLimiters[ip]) {
      rateLimiters[ip] = { timestamps: [] };
    }
    rateLimiters[ip].timestamps = rateLimiters[ip].timestamps.filter((ts) => ts > windowStart);
    if (rateLimiters[ip].timestamps.length >= config.max) {
      res.status(429).json({
        error: "Too Many Requests",
        message: "You have exceeded our booking limit. Please wait 1 minute and try again."
      });
      return;
    }
    rateLimiters[ip].timestamps.push(now);
    next();
  };
}
var reservationStore = [];
app.post(
  ["/api/book", "/book"],
  createRateLimiter({ windowMs: 60 * 1e3, max: 3 }),
  (req, res) => {
    const { name, phone, service, date, time, notes } = req.body;
    if (!name || !phone || !service || !date || !time) {
      res.status(400).json({ error: "Missing fields", message: "Please fill in all required fields." });
      return;
    }
    const bookingId = "AK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newReservation = {
      id: bookingId,
      name,
      phone,
      service,
      date,
      time,
      notes: notes || "",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    reservationStore.push(newReservation);
    res.status(200).json({
      success: true,
      bookingId,
      message: "Appointment details compiled! Launching WhatsApp...",
      reservation: newReservation
    });
  }
);
app.post(
  ["/api/contact", "/contact"],
  createRateLimiter({ windowMs: 60 * 1e3, max: 5 }),
  (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !message) {
      res.status(400).json({ error: "Missing fields", message: "Name and message are required." });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Your message has been received! Our support representative will contact you shortly."
    });
  }
);
app.get(["/api/metrics", "/metrics"], (req, res) => {
  res.json({
    activeReservations: reservationStore.length,
    activeRating: 4.9,
    ratingCount: 409
  });
});
app.use("/api/auth", authRoutes_default);
app.use("/auth", authRoutes_default);
app.use("/api/blogs", blogRoutes_default);
app.use("/blogs", blogRoutes_default);
app.use("/api/upload", uploadRoutes_default);
app.use("/upload", uploadRoutes_default);
app.get(["/api/health", "/health", "/api"], (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "AM Unisex Salon API",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
var serverless_default = app;
export {
  serverless_default as default
};
