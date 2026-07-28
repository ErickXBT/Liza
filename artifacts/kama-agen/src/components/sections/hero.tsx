import { motion } from 'framer-motion';
import mascotImg from '@assets/-i3mn72_1785058119232.jpg';
import { ArrowRight, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2,
      size: 1 + Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-grid">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] z-0 pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/50 shadow-[0_0_8px_rgba(0,255,65,0.8)]"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ 
              y: ["0%", "-100%", "0%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: p.duration, 
              delay: p.delay, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 w-max">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">System Online // v2.4.0</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)] flex items-center gap-3" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.08em' }}>
            <span className="glitch-effect" data-text="LIZA">LIZA</span>
            <span className="text-primary glow-text">OS</span>
          </h1>
          
          <p className="text-muted-foreground font-mono text-sm sm:text-lg max-w-2xl text-left leading-relaxed">
            The next-generation autonomous AI crypto agent. Executing DeFi strategies, analyzing sentiment, and trading on-chain <span className="text-white font-bold">24/7 without human intervention</span>.
          </p>

          <div className="flex flex-wrap items-center justify-start gap-4">
            <a 
              href="#analyzer" 
              className="px-8 py-4 bg-primary text-black font-mono font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_rgba(204,255,0,0.7)] flex items-center gap-2 group"
            >
              Buy Token <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/docs" 
              className="px-8 py-4 border border-primary/40 text-foreground font-mono text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all backdrop-blur-sm flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-primary" /> Read Docs
            </a>
          </div>
          
          <div className="mt-8 flex gap-8 border-t border-white/10 pt-6">
            <div>
              <div className="text-2xl font-mono font-bold text-white">Ethereum</div>
              <div className="text-xs text-primary font-mono mt-1">NATIVE CHAIN</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-white">&lt; 50ms</div>
              <div className="text-xs text-primary font-mono mt-1">EXECUTION LATENCY</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-primary/30 z-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -translate-x-[1px] translate-y-[1px]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary translate-x-[1px] translate-y-[1px]" />
          </div>
          
          <div className="relative z-10 w-full aspect-[3/4] bg-black border border-primary/20 overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.15)] group">
            <img 
              src={mascotImg} 
              alt="KAMA OS AI Mascot" 
              className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            
            {/* UI Overlay on image */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end border-t border-primary/30 pt-4">
              <div>
                <div className="text-xs text-primary font-mono mb-1">TARGET ACQUIRED</div>
                <div className="text-white font-mono font-bold tracking-widest">LIZA_CORE_PROCESS</div>
              </div>
              <div className="w-12 h-12 border border-primary/50 flex items-center justify-center bg-black/50 backdrop-blur">
                <div className="w-6 h-6 border border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}