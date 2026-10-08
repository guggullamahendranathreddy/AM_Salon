import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Calendar, Phone, Sun, Moon, BookOpen, MapPin, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import MenuBookModal from "./MenuBookModal";

interface NavbarProps {
  onBookClick: (service?: string, branch?: string) => void;
  currentView?: "home" | "blog" | "blog-detail" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar";
  onNavigate?: (
    view: "home" | "blog" | "admin" | "locations" | "location-nallagandla" | "location-pragathi-nagar",
    targetSection?: string
  ) => void;
}

export default function Navbar({ onBookClick, currentView = "home", onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About Us", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Locations", href: "/locations", id: "locations", hasDropdown: true },
    { name: "Reviews", href: "#reviews", id: "reviews" },
    { name: "Blog", href: "#blog", id: "blog" },
  ];

  // Synchronize active section with currentView
  useEffect(() => {
    if (currentView === "blog" || currentView === "blog-detail") {
      setActiveSection("blog");
    } else if (
      currentView === "locations" ||
      currentView === "location-nallagandla" ||
      currentView === "location-pragathi-nagar"
    ) {
      setActiveSection("locations");
    }
  }, [currentView]);

  // Monitor scroll for header glassmorphism and active section spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentView !== "home") return;

      // Basic Scroll Spy
      const sections = ["home", "about", "services", "gallery", "reviews", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  const handleLinkClick = (href: string, id: string) => {
    setIsOpen(false);
    setLocationsDropdownOpen(false);
    setActiveSection(id);

    if (id === "blog") {
      if (onNavigate) {
        onNavigate("blog");
      } else {
        window.location.hash = "#blog";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "locations") {
      if (onNavigate) {
        onNavigate("locations");
      } else {
        window.location.hash = "#locations";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentView !== "home") {
      if (onNavigate) {
        onNavigate("home", id);
      } else {
        window.location.hash = href;
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  const handleLocationSubNavigate = (
    view: "locations" | "location-nallagandla" | "location-pragathi-nagar"
  ) => {
    setIsOpen(false);
    setLocationsDropdownOpen(false);
    setActiveSection("locations");
    if (onNavigate) {
      onNavigate(view);
    } else {
      if (view === "locations") window.location.hash = "#locations";
      else if (view === "location-nallagandla") window.location.hash = "#locations/nallagandla";
      else if (view === "location-pragathi-nagar") window.location.hash = "#locations/pragathi-nagar";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bg-dark/95 backdrop-blur-md shadow-lg border-b border-primary/15 py-3"
            : "bg-bg-dark/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-white/5 sm:border-none py-3.5 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Left Side */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#home", "home");
              }}
              className="flex items-center gap-1 focus:outline-none"
              aria-label="AM Unisex Salon Home"
            >
              <Logo size="sm" />
            </a>

            {/* Desktop Navigation Link Cluster */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.id}
                      className="relative"
                      onMouseEnter={() => setLocationsDropdownOpen(true)}
                      onMouseLeave={() => setLocationsDropdownOpen(false)}
                    >
                      <button
                        onClick={() => handleLocationSubNavigate("locations")}
                        className={`relative font-body text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 outline-none uppercase py-2 flex items-center gap-1 cursor-pointer ${
                          isActive ? "text-secondary" : "text-luxury-cream/80 hover:text-white"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5" />
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {locationsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 w-64 bg-bg-charcoal border border-white/10 rounded-md shadow-2xl p-2 z-50 mt-1"
                          >
                            <button
                              onClick={() => handleLocationSubNavigate("location-nallagandla")}
                              className="w-full text-left p-2.5 rounded hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white group-hover:text-secondary flex items-center gap-1.5 font-body">
                                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                                  Nallagandla
                                </span>
                                <span className="text-[9px] uppercase font-bold text-secondary bg-primary/25 px-1.5 py-0.5 rounded">
                                  Primary
                                </span>
                              </div>
                              <p className="text-[10px] text-luxury-cream/60 font-body mt-0.5">
                                HYTEK ARCADE, Kancha Gachibowli Rd
                              </p>
                            </button>

                            <button
                              onClick={() => handleLocationSubNavigate("location-pragathi-nagar")}
                              className="w-full text-left p-2.5 rounded hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white group-hover:text-secondary flex items-center gap-1.5 font-body">
                                  <MapPin className="w-3.5 h-3.5 text-accent" />
                                  Pragathi Nagar
                                </span>
                              </div>
                              <p className="text-[10px] text-luxury-cream/60 font-body mt-0.5">
                                Near Shiva Medicals, 3rd Layout
                              </p>
                            </button>

                            <div className="border-t border-white/5 mt-1 pt-1">
                              <button
                                onClick={() => handleLocationSubNavigate("locations")}
                                className="w-full text-left px-2.5 py-1.5 text-[11px] font-semibold text-secondary hover:text-white uppercase font-body cursor-pointer"
                              >
                                View Both Branches &rarr;
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, link.id);
                    }}
                    className={`relative font-body text-xs lg:text-sm font-medium tracking-wide transition-colors duration-200 outline-none uppercase py-2 ${
                      isActive ? "text-secondary" : "text-luxury-cream/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Side Call to Action Button */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-luxury-cream/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-sm border border-secondary/35 bg-bg-charcoal/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/70 hover:bg-secondary/10 hover:text-white cursor-pointer"
                aria-label="View Menu Card"
              >
                <BookOpen className="w-3.5 h-3.5 text-secondary" />
                Menu
              </button>
              <a
                href="tel:+917569979965"
                className="inline-flex items-center gap-1.5 rounded-sm border border-secondary/35 bg-bg-charcoal/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-luxury-cream transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/70 hover:bg-secondary/10 hover:text-white"
                aria-label="Call AM Salon"
              >
                <Phone className="w-3.5 h-3.5 text-secondary" />
                Call
              </a>
              <button
                onClick={() => onBookClick()}
                className="relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white text-xs lg:text-sm font-semibold tracking-wider uppercase px-4 lg:px-5 py-2.5 rounded-sm hover:translate-y-[-1px] transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(166,58,58,0.3)] hover:shadow-[0_6px_16px_rgba(166,58,58,0.5)] border border-white/5 active:translate-y-[1px]"
                id="cta-nav-book"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2.5">
              <button
                onClick={toggleTheme}
                className="p-1.5 text-luxury-cream/80 hover:text-white transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => onBookClick()}
                className="bg-primary/20 text-secondary border border-primary/40 p-2 rounded-sm cursor-pointer active:scale-95 transition-transform"
                aria-label="Quick booking"
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-luxury-cream p-1.5 focus:outline-none focus:ring-1 focus:ring-primary/40 rounded-sm cursor-pointer"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-x-0 top-[70px] z-30 bg-bg-charcoal border-b border-primary/25 shadow-2xl md:hidden overflow-y-auto max-h-[calc(100vh-70px)]"
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;

                  if (link.hasDropdown) {
                    return (
                      <div key={link.id} className="space-y-1">
                        <button
                          onClick={() => handleLocationSubNavigate("locations")}
                          className={`w-full text-left block font-body text-sm font-semibold tracking-wide uppercase py-3 px-3 rounded-md transition-colors ${
                            isActive
                              ? "bg-primary/20 text-secondary border-l-4 border-secondary"
                              : "text-luxury-cream/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          Locations (2 Branches)
                        </button>
                        <div className="pl-4 space-y-1">
                          <button
                            onClick={() => handleLocationSubNavigate("location-nallagandla")}
                            className="w-full text-left block text-xs py-2 px-3 rounded text-luxury-cream/70 hover:text-white hover:bg-white/5 font-body"
                          >
                            &bull; Nallagandla (Primary Branch)
                          </button>
                          <button
                            onClick={() => handleLocationSubNavigate("location-pragathi-nagar")}
                            className="w-full text-left block text-xs py-2 px-3 rounded text-luxury-cream/70 hover:text-white hover:bg-white/5 font-body"
                          >
                            &bull; Pragathi Nagar Branch
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href, link.id);
                      }}
                      className={`block font-body text-sm font-semibold tracking-wide uppercase py-3 px-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary/20 text-secondary border-l-4 border-secondary"
                          : "text-luxury-cream/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>

              <div className="border-t border-white/5 pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMenuModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 font-body text-sm font-semibold text-luxury-cream/90 bg-white/5 py-3 rounded-md hover:bg-white/10"
                >
                  <BookOpen className="w-4 h-4 text-secondary" />
                  View Menu Card
                </button>
                <a
                  href="tel:+917569979965"
                  className="flex items-center justify-center gap-2 font-body text-sm font-semibold text-luxury-cream/90 bg-white/5 py-3 rounded-md hover:bg-white/10"
                >
                  <Phone className="w-4 h-4 text-secondary" />
                  Call Us (+91 75699 79965)
                </a>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold tracking-wider uppercase py-3 rounded-md shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Card Modal */}
      <MenuBookModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </>
  );
}
