import { motion } from 'framer-motion';
import { Copy, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SiDiscord, SiTelegram, SiX } from 'react-icons/si';

export function Community() {
  const { toast } = useToast();
  const contractAddress = null; // Not launched yet

  const handleCopy = () => {
    if (!contractAddress) return;
    navigator.clipboard.writeText(contractAddress);
    toast({
      title: "ADDRESS COPIED",
      description: "Contract address loaded to clipboard buffer.",
      className: "bg-black border-primary text-primary font-mono rounded-none",
    });
  };

  return (
    <section id="join" className="py-24 bg-black relative border-y border-primary/20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <Terminal className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl sm:text-6xl font-display font-black text-white uppercase mb-6">
            Join the <span className="text-primary">Network</span>
          </h2>
          <p className="font-mono text-muted-foreground mb-12 text-lg">
            Initialize connection to the LIZA OS collective. Participate in the governance of the autonomous future.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a href="#" className="flex items-center gap-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 text-white px-8 py-4 font-display uppercase tracking-widest transition-all group">
              <SiTelegram className="w-6 h-6 group-hover:text-primary transition-colors" />
              Telegram
            </a>
            <a href="#" className="flex items-center gap-3 bg-white/5 border border-white/20 hover:border-primary hover:bg-primary/10 text-white px-8 py-4 font-display uppercase tracking-widest transition-all group">
              <SiX className="w-6 h-6 group-hover:text-primary transition-colors" />
              Twitter / X
            </a>
          </div>
          
          <div className="max-w-xl mx-auto">
            <div className="text-left text-xs font-mono text-primary mb-2 uppercase">Official Contract Address</div>
            <div className="flex items-center">
              <div className="flex-1 bg-[#0a0a0a] border border-r-0 border-white/20 p-4 font-mono text-sm sm:text-base overflow-hidden text-ellipsis whitespace-nowrap text-white/30 italic">
                TBA — contract not yet deployed
              </div>
              <button
                onClick={handleCopy}
                disabled={!contractAddress}
                className="bg-primary/30 text-black/40 px-6 py-4 border border-primary/30 cursor-not-allowed"
                aria-label="Copy contract address"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}