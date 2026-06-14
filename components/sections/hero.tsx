'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ArrowDownRight } from 'lucide-react';
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

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden flex items-center py-12 sm:py-20 lg:py-0">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-8 items-center">

          {/* Text Content - Left Side (~58%) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
          >
            {/* Eyebrow Tag */}
            <motion.div variants={item} className="flex items-center gap-2">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary/80 font-mono">
                Direct-Response Creative Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div className="space-y-2 sm:space-y-4">
              <motion.h1
                custom={0}
                variants={lineVariants}
                className="text-4xl sm:text-6xl xl:text-7xl font-bold font-space-grotesk leading-[1.1] sm:leading-[1.05] tracking-tight text-foreground"
              >
                Ads That Don&apos;t
              </motion.h1>

              <motion.h1
                custom={1}
                variants={lineVariants}
                className="text-4xl sm:text-6xl xl:text-7xl font-space-grotesk leading-[1.1] sm:leading-[1.05] tracking-tight font-bold"
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
                className="text-4xl sm:text-6xl xl:text-7xl font-bold font-space-grotesk leading-[1.1] sm:leading-[1.05] tracking-tight text-foreground"
              >
                They Get Sold.
              </motion.h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-xl text-muted"
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
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={cn(
                  'w-full sm:w-auto px-8 py-4 rounded-full font-bold font-space-grotesk transition-colors duration-200',
                  'bg-primary hover:bg-primary/90 text-background border border-primary/20',
                  'text-base sm:text-lg'
                )}
              >
                Book Your Strategy Call
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Fully Responsive Strategic Asset Showcase */}
          <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto h-[440px] sm:h-[520px] lg:h-[580px] flex items-center justify-center mt-4 lg:mt-0">

            {/* Contextual Ambient Light Flare */}
            <div className="absolute w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] bg-primary/5 rounded-full blur-[70px] sm:blur-[90px] pointer-events-none z-0" />

            {/* Card 1: Top Right - High-Ticket Scale Value Badge */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-[8%] sm:top-4 right-[2%] sm:right-0 lg:-right-6 z-30 bg-surface/90 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_25px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 max-w-[180px] sm:max-w-[220px]"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary drop-shadow-[0_0_4px_#0fbf6a]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[8px] sm:text-[9px] font-mono tracking-widest text-muted font-bold uppercase">// SCALE_VELOCITY</p>
                <p className="text-sm sm:text-base font-bold font-space-grotesk text-foreground leading-tight">3.4x Avg ROAS</p>
              </div>
            </motion.div>

            {/* Card 2: Core Center Asset Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="relative w-[240px] sm:w-[300px] md:w-[320px] h-[340px] sm:h-[400px] md:h-[430px] bg-surface/5 border border-white/10 rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] backdrop-blur-md z-20 group transition-all duration-500"
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
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                poster="/videos/showreel-placeholder.jpg"
              >
                <source src="/videos/hero-showreel.mp4" type="video/mp4" />
              </video>

              {/* Protective Elegant Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10 pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-20 space-y-1.5 sm:space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-primary/90 uppercase">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  CASE_STUDY_REF_04
                </div>
                <h4 className="font-space-grotesk font-semibold text-sm sm:text-base text-white leading-snug drop-shadow-md">
                  High-Conversion Capital Scaling Architecture
                </h4>
              </div>
            </motion.div>

            {/* Card 3: Bottom Left - Capital Efficiency Diagnostics Bar */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-[6%] sm:bottom-4 left-[2%] sm:left-0 lg:-left-8 z-30 bg-surface/90 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_25px_50px_rgba(0,0,0,0.5)] w-[210px] sm:w-[250px] space-y-3 hidden sm:block"
              style={{
                animation: 'card-float 5s ease-in-out infinite alternate-reverse',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-muted uppercase">// EFFICIENCY_INDEX</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <ArrowDownRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary drop-shadow-[0_0_4px_#0fbf6a]" />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-end gap-2">
                  <span className="text-[10px] sm:text-[11px] font-sans text-muted font-medium truncate">Wasted Spend Reduction</span>
                  <span className="text-xs sm:text-sm font-bold font-space-grotesk text-primary leading-none whitespace-nowrap">-40% CPA</span>
                </div>
                <div className="h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_8px_rgba(15,191,106,0.4)]"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}