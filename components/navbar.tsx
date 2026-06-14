'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

interface NavLink {
  href: string;
  label: string;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const currentScrollY = latest;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (currentScrollY > 80 && isScrollingDown) {
        setIsShrunk(true);
      } else if (!isScrollingDown || currentScrollY <= 20) {
        setIsShrunk(false);
      }

      lastScrollY.current = currentScrollY;
    });
  }, [scrollY]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const navLinks: NavLink[] = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#process', label: 'Process' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none select-none">
        <motion.nav
          initial={false}
          animate={{
            // Keeps the capsule contained in the top-center matching your design layout
            width: 'auto',
            maxWidth: '100%',
            backgroundColor: isShrunk ? 'rgba(20, 20, 20, 0.9)' : 'rgba(15, 15, 15, 0.6)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            y: isShrunk ? 12 : 0,
          }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className="pointer-events-auto border rounded-full backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <div className={cn(
            'flex items-center justify-between w-full transition-all duration-300',
            isShrunk ? 'px-4 py-1.5 gap-6' : 'px-6 py-2.5 gap-8'
          )}>
            
            <motion.div className="flex items-center shrink-0 cursor-pointer text-white" layout="position">
              <a href="/" className="font-bold text-foreground font-space-grotesk block transform scale-95 origin-left">
                <Logo />
              </a>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isShrunk && (
                <motion.ul
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="hidden lg:flex items-center gap-8 xl:gap-10 shrink-0"
                >
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/70 hover:text-[#0FBF6A] font-inter text-sm font-medium tracking-wide transition-colors duration-200 relative group py-1"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[#0FBF6A] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* Fixed CTA Button: Green background, dark text, clean borders */}
            <motion.div className="hidden lg:block shrink-0" layout="position">
              <motion.button
                className={cn(
                  'font-inter font-semibold tracking-wide rounded-full uppercase transition-all relative overflow-hidden',
                  'bg-[#0FBF6A] text-black border border-transparent shadow-[0_4px_14px_rgba(15,191,106,0.3)]',
                  isShrunk ? 'px-5 py-1.5 text-[11px]' : 'px-6 py-2 text-xs'
                )}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 6px 20px rgba(15, 191, 106, 0.5)',
                  backgroundColor: '#12d175'
                }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Talk Business
              </motion.button>
            </motion.div>

            <div className="lg:hidden flex items-center shrink-0">
              <motion.button
                className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-[#0FBF6A] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>

          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md lg:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-8 text-center mb-12">
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-2xl font-space-grotesk text-white hover:text-[#0FBF6A] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="px-8 py-3 bg-[#0FBF6A] text-black font-inter font-semibold rounded-full text-sm uppercase tracking-wider shadow-[0_4px_14px_rgba(15,191,106,0.3)]"
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Let&apos;s Talk Business
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}