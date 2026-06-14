'use client';

import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  brand: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      '[Placeholder testimonial — strong result-focused quote highlighting measurable impact and transformation]',
    name: '[Client Name]',
    title: 'Founder & CEO',
    brand: '[Brand Name]',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote:
      '[Placeholder testimonial — emphasizing creative excellence and strategic alignment with business goals]',
    name: '[Client Name]',
    title: 'Marketing Director',
    brand: '[Brand Name]',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    quote:
      '[Placeholder testimonial — demonstrating rapid turnaround and production quality exceeding expectations]',
    name: '[Client Name]',
    title: 'Growth Manager',
    brand: '[Brand Name]',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    quote:
      '[Placeholder testimonial — showcasing measurable ROI improvements and conversion rate optimization]',
    name: '[Client Name]',
    title: 'E-Commerce Manager',
    brand: '[Brand Name]',
    rating: 5,
  },
  {
    id: 'testimonial-5',
    quote:
      '[Placeholder testimonial — highlighting innovation in UGC production and creative testing methodology]',
    name: '[Client Name]',
    title: 'Performance Lead',
    brand: '[Brand Name]',
    rating: 5,
  },
];

/**
 * Testimonial Card Component
 */
interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initial = testimonial.name ? testimonial.name[1] || 'R' : 'R';
  return (
    <div className="flex-shrink-0 w-96 bg-surface/20 border border-white/5 rounded-2xl p-8 flex flex-col h-full transition-all duration-500 hover:border-primary/40 hover:bg-surface/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5 group backdrop-blur-md">
      {/* Star Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4.5 h-4.5 fill-primary text-primary drop-shadow-[0_0_8px_rgba(15,191,106,0.6)]"
            strokeWidth={0}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-foreground/90 leading-relaxed flex-grow mb-8 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Avatar Placeholder + Info */}
      <div className="flex gap-4 items-center border-t border-white/5 pt-6 mt-auto">
        {/* Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center font-bold text-primary text-sm border border-primary/20 flex-shrink-0 shadow-lg">
          {initial}
        </div>

        {/* Name and Title */}
        <div className="flex-grow min-w-0">
          <p className="font-semibold text-foreground/90 text-sm leading-none mb-1">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted/60 tracking-wide">
            {testimonial.title}, {testimonial.brand}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Marquee Row Component
 */
interface MarqueeRowProps {
  isReverse?: boolean;
}

function MarqueeRow({ isReverse = false }: MarqueeRowProps) {
  const cards = [...TESTIMONIALS, ...TESTIMONIALS]; // Duplicate for seamless loop

  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Fade left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))',
        }}
      />

      {/* Fade right edge */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to left, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))',
        }}
      />

      {/* Scrolling content */}
      <div
        className="flex gap-6 whitespace-nowrap"
        style={{
          animation: isReverse
            ? 'marquee-reverse 60s linear infinite'
            : 'marquee 60s linear infinite',
          animationPlayState: 'running',
        }}
        onMouseEnter={(e) => {
          const element = e.currentTarget;
          element.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          const element = e.currentTarget;
          element.style.animationPlayState = 'running';
        }}
      >
        {cards.map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className="flex-shrink-0">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

        {/* marquee / marquee-reverse keyframes defined in globals.css */}
    </div>
  );
}

/**
 * Testimonials Section Component
 */
export function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 50%, rgba(15, 191, 106, 0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-24">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-space-grotesk text-foreground leading-tight">
            Loved by Brands We&apos;ve Grown
          </h2>
        </div>

        {/* Marquee Rows */}
        <div className="space-y-6 lg:space-y-8">
          {/* Row 1 - Left scroll */}
          <MarqueeRow isReverse={false} />

          {/* Row 2 - Right scroll */}
          <MarqueeRow isReverse={true} />
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
