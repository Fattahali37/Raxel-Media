'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { Zap, Brain, Target, BarChart3, LucideIcon } from 'lucide-react';

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: Feature[] = [
  {
    number: '01',
    title: 'Speed',
    description: 'Production timelines that outpace traditional agencies by 3-5x.',
    icon: Zap,
  },
  {
    number: '02',
    title: 'Psychology-First',
    description: 'Every script is rooted in conversion psychology, not creative ego.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Full-Funnel Thinking',
    description: 'We don\'t just make ads, we engineer assets that move metrics.',
    icon: Target,
  },
  {
    number: '04',
    title: 'Transparent Reporting',
    description: 'You\'ll always know exactly what\'s working and why.',
    icon: BarChart3,
  },
];

// ============================================================================
// SPLIT SCROLL STACK ENGINE
// ============================================================================
interface ScrollStackProps {
  children: React.ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  blurAmount?: number;
}

function SplitScrollStack({
  children,
  itemDistance = 40, // Tighter margin between items to reduce height
  itemScale = 0.02,
  itemStackDistance = 20, // Lowered stack distance to keep it compact
  stackPosition = '30%',
  scaleEndPosition = '15%',
  baseScale = 0.92,
  blurAmount = 1.5
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateTransforms = useCallback(() => {
    if (!cardsRef.current.length || !containerRef.current) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const rect = containerRef.current.getBoundingClientRect();
    const containerOffsetTop = rect.top + scrollTop;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = containerRef.current.querySelector('.scroll-stack-end') as HTMLElement;
    const endElementTop = endElement ? (endElement.getBoundingClientRect().top + scrollTop) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = containerOffsetTop + (card as any)._initialOffsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = containerOffsetTop + (cardsRef.current[j] as any)._initialOffsetTop;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${Math.round(translateY * 100) / 100}px, 0) scale(${Math.round(scale * 1000) / 1000})`;
      card.style.filter = blur > 0 ? `blur(${Math.round(blur * 100) / 100}px)` : '';
    });
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, blurAmount, calculateProgress, parsePercentage]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const cards = Array.from(containerRef.current.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      (card as any)._initialOffsetTop = card.offsetTop;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
    });

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', updateTransforms);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    updateTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [itemDistance, updateTransforms]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="scroll-stack-inner pb-12">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
}

// ============================================================================
// REDESIGNED MAIN SPLIT FEATURE COMPONENT
// ============================================================================
export function WhyRaxel() {
  return (
    <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background Spotlight Ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 75% 50%, rgba(15, 191, 106, 0.03) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* LEFT SIDE: Sticky Header Section */}
          <div className="lg:col-span-5 lg:sticky lg:top-[35vh] space-y-4 text-center lg:text-left pr-0 lg:pr-8">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary font-mono block">
              WHY RAXEL
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold font-space-grotesk text-white leading-[1.1] tracking-tight">
              Why Brands Choose Raxel Media
            </h2>
          </div>

          {/* RIGHT SIDE: Compact Card Stack */}
          <div className="lg:col-span-7 w-full">
            <SplitScrollStack
              itemDistance={48}
              itemStackDistance={24}
              baseScale={0.93}
              itemScale={0.02}
              blurAmount={1}
              stackPosition="30%"
              scaleEndPosition="15%"
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.number}
                    className="scroll-stack-card relative w-full p-6 sm:p-8 border border-white/5 rounded-2xl bg-[#0d0d0d]/95 backdrop-blur-xl shadow-[0_-20px_40px_rgba(0,0,0,0.8)] box-border origin-top flex items-center justify-between gap-6 group transition-colors duration-300 hover:border-primary/20"
                    style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
                  >
                    {/* Content Frame */}
                    <div className="flex gap-5 items-start sm:items-center">
                      {/* Responsive Mini Glowing Icon Box */}
                      <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>

                      {/* Description Copy */}
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold font-space-grotesk text-white">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans max-w-md">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Faded Watermark Side Index */}
                    <div
                      className="text-4xl sm:text-5xl font-bold font-space-grotesk text-primary opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 leading-none select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {feature.number}
                    </div>
                  </div>
                );
              })}
            </SplitScrollStack>
          </div>

        </div>
      </div>

      {/* Subtle Analog Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}