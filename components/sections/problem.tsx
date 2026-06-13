'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Glitched Ad Card Component
 * Represents a generic/poor-quality ad with RGB glitch effect
 */
function GlitchedAdCard() {
  return (
    <div className="relative w-72 h-96 group">
      {/* Main card */}
      <div
        className="absolute inset-0 bg-surface border-2 border-border rounded-lg overflow-hidden"
        style={{
          transform: 'rotate(-4deg)',
          filter: 'blur(1px) saturate(0.8)',
        }}
      >
        {/* Card header */}
        <div className="h-40 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-muted/30 rounded-full mx-auto mb-2" />
            <p className="text-xs text-muted">Generic product image</p>
          </div>
        </div>

        {/* Card content */}
        <div className="p-4 space-y-3">
          <p className="text-sm font-medium text-foreground line-clamp-2">
            Click Here for Amazing Offer
          </p>
          <p className="text-xs text-muted line-clamp-3">
            This is the same hook everyone uses. Boring. Ineffective. Ignored.
          </p>

          {/* CTA button - looks generic */}
          <button
            className="w-full py-2 mt-4 bg-muted/20 text-muted text-xs font-medium rounded hover:bg-muted/30 transition-colors cursor-not-allowed opacity-70"
            disabled
          >
            Learn More
          </button>
        </div>
      </div>

      {/* RGB glitch effect layers */}
      <div
        className="absolute inset-0 border-2 border-red-500/50 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          transform: 'rotate(-4deg) translate(2px, 0)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute inset-0 border-2 border-blue-500/50 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          transform: 'rotate(-4deg) translate(-2px, 0)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Animated style tag for glitch */}
      <style jsx>{`
        @keyframes glitch-shift {
          0% {
            transform: rotate(-4deg) translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: rotate(-4deg) translate(3px, 2px);
            opacity: 0;
          }
        }

        div:hover {
          animation: glitch-shift 0.3s infinite;
        }
      `}</style>
    </div>
  );
}

/**
 * Rejected Ad Cards Component
 * Stack of rejected/crossed-out ad cards
 */
function RejectedAdCards() {
  const cards = [
    { label: 'Stock footage hook', rotation: -8 },
    { label: 'Generic call-to-action', rotation: 4 },
    { label: 'No pattern interrupt', rotation: -3 },
  ];

  return (
    <div className="relative w-80 h-80">
      {cards.map((card, index) => (
        <div
          key={index}
          className="absolute w-64 h-32 bg-surface border-2 border-border rounded-lg p-4 flex items-center justify-between"
          style={{
            transform: `rotate(${card.rotation}deg) translateX(${index * 20}px) translateY(${index * 30}px)`,
            opacity: 0.8 - index * 0.15,
            zIndex: cards.length - index,
          }}
          ref={(el) => {
            if (el) {
              el.dataset.cardindex = index.toString();
            }
          }}
        >
          {/* Card content */}
          <div className="flex-1 space-y-1">
            <p className="text-xs text-muted uppercase tracking-wider font-medium">
              Rejected
            </p>
            <p className="text-sm text-foreground font-medium line-clamp-1">
              {card.label}
            </p>
          </div>

          {/* Red X icon */}
          <div className="ml-4 flex-shrink-0">
            <div className="relative">
              <X className="w-6 h-6 text-red-500/70" strokeWidth={3} />
              <div className="absolute inset-0 bg-red-500/20 blur-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Problem/Agitation Section Component
 */
export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const rejectedCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline stagger animation
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll('span'),
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Body fade-in
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Closing line scale and glow pulse
      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.6,
            ease: 'back.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Glow pulse animation on the text
        gsap.to(closingRef.current.querySelector('.glow-text'), {
          textShadow:
            '0 0 20px rgba(15, 191, 106, 0.5), 0 0 40px rgba(15, 191, 106, 0.3)',
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: 1,
        });
      }

      // Glitched card animation (main visual)
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, x: 100, rotation: -4 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Subtle continuous rotation for visual interest
        gsap.to(visualRef.current, {
          rotation: 2,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 1.2,
        });
      }

      // Rejected cards staggered scatter entrance
      if (rejectedCardsRef.current) {
        const cards = rejectedCardsRef.current.querySelectorAll('[data-cardindex]');
        gsap.fromTo(
          cards,
          (i: number) => ({
            opacity: 0,
            x: i % 2 === 0 ? -100 : 100,
            y: 50,
            rotation: i * 10,
          }),
          {
            opacity: (i: number) => 0.8 - i * 0.15,
            x: 0,
            y: 0,
            rotation: (i: number) => {
              const card = cards[i] as HTMLElement;
              const transform = card.style.transform;
              const match = transform.match(/rotate\((-?\d+\.?\d*)deg\)/);
              return parseFloat(match?.[1] || '0');
            },
            duration: 0.8,
            stagger: 0.15,
            delay: 0.4,
            ease: 'back.out',
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
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
      style={{
        backgroundColor: 'rgba(18, 18, 18, 0.5)',
      }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 85% 30%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left side - text content (~55%) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Eyebrow */}
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">
              THE PROBLEM
            </div>

            {/* Headline with stagger */}
            <div ref={headlineRef} className="space-y-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk leading-tight text-foreground">
                <span className="block">Your Ads Are</span>
                <span className="block">Bleeding Budget —</span>
                <span className="block text-primary">And You Don&apos;t Even</span>
                <span className="block">Know Where.</span>
              </h2>
            </div>

            {/* Body text */}
            <div ref={bodyRef} className="space-y-6 text-lg text-muted leading-relaxed max-w-lg">
              <p>
                Most brands are stuck running the same tired creative — generic hooks, stock-footage
                vibes, and scripts that say everything and convince no one. Meanwhile, your
                competitors are testing 10 new angles a week and stealing your customers.
              </p>

              {/* Closing punchy line with green accent */}
              <div
                ref={closingRef}
                className="pt-6 border-t border-border/50"
              >
                <p className="text-xl lg:text-2xl font-bold font-space-grotesk text-foreground leading-snug">
                  If your creative isn&apos;t engineered around{' '}
                  <span className="glow-text text-primary">psychology, pain points,</span> and
                  pattern interrupts — it&apos;s not an ad. It&apos;s{' '}
                  <span className="text-red-500/80">noise.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - visual elements (~45%) */}
          <div className="lg:col-span-6 flex justify-center items-center min-h-96">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Main glitched card */}
              <div ref={visualRef} className="absolute z-20">
                <GlitchedAdCard />
              </div>

              {/* Rejected cards stack */}
              <div
                ref={rejectedCardsRef}
                className="absolute z-10 opacity-80"
                style={{
                  right: '10%',
                  bottom: '20%',
                }}
              >
                <RejectedAdCards />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
