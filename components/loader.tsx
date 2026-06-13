'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const overlayVariants: Variants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.04,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.3,
      delay: i * 0.02,
      ease: [0.55, 0.055, 0.675, 0.19],
    },
  }),
};

/**
 * PageLoader Component
 * Full-screen loader with "RAXEL MEDIA" reveal animation
 * Shows for 1-1.5 seconds on initial page load
 */
export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const text = 'RAXEL MEDIA';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          variants={overlayVariants}
          exit="exit"
        >
          {/* Logo Text */}
          <div className="flex gap-1">
            {text.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="font-space-grotesk font-bold text-5xl sm:text-6xl text-foreground tracking-tight"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          {/* Animated underline */}
          <motion.div
            className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 h-1 bg-primary rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
