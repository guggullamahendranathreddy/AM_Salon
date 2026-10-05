import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkle, Instagram, Scissors, Award } from "lucide-react";
import { STYLISTS } from "../data";

export default function Staff() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section className="py-20 bg-bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
        
        {/* Decorative vectors */}
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center justify-center gap-2">
            <Award className="w-3.5 h-3.5 text-secondary" /> Meet Our Experts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mt-1 mb-4">
            Meet the <span className="text-gradient">Master Stylists & Artists</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/60 leading-relaxed font-body font-light">
            Our highly certified hair and beauty specialists are passionate about providing pristine, hygienic grooming and bespoke aesthetic results.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {STYLISTS.map((stylist, idx) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              className="group relative rounded-sm bg-bg-charcoal border border-white/5 hover:border-primary/40 overflow-hidden shadow-2xl transition-all hover:translate-y-[-4px] flex flex-col justify-between"
            >
              {/* Profile Image container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 border-b border-white/5">
                <img
                  src={stylist.imageUrl}
                  alt={stylist.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Image Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal via-bg-charcoal/15 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Experience Badge floating on image */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-sm">
                  <p className="text-[10px] font-bold tracking-widest text-luxury-cream uppercase font-body flex items-center gap-1">
                    <Scissors className="w-3 h-3 text-secondary" />
                    {stylist.experience.split(" ")[0]} Year Pro
                  </p>
                </div>
              </div>

              {/* Profile Descriptions */}
              <div className="p-6 relative flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-secondary text-[11px] font-bold uppercase tracking-wider font-body mb-1 block">
                    {stylist.role}
                  </span>
                  
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase font-body mb-2.5">
                    {stylist.name}
                  </h3>
                  
                  <p className="text-xs text-luxury-cream/65 font-body leading-relaxed font-light mb-6">
                    Specialist: <span className="text-white font-medium">{stylist.specialization}</span>
                  </p>
                </div>

                {/* Card footer: social triggers & certification info */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-accent font-semibold font-body">
                    Hygienic Expert
                  </span>
                  <a
                    href="https://www.instagram.com/akshaiunisexsalonpragathinagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/20 flex items-center justify-center text-white transition-all active:scale-90"
                    aria-label={`Follow ${stylist.name} on Instagram`}
                  >
                    <Instagram className="w-4 h-4 text-secondary hover:text-white transition-colors" />
                  </a>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
