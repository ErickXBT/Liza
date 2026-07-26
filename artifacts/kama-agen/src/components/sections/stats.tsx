import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ from = 0, to, duration = 2, formatter = (v: number) => v.toString() }: { from?: number, to: number, duration?: number, formatter?: (v: number) => string }) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setValue(from + (to - from) * easeProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setValue(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);

  return <span ref={ref}>{formatter(value)}</span>;
}

export function Stats() {
  const stats = [
    { label: "Trades Executed", value: 847293, formatter: (v: number) => Math.floor(v).toLocaleString() },
    { label: "Win Rate", value: 73.4, formatter: (v: number) => `${v.toFixed(1)}%` },
    { label: "Total Volume", value: 124, formatter: (v: number) => `$${Math.floor(v)}M` },
    { label: "Holders", value: 12847, formatter: (v: number) => Math.floor(v).toLocaleString() },
    { label: "Active Strategies", value: 47, formatter: (v: number) => Math.floor(v).toString() }
  ];

  return (
    <section className="py-12 border-y border-primary/20 bg-black/50 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 tracking-tighter">
                <Counter to={stat.value} formatter={stat.formatter} />
              </div>
              <div className="text-xs font-mono text-primary uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}