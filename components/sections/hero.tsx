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
      {/* Animated Gradient Blob Background */}
      <motion.div
        ref={blobRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 50%, rgba(15, 191, 106, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(15, 191, 106, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 50% 0%, rgba(15, 191, 106, 0.15) 0%, transparent 70%)
          `,
          filter: 'blur(60px)',
        }}
      >
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 20,
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
              <span className="inline-flex w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm font-medium tracking-widest uppercase text-muted">
                Direct-Response Creative Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div className="space-y-4">
              {/* Line 1: Bold */}
              <motion.h1
                custom={0}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk leading-tight"
              >
                Ads That Don&apos;t
              </motion.h1>

              {/* Line 2: Regular weight for contrast */}
              <motion.h1
                custom={1}
                variants={lineVariants}
                className="text-5xl sm:text-6xl lg:text-7xl font-space-grotesk leading-tight"
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
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk leading-tight"
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-8 py-4 rounded-full font-semibold font-space-grotesk',
                  'bg-primary text-background',
                  'hover:shadow-lg hover:shadow-primary/50',
                  'transition-shadow duration-300',
                  'text-base sm:text-lg'
                )}
              >
                Book Your Strategy Call
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'px-8 py-4 rounded-full font-semibold font-space-grotesk',
                  'border-2 border-primary text-primary',
                  'hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/50',
                  'transition-all duration-300',
                  'flex items-center justify-center gap-2',
                  'text-base sm:text-lg'
                )}
              >
                View Our Work
                <ChevronDown className="w-5 h-5 rotate-90" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Empty space for gradient blob */}
          <div className="hidden lg:col-span-5 lg:block" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center gap-2 text-muted hover:text-primary transition-colors duration-300"
            aria-label="Scroll to next section"
          >
            <span className="text-sm font-medium">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" strokeWidth={1.5} />
          </button>
        </motion.div>
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
