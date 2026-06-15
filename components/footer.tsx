'use client';

import { useEffect, useRef } from 'react';
import { FooterLogo } from '@/components/footer-logo';

/**
 * Footer Component
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-fade-in]').forEach((el, index) => {
            const elem = el as HTMLElement;
            elem.style.animation = `fade-in-up 0.6s ease-out ${index * 0.1}s forwards`;
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-border bg-background"
    >

      {/* Main Footer Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            {/* Column 1: Logo & Tagline */}
            <div data-fade-in className="space-y-4 opacity-0">
              <FooterLogo />
              <p className="text-sm text-muted leading-relaxed">
                Creative That Converts
              </p>
              <p className="text-xs text-muted/50 pt-4">
                © {currentYear} Raxel Media. All rights reserved.
              </p>
            </div>

            {/* Column 2: Navigate */}
            <div data-fade-in className="space-y-4 opacity-0">
              <h4 className="font-semibold font-space-grotesk text-foreground text-sm uppercase tracking-widest">
                Navigate
              </h4>
              <nav className="space-y-3">
                {['Home', 'Services', 'Process', 'FAQ'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted hover:text-primary transition-colors duration-300 block"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 3: Connect */}
            {/* <div data-fade-in className="space-y-4 opacity-0">
              <h4 className="font-semibold font-space-grotesk text-foreground text-sm uppercase tracking-widest">
                Connect
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary transition-all duration-300 text-xs font-medium"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary transition-all duration-300 text-xs font-medium"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary transition-all duration-300 text-xs font-medium"
                  aria-label="X (Twitter)"
                >
                  X
                </a>
              </div>
            </div> */}

            {/* Column 4: Contact */}
            <div data-fade-in className="space-y-4 opacity-0">
              <h4 className="font-semibold font-space-grotesk text-foreground text-sm uppercase tracking-widest">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:hello@raxelmedia.com"
                  className="text-sm text-muted hover:text-primary transition-colors duration-300 block"
                >
                  info@raxelmedia.com
                </a>
                <a
                  href="#book"
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 block font-semibold"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="border-t border-border/50 pt-8">
            {/* Links Row */}
            <div
              data-fade-in
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-muted justify-between items-center opacity-0"
            >
              <div className="flex gap-6">
                <a
                  href="#privacy"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </div>
              <p className="text-muted/50">Built with ❤️ for brands that convert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />
    </footer>
  );
}
