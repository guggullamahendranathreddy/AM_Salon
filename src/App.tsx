import React, { useState, useEffect, useCallback } from "react";

// Components
import SEOSchema from "./components/SEOSchema";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import OffersAndFaqs from "./components/OffersAndFaqs";
import BookingForm from "./components/BookingForm";
import Location from "./components/Location";
import Footer from "./components/Footer";
import FloatingFAB from "./components/FloatingFAB";

// Blog Components
import BlogList from "./components/blog/BlogList";
import BlogDetail from "./components/blog/BlogDetail";
import BlogAdmin from "./components/blog/BlogAdmin";
import { BlogArticle, BlogPost } from "./types";
import {
  fetchPublishedBlogs,
  fetchBlogBySlug,
  recordBlogView,
  fetchAdminBlogs,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
  uploadImageToCloudinary,
  loginAdmin,
  fetchCurrentAdmin,
  AuthUser,
} from "./lib/api";

type AppView = "home" | "blog" | "blog-detail" | "admin";

const BASE_CANONICAL_URL = "https://am-salon-three.vercel.app";

function setMetaTag(name: string, content: string, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    if (isProperty) el.setAttribute("property", name);
    else el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonicalTag(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

export function updatePageSEO(title: string, description: string, path = "/") {
  document.title = title;
  setMetaTag("description", description);
  const cleanPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${BASE_CANONICAL_URL}${cleanPath || "/"}`;
  setCanonicalTag(canonicalUrl);
  setMetaTag("og:title", title, true);
  setMetaTag("og:description", description, true);
  setMetaTag("og:url", canonicalUrl, true);
  setMetaTag("twitter:title", title);
  setMetaTag("twitter:description", description);
}

const PAGE_SEO_MAP: Record<string, { title: string; description: string; path: string }> = {
  home: {
    title: "AM Unisex Salon | Unisex Salon in Hyderabad",
    description:
      "AM Unisex Salon in Hyderabad offers professional haircuts, hair styling, hair spa, beauty and grooming services for men and women.",
    path: "/",
  },
  services: {
    title: "Salon Services in Hyderabad | AM Unisex Salon",
    description:
      "Explore hair styling, haircuts for men & women, hair botox, keratin, facials and bridal grooming at AM Unisex Salon in Nallagandla, Hyderabad.",
    path: "/services",
  },
  about: {
    title: "About Us | AM Unisex Salon Nallagandla Hyderabad",
    description:
      "Learn about AM Unisex Salon, Hyderabad's trusted family salon offering hygienic haircuts, premium beauty treatments, and experienced stylists.",
    path: "/about",
  },
  gallery: {
    title: "Salon Gallery | AM Unisex Salon Hyderabad",
    description:
      "View photos of AM Unisex Salon in Hyderabad, including modern hair styling stations, facial rooms, and hygienic salon interiors.",
    path: "/gallery",
  },
  booking: {
    title: "Book Salon Appointment | AM Unisex Salon Hyderabad",
    description:
      "Book an appointment online at AM Unisex Salon in Nallagandla, Hyderabad. Haircuts, hair spa, facials and grooming with instant WhatsApp confirmation.",
    path: "/booking",
  },
  contact: {
    title: "Contact AM Unisex Salon | Nallagandla Hyderabad",
    description:
      "Visit AM Unisex Salon at HYTEK ARCADE, Kancha Gacchibowli Road, Nallagandla, Hyderabad. Call +91 75699 79965 or visit Monday–Sunday 9 AM–9 PM.",
    path: "/contact",
  },
  blog: {
    title: "Hair Care & Beauty Blog | AM Unisex Salon Hyderabad",
    description:
      "Read expert hair care, beauty tips, and salon treatment guides from master stylists at AM Unisex Salon in Hyderabad.",
    path: "/blog",
  },
  admin: {
    title: "Admin Portal | AM Unisex Salon",
    description: "Admin management portal for AM Unisex Salon.",
    path: "/admin",
  },
};

export default function App() {
  const [selectedService, setSelectedService] = useState("");
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | BlogPost | null>(null);
  const [posts, setPosts] = useState<(BlogArticle | BlogPost)[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem("am_auth_token");
  });
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);

  // Verify Admin Session on load
  useEffect(() => {
    if (adminToken) {
      fetchCurrentAdmin(adminToken).then((user) => {
        if (user) {
          setAdminUser(user);
        } else {
          setAdminToken(null);
          setAdminUser(null);
          localStorage.removeItem("am_auth_token");
        }
      });
    }
  }, [adminToken]);

  // Fetch blogs from backend API
  const fetchPosts = useCallback(async () => {
    setIsLoadingPosts(true);
    try {
      if (adminToken) {
        const adminArticles = await fetchAdminBlogs(adminToken);
        setPosts(adminArticles);
        return adminArticles;
      } else {
        const publicArticles = await fetchPublishedBlogs();
        setPosts(publicArticles);
        return publicArticles;
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
      const publicArticles = await fetchPublishedBlogs();
      setPosts(publicArticles);
      return publicArticles;
    } finally {
      setIsLoadingPosts(false);
    }
  }, [adminToken]);

  // Synchronize route and SEO on mount, hashchange, and popstate
  useEffect(() => {
    const handleRouteSync = async () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");

      if (hash === "#blog" || pathname === "/blog") {
        setCurrentView("blog");
        setSelectedBlog(null);
        updatePageSEO(PAGE_SEO_MAP.blog.title, PAGE_SEO_MAP.blog.description, "/blog");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash.startsWith("#blog/") || pathname.startsWith("/blog/")) {
        const slug = (
          hash.startsWith("#blog/")
            ? hash.replace("#blog/", "")
            : pathname.replace("/blog/", "")
        ).trim();

        let found: BlogArticle | BlogPost | null =
          posts.find(
            (p) =>
              p.slug === slug ||
              (p as { _id?: string })._id === slug ||
              p.id === slug
          ) || null;

        if (!found) {
          found = await fetchBlogBySlug(slug);
        }

        if (found) {
          setSelectedBlog(found);
          setCurrentView("blog-detail");
          const postTitle = found.seo_title || `${found.title} | AM Unisex Salon`;
          const postDesc =
            found.seo_description ||
            found.excerpt ||
            `Read ${found.title} on AM Unisex Salon blog.`;
          updatePageSEO(postTitle, postDesc, `/blog/${slug}`);
          window.scrollTo({ top: 0, behavior: "smooth" });

          const targetId = (found as { _id?: string })._id || found.id;
          if (targetId) {
            recordBlogView(targetId).then((newViews) => {
              if (newViews !== null) {
                setPosts((prev) =>
                  prev.map((p) =>
                    ((p as { _id?: string })._id === targetId || p.id === targetId)
                      ? { ...p, views: newViews, view_count: newViews }
                      : p
                  )
                );
              }
            });
          }
        } else {
          setCurrentView("blog");
          updatePageSEO(PAGE_SEO_MAP.blog.title, PAGE_SEO_MAP.blog.description, "/blog");
        }
      } else if (hash === "#admin" || pathname === "/admin") {
        setCurrentView("admin");
        updatePageSEO(PAGE_SEO_MAP.admin.title, PAGE_SEO_MAP.admin.description, "/admin");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Home view with section detection
        setCurrentView("home");
        setSelectedBlog(null);

        let section = "home";
        if (hash.startsWith("#") && hash.length > 1) {
          section = hash.substring(1);
        } else if (pathname === "/services") {
          section = "services";
        } else if (pathname === "/about") {
          section = "about";
        } else if (pathname === "/gallery") {
          section = "gallery";
        } else if (pathname === "/booking" || pathname === "/book") {
          section = "booking";
        } else if (pathname === "/contact") {
          section = "contact";
        }

        const config = PAGE_SEO_MAP[section] || PAGE_SEO_MAP.home;
        updatePageSEO(config.title, config.description, config.path);

        const targetId = section === "booking" ? "book" : section;
        if (targetId && targetId !== "home") {
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              const topOffset = el.offsetTop - 85;
              window.scrollTo({ top: topOffset, behavior: "smooth" });
            }
          }, 150);
        }
      }
    };

    handleRouteSync();
    window.addEventListener("hashchange", handleRouteSync);
    window.addEventListener("popstate", handleRouteSync);
    return () => {
      window.removeEventListener("hashchange", handleRouteSync);
      window.removeEventListener("popstate", handleRouteSync);
    };
  }, [posts]);

  // Initial load
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Navigation controller
  const handleNavigate = (view: "home" | "blog" | "admin", targetSection?: string) => {
    if (view === "home") {
      setCurrentView("home");
      setSelectedBlog(null);

      const sectionKey = targetSection || "home";
      const config = PAGE_SEO_MAP[sectionKey] || PAGE_SEO_MAP.home;
      updatePageSEO(config.title, config.description, config.path);

      if (targetSection && targetSection !== "home") {
        window.location.hash = `#${targetSection}`;
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            const topOffset = el.offsetTop - 85;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
          }
        }, 120);
      } else {
        window.location.hash = "#home";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (view === "blog") {
      setCurrentView("blog");
      setSelectedBlog(null);
      updatePageSEO(PAGE_SEO_MAP.blog.title, PAGE_SEO_MAP.blog.description, "/blog");
      window.location.hash = "#blog";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (view === "admin") {
      setCurrentView("admin");
      updatePageSEO(PAGE_SEO_MAP.admin.title, PAGE_SEO_MAP.admin.description, "/admin");
      window.location.hash = "#admin";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Article selection
  const handleSelectPost = (post: BlogArticle | BlogPost) => {
    setSelectedBlog(post);
    setCurrentView("blog-detail");
    const slug = post.slug || (post as { _id?: string })._id || post.id;
    window.location.hash = `#blog/${slug}`;
    const postTitle = post.seo_title || `${post.title} | AM Unisex Salon`;
    const postDesc =
      post.seo_description ||
      post.excerpt ||
      `Read ${post.title} on AM Unisex Salon blog.`;
    updatePageSEO(postTitle, postDesc, `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const targetId = (post as { _id?: string })._id || post.id;
    if (targetId) {
      recordBlogView(targetId);
    }
  };

  // Book appointment handler
  const handleBookClick = () => {
    if (currentView !== "home") {
      setCurrentView("home");
    }
    const config = PAGE_SEO_MAP.booking;
    updatePageSEO(config.title, config.description, config.path);
    window.location.hash = "#book";
    setTimeout(() => {
      const bookingSection = document.getElementById("book");
      if (bookingSection) {
        const topOffset = bookingSection.offsetTop - 85;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 120);
  };

  const handleServicesClick = () => {
    if (currentView !== "home") {
      setCurrentView("home");
    }
    const config = PAGE_SEO_MAP.services;
    updatePageSEO(config.title, config.description, config.path);
    window.location.hash = "#services";
    setTimeout(() => {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        const topOffset = servicesSection.offsetTop - 85;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 120);
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setTimeout(() => {
      handleBookClick();
    }, 100);
  };

  // Real Admin Authentication
  const handleLoginWithCredentials = async (
    emailInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; error?: string }> => {
    const res = await loginAdmin(emailInput, passwordInput);
    if (res.success && res.token && res.user) {
      setAdminToken(res.token);
      setAdminUser(res.user);
      localStorage.setItem("am_auth_token", res.token);
      fetchPosts();
      return { success: true };
    }
    return { success: false, error: res.error || "Login failed." };
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem("am_auth_token");
    fetchPosts();
  };

  // Real CRUD Operations against Express & MongoDB
  const handleCreatePost = async (postData: Partial<BlogArticle>): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const created = await createAdminBlog(postData, adminToken);
      setPosts((prev) => [created, ...prev]);
      return true;
    } catch (err) {
      console.error("Create article failed:", err);
      return false;
    }
  };

  const handleUpdatePost = async (
    id: string,
    updates: Partial<BlogArticle>
  ): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      const updated = await updateAdminBlog(id, updates, adminToken);
      setPosts((prev) =>
        prev.map((p) =>
          ((p as { _id?: string })._id === id || p.id === id) ? updated : p
        )
      );
      if (
        selectedBlog &&
        ((selectedBlog as { _id?: string })._id === id || selectedBlog.id === id)
      ) {
        setSelectedBlog(updated);
      }
      return true;
    } catch (err) {
      console.error("Update article failed:", err);
      return false;
    }
  };

  const handleDeletePost = async (id: string): Promise<boolean> => {
    if (!adminToken) return false;
    try {
      await deleteAdminBlog(id, adminToken);
      setPosts((prev) =>
        prev.filter((p) => ((p as { _id?: string })._id !== id && p.id !== id))
      );
      if (
        selectedBlog &&
        ((selectedBlog as { _id?: string })._id === id || selectedBlog.id === id)
      ) {
        setSelectedBlog(null);
        setCurrentView("blog");
      }
      return true;
    } catch (err) {
      console.error("Delete article failed:", err);
      return false;
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    if (!adminToken) {
      throw new Error("Must be logged in to upload images.");
    }
    return uploadImageToCloudinary(file, adminToken);
  };

  return (
    <>
      {/* 1. SEO Metadata schema on mount */}
      <SEOSchema />

      <div className="relative min-h-screen bg-bg-dark text-luxury-cream selection:bg-primary selection:text-white overflow-x-hidden">
        
        {/* Glassmorphic Navbar */}
        <Navbar
          onBookClick={handleBookClick}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        {/* View Switcher: Home vs Blog vs Detail vs Admin */}
        <main>
          {currentView === "home" && (
            <>
              {/* Home Slideshow Header with Single Primary H1 */}
              <Hero
                onBookClick={handleBookClick}
                onServicesClick={handleServicesClick}
              />

              {/* High-level Achievements Counters */}
              <Stats />

              {/* Narrative Context of AM Salon */}
              <About />

              {/* Catalog Grid Switcher */}
              <Services onServiceSelect={handleServiceSelect} />

              {/* Fine Arts Gallery */}
              <Gallery />

              {/* Customer Testimonial Slider */}
              <Reviews />

              {/* Offers List & Collapsible FAQ Grid */}
              <OffersAndFaqs />

              {/* Full-stack Booking Form */}
              <BookingForm
                selectedService={selectedService}
                onClearService={() => setSelectedService("")}
              />

              {/* Visible Physical Storefront & Google Maps Location */}
              <Location onBookClick={handleBookClick} />
            </>
          )}

          {currentView === "blog" && (
            <BlogList
              posts={posts}
              onSelectPost={handleSelectPost}
              onOpenAdmin={() => handleNavigate("admin")}
              isLoading={isLoadingPosts}
              onRefresh={fetchPosts}
            />
          )}

          {currentView === "blog-detail" && selectedBlog && (
            <BlogDetail
              post={selectedBlog}
              allPosts={posts}
              onBack={() => handleNavigate("blog")}
              onSelectPost={handleSelectPost}
              onBookAppointment={handleBookClick}
            />
          )}

          {currentView === "admin" && (
            <BlogAdmin
              posts={posts}
              onBackToBlog={() => handleNavigate("blog")}
              onPreviewPost={handleSelectPost}
              onCreatePost={handleCreatePost}
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
              onUploadImage={handleUploadImage}
              adminUser={adminUser}
              onLoginWithCredentials={handleLoginWithCredentials}
              onLogout={handleAdminLogout}
            />
          )}
        </main>

        {/* Map links and Schedules */}
        <Footer onNavigate={handleNavigate} />

        {/* Quick Connect touchpads FAB */}
        <FloatingFAB />

      </div>
    </>
  );
}
