import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import kamaVideo from '@assets/generated_videos/kama-intro.mp4';

export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section id="video" className="py-24 bg-black relative overflow-hidden border-y border-primary/20">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Cinematic Sequence // KAMA_VID_01</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mb-4">
            Meet <span className="text-primary">KAMA</span>
          </h2>
          <p className="font-mono text-muted-foreground max-w-xl mx-auto text-sm">
            The autonomous AI agent that never sleeps, never hesitates, never loses focus.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Corner decorators */}
          <div className="absolute -inset-[3px] border border-primary/40 z-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary -translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary translate-x-[1px] -translate-y-[1px]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary -translate-x-[1px] translate-y-[1px]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary translate-x-[1px] translate-y-[1px]" />
          </div>

          {/* Header bar */}
          <div className="bg-black border border-primary/30 border-b-0 px-4 py-2 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60 border border-primary" />
            </div>
            <span className="font-mono text-xs text-primary/70 uppercase tracking-widest">kama_agen_cinematic_v1.mp4</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[10px] text-primary uppercase">Live</span>
            </div>
          </div>

          {/* Video container */}
          <div className="relative bg-black border border-primary/30 overflow-hidden group aspect-video">
            <video
              ref={videoRef}
              src={kamaVideo}
              className="w-full h-full object-cover"
              muted={muted}
              loop
              playsInline
              onEnded={() => setPlaying(false)}
            />

            {/* Overlay tint */}
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.08) 2px, rgba(0,255,65,0.08) 4px)' }}
            />

            {/* Center play button (shown when paused) */}
            {!playing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full border-2 border-primary bg-black/70 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,65,0.4)] hover:bg-primary/20 hover:shadow-[0_0_60px_rgba(0,255,65,0.6)] transition-all duration-300 backdrop-blur-sm"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                </button>
              </motion.div>
            )}

            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-5 py-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button onClick={togglePlay} className="text-primary hover:text-white transition-colors">
                {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3 rounded-full" />
              </div>
              <button onClick={toggleMute} className="text-primary hover:text-white transition-colors">
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="font-mono text-[10px] text-primary/70 uppercase">KAMA // 8s</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
