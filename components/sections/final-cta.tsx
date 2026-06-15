'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Final CTA Section Component
 */
export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Headline scale and fade
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger subheadline and button
      const elements = contentRef.current?.querySelectorAll('[data-animate]');
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 50% 50%, rgba(15, 191, 106, 0.18) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(15, 191, 106, 0.08) 0%, transparent 70%)
            `,
            filter: 'blur(90px)',
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        />
      </motion.div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Headline */}
        <motion.h2
          ref={headlineRef}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold font-space-grotesk text-foreground leading-tight tracking-tight"
        >
          Ready to Turn Your Ad Spend Into Profit?
        </motion.h2>

        {/* Subheadline */}
        <p
          data-animate
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: '#b0b0b0' }}
        >
          Book a free strategy call and let&apos;s map out your next winning campaign.
        </p>

        {/* CTA Button */}
        <div data-animate className="pt-6">
          <motion.a
            href="https://calendly.com/raxelmedia/1-1-meeting"
            target="_blank"
            rel="noopener noreferrer"
            ref={buttonRef}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 50px rgba(15, 191, 106, 0.5)',
              backgroundColor: '#12d177'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className={cn(
              'px-10 py-5 rounded-full font-bold font-space-grotesk',
              'bg-primary text-background border border-primary/20',
              'text-lg',
              'relative overflow-hidden',
              'transition-colors duration-300',
              'inline-flex items-center justify-center text-center'
            )}
          >
            {/* Animated pulse glow */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: [
                  'inset 0 0 20px rgba(15, 191, 106, 0.4)',
                  'inset 0 0 45px rgba(15, 191, 106, 0.1)',
                  'inset 0 0 20px rgba(15, 191, 106, 0.4)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Button text */}
            <span className="relative z-10">Book Your Free Strategy Call</span>
          </motion.a>
        </div>
      </div>

      {/* Floating ambient rings */}
      <motion.div
        className="absolute top-1/2 left-10 w-40 h-40 rounded-full border border-primary/15 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-60 h-60 rounded-full border border-primary/8 pointer-events-none"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* pulse-glow keyframe is defined in globals.css */}
    </section>
  );
}
