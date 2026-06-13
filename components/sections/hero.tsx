'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: custom * 0.12,
    },
  }),
};

export function Hero() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (blob) {
      blob.style.animation = 'blob-float 15s ease-in-out infinite';
    }
  }, []);

  // const scrollToNext = () => {
  //   const nextSection = document.getElementById('services');
  //   if (nextSection) {
  //     nextSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden flex items-center">
      {/* Premium Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Animated Gradient Blob Background */}
      <motion.div
        ref={blobRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(15, 191, 106, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(15, 191, 106, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 50% -10%, rgba(15, 191, 106, 0.12) 0%, transparent 70%)
          `,
          filter: 'blur(80px)',
        }}
      >
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Text Content - Left Side (~58%) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Eyebrow Tag */}
            <motion.div variants={item} className="flex items-center gap-2">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary/80 font-mono">
                Direct-Response Creative Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div className="space-y-4">
              <motion.h1
                custom={0}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk leading-[1.05] tracking-tight text-foreground"
              >
                Ads That Don&apos;t
              </motion.h1>

              <motion.h1
                custom={1}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-space-grotesk leading-[1.05] tracking-tight font-bold"
                style={{
                  background: 'linear-gradient(135deg, #0FBF6A 0%, #0A8F4F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Just Get Seen.
              </motion.h1>

              <motion.h1
                custom={2}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk leading-[1.05] tracking-tight text-foreground"
              >
                They Get Sold.
              </motion.h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-muted max-w-xl leading-relaxed font-sans"
            >
              Raxel Media engineers conversion-driven performance creative that turns cold scrollers into paying customers fast. From thumb-stopping UGC and crisp stop-motion to high-energy hyper-motion, we build ads that scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(15, 191, 106, 0.3)',
                  backgroundColor: '#12d177'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={cn(
                  'px-8 py-4 rounded-full font-bold font-space-grotesk transition-colors duration-200',
                  'bg-primary text-background border border-primary/20',
                  'text-base sm:text-lg'
                )}
              >
                Book Your Strategy Call
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Corrected Right Side - Floating Ad Engine Stack */}
          <div className="lg:col-span-5 relative w-full h-[480px] lg:h-[580px] flex items-center justify-center mt-8 lg:mt-0">

            {/* Contextual Ambient Light Flare */}
            <div className="absolute w-[350px] h-[350px] bg-primary/10 rounded-full blur-[80px] pointer-events-none z-0" />

            {/* Card 1: Top Right - Shifted further right/up to prevent device overlapping */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-4 -right-2 sm:right-0 lg:-right-6 z-30 bg-surface/80 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center gap-3.5 max-w-[210px]"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <TrendingUp className="w-4 h-4 drop-shadow-[0_0_6px_#0fbf6a]" />
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest text-primary font-bold uppercase">// SCALE_STABLE</p>
                <p className="text-lg font-bold font-space-grotesk text-foreground leading-tight">+184% ROAS</p>
              </div>
            </motion.div>

            {/* Card 2: Core Center - Normalized padding context */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="relative w-[280px] sm:w-[320px] h-[390px] sm:h-[430px] bg-surface/10 border border-white/5 rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.7)] backdrop-blur-md z-20 group hover:border-primary/30 transition-all duration-500"
              style={{
                animation: 'card-float 6s ease-in-out infinite alternate',
              }}
            >
              {/* HTML5 Native Loop Engine */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 mix-blend-screen transition-opacity duration-500 group-hover:opacity-90"
                poster="/videos/showreel-placeholder.jpg"
              >
                <source src="/videos/hero-showreel.mp4" type="video/mp4" />
              </video>

              {/* Protective Dark Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-neutral-950/30 mix-blend-multiply pointer-events-none z-10" />

              {/* Top scanning HUD asset processing line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/40 shadow-[0_0_10px_#0fbf6a] z-20" />

              {/* Lower HUD Meta Labels */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 space-y-2.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-[9px] font-mono font-bold text-primary backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  HYPER_MOTION_ENG_V2.MP4
                </div>
                <h4 className="font-space-grotesk font-bold text-base text-white leading-snug drop-shadow-md">
                  Angle #04: Direct Retention Hook Strategy
                </h4>
              </div>
            </motion.div>

            {/* Card 3: Bottom Left - Lifted upward and pushed wider to clear footer elements */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-4 -left-2 sm:left-0 lg:-left-8 z-30 bg-surface/70 border border-white/10 backdrop-blur-xl rounded-2xl p-4.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[230px] space-y-3 hidden sm:block"
              style={{
                animation: 'card-float 5s ease-in-out infinite alternate-reverse',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-widest text-muted uppercase">// ENGAGEMENT</span>
                <Flame className="w-3.5 h-3.5 text-primary drop-shadow-[0_0_4px_#0fbf6a]" />
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "74.8%" }}
                    transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
                    className="h-full bg-primary shadow-[0_0_8px_#0fbf6a]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted">
                  <span>Avg. Hook Rate</span>
                  <span className="text-foreground font-bold font-sans">74.8%</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Page Scroll Indicator Anchor */}
        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="flex flex-col items-center gap-1.5 text-muted hover:text-primary transition-colors duration-300 group"
            aria-label="Scroll to next section"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold font-mono text-muted/50 group-hover:text-primary transition-colors">Scroll</span>
            <ChevronDown className="w-4 h-4 text-primary" strokeWidth={2.5} />
          </motion.button>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes card-float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(6px, -10px) scale(1.01);
          }
        }
      `}</style>
    </section>
  );
}