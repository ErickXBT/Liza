import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "Scan", desc: "AI ingests global market data" },
  { num: "02", title: "Analyze", desc: "Identifies high-probability setups" },
  { num: "03", title: "Execute", desc: "Deploys capital via smart contracts" },
  { num: "04", title: "Evolve", desc: "Updates neural weights based on outcome" }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mb-4">
            Execution <span className="text-primary">Pipeline</span>
          </h2>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto">
            The autonomous lifecycle of a KAMA OS operation.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2 opacity-30" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-black border-2 border-primary/40 flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_rgba(0,255,65,0.15)] group hover:border-primary transition-colors">
                  <span className="font-display text-2xl font-bold text-white">{step.num}</span>
                  <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.2] opacity-0 group-hover:opacity-100 group-hover:scale-[1.3] transition-all duration-500" />
                </div>
                
                <h3 className="font-display font-bold text-xl text-primary mb-2 uppercase">{step.title}</h3>
                <p className="font-mono text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}