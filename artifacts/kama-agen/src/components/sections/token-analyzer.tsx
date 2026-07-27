import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, AlertTriangle, Shield, Zap, Activity, BarChart2, Lock, CircleDot } from 'lucide-react';

const MOCK_RESULTS: Record<string, {
  name: string; symbol: string; score: number; risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  metrics: { label: string; value: string; status: 'good' | 'warn' | 'bad' }[];
  sentiment: number; liquidity: string; holders: string; verdict: string;
}> = {
  bitcoin: {
    name: 'Bitcoin', symbol: 'BTC', score: 94, risk: 'LOW',
    metrics: [
      { label: 'Contract Verified', value: 'Native Asset', status: 'good' },
      { label: 'Liquidity Depth', value: '$42.8B', status: 'good' },
      { label: 'Top 10 Holders', value: '12.4%', status: 'good' },
      { label: 'Rug Pull Risk', value: '0.2%', status: 'good' },
      { label: 'Honeypot Detected', value: 'No', status: 'good' },
      { label: 'Dev Wallet Activity', value: 'None', status: 'good' },
    ],
    sentiment: 82, liquidity: '$42.8B', holders: '50M+',
    verdict: 'SAFE — Blue chip asset. Strong fundamentals, deep liquidity, and broad distribution. Suitable for long-term holding.',
  },
  ethereum: {
    name: 'Ethereum', symbol: 'ETH', score: 91, risk: 'LOW',
    metrics: [
      { label: 'Contract Verified', value: 'Native Asset', status: 'good' },
      { label: 'Liquidity Depth', value: '$18.3B', status: 'good' },
      { label: 'Top 10 Holders', value: '18.7%', status: 'good' },
      { label: 'Rug Pull Risk', value: '0.4%', status: 'good' },
      { label: 'Honeypot Detected', value: 'No', status: 'good' },
      { label: 'Staking APY', value: '4.1%', status: 'good' },
    ],
    sentiment: 78, liquidity: '$18.3B', holders: '90M+',
    verdict: 'SAFE — Layer-1 backbone with proven security. High institutional confidence and robust DeFi ecosystem integration.',
  },
  pepe: {
    name: 'Pepe', symbol: 'PEPE', score: 51, risk: 'MEDIUM',
    metrics: [
      { label: 'Contract Verified', value: 'Yes', status: 'good' },
      { label: 'Liquidity Depth', value: '$124M', status: 'warn' },
      { label: 'Top 10 Holders', value: '38.2%', status: 'warn' },
      { label: 'Rug Pull Risk', value: '14.7%', status: 'warn' },
      { label: 'Honeypot Detected', value: 'No', status: 'good' },
      { label: 'Dev Wallet Activity', value: 'Moderate', status: 'warn' },
    ],
    sentiment: 64, liquidity: '$124M', holders: '240K+',
    verdict: 'CAUTION — Meme token with concentrated holdings. High volatility risk. Position sizing critical. DYOR.',
  },
  scam: {
    name: 'SafeMoonX', symbol: 'SMOONX', score: 8, risk: 'CRITICAL',
    metrics: [
      { label: 'Contract Verified', value: 'No', status: 'bad' },
      { label: 'Liquidity Depth', value: '$3.2K', status: 'bad' },
      { label: 'Top 10 Holders', value: '91.6%', status: 'bad' },
      { label: 'Rug Pull Risk', value: '97.4%', status: 'bad' },
      { label: 'Honeypot Detected', value: 'YES', status: 'bad' },
      { label: 'Dev Wallet Activity', value: 'HIGH ALERT', status: 'bad' },
    ],
    sentiment: 12, liquidity: '$3.2K', holders: '47',
    verdict: 'DANGER — Critical red flags detected. Honeypot contract. Extreme rug pull probability. DO NOT INTERACT.',
  },
};

const SUGGESTIONS = ['bitcoin', 'ethereum', 'pepe', 'scam'];

