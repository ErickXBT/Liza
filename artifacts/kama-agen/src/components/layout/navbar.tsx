import { Link } from 'wouter';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-primary/30' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 border border-primary/50 bg-black group-hover:border-primary transition-colors">
            <Terminal className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors opacity-0 group-hover:opacity-100" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white group-hover:text-primary transition-colors">
            KAMA<span className="text-primary">OS</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono">_About</a>
          <a href="#analyzer" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono">_Analyzer</a>
          <a href="#capabilities" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono">_Core</a>
          <a href="#tokenomics" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono">_Tokenomics</a>
          <a href="#roadmap" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono">_Roadmap</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="#join" className="hidden sm:inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-black px-6 py-2 text-xs uppercase tracking-widest font-mono transition-all hover:shadow-[0_0_15px_rgba(0,255,65,0.5)]">
            Initialize
          </a>
        </div>
      </div>
    </motion.header>
  );
}