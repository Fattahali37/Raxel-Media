'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
    // Add animation styles to blob
    const blob = blobRef.current;
    if (blob) {
      blob.style.animation = 'blob-float 15s ease-in-out infinite';
    }
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left Side (~60%) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-8"
          >
            {/* Eyebrow Tag */}
            <motion.div variants={item} className="flex items-center gap-2">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold tracking-widest uppercase text-primary/80">
                Direct-Response Creative Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div className="space-y-4">
              {/* Line 1: Bold */}
              <motion.h1
                custom={0}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk leading-none tracking-tight text-foreground"
              >
                Ads That Don&apos;t
              </motion.h1>

              {/* Line 2: Regular weight for contrast */}
              <motion.h1
                custom={1}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-space-grotesk leading-none tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #0FBF6A 0%, #0A8F4F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Just Get Seen.
              </motion.h1>

              {/* Line 3: Continuation */}
              <motion.h1
                custom={2}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk leading-none tracking-tight text-foreground"
              >
                They Get Sold.
              </motion.h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed"
            >
              Raxel Media engineers UGC, performance creative, and conversion-driven campaigns
              that turn cold scrollers into paying customers — fast.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.04, 
                  boxShadow: '0 0 30px rgba(15, 191, 106, 0.4)',
                  backgroundColor: '#12d177'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={cn(
                  'px-8 py-4 rounded-full font-semibold font-space-grotesk',
                  'bg-primary text-background border border-primary/20',
                  'text-base sm:text-lg'
                )}
              >
                Book Your Strategy Call
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ 
                  scale: 1.04,
                  backgroundColor: 'rgba(15, 191, 106, 0.08)',
                  borderColor: '#0FBF6A'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={cn(
                  'px-8 py-4 rounded-full font-semibold font-space-grotesk border',
                  'border-primary/30 text-primary bg-primary/5 backdrop-blur-sm',
                  'flex items-center justify-center gap-2',
                  'text-base sm:text-lg'
                )}
              >
                View Our Work
                <ChevronDown className="w-5 h-5 rotate-90" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Empty space for gradient blob */}
          <div className="hidden lg:col-span-5 lg:block" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors duration-300 group"
            aria-label="Scroll to next section"
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-muted/60 group-hover:text-primary transition-colors">Scroll</span>
            <ChevronDown className="w-5 h-5 text-primary" strokeWidth={2} />
          </motion.button>
        </div>
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes blob-float {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -40px) scale(1.05);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
