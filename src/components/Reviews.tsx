import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="reviews" className="relative py-20 bg-bg-dark overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big rating billboard */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight mt-2 mb-6 leading-none">
              What Our Customers <span className="text-gradient">Are Saying</span>
            </h2>
            <p className="text-sm text-luxury-cream/65 font-body leading-relaxed mb-6 font-light">
              We strive to deliver exceptional service, hygienic care, and incredible results with every visit. Here is the verified word from our loyal Hyderabad clients.
            </p>

            {/* Overall Rating card */}
            <div className="inline-flex flex-col items-center lg:items-start p-6 rounded-sm bg-bg-charcoal border border-white/5 shadow-2xl relative">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <h3 className="text-4xl font-display font-black text-white leading-none mb-1">
                4.9 <span className="text-xl text-accent font-light">/ 5.0</span>
              </h3>
              <p className="font-body text-xs text-luxury-cream uppercase tracking-wider font-semibold">
                Overall Google Customer Rating
              </p>
              <p className="font-body text-[10px] text-accent mt-1">
                Based on 409+ verified client reviews on Google Maps
              </p>
            </div>
          </div>

          {/* Right Column: Carousel viewport slider */}
          <div className="lg:col-span-7 relative">
            <div className="relative min-h-[280px] p-8 sm:p-10 rounded-lg bg-bg-charcoal/90 border border-white/5 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Massive ambient decorative quote marks */}
              <Quote className="absolute top-4 right-4 w-20 h-20 text-primary/10 select-none pointer-events-none" />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Stars bar */}
                    <div className="flex items-center gap-1.5 mb-5 select-none">
                      {Array.from({ length: TESTIMONIALS[activeIndex].rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>

                    {/* Testimony Narrative block */}
                    <blockquote className="text-sm sm:text-base md:text-lg font-body font-light text-luxury-cream/80 italic leading-relaxed mb-6">
                      "{TESTIMONIALS[activeIndex].text}"
                    </blockquote>

                    {/* Author block */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-display font-black text-xs text-luxury-cream shadow-md border border-white/10 uppercase">
                        {TESTIMONIALS[activeIndex].name.charAt(0)}
                      </div>
                      <div>
                        <cite className="font-body text-sm font-semibold text-white uppercase not-italic tracking-wide">
                          {TESTIMONIALS[activeIndex].name}
                        </cite>
                        <p className="text-[10px] text-accent uppercase tracking-wider mt-0.5">
                          Verified Google Reviewer
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Manual Controls Buttons (Bottom Row) */}
              <div className="relative z-10 border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
                <span className="font-mono text-xs text-accent font-bold">
                  0{activeIndex + 1} / 0{TESTIMONIALS.length}
                </span>

                {/* Nav buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-white/10 hover:border-primary/50 text-white rounded-full bg-bg-dark hover:bg-primary/20 cursor-pointer active:scale-95 transition-all shadow-md"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 border border-white/10 hover:border-primary/50 text-white rounded-full bg-bg-dark hover:bg-primary/20 cursor-pointer active:scale-95 transition-all shadow-md"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
