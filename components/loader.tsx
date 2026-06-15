'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface PageLoaderProps {
  onComplete?: () => void;
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] },
  },
};

const underlineVariants: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 140, // Perfectly spans beneath the text layout width
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (onComplete) onComplete();
        document.body.style.overflow = 'unset';
      }}
    >
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center gap-5"
          style={{ zIndex: 999999 }}
        >
          {/* Native HTML Brand Text — Aligns flawlessly to Flex Centering */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-baseline justify-center select-none tracking-normal"
          >
            {/* RAXEL */}
            <span
              className="text-white text-4xl sm:text-5xl font-extrabold font-sans"
              style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
            >
              RAXEL
            </span>

            {/* MEDIA */}
            <span
              className="text-[#0fbf6a] text-xl sm:text-2xl font-bold ml-1.5 font-sans"
              style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
            >
              MEDIA
            </span>
          </motion.div>

          {/* Underline Progress Indicator Bar (Now sharing the exact horizontal grid center) */}
          <motion.div
            className="h-[3px] bg-[#0fbf6a] rounded-full"
            variants={underlineVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}