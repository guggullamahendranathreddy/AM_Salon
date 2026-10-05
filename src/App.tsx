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
          // Token expired or invalid
          setAdminToken(null);
          setAdminUser(null);
          localStorage.removeItem("am_auth_token");
        }
      });
    }
  }, [adminToken]);

  // Fetch blogs from real backend API (Public or Admin view)
  const fetchPosts = useCallback(async () => {
    setIsLoadingPosts(true);
    try {
      if (adminToken) {
        // Authenticated admin: load all posts (DRAFT, PUBLISHED)
        const adminArticles = await fetchAdminBlogs(adminToken);
        setPosts(adminArticles);
        return adminArticles;
      } else {
        // Public customers: load only PUBLISHED posts
        const publicArticles = await fetchPublishedBlogs();
        setPosts(publicArticles);
        return publicArticles;
      }
    } catch (err) {
      console.error("Failed to load blog posts:", err);
      // Fallback to public fetch if admin fetch fails
      const publicArticles = await fetchPublishedBlogs();
      setPosts(publicArticles);
      return publicArticles;
    } finally {
      setIsLoadingPosts(false);
    }
  }, [adminToken]);

  // Synchronize hash routing on mount and hashchange
  useEffect(() => {
    const handleHashSync = async () => {
      const hash = window.location.hash;

      if (hash === "#blog") {
        setCurrentView("blog");
        setSelectedBlog(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash.startsWith("#blog/")) {
        const slug = hash.replace("#blog/", "").trim();
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
          window.scrollTo({ top: 0, behavior: "smooth" });

          // Record real view count in database
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
        }
      } else if (hash === "#admin") {
        setCurrentView("admin");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentView("home");
        setSelectedBlog(null);
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
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
      window.location.hash = targetSection ? `#${targetSection}` : "#home";
      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            const topOffset = el.offsetTop - 85;
            window.scrollTo({ top: topOffset, behavior: "smooth" });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (view === "blog") {
      setCurrentView("blog");
      setSelectedBlog(null);
      window.location.hash = "#blog";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (view === "admin") {
      setCurrentView("admin");
      window.location.hash = "#admin";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Article selection
  const handleSelectPost = (post: BlogArticle | BlogPost) => {
    setSelectedBlog(post);
    setCurrentView("blog-detail");
    window.location.hash = `#blog/${post.slug || (post as { _id?: string })._id || post.id}`;
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
      window.location.hash = "#book";
      setTimeout(() => {
        const bookingSection = document.getElementById("book");
        if (bookingSection) {
          const topOffset = bookingSection.offsetTop - 85;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }, 120);
      return;
    }

    const bookingSection = document.getElementById("book");
    if (bookingSection) {
      const topOffset = bookingSection.offsetTop - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const handleServicesClick = () => {
    if (currentView !== "home") {
      handleNavigate("home", "services");
      return;
    }
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const topOffset = servicesSection.offsetTop - 85;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
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
              {/* Home Slideshow Header */}
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
