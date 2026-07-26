import { Link } from 'wouter';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-mono relative overflow-hidden">
      <div className="crt-line" />
      <div className="text-center z-10 p-8 border border-primary/20 bg-black/50 backdrop-blur-md">
        <AlertCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold text-white mb-2 uppercase">
          404 <span className="text-primary">Error</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          System critical failure. Route not found.
        </p>
        <Link 
          href="/" 
          className="inline-block border border-primary text-primary hover:bg-primary hover:text-black px-6 py-2 uppercase tracking-widest transition-colors"
        >
          Return to Core
        </Link>
      </div>
    </div>
  );
}