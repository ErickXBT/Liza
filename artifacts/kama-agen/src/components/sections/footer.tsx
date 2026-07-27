import { Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] py-12 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/50 overflow-hidden">
              <img src="/liza-avatar.jpg" alt="LIZA OS Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-xl tracking-widest text-white">
              LIZA<span className="text-primary">OS</span>
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
            DISCLAIMER: Cryptocurrency trading involves significant risk. LIZA OS is an experimental AI protocol. Use at your own risk.
          </p>
          <p>
            &copy; {new Date().getFullYear()} LIZA OS NODE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}