import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Layers, ShieldAlert, Network, Cpu } from 'lucide-react';

const capabilities = [
  {
    icon: Activity,
    title: "On-Chain Autonomous Trading",
    description: "Executes trades 24/7 based on proprietary AI signals, bypassing emotional human error."
  },
  {
    icon: BrainCircuit,
    title: "Real-Time Sentiment Analysis",
    description: "Monitors Twitter/X, financial news, and deep on-chain metrics to predict market movements before they happen."
  },
  {
    icon: Layers,
    title: "DeFi Protocol Integration",
    description: "Automatically navigates yield farming, liquidity provision, and complex DEX arbitrage opportunities."
  },
  {
    icon: ShieldAlert,
    title: "Risk Management AI",
    description: "Dynamic stop-loss mechanisms, position sizing algorithms, and automated drawdown protection."
  },
  {
    icon: Network,
    title: "Multi-Chain Intelligence",
    description: "Operates fluidly across Ethereum, Solana, Base, and BNB Chain to hunt the highest yields."
  },
  {
    icon: Cpu,
    title: "Self-Learning Market Model",
    description: "Continuously adapts trading strategies based on historical performance and new data inputs."
  }
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 bg-black relative border-y border-primary/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase inline-block relative">
            Core <span className="text-primary">Capabilities</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-primary/50 transition-colors overflow-hidden"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-black border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,255,65,0.1)] group-hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">
                  {cap.title}
                </h3>
                
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/50 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}