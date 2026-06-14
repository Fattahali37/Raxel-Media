'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function BudgetVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const textLockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.noise-line');
    gsap.fromTo(
      lines,
      { y: 40, opacity: 0.1 },
      {
        y: -40,
        opacity: (i) => [0.7, 0.4, 0.8, 0.3][i % 4],
        duration: (i) => 2 + (i % 3),
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'sine.inOut',
      }
    );

    if (pulseRef.current) {
      gsap.fromTo(
        pulseRef.current,
        { top: '0%' },
        {
          top: '100%',
          duration: 4,
          repeat: -1,
          ease: 'power1.inOut',
          yoyo: true,
        }
      );
    }

    if (matrixRef.current) {
      gsap.to(matrixRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });
    }

    if (textLockRef.current) {
      gsap.to(textLockRef.current, {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[440px] h-[440px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-dashed border-border/20 animate-[spin_80s_linear_infinite]" />
      <div className="absolute inset-12 rounded-full border border-border/40 animate-[spin_40s_linear_infinite_reverse]" />

      <div className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-screen animate-pulse" />
      <div className="absolute w-60 h-60 bg-red-500/5 rounded-full blur-2xl translate-x-12 -translate-y-6" />

      <div ref={matrixRef} className="relative w-72 h-72 flex items-center justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#0fbf6a]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/40" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#0fbf6a]" />

        <div ref={textLockRef} className="w-40 h-40 flex items-center justify-center">
          <div className="w-full h-full bg-surface/40 border border-primary/20 backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-4 text-center group transition-colors duration-500 hover:border-primary/40">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-muted mb-1">Creative Matrix</span>
            <span className="text-2xl font-bold font-space-grotesk text-foreground tracking-tight">94.2%</span>
            <div className="w-16 h-[2px] bg-primary mt-2 shadow-[0_0_8px_#0fbf6a]" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-primary mt-3 opacity-80">STABLE STRUCTURE</span>
          </div>
        </div>
      </div>

      <div className="noise-line absolute top-12 left-6 border border-red-500/30 bg-background/80 px-3 py-1.5 rounded-md font-mono text-[10px] text-red-400 flex items-center gap-2 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        BUDGET_BLEED // UNOPTIMIZED_HOOK
      </div>

      <div className="noise-line absolute bottom-16 -left-4 border border-red-500/20 bg-background/80 px-3 py-1.5 rounded-md font-mono text-[10px] text-red-400/80 flex items-center gap-2 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />0x0F4A STOCK_FOOTAGE_DETECTED
      </div>

      <div className="noise-line absolute top-1/4 -right-8 border border-primary/30 bg-background/90 px-3 py-1.5 rounded-md font-mono text-[10px] text-primary flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        ENG_PATTERN_INTERRUPT
      </div>

      <div className="noise-line absolute bottom-12 right-4 border border-primary/30 bg-primary/10 px-3 py-1.5 rounded-md font-mono text-[10px] text-primary flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(15,191,106,0.1)]">
        <span className="w-1 h-1 rounded-full bg-primary animate-ping" />
        PSYCHOLOGY_MAPPED_OK
      </div>

      <div className="absolute inset-y-4 inset-x-12 pointer-events-none border-x border-border/10">
        <div
          ref={pulseRef}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(15,191,106,0.8)]"
        />
      </div>
    </div>
  );
}

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll('span'),
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (closingRef.current) {
        gsap.fromTo(
          closingRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { opacity: 0, scale: 0.9, rotate: 5 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'power4.out',
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
      className="relative py-28 lg:py-36 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden border-b border-border/30"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 40%, rgba(15, 191, 106, 0.05) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 space-y-8">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-mono">
              The Problem
            </div>

            <div ref={headlineRef}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk leading-[1.1] text-foreground tracking-tight">
                <span className="block">Your Ads Are</span>
                <span className="block">Bleeding Budget —</span>
                <span className="block text-primary">And You Don&apos;t Even</span>
                <span className="block">Know Where.</span>
              </h2>
            </div>

            <div ref={bodyRef} className="space-y-6 text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: '#b0b0b0' }}>
              <p>
                Most brands are stuck running the same tired creative — generic hooks, stock-footage
                vibes, and scripts that say everything and convince no one. Meanwhile, your
                competitors are testing 10 new angles a week and stealing your customers.
              </p>

              <div
                ref={closingRef}
                className="pt-6 mt-6 border-t border-border/40"
              >
                <p className="text-lg sm:text-xl font-bold font-space-grotesk text-foreground leading-snug">
                  If your creative isn&apos;t engineered around{' '}
                  <span className="text-primary underline decoration-primary/30 underline-offset-4">psychology, pain points,</span> and
                  pattern interrupts — it&apos;s not an ad. It&apos;s{' '}
                  <span className="text-red-500 font-semibold px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-base font-mono uppercase tracking-wide">Noise.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center min-h-[460px]">
            <div ref={visualWrapperRef} className="relative w-full flex justify-center items-center">
              <BudgetVisualizer />
            </div>
          </div>

        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}