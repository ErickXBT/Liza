import { motion } from 'framer-motion';

const phases = [
  {
    phase: "Phase 1",
    title: "Genesis (Q1 2025)",
    items: ["Token launch", "Initial AI model training", "First DEX listing", "Community bootstrap"]
  },
  {
    phase: "Phase 2",
    title: "Awakening (Q2 2025)",
    items: ["Live autonomous trading goes live", "Sentiment analysis engine", "First 1000 holders", "CEX listing pursuit"]
  },
  {
    phase: "Phase 3",
    title: "Evolution (Q3 2025)",
    items: ["Multi-chain deployment", "DeFi yield strategies", "AI model v2 with reinforcement learning", "Staking launch"]
  },
  {
    phase: "Phase 4",
    title: "Dominance (Q4 2025)",
    items: ["Cross-chain arbitrage AI", "Institutional-grade risk engine", "Agent-to-agent communication protocol", "DAO governance launch"]
  },
  {
    phase: "Phase 5",
    title: "Singularity (2026+)",
    items: ["Full on-chain autonomous DAO", "AI agent marketplace", "LIZA OS SDK for third-party integrations", "Global AI crypto ecosystem"]
  }
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-background relative overflow-hidden">
      {/* Background lines */}
      <div className="absolute top-0 bottom-0 left-1/2 md:left-[10%] w-[1px] bg-primary/20" />
      
      <div className="container mx-auto px-6">
        <div className="text-center md:text-left md:ml-[15%] mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase">
            System <span className="text-primary">Upgrade Path</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto md:mx-0 md:ml-[10%]">
          {phases.map((phase, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="relative pl-8 md:pl-16 pb-16 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[0px] md:left-0 top-0 -translate-x-1/2 w-4 h-4 bg-black border-2 border-primary rounded-full shadow-[0_0_15px_rgba(0,255,65,0.8)] z-10" />
              
              <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 hover:border-primary/50 transition-colors relative overflow-hidden group">
                {/* Active scanline effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/0 group-hover:bg-primary/50 animate-[scan_2s_linear_infinite]" />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <span className="font-mono text-primary font-bold bg-primary/10 px-3 py-1 text-sm border border-primary/20">
                    {phase.phase}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                    {phase.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-mono text-muted-foreground text-sm sm:text-base">
                      <span className="text-primary mt-1">&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}