import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scissors, Sparkles, Crown, Droplets, Brush, ArrowUpRight } from "lucide-react";
import { SERVICE_ITEMS } from "../data";
import { ServiceItem } from "../types";

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<"men" | "women" | "skin" | "hair" | "bridal">("men");

  const categories = [
    { id: "men", label: "Men's Grooming", icon: <Scissors className="w-4 h-4" /> },
    { id: "women", label: "Women's Beauty", icon: <Crown className="w-4 h-4" /> },
    { id: "hair", label: "Hair Treatments", icon: <Droplets className="w-4 h-4" /> },
    { id: "skin", label: "Skin Care", icon: <Sparkles className="w-4 h-4" /> },
    { id: "bridal", label: "Bridal Services", icon: <Brush className="w-4 h-4" /> },
  ] as const;

  const filteredServices = SERVICE_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="services" className="relative py-20 bg-bg-charcoal border-y border-primary/10 overflow-hidden">
      
      {/* Background delicate elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold">
            Elegant Menu
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight mt-2 mb-4">
            Our Premium <span className="text-gradient">Services & Therapies</span>
          </h2>
          <p className="text-xs sm:text-sm text-luxury-cream/60 leading-relaxed font-body font-light">
            Indulge in tailored treatments engineered with luxury products and professional care, delivering instant aesthetic results.
          </p>
        </div>

        {/* Tab Selection Row (Sliding Pill Design) */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-6 scrollbar-none gap-2 md:gap-4 select-none">
          {categories.map((cat) => {
            const isTabActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 pointer cursor-pointer ${
                  isTabActive
                    ? "text-luxury-cream"
                    : "text-luxury-cream/60 hover:text-white bg-bg-dark/40 border border-white/5"
                }`}
              >
                {/* Framer motion pill backdrop animation */}
                {isTabActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full z-0 border border-white/10 shadow-lg"
                    style={{ originY: "0px" }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{cat.icon}</span>
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Grid list of services */}
        <div className="mt-8">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative p-6 rounded-lg bg-bg-dark border border-white/5 hover:border-primary/40 hover:bg-bg-dark transition-all shadow-inner hover:shadow-[0_12px_24px_-10px_rgba(166,58,58,0.3)] flex flex-col justify-between"
                >
                  <div>
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold font-body text-white tracking-wide group-hover:text-secondary transition-colors uppercase leading-snug mb-2.5">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-luxury-cream/65 leading-relaxed font-body font-light mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-semibold group-hover:text-luxury-cream transition-colors">
                      Premium Formula
                    </span>
                    <button
                      onClick={() => onServiceSelect(service.name)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-luxury-cream hover:text-secondary transition-all group-hover:translate-x-1 cursor-pointer"
                    >
                      Book Service
                      <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
