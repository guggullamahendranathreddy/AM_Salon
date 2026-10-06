import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChevronLeft, ChevronRight, Sparkle } from "lucide-react";
import { GALLERY_ITEMS } from "../data";

// Descriptive alt texts for Image SEO (Requirement 14)
const GALLERY_ALT_TEXTS: Record<string, string> = {
  g1: "AM Unisex Salon entrance sign in Nallagandla Hyderabad",
  g2: "AM Unisex Salon interior styling stations in Hyderabad",
  g3: "AM Unisex Salon reception and customer waiting lounge in Hyderabad",
  g4: "Luxury hair wash and hair spa stations at AM Unisex Salon",
  g5: "Premium hair shampoo and conditioning basin at AM Unisex Salon",
  g6: "Private facial and aesthetic treatment room at AM Unisex Salon Hyderabad",
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const filters = [
    { id: "all", label: "Show All" },
    { id: "interiors", label: "Salon Interiors" },
    { id: "hair-wash", label: "Hair Wash & Spa" },
    { id: "facial", label: "Facial Treatment" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const handleOpenLightbox = (itemId: string) => {
    const globalIdx = GALLERY_ITEMS.findIndex((it) => it.id === itemId);
    if (globalIdx !== -1) {
      setSelectedPhoto(globalIdx);
    }
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhoto !== null) {
      setSelectedPhoto((prev) => (prev! + 1) % GALLERY_ITEMS.length);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhoto !== null) {
      setSelectedPhoto((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return;
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowRight") setSelectedPhoto((prev) => (prev! + 1) % GALLERY_ITEMS.length);
      if (e.key === "ArrowLeft")
        setSelectedPhoto((prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="relative py-20 bg-bg-dark border-t border-primary/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-2">
            <Sparkle className="w-3.5 h-3.5 text-secondary" /> Visual Tour
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mt-1 mb-4">
            Salon Atmosphere &amp; <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/70 leading-relaxed font-body font-light">
            Take a visual tour inside AM Unisex Salon in Hyderabad. Explore our clean, hygienic styling floor, comfortable hair wash basins, and private treatment chambers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-10 select-none">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "bg-bg-charcoal text-luxury-cream/70 hover:text-white border border-white/5 hover:border-white/20"
                }`}
                aria-label={`Filter by ${filter.label}`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const altText = GALLERY_ALT_TEXTS[item.id] || `${item.title} at AM Unisex Salon Hyderabad`;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  onClick={() => handleOpenLightbox(item.id)}
                  className="group relative rounded-lg overflow-hidden bg-bg-charcoal border border-white/5 hover:border-primary/40 shadow-xl cursor-pointer aspect-[4/3]"
                >
                  <img
                    src={item.imageUrl}
                    alt={altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mb-1">
                      {item.category.replace("-", " ")}
                    </span>
                    <h3 className="text-sm font-semibold text-white font-body">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-luxury-cream/70 font-body flex items-center gap-1 mt-1">
                      <Search className="w-3 h-3 text-secondary" /> Click to expand
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-bg-charcoal">
                <img
                  src={GALLERY_ITEMS[selectedPhoto].imageUrl}
                  alt={
                    GALLERY_ALT_TEXTS[GALLERY_ITEMS[selectedPhoto].id] ||
                    GALLERY_ITEMS[selectedPhoto].title
                  }
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />

                <div className="p-4 bg-bg-dark/95 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-white font-body">
                      {GALLERY_ITEMS[selectedPhoto].title}
                    </p>
                    <p className="text-[11px] text-luxury-cream/60 font-body">
                      AM Unisex Salon, Nallagandla, Hyderabad
                    </p>
                  </div>
                  <span className="font-mono text-secondary text-xs">
                    {selectedPhoto + 1} / {GALLERY_ITEMS.length}
                  </span>
                </div>
              </div>

              {/* Prev / Next buttons */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}