import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Crown,
  Handshake,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  MousePointer2,
} from "lucide-react";
import { LOCAL_ASSETS } from "../data";

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export default function Hero({ onBookClick, onServicesClick }: HeroProps) {
  const slides = [
    {
      image: LOCAL_ASSETS.salonInteriorMain,
      title: "AM Unisex Salon – Premium Unisex Salon in Hyderabad",
      label: "AM UNISEX SALON • HYDERABAD",
      subTitle:
        "Experience Hyderabad's premier destination in Nallagandla and Pragathi Nagar for luxury haircuts, restorative hair spa, skin facials, and grooming.",
      alt: "AM Unisex Salon interior reception lounge in Hyderabad",
    },
    {
      image: LOCAL_ASSETS.hairWashSpa,
      title: "Restorative Hair Spa & Botox Care",
      label: "HAIR SPA & BOTOX SPECIALTY",
      subTitle:
        "Reinvigorate dull, fatigued strands with world-class deep nourishing keratin, molecular botox, and hair spa therapies.",
      alt: "Luxury hair wash and hair spa stations at AM Unisex Salon Hyderabad",
    },
    {
      image: LOCAL_ASSETS.skinCareRoom,
      title: "Bespoke Radiance Skin Facials",
      label: "GLOW & SKIN DERMATOLOGY",
      subTitle:
        "Indulge in botanical glow facials, clarifying cleanups, and gentle skincare tailored for men and women.",
      alt: "Private skin care and facial treatment room at AM Unisex Salon Hyderabad",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const whatsappUrl = `https://wa.me/917569979965?text=${encodeURIComponent(
    "Hello AM Unisex Salon, I would like to quickly inquire about your hair and grooming services."
  )}`;

  return (
    <section
      id="home"
      className="relative min-h-[100svh] sm:h-[100svh] w-full bg-bg-dark overflow-hidden"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].alt || "AM Unisex Salon Hyderabad"}
              className="h-full w-full object-cover object-center scale-[1.02]"
              loading={currentIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={currentIndex === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/56 to-bg-dark/72" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/86 via-bg-dark/22 to-bg-dark/35" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex min-h-[100svh] sm:h-full max-w-7xl flex-col justify-start sm:justify-center pt-28 sm:pt-0 pb-20 sm:pb-0 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-secondary/45 bg-primary/28 px-3.5 py-1.5 backdrop-blur-md sm:mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="truncate text-[10px] font-body font-semibold uppercase tracking-widest text-luxury-cream md:text-xs">
              {slides[currentIndex].label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mb-5 font-display text-3xl font-bold leading-[1.1] text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            AM Unisex Salon – <span className="text-gradient">Premium Unisex Salon in Hyderabad</span>
            <span className="mt-3 block font-body text-xs font-semibold uppercase tracking-widest text-luxury-cream/80 sm:text-sm md:text-lg">
              Professional Haircuts • Hair Spa • Facials • Men & Women Grooming in Nallagandla & Pragathi Nagar
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 max-w-xl font-body text-sm font-light leading-relaxed text-luxury-cream/70 sm:text-base md:text-lg"
          >
            {slides[currentIndex].subTitle}
            <span className="mt-1 block font-medium text-accent">
              Branches in Nallagandla (HYTEK ARCADE) and Pragathi Nagar, Hyderabad.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mb-8 flex flex-col items-stretch gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4"
          >
            <button
              onClick={onBookClick}
              className="cursor-pointer rounded-sm bg-gradient-to-r from-primary to-secondary px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(215,177,93,0.24)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(215,177,93,0.35)] sm:px-8 sm:py-4 md:text-sm"
              aria-label="Book an appointment at AM Unisex Salon"
            >
              Book an Appointment
            </button>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                onServicesClick();
              }}
              className="flex items-center justify-center gap-2 rounded-sm border border-secondary/40 bg-bg-charcoal/86 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-luxury-cream backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-secondary hover:text-white sm:px-8 sm:py-4 md:text-sm"
              aria-label="View our salon services"
            >
              View Our Salon Services
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-bg-charcoal/86 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-luxury-cream backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-secondary/45 sm:px-8 sm:py-4 md:text-sm"
              aria-label="Inquire with AM Unisex Salon on WhatsApp"
            >
              <MessageSquare className="h-4 w-4 text-[#25D366]" />
              Inquire via WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid max-w-lg grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-4 sm:pt-6"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-sm border border-secondary/25 bg-primary/20 p-2">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none text-white">4.9 Stars</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-luxury-cream/50">
                  409+ Reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-sm border border-accent/25 bg-accent/20 p-2">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none text-white">8+ Years</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-luxury-cream/50">
                  Excellence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-sm border border-secondary/25 bg-primary/20 p-2">
                <ShieldCheck className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none text-white">100%</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-luxury-cream/50">
                  Hygienic
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-8 top-1/3 z-20 hidden flex-col gap-5 lg:flex">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-md border border-primary/45 bg-bg-charcoal/90 px-4 py-3 shadow-2xl backdrop-blur-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/35">
            <Crown className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Premium Family Salon</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-accent">
              Elegant Space
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-md border border-accent/45 bg-bg-charcoal/95 px-4 py-3 shadow-2xl backdrop-blur-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/35">
            <Handshake className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Trusted by 1000+ Clients</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-secondary">
              Verified Care
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="flex items-center gap-3 rounded-md border border-primary/45 bg-bg-charcoal/95 px-4 py-3 shadow-2xl backdrop-blur-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/25">
            <Sparkles className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Luxury Beauty Station</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-accent">
              Hygienic Products
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-3 md:flex">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-5 w-5 text-secondary/70" />
        </motion.div>
        <span className="writing-vertical text-[9px] font-bold uppercase tracking-[0.2em] text-luxury-cream/50 [writing-mode:vertical-rl]">
          Scroll Discover
        </span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-secondary/50 to-transparent" />
      </div>
    </section>
  );
}
