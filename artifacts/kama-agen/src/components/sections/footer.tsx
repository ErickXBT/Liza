import { Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] py-12 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl tracking-widest text-white">
              KAMA<span className="text-primary">AGEN</span>
            </span>
          </div>
          
          <div className="flex gap-6 font-mono text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Docs</a>
            <a href="#" className="hover:text-primary transition-colors">Audit</a>
            <a href="#" className="hover:text-primary transition-colors">Github</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground/60">
          <p>
            DISCLAIMER: Cryptocurrency trading involves significant risk. KAMA AGEN is an experimental AI protocol. Use at your own risk.
          </p>
          <p>
            &copy; {new Date().getFullYear()} KAMA AGEN NODE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}