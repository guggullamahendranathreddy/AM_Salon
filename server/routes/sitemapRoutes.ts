import { Router, Request, Response } from "express";
import { connectDB } from "../db";
import { Blog } from "../models/Blog";

const router = Router();

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/locations/nallagandla", priority: "0.95", changefreq: "weekly" },
  { path: "/locations/pragathi-nagar", priority: "0.9", changefreq: "weekly" },
  { path: "/locations", priority: "0.85", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/booking", priority: "0.9", changefreq: "weekly" },
  { path: "/gallery", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
];

const SITE_URL = (process.env.VITE_SITE_URL || "https://am-salon-three.vercel.app").replace(/\/$/, "");

router.get(["/", "/sitemap.xml", "/api/sitemap.xml", "/api/sitemap"], async (req: Request, res: Response) => {
  let blogUrls = "";

  try {
    const conn = await connectDB();
    if (conn) {
      // Query strictly published articles (excluding drafts and archived)
      const publishedArticles = await Blog.find({ published: true })
        .select("slug publishedAt updatedAt createdAt")
        .sort({ publishedAt: -1 })
        .lean();

      for (const article of publishedArticles) {
        if (!article.slug) continue;
        const lastmodDate = article.updatedAt || article.publishedAt || article.createdAt || new Date();
        const lastmod = new Date(lastmodDate).toISOString().split("T")[0];

        blogUrls += `
  <url>
    <loc>${SITE_URL}/blog/${encodeURIComponent(article.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`;
      }
    }
  } catch (err) {
    console.error("Dynamic sitemap generation error:", err);
  }

  const staticUrls = STATIC_PAGES.map(
    (page) => `
  <url>
    <loc>${SITE_URL}${page.path === "/" ? "/" : page.path}</loc>
    <lastmod>2026-10-08</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${blogUrls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(xml.trim());
});

export default router;
