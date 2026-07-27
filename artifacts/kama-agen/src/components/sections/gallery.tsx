import { motion } from 'framer-motion';
import { useState } from 'react';
import kamaOriginal from '@assets/-i3mn72_1785058119232.jpg';
import kamaTrading from '@assets/generated_images/kama-trading.jpg';
import kamaFullbody from '@assets/generated_images/kama-fullbody.jpg';
import kamaChart from '@assets/generated_images/kama-chart.jpg';

const photos = [
  {
    src: kamaOriginal,
    label: 'KAMA // SYSTEM BOOT',
    sub: 'Original Neural Render',
    tag: 'IDENTITY',
  },
  {
    src: kamaTrading,
    label: 'KAMA // TRADE EXEC',
    sub: 'Active Market Analysis',
    tag: 'ANALYSIS',
  },
  {
    src: kamaFullbody,
    label: 'KAMA // FULL DEPLOY',
    sub: 'Tactical Deployment Mode',
    tag: 'DEPLOY',
  },
  {
    src: kamaChart,
    label: 'KAMA // CHART_SCAN',
    sub: 'Real-Time Signal Processing',
    tag: 'SIGNAL',
  },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(0,255,65,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Visual Database // KAMA_IMG_ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mb-4">
            KAMA <span className="text-primary">Gallery</span>
          </h2>
          <p className="font-mono text-muted-foreground max-w-xl mx-auto text-sm">
            Neural-rendered visuals of the KAMA OS intelligence core across operational states.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setActive(active === i ? null : i)}
            >
              {/* Corner decorators */}
              <div className="absolute -inset-[1px] border border-primary/20 group-hover:border-primary/60 transition-colors z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-px -translate-y-px" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-px -translate-y-px" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-px translate-y-px" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-px translate-y-px" />
              </div>

              {/* Tag */}
              <div className="absolute top-3 right-3 z-20">
                <span className="font-mono text-[9px] bg-black/80 border border-primary/50 text-primary px-2 py-0.5 uppercase tracking-wider">
                  {photo.tag}
                </span>
              </div>

              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden bg-black">
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">{photo.label}</div>
                <div className="font-mono text-xs text-white/70">{photo.sub}</div>
                {/* Animated scan line on hover */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </div>

              {/* Glow shadow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(0,255,65,0.08)] pointer-events-none z-10" />
            </motion.div>
          ))}
        </div>

        {/* Fullscreen lightbox */}
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
              {/* Close */}
              <button
                onClick={() => setActive(null)}
                className="absolute -top-10 right-0 font-mono text-xs text-primary hover:text-white uppercase tracking-widest transition-colors"
              >
                [CLOSE_X]
              </button>
              <div className="border border-primary/50 overflow-hidden shadow-[0_0_60px_rgba(0,255,65,0.2)]">
                <div className="bg-black border-b border-primary/30 px-4 py-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs text-primary uppercase tracking-wider">{photos[active].label}</span>
                </div>
                <img src={photos[active].src} alt={photos[active].label} className="w-full object-cover" />
              </div>
              <div className="mt-3 font-mono text-xs text-primary/60 text-center uppercase tracking-widest">
                {photos[active].sub}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
