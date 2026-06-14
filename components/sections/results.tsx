'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudy {
  id: string;
  brand: string;
  industry: string;
  result: string;
  quote: string;
  attribution: {
    name: string;
    title: string;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    brand: '[Client Name]',
    industry: 'Skincare DTC',
    result: '3.2x',
    quote:
      'Raxel Media completely transformed our ad creative. Our CPA dropped 40% in the first two weeks.',
    attribution: {
      name: '[Client Name]',
      title: 'Founder & CEO',
    },
  },
  {
    id: 'case-2',
    brand: '[Client Name]',
    industry: 'Fitness & Wellness',
    result: '2.8x',
    quote: '[Placeholder testimonial quote highlighting the impact and results achieved]',
    attribution: {
      name: '[Client Name]',
      title: 'Marketing Director',
    },
  },
  {
    id: 'case-3',
    brand: '[Client Name]',
    industry: 'Home & Lifestyle',
    result: '47%',
    quote: '[Placeholder testimonial quote demonstrating conversion improvements]',
    attribution: {
      name: '[Client Name]',
      title: 'Growth Manager',
    },
  },
];

/**
 * Case Study Card Component
 */
interface CaseStudyCardProps {
  study: CaseStudy;
  isActive: boolean;
}

function CaseStudyCard({ study, isActive }: CaseStudyCardProps) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.94,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex-shrink-0 w-full md:w-[70vw] bg-surface/20 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col h-auto md:h-[500px] justify-between backdrop-blur-md shadow-2xl relative"
    >
      {/* Brand & Industry Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-center text-xs tracking-wider text-primary font-bold">
            RAXEL
          </div>
          <div>
            <h4 className="text-lg font-bold font-space-grotesk text-foreground/90 leading-none mb-1">
              {study.brand}
            </h4>
            <span className="text-[10px] text-muted/60 uppercase tracking-widest font-semibold">{study.industry}</span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[9px] uppercase tracking-widest font-bold">
          Verified Case Study
        </span>
      </div>

      {/* Main stat */}
      <div className="mb-6 relative">
        <span className="text-7xl md:text-8xl font-bold font-space-grotesk tracking-tight text-primary drop-shadow-[0_0_30px_rgba(15,191,106,0.15)]">
          {study.result}
        </span>
        <p className="text-xs text-muted uppercase tracking-widest font-semibold mt-2">
          {study.industry === 'Skincare DTC'
            ? 'ROAS Increase'
            : study.industry === 'Fitness & Wellness'
              ? 'Conversion Rate Increase'
              : 'CPA Reduction'}
        </p>
      </div>

      {/* Quote */}
      <div className="space-y-4 border-t border-white/5 pt-6 mt-auto">
        <p className="text-base text-foreground/90 italic leading-relaxed">
          &ldquo;{study.quote}&rdquo;
        </p>

        {/* Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
            R
          </div>
          <div>
            <p className="font-semibold text-foreground/90 text-sm leading-none">{study.attribution.name}</p>
            <p className="text-[10px] text-muted/60 uppercase tracking-widest mt-1">{study.attribution.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Results/Case Studies Section Component
 */
export function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // GSAP header animation
  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle carousel scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Update active index based on scroll position
    const cardWidth = carouselRef.current.querySelector('div')?.offsetWidth || 0;
    if (cardWidth > 0) {
      const index = Math.round(scrollLeft / (cardWidth + 24)); // 24 is gap
      setCurrentIndex(Math.min(index, CASE_STUDIES.length - 1));
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.offsetWidth * 0.8 + 24; // 80vw card + gap
    const newScrollLeft =
      carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  // Setup initial scroll state
  useEffect(() => {
    handleScroll();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(15, 191, 106, 0.08) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            RESULTS
          </div>

          <div ref={headlineRef}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground">
              Real Brands. Real Numbers.
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="space-y-8">
          {/* Scrollable Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* scrollbar is hidden via .scrollbar-none in globals.css */}

            {CASE_STUDIES.map((study, index) => (
              <div key={study.id} className="snap-start scroll-ml-4">
                <CaseStudyCard study={study} isActive={index === currentIndex} />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            {/* Left Arrow */}
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-3 rounded-full border border-border text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {CASE_STUDIES.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (!carouselRef.current) return;
                    const cardWidth = carouselRef.current.querySelector('div')?.offsetWidth || 0;
                    carouselRef.current.scrollTo({
                      left: index * (cardWidth + 24),
                      behavior: 'smooth',
                    });
                  }}
                  animate={{
                    width: index === currentIndex ? 32 : 8,
                    backgroundColor:
                      index === currentIndex
                        ? 'rgba(15, 191, 106, 1)'
                        : 'rgba(15, 191, 106, 0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full transition-all"
                  aria-label={`Go to case study ${index + 1}`}
                  aria-current={index === currentIndex}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-3 rounded-full border border-border text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next case study"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Counter */}
          <div className="text-center text-sm text-muted">
            {currentIndex + 1} of {CASE_STUDIES.length}
          </div>
        </div>
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}
