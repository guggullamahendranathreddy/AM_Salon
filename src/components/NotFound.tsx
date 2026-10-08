import React, { useEffect } from "react";
import { updatePageSEO } from "../App";
import { ArrowLeft, Home, MapPin, Calendar, Sparkles } from "lucide-react";

interface NotFoundProps {
  onNavigateHome: () => void;
  onNavigateLocations: () => void;
  onBookClick: () => void;
}

export default function NotFound({
  onNavigateHome,
  onNavigateLocations,
  onBookClick,
}: NotFoundProps) {
  useEffect(() => {
    updatePageSEO(
      "Page Not Found (404) | AM Unisex Salon",
      "The page you are looking for does not exist or has been moved. Explore AM Unisex Salon services, locations, and booking in Hyderabad."
    );

    // Set noindex meta tag for soft-404 prevention in search crawlers
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const prevRobots = metaRobots ? metaRobots.content : "index, follow";
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = "noindex, nofollow";

    // Set prerender status code if crawler uses it
    let prerenderTag = document.querySelector('meta[name="prerender-status-code"]') as HTMLMetaElement | null;
    if (!prerenderTag) {
      prerenderTag = document.createElement("meta");
      prerenderTag.name = "prerender-status-code";
      document.head.appendChild(prerenderTag);
    }
    prerenderTag.content = "404";

    return () => {
      if (metaRobots) {
        metaRobots.content = prevRobots;
      }
      if (prerenderTag && prerenderTag.parentNode) {
        prerenderTag.parentNode.removeChild(prerenderTag);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-bg-dark text-luxury-cream">
      {/* Background Decorative Blur Rings */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center z-10">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-secondary/40 text-secondary text-xs uppercase tracking-widest font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Error 404 • Not Found</span>
        </div>

        {/* Big Stylized 404 */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-display font-bold text-white tracking-tight leading-none mb-4">
          4<span className="text-gradient">0</span>4
        </h1>

        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-luxury-cream mb-4">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-luxury-cream/70 font-body leading-relaxed max-w-lg mx-auto mb-8 font-light">
          We couldn’t find the page you’re looking for. It might have been moved, renamed, or no longer exists. Explore our luxury salon services or visit one of our Hyderabad branches below.
        </p>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary via-primary-light to-secondary text-white font-body font-semibold text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            type="button"
            onClick={onBookClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-secondary/50 text-luxury-cream hover:text-white hover:bg-white/10 font-body font-semibold text-sm transition-all duration-300"
          >
            <Calendar className="w-4 h-4 text-accent" />
            <span>Book Appointment</span>
          </button>

          <button
            type="button"
            onClick={onNavigateLocations}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-luxury-cream hover:text-white hover:border-white/30 font-body font-semibold text-sm transition-all duration-300"
          >
            <MapPin className="w-4 h-4 text-secondary" />
            <span>View Branches</span>
          </button>
        </div>

        {/* Branch Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-6 border-t border-white/10">
          <div className="p-4 rounded-xl bg-bg-surface/60 border border-white/5 hover:border-secondary/30 transition-all">
            <span className="text-[10px] uppercase font-bold text-secondary bg-primary/25 px-2 py-0.5 rounded">
              Primary Branch
            </span>
            <h3 className="font-display font-semibold text-white text-base mt-2">
              Nallagandla Branch
            </h3>
            <p className="text-xs text-luxury-cream/60 mt-1">
              HYTEK ARCADE, Kancha Gachibowli Road
            </p>
            <a
              href="/locations/nallagandla"
              className="inline-block text-xs text-secondary hover:underline mt-2 font-medium"
            >
              Explore Nallagandla Branch →
            </a>
          </div>

          <div className="p-4 rounded-xl bg-bg-surface/60 border border-white/5 hover:border-secondary/30 transition-all">
            <span className="text-[10px] uppercase font-bold text-luxury-cream/70 bg-white/10 px-2 py-0.5 rounded">
              Branch 2
            </span>
            <h3 className="font-display font-semibold text-white text-base mt-2">
              Pragathi Nagar Branch
            </h3>
            <p className="text-xs text-luxury-cream/60 mt-1">
              Near Shiva Medicals, 3rd Layout
            </p>
            <a
              href="/locations/pragathi-nagar"
              className="inline-block text-xs text-secondary hover:underline mt-2 font-medium"
            >
              Explore Pragathi Nagar Branch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
