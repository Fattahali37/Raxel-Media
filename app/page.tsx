'use client';

import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { Problem } from '@/components/sections/problem';
import { Method } from '@/components/sections/method';
import { Services } from '@/components/sections/services';
import { Process } from '@/components/sections/process';
import { Results } from '@/components/sections/results';
import { WhyRaxel } from '@/components/sections/why-raxel';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <TrustBar />
      <Problem />
      <Method />
      <Services />
      <Process />
      <Results />
      <WhyRaxel />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
