import { Navbar } from '@/components/layout/navbar';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { About } from '@/components/sections/about';
import { Capabilities } from '@/components/sections/capabilities';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Tokenomics } from '@/components/sections/tokenomics';
import { Roadmap } from '@/components/sections/roadmap';
import { Community } from '@/components/sections/community';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Global CRT scanline effect overlay */}
      <div className="crt-line" />
      
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <About />
        <Capabilities />
        <HowItWorks />
        <Tokenomics />
        <Roadmap />
        <Community />
      </main>

      <Footer />
    </div>
  );
}