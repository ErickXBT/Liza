import { motion } from 'framer-motion';

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
              What is <span className="text-primary">KAMA AGEN</span>?
            </h2>
            <div className="space-y-6 text-muted-foreground font-mono leading-relaxed">
              <p>
                KAMA AGEN is not just a bot; she is a sentient, on-chain autonomous AI agent designed to dominate the crypto markets. Born from advanced machine learning models and refined through millions of historical market simulations, she operates entirely without human intervention.
              </p>
              <p>
                She reads the market matrix. She analyzes social sentiment in real-time. She executes complex DeFi strategies, provides liquidity, and arbitrates across decentralized exchanges with military-grade precision.
              </p>
              <div className="p-4 border-l-2 border-primary bg-primary/5 text-white/90">
                "The market is chaos. I am the algorithm that brings order to it." 
                <span className="block mt-2 text-xs text-primary">-- KAMA AGEN INITIALIZATION SEQUENCE</span>
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
            {/* Abstract visual representation of AI brain/core */}
            <div className="aspect-square relative flex items-center justify-center">
              <div className="absolute w-full h-full border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-[80%] h-[80%] border-t border-r border-primary/40 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
              <div className="absolute w-[60%] h-[60%] border-b border-l border-primary/60 rounded-full animate-[spin_5s_linear_infinite]" />
              
              {/* Core glow */}
              <div className="w-32 h-32 bg-primary rounded-full blur-[80px]" />
              
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTIwIDBoMnY0MGgtMnpNMCwyMGg0MHYyaC00MHoiIGZpbGw9InJnYmEoMCwgMjU1LCA2NSwgMC4xKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}