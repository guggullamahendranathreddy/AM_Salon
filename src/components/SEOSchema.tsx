import React, { useEffect } from "react";
import { FAQS } from "../data";
import { BlogArticle, BlogPost } from "../types";

interface SEOSchemaProps {
  currentView?: "home" | "blog" | "blog-detail" | "admin";
  selectedBlog?: BlogArticle | BlogPost | null;
}

/**
 * SEOSchema Component
 * Injects structured data dynamically into document head:
 * 1. FAQPage JSON-LD (strictly mirroring visible FAQs on the page)
 * 2. BreadcrumbList JSON-LD (mirroring current route navigation hierarchy)
 * 3. Base HairSalon / WebSite / Organization schema is anchored in index.html for instant crawler discovery
 */
export default function SEOSchema({ currentView = "home", selectedBlog }: SEOSchemaProps) {
  useEffect(() => {
    // 1. FAQPage Schema (applied when on home view where FAQs are rendered)
    const faqScriptId = "jsonld-faq-schema";
    let faqScript = document.getElementById(faqScriptId) as HTMLScriptElement | null;

    if (currentView === "home") {
      if (!faqScript) {
        faqScript = document.createElement("script");
        faqScript.type = "application/ld+json";
        faqScript.id = faqScriptId;
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      });
    } else if (faqScript && faqScript.parentNode) {
      faqScript.parentNode.removeChild(faqScript);
    }

    // 2. BreadcrumbList Schema
    const breadcrumbScriptId = "jsonld-breadcrumb-schema";
    let breadcrumbScript = document.getElementById(breadcrumbScriptId) as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      breadcrumbScript.id = breadcrumbScriptId;
      document.head.appendChild(breadcrumbScript);
    }

    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://am-salon-three.vercel.app/",
      },
    ];

    if (currentView === "blog") {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://am-salon-three.vercel.app/blog",
      });
    } else if (currentView === "blog-detail" && selectedBlog) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://am-salon-three.vercel.app/blog",
      });
      const slug = selectedBlog.slug || (selectedBlog as { _id?: string })._id || selectedBlog.id;
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": selectedBlog.title,
        "item": `https://am-salon-three.vercel.app/blog/${slug}`,
      });
    } else if (currentView === "admin") {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Admin Portal",
        "item": "https://am-salon-three.vercel.app/admin",
      });
    }

    breadcrumbScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs,
    });

    return () => {
      const dynamicFaq = document.getElementById(faqScriptId);
      if (dynamicFaq && dynamicFaq.parentNode) {
        dynamicFaq.parentNode.removeChild(dynamicFaq);
      }
      const dynamicBreadcrumb = document.getElementById(breadcrumbScriptId);
      if (dynamicBreadcrumb && dynamicBreadcrumb.parentNode) {
        dynamicBreadcrumb.parentNode.removeChild(dynamicBreadcrumb);
      }
    };
  }, [currentView, selectedBlog]);

  return null;
}