const riskConfig = {
  LOW:      { color: 'text-[#00ff41]', border: 'border-[#00ff41]', bg: 'bg-[#00ff41]/10', icon: Shield },
  MEDIUM:   { color: 'text-yellow-400',  border: 'border-yellow-400',  bg: 'bg-yellow-400/10',  icon: AlertTriangle },
  HIGH:     { color: 'text-orange-500',  border: 'border-orange-500',  bg: 'bg-orange-500/10',  icon: AlertTriangle },
  CRITICAL: { color: 'text-red-500',     border: 'border-red-500',     bg: 'bg-red-500/10',     icon: AlertTriangle },
};

const statusColor = { good: 'text-[#00ff41]', warn: 'text-yellow-400', bad: 'text-red-500' };
const statusDot   = { good: 'bg-[#00ff41]',   warn: 'bg-yellow-400',   bad: 'bg-red-500' };

export function TokenAnalyzer() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<typeof MOCK_RESULTS[string] | null>(null);
  const [scanning, setScanning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const runScan = (token: string) => {
    const key = token.trim().toLowerCase();
    setScanning(true);
    setResult(null);
    setLog([]);

    const lines = [
      `> Initializing KAMA OS Token Scanner v3.1...`,
      `> Fetching on-chain data for "${token.toUpperCase()}"...`,
      `> Scanning contract bytecode...`,
      `> Analyzing liquidity pools across 12 DEXs...`,
      `> Running honeypot simulation...`,
      `> Cross-referencing holder distribution...`,
      `> Computing AI risk score...`,
      `> Generating verdict...`,
    ];

    lines.forEach((line, i) => {
      setTimeout(() => {
        setLog(prev => [...prev, line]);
        if (i === lines.length - 1) {
          setTimeout(() => {
            const found = MOCK_RESULTS[key] ?? MOCK_RESULTS['scam'];
            setResult(found);
            setScanning(false);
          }, 400);
        }
      }, i * 340);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    runScan(query);
  };

  return (
    <section id="analyzer" className="py-24 bg-black relative overflow-hidden border-y border-primary/20">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,255,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">KAMA OS Project // AI Token Analyzer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mb-4">
            AI Token <span className="text-primary">Analyzer</span>
          </h2>
          <p className="font-mono text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            KAMA OS proprietary on-chain intelligence engine. Detect rug pulls, honeypots, and whale manipulation before they destroy your portfolio.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Search Input */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <div className="flex items-stretch border border-primary/40 bg-[#050505] hover:border-primary/70 focus-within:border-primary transition-colors shadow-[0_0_30px_rgba(0,255,65,0.05)]">
              <div className="flex items-center px-4 border-r border-primary/20">
                <Search className="w-5 h-5 text-primary/60" />
              </div>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter token name or contract address..."
                className="flex-1 bg-transparent px-4 py-4 font-mono text-sm text-white placeholder:text-muted-foreground/40 outline-none"
              />
              <button
                type="submit"
                disabled={scanning}
                className="bg-primary text-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {scanning ? (
                  <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Scanning</>
                ) : (
                  <><Zap className="w-4 h-4" /> Analyze</>
                )}
              </button>
            </div>
          </motion.form>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest self-center mr-1">Try:</span>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); runScan(s); }}
                className="font-mono text-[10px] uppercase tracking-widest border border-primary/20 text-primary/60 px-3 py-1 hover:border-primary hover:text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Scan log terminal */}
          <AnimatePresence>
            {(scanning || log.length > 0) && !result && (
              <motion.div
                key="log"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 border border-primary/30 bg-[#050505] overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-black">
                  <CircleDot className="w-3 h-3 text-primary animate-pulse" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">KAMA_OS SCAN TERMINAL</span>
                </div>
                <div className="p-4 space-y-1.5 min-h-[120px]">
                  {log.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-mono text-xs text-primary/80"
                    >
                      {line}
                    </motion.div>
                  ))}
                  {scanning && (
                    <div className="font-mono text-xs text-primary/40 animate-pulse">█</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result panel */}
          <AnimatePresence>
            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-primary/30 bg-[#050505] overflow-hidden"
              >
                {/* Result header bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-primary/20 bg-black">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">Analysis Complete</span>
                  </div>
                  <div className={`font-mono text-[10px] uppercase tracking-widest border px-3 py-1 ${riskConfig[result.risk].color} ${riskConfig[result.risk].border} ${riskConfig[result.risk].bg}`}>
                    {result.risk} RISK
                  </div>
                </div>

                <div className="p-6">
                  {/* Token identity + score */}
                  <div className="flex items-start justify-between mb-8 gap-4">
                    <div>
                      <div className="font-display text-3xl font-bold text-white mb-1">{result.name}</div>
                      <div className="font-mono text-sm text-primary">${result.symbol}</div>
                    </div>
                    {/* Score ring */}
                    <div className="relative flex items-center justify-center w-24 h-24 flex-shrink-0">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,255,65,0.1)" strokeWidth="6" />
                        <circle cx="48" cy="48" r="40" fill="none"
                          stroke={result.score >= 70 ? '#00ff41' : result.score >= 40 ? '#facc15' : '#ef4444'}
                          strokeWidth="6"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.score / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <div className={`font-mono text-2xl font-bold ${result.score >= 70 ? 'text-[#00ff41]' : result.score >= 40 ? 'text-yellow-400' : 'text-red-500'}`}>
                          {result.score}
                        </div>
                        <div className="font-mono text-[9px] text-muted-foreground uppercase">Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { icon: BarChart2, label: 'Liquidity', val: result.liquidity },
                      { icon: TrendingUp,  label: 'Sentiment', val: `${result.sentiment}%` },
                      { icon: Lock,        label: 'Holders',   val: result.holders },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="border border-white/10 bg-white/5 p-3 flex items-center gap-3">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{label}</div>
                          <div className="font-mono text-sm text-white font-bold">{val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metrics checklist */}
                  <div className="mb-8">
                    <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">Security Scan Results</div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {result.metrics.map((m, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center justify-between border border-white/8 bg-white/3 px-4 py-2.5"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${statusDot[m.status]}`} />
                            <span className="font-mono text-xs text-muted-foreground">{m.label}</span>
                          </div>
                          <span className={`font-mono text-xs font-bold ${statusColor[m.status]}`}>{m.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className={`border-l-2 p-4 ${riskConfig[result.risk].border} ${riskConfig[result.risk].bg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {(() => { const Icon = riskConfig[result.risk].icon; return <Icon className={`w-4 h-4 ${riskConfig[result.risk].color}`} />; })()}
                      <span className={`font-mono text-[10px] uppercase tracking-widest ${riskConfig[result.risk].color}`}>KAMA OS Verdict</span>
                    </div>
                    <p className="font-mono text-sm text-white/80 leading-relaxed">{result.verdict}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feature callouts */}
          {!scanning && !result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid sm:grid-cols-3 gap-4 mt-2"
            >
              {[
                { icon: Shield,        title: 'Rug Pull Detection',    desc: 'Detects liquidity removal patterns and dev wallet dumps in real-time.' },
                { icon: AlertTriangle, title: 'Honeypot Scanner',      desc: 'Simulates buy/sell transactions to expose sell-blocking contracts.' },
                { icon: TrendingDown,  title: 'Whale Alert Engine',    desc: 'Tracks top 100 wallets and flags suspicious accumulation movements.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="border border-white/8 bg-white/3 p-5 hover:border-primary/30 transition-colors group">
                  <Icon className="w-5 h-5 text-primary mb-3 group-hover:drop-shadow-[0_0_6px_rgba(0,255,65,0.8)] transition-all" />
                  <div className="font-display font-bold text-white text-sm mb-1">{title}</div>
                  <div className="font-mono text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
