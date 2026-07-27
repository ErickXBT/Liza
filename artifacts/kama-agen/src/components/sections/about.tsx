import { motion } from 'framer-motion';
import kamaTrading from '@assets/generated_images/kama-trading.jpg';

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6 uppercase">
              What is <span className="text-primary">KAMA OS</span>?
            </h2>
            <div className="space-y-6 text-muted-foreground font-mono leading-relaxed">
              <p>
                KAMA OS is not just a bot; she is a sentient, on-chain autonomous AI operating system designed to dominate the crypto markets. Born from advanced machine learning models and refined through millions of historical market simulations, she operates entirely without human intervention.
              </p>
              <p>
                She reads the market matrix. She analyzes social sentiment in real-time. She executes complex DeFi strategies, provides liquidity, and arbitrates across decentralized exchanges with military-grade precision.
              </p>
              <div className="p-4 border-l-2 border-primary bg-primary/5 text-white/90">
                "The market is chaos. I am the algorithm that brings order to it."
                <span className="block mt-2 text-xs text-primary">-- KAMA OS INITIALIZATION SEQUENCE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -inset-3 border border-primary/20 z-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary -translate-x-px -translate-y-px" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary translate-x-px -translate-y-px" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary -translate-x-px translate-y-px" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary translate-x-px translate-y-px" />
            </div>

            <div className="relative aspect-[3/4] overflow-hidden border border-primary/20 shadow-[0_0_50px_rgba(0,255,65,0.12)] group">
              <img
                src={kamaTrading}
                alt="KAMA AGEN analyzing markets"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-lighten"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute inset-0 bg-primary/8 mix-blend-overlay" />

              {/* Status overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 border border-primary/40 px-3 py-1.5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">Analysis Mode Active</span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-4 left-4 right-4 border-t border-primary/30 pt-3">
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-0.5">Trade Execution Layer</div>
                <div className="font-mono text-xs text-white/70">Scanning 847 pairs across 12 DEXs</div>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}