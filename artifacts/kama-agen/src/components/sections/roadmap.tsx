import { motion } from 'framer-motion';

const phases = [
  {
    phase: "Phase 1",
    title: "GENESIS (Q1 2026)",
    items: [
      "Token launch & initial DEX listing",
      "Core LIZA AI model deployment",
      "Live token analyzer engine integration",
      "Community & early node bootstrap"
    ]
  },
  {
    phase: "Phase 2",
    title: "AWAKENING (Q2 2026)",
    items: [
      "24/7 Autonomous execution live",
      "Real-time social sentiment scan v2",
      "First 5,000 active token holders",
      "Top-tier CEX listing campaign"
    ]
  },
  {
    phase: "Phase 3",
    title: "EVOLUTION (Q3 2026)",
    items: [
      "Multi-chain EVM & Solana arbitrage",
      "Automated DeFi yield optimizer",
      "Neural Model v3 with RLHF",
      "Staking & revenue sharing pool"
    ]
  },
  {
    phase: "Phase 4",
    title: "DOMINANCE (Q4 2026)",
    items: [
      "Cross-chain flash loan arbitrage AI",
      "Institutional-grade risk audit engine",
      "Agent-to-Agent autonomous protocol",
      "Community DAO governance launch"
    ]
  }
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 bg-black relative border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Development Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase">
            System <span className="text-primary">Upgrade Path</span>
          </h2>
          <p className="font-mono text-muted-foreground text-sm">
            Milestones and strategic evolution of the LIZA OS autonomous neural network.
          </p>
        </div>

        {/* Horizontal Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-[#050505] border border-primary/30 hover:border-primary p-6 relative flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,65,0.15)]"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />

              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-primary/20">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/30 px-2.5 py-1">
                    {phase.phase}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:animate-ping" />
                </div>

                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-6 group-hover:text-primary transition-colors">
                  {phase.title}
                </h3>

                <ul className="space-y-3">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-mono text-xs text-muted-foreground leading-relaxed">
                      <span className="text-primary font-bold flex-shrink-0">&gt;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[10px] text-primary/40 uppercase tracking-widest flex items-center justify-between">
                <span>Phase {i + 1} Status</span>
                <span className="text-primary">{i === 0 ? 'Active' : 'Queued'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}