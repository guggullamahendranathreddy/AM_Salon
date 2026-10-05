import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Shield, Award, Sparkle, Leaf, CheckCircle } from "lucide-react";
import { LOCAL_ASSETS } from "../data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const highlights = [
    {
      id: 1,
      icon: <Sparkles className="w-5 h-5 text-secondary" />,
      title: "Luxury Salon Ambience",
      text: "Step out of the city rush into a relaxing, private lounge with comfortable reclining leather massage chairs and soft chill-out melodies.",
    },
    {
      id: 2,
      icon: <Award className="w-5 h-5 text-accent" />,
      title: "Professional Stylists",
      text: "Indulge in care curated by Manish and Pookar, certified master stylists with 8+ years experience in multi-cultural locks, hair spa, and bridal glamor.",
    },
    {
      id: 3,
      icon: <Leaf className="w-5 h-5 text-secondary" />,
      title: "Premium Hair & Skin Formula",
      text: "We protect your hair and skin first with genuine professional products from L'Oreal, Matrix, and Schwarzkopf.",
    },
    {
      id: 4,
      icon: <Shield className="w-5 h-5 text-accent" />,
      title: "Surgical Hygiene and Care",
      text: "Your safety is our priority. Every tool runs through autoclave sterilizers, single-use fabrics are discarded, and workbenches are sanitized after every cut.",
    },
    {
      id: 5,
      icon: <CheckCircle className="w-5 h-5 text-secondary" />,
      title: "Affordable Family Luxury",
      text: "Designed to serve ladies, gentlemen, and young children under a single roof. Experience unparalleled premium grooming without a premium ticket.",
    },
  ];

  return (
    <section id="about" ref={ref} className="relative py-20 bg-bg-dark overflow-hidden">
      
      {/* Decorative vector background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Images Grid */}
          <div className="lg:col-span-5 relative grid grid-cols-12 gap-4">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="col-span-9 relative"
            >
              {/* Outer Burgundy Glow Boundary */}
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-primary to-accent opacity-30 blur-sm" />
              <div className="relative overflow-hidden shadow-2xl rounded-sm aspect-[4/5] bg-neutral-900 border border-white/10 group">
                <img
                  src={LOCAL_ASSETS.salonInteriorMain}
                  alt="AM Unisex Salon Main Lounge"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Bottom Offset Overlapping Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="col-span-7 absolute -bottom-10 -right-4 md:-right-8"
            >
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-secondary to-accent opacity-25" />
              <div className="relative overflow-hidden shadow-2xl rounded-sm aspect-square bg-bg-charcoal border border-white/15">
                <img
                  src={LOCAL_ASSETS.skinCareRoom}
                  alt="Hygienic treatment rooms"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-6 -left-6 bg-gradient-to-br from-primary to-secondary px-5 py-4 rounded-sm border border-white/10 shadow-2xl z-20 hidden sm:block"
            >
              <p className="text-3xl font-display font-extrabold text-luxury-cream leading-none mb-1">8+</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-luxury-cream/80">Years of</p>
              <p className="text-[9px] text-accent uppercase tracking-wider font-bold">Excellence</p>
            </motion.div>

          </div>

          {/* Right Side: Editorial Content */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-secondary text-xs uppercase font-body tracking-[0.25em] font-semibold flex items-center gap-2 mb-2">
                <Sparkle className="w-3 h-3 text-secondary" /> Estd. 2018 Pragathi Nagar
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-none mb-6">
                Why Clients Trust <span className="text-gradient">AM Unisex Salon</span>?
              </h2>

              <p className="text-sm md:text-base text-luxury-cream/70 font-body leading-relaxed mb-6 font-light">
                AM Unisex Salon is one of Pragathi Nagar's most trusted family salons, providing premium beauty and grooming services for men, women and children. With a commitment to excellence, professional expertise and customer satisfaction, we have built a loyal client base that continues to grow every year.
              </p>
              <p className="text-sm md:text-base text-luxury-cream/70 font-body leading-relaxed mb-8 font-light">
                Whether it's a structural haircut, organic hair spa, high-grade facial peel, party makeover, or bridal master services, our team ensures every guest enjoys a relaxing and luxurious salon experience.
              </p>
            </motion.div>

            {/* Structured Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.slice(0, 4).map((high, index) => (
                <motion.div
                  key={high.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-5 rounded-sm bg-bg-charcoal/60 border border-white/5 hover:border-primary/30 hover:bg-bg-charcoal/90 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      {high.icon}
                    </div>
                    <h3 className="text-sm font-semibold tracking-wide text-white uppercase font-body">
                      {high.title}
                    </h3>
                  </div>
                  <p className="text-xs text-luxury-cream/60 leading-relaxed font-body">
                    {high.text}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
