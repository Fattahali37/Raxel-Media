'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position for background change
  useEffect(() => {
    const unsubscribe = scrollY.onChange((value: number) => {
      setHasScrolled(value > 50);
    });

    return () => unsubscribe();
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks: NavLink[] = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Services' },
    { href: '#', label: 'Work' },
    { href: '#', label: 'Process' },
    { href: '#', label: 'FAQ' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-500',
          hasScrolled && 'border-b border-border'
        )}
        style={{
          background: hasScrolled
            ? 'rgba(10, 10, 10, 0.8)'
            : 'transparent',
          backdropFilter: hasScrolled ? 'blur(10px)' : 'none',
        }}
      >
        <div className="relative px-4 md:px-8 lg:px-12 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-baseline gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/"
                className="text-xl md:text-2xl font-bold text-foreground font-space-grotesk"
              >
                RAXEL
              </a>
              <span className="text-xs md:text-sm text-muted font-inter">
                MEDIA
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    className="relative text-foreground font-inter text-sm"
                    whileHover={{ color: '#0FBF6A' }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    {/* Underline grow from center effect */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-px bg-primary"
                      initial={{ width: 0, translateX: '-50%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA Button */}
            <motion.button
              className="hidden lg:block px-6 py-2.5 bg-primary text-background font-inter font-medium rounded-full text-sm"
              whileHover={{
                scale: 1.08,
                boxShadow: '0 0 30px rgba(15, 191, 106, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              Book a Call
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className={cn(
          'fixed inset-0 z-30 bg-black/80 backdrop-blur-sm lg:hidden',
          'flex flex-col items-center justify-center pt-20 pb-10'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Mobile Menu Content */}
        <motion.div
          className="w-full max-w-sm px-6"
          variants={containerVariants}
          initial="hidden"
          animate={mobileMenuOpen ? 'visible' : 'hidden'}
        >
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-8 mb-12">
            {navLinks.map((link) => (
              <motion.li key={link.label} variants={itemVariants}>
                <a
                  href={link.href}
                  className="text-xl font-space-grotesk text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile CTA Button */}
          <motion.button
            className="w-full px-6 py-3 bg-primary text-background font-inter font-medium rounded-full text-base"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Call
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Spacer to push content below navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}
