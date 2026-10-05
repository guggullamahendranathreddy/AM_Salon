import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQS } from "../data";

export default function OffersAndFaqs() {
  const [openFaq, setOpenFaq] = useState<string | null>("f1");

  return (
    <section className="relative py-20 bg-bg-charcoal border-y border-primary/10 overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto items-start">
          
          {/* ANIMATED FAQ ACCORDION */}
          <div className="w-full">
            <span className="text-secondary text-xs uppercase font-body tracking-[0.3em] font-semibold flex items-center gap-2 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-secondary" /> Salon FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-1 mb-4 leading-none">
              Client Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-luxury-cream/60 leading-relaxed font-body font-light mb-8">
              Got queries? Check out official details regarding appointments, our clinical-grade salon hygiene, customer parking, and custom makeup consulting.
            </p>

            {/* Accordion Cluster */}
            <div className="flex flex-col gap-3">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-sm bg-bg-dark border border-white/5 overflow-hidden transition-all duration-300"
                  >
                    {/* Collapsible Header toggle */}
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-body outline-none cursor-pointer focus:bg-bg-charcoal/10"
                    >
                      <span className="text-sm font-bold uppercase tracking-wider text-white">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-secondary shrink-0"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    {/* Animated height Collapsible Body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="p-5 pt-0 border-t border-white/5 bg-bg-charcoal/20 font-body text-xs sm:text-sm text-luxury-cream/70 leading-relaxed font-light">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
