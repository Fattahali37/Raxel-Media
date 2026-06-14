'use client';

import { PageLoader } from '@/components/loader';
import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { Problem } from '@/components/sections/problem';
import { Method } from '@/components/sections/method';
import { Services } from '@/components/sections/services';
import { Process } from '@/components/sections/process';
// import { Results } from '@/components/sections/results';
import { WhyRaxel } from '@/components/sections/why-raxel';
// import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';

export default function Home() {
  return (
    <main className="bg-background text-foreground relative min-h-screen overflow-x-hidden">
      <PageLoader />

      {/* Target for 'Home' navbar button */}
      <div id="home">
        <Hero />
      </div>

      <TrustBar />
      <Problem />
      <Method />

      {/* Target for 'Services' navbar button */}
      <div id="services">
        <Services />
      </div>

      {/* Target for 'Process' navbar button */}
      <div id="process">
        <Process />
      </div>

      {/* <Results /> */}

      {/* Target for 'Why Raxel' navbar button */}
      <div id="why-raxel">
        <WhyRaxel />
      </div>

      {/* <Testimonials /> */}

      {/* Target for 'FAQ' navbar button */}
      <div id="faq">
        <FAQ />
      </div>

      <FinalCTA />
    </main>
  );
}