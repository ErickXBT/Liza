import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#about',        label: '_About'    },
  { href: '#analyzer',     label: '_Analyzer' },
  { href: '#capabilities', label: '_Core'     },
  { href: '#roadmap',      label: '_Roadmap'  },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to md+
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-background/95 backdrop-blur-md border-b border-primary/30'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-primary/50 overflow-hidden group-hover:border-primary transition-colors">
            <img src="/liza-avatar.jpg" alt="LIZA OS Logo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors opacity-0 group-hover:opacity-100" />
          </div>
          <span className="font-display font-bold text-xl tracking-widest text-white group-hover:text-primary transition-colors">
            LIZA<span className="text-primary">OS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="#join"
            className="hidden sm:inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-black px-6 py-2 text-xs uppercase tracking-widest font-mono transition-all hover:shadow-[0_0_15px_rgba(0,255,65,0.5)]"
          >
            Initialize
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 border border-primary/40 hover:border-primary text-primary transition-colors"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-primary/20"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono py-4 border-b border-white/5 last:border-b-0"
                >
                  {label}
                </a>
              ))}
              <a
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-black px-6 py-3 text-xs uppercase tracking-widest font-mono transition-all"
              >
                Initialize
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
