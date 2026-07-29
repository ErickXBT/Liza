export function Stats() {
  // Enough repetitions to fill any screen width before the loop resets
  const items = Array.from({ length: 14 });

  return (
    <section className="relative z-20 overflow-hidden border-y border-primary/20 bg-black/70 py-4">
      {/* Fade-out edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />

      {/* Scrolling track */}
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 22s linear infinite' }}
      >
        {items.map((_, i) => (
          <span key={`a${i}`} className="inline-flex items-center gap-0 shrink-0">
            <span className="font-display font-black text-xl tracking-[0.3em] text-primary px-7 uppercase">
              LIZAOS
            </span>
            <span className="text-primary/30 text-sm">✦</span>
          </span>
        ))}
        {/* Duplicate — seamless loop */}
        {items.map((_, i) => (
          <span key={`b${i}`} className="inline-flex items-center gap-0 shrink-0">
            <span className="font-display font-black text-xl tracking-[0.3em] text-primary px-7 uppercase">
              LIZAOS
            </span>
            <span className="text-primary/30 text-sm">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
