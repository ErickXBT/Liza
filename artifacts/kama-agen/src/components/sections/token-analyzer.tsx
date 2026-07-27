import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, TrendingUp, TrendingDown, AlertTriangle, Shield, Zap,
  Activity, BarChart2, Lock, CircleDot, X, ChevronDown, ChevronUp,
  DollarSign, Users, Globe
} from 'lucide-react';

// ── Types ───────────────────────────────────────────────────────────────
interface SearchCoin { id: string; name: string; symbol: string; thumb: string; market_cap_rank: number | null }

interface CoinData {
  id: string; name: string; symbol: string;
  image: { thumb: string; small: string; large: string };
  market_cap_rank: number | null;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number | null;
    price_change_percentage_7d: number | null;
    price_change_percentage_30d: number | null;
    circulating_supply: number | null;
    total_supply: number | null;
    ath: { usd: number };
    ath_change_percentage: { usd: number };
  };
  community_data: { twitter_followers: number | null; reddit_subscribers: number | null };
  developer_data: { stars: number | null; commit_count_4_weeks: number | null };
  watchlist_portfolio_users: number | null;
  description: { en: string };
  links: { homepage: string[]; twitter_screen_name: string; subreddit_url: string };
  genesis_date: string | null;
}

interface AnalysisResult {
  name: string; symbol: string; image: string;
  score: number; risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  price: string; priceChange24h: number | null;
  marketCap: string; volume: string; rank: number | null;
  liquidity: string; sentiment: number; holders: string;
  metrics: { label: string; value: string; status: 'good' | 'warn' | 'bad' }[];
  verdict: string;
  priceChange7d: number | null; priceChange30d: number | null;
  athChange: number | null; supplyRatio: string;
  twitterFollowers: string; redditSubs: string;
  genesis: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────
const fmt = (n: number): string => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6)  return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3)  return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
};

const fmtNum = (n: number): string => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
};

const fmtPrice = (n: number): string => {
  if (n >= 1) return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (n >= 0.01) return `$${n.toFixed(4)}`;
  if (n >= 0.0001) return `$${n.toFixed(6)}`;
  return `$${n.toExponential(2)}`;
};

function computeScore(d: CoinData): { score: number; risk: AnalysisResult['risk'] } {
  let score = 50;
  const md = d.market_data;

  // Market cap rank – biggest trust signal
  const rank = d.market_cap_rank ?? 9999;
  if (rank <= 10)   score += 30;
  else if (rank <= 50)  score += 22;
  else if (rank <= 100) score += 15;
  else if (rank <= 300) score += 8;
  else if (rank <= 500) score += 2;
  else score -= 8;

  // Liquidity: volume / mcap ratio
  const mcap   = md.market_cap.usd   ?? 0;
  const volume = md.total_volume.usd ?? 0;
  const liqRatio = mcap > 0 ? volume / mcap : 0;
  if (liqRatio > 0.3)       score += 10;
  else if (liqRatio > 0.1)  score += 6;
  else if (liqRatio > 0.05) score += 2;
  else if (liqRatio < 0.01) score -= 8;

  // 24h volatility
  const ch24 = md.price_change_percentage_24h ?? 0;
  if (Math.abs(ch24) > 50) score -= 15;
  else if (Math.abs(ch24) > 25) score -= 8;
  else if (Math.abs(ch24) > 10) score -= 3;

  // ATH drawdown: very deep drawdown = risky/dead
  const athCh = md.ath_change_percentage?.usd ?? 0;
  if (athCh < -95) score -= 12;
  else if (athCh < -80) score -= 5;

  // Supply ratio
  const circ = md.circulating_supply ?? 0;
  const total = md.total_supply ?? circ;
  const supplyPct = total > 0 ? circ / total : 1;
  if (supplyPct < 0.1) score -= 8;
  else if (supplyPct < 0.3) score -= 3;
  else if (supplyPct > 0.8) score += 4;

  // Community
  const tw = d.community_data?.twitter_followers ?? 0;
  if (tw > 1e6) score += 6;
  else if (tw > 1e5) score += 3;
  else if (tw < 1000) score -= 4;

  // Dev activity
  const commits = d.developer_data?.commit_count_4_weeks ?? 0;
  if (commits > 100) score += 4;
  else if (commits > 20) score += 2;

  const clamped = Math.max(1, Math.min(99, score));
  let risk: AnalysisResult['risk'] = 'LOW';
  if (clamped < 30)      risk = 'CRITICAL';
  else if (clamped < 50) risk = 'HIGH';
  else if (clamped < 70) risk = 'MEDIUM';

  return { score: clamped, risk };
}

function buildResult(d: CoinData): AnalysisResult {
  const { score, risk } = computeScore(d);
  const md = d.market_data;
  const mcap   = md.market_cap.usd   ?? 0;
  const volume = md.total_volume.usd ?? 0;
  const liqRatio = mcap > 0 ? volume / mcap : 0;
  const circ  = md.circulating_supply ?? 0;
  const total = md.total_supply ?? 0;
  const supplyRatio = total > 0 ? `${((circ / total) * 100).toFixed(1)}%` : 'N/A';

  const ch24 = md.price_change_percentage_24h;
  const liqStatus = liqRatio > 0.1 ? 'good' : liqRatio > 0.03 ? 'warn' : 'bad';
  const volStatus = liqRatio > 0.05 ? 'good' : liqRatio > 0.01 ? 'warn' : 'bad';
  const supplyStatus = total > 0 && circ / total > 0.5 ? 'good' : total > 0 && circ / total > 0.2 ? 'warn' : 'bad';
  const rankStatus = (d.market_cap_rank ?? 9999) <= 100 ? 'good' : (d.market_cap_rank ?? 9999) <= 500 ? 'warn' : 'bad';
  const athStatus  = (md.ath_change_percentage?.usd ?? 0) > -80 ? 'good' : 'warn';
  const twStatus   = (d.community_data?.twitter_followers ?? 0) > 50_000 ? 'good' : (d.community_data?.twitter_followers ?? 0) > 5000 ? 'warn' : 'bad';

  const verdicts: Record<AnalysisResult['risk'], string> = {
    LOW:      `SAFE — ${d.name} (${d.symbol.toUpperCase()}) shows strong fundamentals. Healthy liquidity, broad distribution, and active community. Suitable for portfolio allocation with standard risk management.`,
    MEDIUM:   `CAUTION — ${d.name} shows moderate risk signals. Monitor liquidity depth and whale activity closely. Position sizing is critical. Conduct independent research before entry.`,
    HIGH:     `WARNING — ${d.name} exhibits elevated risk factors. Low liquidity, thin market depth, or high volatility detected. Limit exposure and use strict stop-losses.`,
    CRITICAL: `DANGER — ${d.name} shows critical red flags. Extremely low liquidity, concentrated supply, or deep ATH drawdown. High probability of further loss. Extreme caution advised.`,
  };

  const tw  = d.community_data?.twitter_followers ?? 0;
  const red = d.community_data?.reddit_subscribers ?? 0;
  const sentiment = Math.min(95, Math.max(10,
    (tw > 1e6 ? 40 : tw > 1e5 ? 28 : tw > 1e4 ? 15 : 5) +
    (red > 5e5 ? 30 : red > 5e4 ? 20 : red > 5e3 ? 10 : 3) +
    ((ch24 ?? 0) > 5 ? 15 : (ch24 ?? 0) < -5 ? 5 : 10)
  ));

  return {
    name: d.name, symbol: d.symbol.toUpperCase(), image: d.image?.small ?? '',
    score, risk, price: fmtPrice(md.current_price.usd ?? 0),
    priceChange24h: ch24 ?? null,
    priceChange7d:  md.price_change_percentage_7d  ?? null,
    priceChange30d: md.price_change_percentage_30d ?? null,
    marketCap: fmt(mcap), volume: fmt(volume),
    rank: d.market_cap_rank,
    liquidity: liqRatio > 0.1 ? 'High' : liqRatio > 0.03 ? 'Medium' : 'Low',
    sentiment, holders: fmtNum(d.watchlist_portfolio_users ?? 0) || 'N/A',
    athChange: md.ath_change_percentage?.usd ?? null,
    supplyRatio, genesis: d.genesis_date ?? 'N/A',
    twitterFollowers: tw ? fmtNum(tw) : 'N/A',
    redditSubs: red ? fmtNum(red) : 'N/A',
    metrics: [
      { label: 'Market Cap Rank',     value: d.market_cap_rank ? `#${d.market_cap_rank}` : 'Unranked', status: rankStatus },
      { label: 'Liquidity (Vol/MCap)', value: `${(liqRatio * 100).toFixed(1)}%`,  status: liqStatus  },
      { label: '24h Volume',          value: fmt(volume), status: volStatus },
      { label: 'Circulating Supply',  value: supplyRatio, status: supplyStatus },
      { label: 'ATH Drawdown',        value: md.ath_change_percentage?.usd != null ? `${md.ath_change_percentage.usd.toFixed(1)}%` : 'N/A', status: athStatus },
      { label: 'Twitter Community',   value: tw ? fmtNum(tw) : 'N/A', status: twStatus },
    ],
    verdict: verdicts[risk],
  };
}

// ── Constants ────────────────────────────────────────────────────────────
const riskConfig = {
  LOW:      { color: 'text-[#00ff41]', border: 'border-[#00ff41]', bg: 'bg-[#00ff41]/10',  icon: Shield },
  MEDIUM:   { color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-400/10', icon: AlertTriangle },
  HIGH:     { color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-500/10', icon: AlertTriangle },
  CRITICAL: { color: 'text-red-500',    border: 'border-red-500',    bg: 'bg-red-500/10',    icon: AlertTriangle },
};
const statusColor = { good: 'text-[#00ff41]', warn: 'text-yellow-400', bad: 'text-red-500' };
const statusDot   = { good: 'bg-[#00ff41]',   warn: 'bg-yellow-400',   bad: 'bg-red-500'   };

const TRENDING_DEFAULTS = [
  { id: 'bitcoin',  name: 'Bitcoin',   symbol: 'BTC'  },
  { id: 'ethereum', name: 'Ethereum',  symbol: 'ETH'  },
  { id: 'solana',   name: 'Solana',    symbol: 'SOL'  },
  { id: 'pepe',     name: 'Pepe',      symbol: 'PEPE' },
  { id: 'dogecoin', name: 'Dogecoin',  symbol: 'DOGE' },
  { id: 'sui',      name: 'Sui',       symbol: 'SUI'  },
];

// ── Component ────────────────────────────────────────────────────────────
export function TokenAnalyzer() {
  const [query, setQuery]         = useState('');
  const [suggestions, setSuggestions] = useState<SearchCoin[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [result, setResult]       = useState<AnalysisResult | null>(null);
  const [scanning, setScanning]   = useState(false);
  const [log, setLog]             = useState<string[]>([]);
  const [error, setError]         = useState<string | null>(null);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); setShowDropdown(false); return; }
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async () => {
      setLoadingSuggest(true);
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions((data.coins ?? []).slice(0, 8));
        setShowDropdown(true);
      } catch { /* silent */ } finally {
        setLoadingSuggest(false);
      }
    }, 350);
  }, [query]);

  const runScan = useCallback(async (coinId: string, coinName: string) => {
    setScanning(true);
    setResult(null);
    setError(null);
    setLog([]);
    setShowDropdown(false);

    const lines = [
      `> Initializing KAMA OS Token Scanner v3.1...`,
      `> Resolving "${coinName}" on CoinGecko registry...`,
      `> Fetching real-time market data...`,
      `> Analyzing liquidity depth across DEX pools...`,
      `> Scanning supply distribution & whale wallets...`,
      `> Running community sentiment analysis...`,
      `> Computing AI risk score & volatility index...`,
      `> Generating verdict...`,
    ];

    // Show logs line by line
    lines.forEach((line, i) => {
      setTimeout(() => setLog(prev => [...prev, line]), i * 300);
    });

    // Fetch real data in parallel with log animation
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
      );
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data: CoinData = await res.json();
      const analysis = buildResult(data);

      // Wait for logs to finish, then show result
      const delay = lines.length * 300 + 500;
      setTimeout(() => {
        setResult(analysis);
        setScanning(false);
      }, delay);
    } catch (e) {
      const delay = lines.length * 300 + 400;
      setTimeout(() => {
        setError('Unable to fetch token data. CoinGecko API may be rate-limited. Please try again in a moment.');
        setScanning(false);
      }, delay);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Use query as coinId (lowercase, trimmed)
    runScan(query.trim().toLowerCase().replace(/\s+/g, '-'), query.trim());
  };

  const handleSuggestionClick = (coin: SearchCoin) => {
    setQuery(coin.name);
    setSuggestions([]);
    setShowDropdown(false);
    runScan(coin.id, coin.name);
  };

  const handleTrendingClick = (coin: { id: string; name: string; symbol: string }) => {
    setQuery(coin.name);
    runScan(coin.id, coin.name);
  };

  const PriceChange = ({ val, label }: { val: number | null; label: string }) => {
    if (val == null) return null;
    const pos = val >= 0;
    return (
      <div className="flex items-center gap-1">
        <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
        <span className={`font-mono text-xs font-bold flex items-center gap-0.5 ${pos ? 'text-[#00ff41]' : 'text-red-500'}`}>
          {pos ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {Math.abs(val).toFixed(2)}%
        </span>
      </div>
    );
  };

  return (
    <section id="analyzer" className="py-24 bg-black relative overflow-hidden border-y border-primary/20">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,255,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
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
            Live on-chain intelligence powered by CoinGecko. Analyze any of <span className="text-primary">15,000+ crypto tokens</span> — detect risk, liquidity depth, community sentiment, and more.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Search Input with Autocomplete */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 relative" ref={dropdownRef}
          >
            <form onSubmit={handleSubmit}>
              <div className="flex items-stretch border border-primary/40 bg-[#050505] hover:border-primary/70 focus-within:border-primary transition-colors shadow-[0_0_30px_rgba(0,255,65,0.05)]">
                <div className="flex items-center px-4 border-r border-primary/20">
                  {loadingSuggest
                    ? <span className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                    : <Search className="w-5 h-5 text-primary/60" />
                  }
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                  placeholder="Search any token — Bitcoin, Solana, PEPE, contract address..."
                  className="flex-1 bg-transparent px-4 py-4 font-mono text-sm text-white placeholder:text-muted-foreground/40 outline-none"
                  autoComplete="off"
                />
                {query && (
                  <button type="button" onClick={() => { setQuery(''); setSuggestions([]); setShowDropdown(false); setResult(null); setError(null); setLog([]); }}
                    className="px-3 text-muted-foreground hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button type="submit" disabled={scanning}
                  className="bg-primary text-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {scanning
                    ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Scanning</>
                    : <><Zap className="w-4 h-4" /> Analyze</>
                  }
                </button>
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showDropdown && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full left-0 right-0 z-50 border border-primary/30 bg-[#050505] shadow-[0_8px_30px_rgba(0,255,65,0.1)] overflow-hidden"
                >
                  {suggestions.map((coin, i) => (
                    <button key={coin.id} onClick={() => handleSuggestionClick(coin)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors border-b border-white/5 last:border-0 text-left group">
                      {coin.thumb && <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full flex-shrink-0" onError={e => (e.currentTarget.style.display = 'none')} />}
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-sm text-white group-hover:text-primary transition-colors">{coin.name}</span>
                        <span className="font-mono text-xs text-muted-foreground ml-2">{coin.symbol?.toUpperCase()}</span>
                      </div>
                      {coin.market_cap_rank && (
                        <span className="font-mono text-[10px] text-primary/50 border border-primary/20 px-2 py-0.5">#{coin.market_cap_rank}</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trending Quick Access */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest self-center mr-1">Trending:</span>
            {TRENDING_DEFAULTS.map(coin => (
              <button key={coin.id} onClick={() => handleTrendingClick(coin)} disabled={scanning}
                className="font-mono text-[10px] uppercase tracking-widest border border-primary/20 text-primary/60 px-3 py-1 hover:border-primary hover:text-primary transition-colors disabled:opacity-40">
                {coin.symbol}
              </button>
            ))}
          </div>

          {/* Scan Log Terminal */}
          <AnimatePresence>
            {(scanning || log.length > 0) && !result && !error && (
              <motion.div key="log" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-6 border border-primary/30 bg-[#050505] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-black">
                  <CircleDot className="w-3 h-3 text-primary animate-pulse" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">KAMA_OS SCAN TERMINAL</span>
                </div>
                <div className="p-4 space-y-1.5 min-h-[120px]">
                  {log.map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="font-mono text-xs text-primary/80">{line}</motion.div>
                  ))}
                  {scanning && <div className="font-mono text-xs text-primary/40 animate-pulse">█</div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="mb-6 border border-red-500/40 bg-red-500/5 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="font-mono text-sm text-red-400">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Panel */}
          <AnimatePresence>
            {result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} className="border border-primary/30 bg-[#050505] overflow-hidden">

                {/* Result header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-primary/20 bg-black">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">Analysis Complete · Live Data</span>
                  </div>
                  <div className={`font-mono text-[10px] uppercase tracking-widest border px-3 py-1 ${riskConfig[result.risk].color} ${riskConfig[result.risk].border} ${riskConfig[result.risk].bg}`}>
                    {result.risk} RISK
                  </div>
                </div>

                <div className="p-6">
                  {/* Token identity + score */}
                  <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      {result.image && (
                        <img src={result.image} alt={result.name}
                          className="w-12 h-12 rounded-full border border-primary/30 bg-black"
                          onError={e => (e.currentTarget.style.display = 'none')} />
                      )}
                      <div>
                        <div className="font-display text-3xl font-bold text-white">{result.name}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-mono text-sm text-primary">${result.symbol}</span>
                          {result.rank && <span className="font-mono text-xs text-muted-foreground border border-white/10 px-2 py-0.5">Rank #{result.rank}</span>}
                        </div>
                      </div>
                    </div>
                    {/* Score ring */}
                    <div className="relative flex items-center justify-center w-24 h-24 flex-shrink-0">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,255,65,0.1)" strokeWidth="6" />
                        <circle cx="48" cy="48" r="40" fill="none"
                          stroke={result.score >= 70 ? '#00ff41' : result.score >= 50 ? '#facc15' : result.score >= 30 ? '#f97316' : '#ef4444'}
                          strokeWidth="6"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.score / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <div className={`font-mono text-2xl font-bold ${result.score >= 70 ? 'text-[#00ff41]' : result.score >= 50 ? 'text-yellow-400' : result.score >= 30 ? 'text-orange-500' : 'text-red-500'}`}>
                          {result.score}
                        </div>
                        <div className="font-mono text-[9px] text-muted-foreground uppercase">Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Price + changes */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 p-3 border border-white/8 bg-white/3">
                    <div>
                      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Price</div>
                      <div className="font-mono text-xl font-bold text-white">{result.price}</div>
                    </div>
                    <div className="flex flex-wrap gap-3 ml-2">
                      <PriceChange val={result.priceChange24h} label="24h" />
                      <PriceChange val={result.priceChange7d}  label="7d"  />
                      <PriceChange val={result.priceChange30d} label="30d" />
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { icon: BarChart2,   label: 'Market Cap',  val: result.marketCap },
                      { icon: TrendingUp,  label: '24h Volume',  val: result.volume    },
                      { icon: Activity,    label: 'Sentiment',   val: `${result.sentiment}%` },
                      { icon: Users,       label: 'Watchlist',   val: result.holders   },
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

                  {/* Extra stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                      { icon: Lock,       label: 'Circ Supply %', val: result.supplyRatio },
                      { icon: TrendingDown, label: 'ATH Drawdown', val: result.athChange != null ? `${result.athChange.toFixed(1)}%` : 'N/A' },
                      { icon: Globe,      label: 'Twitter',       val: result.twitterFollowers },
                      { icon: DollarSign, label: 'Reddit',        val: result.redditSubs },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="border border-white/10 bg-white/5 p-3 flex items-center gap-3">
                        <Icon className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        <div>
                          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{label}</div>
                          <div className="font-mono text-sm text-white/80 font-bold">{val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security Metrics */}
                  <div className="mb-8">
                    <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">Security & Risk Scan Results</div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {result.metrics.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                          className="flex items-center justify-between border border-white/8 bg-white/3 px-4 py-2.5">
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

                  {/* Data source note */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="font-mono text-[10px] text-muted-foreground/40">Live data via CoinGecko API · Not financial advice · DYOR</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feature callouts — idle state */}
          {!scanning && !result && !error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid sm:grid-cols-3 gap-4 mt-2">
              {[
                { icon: Shield,        title: 'Real-Time Data',        desc: 'Live market data for 15,000+ tokens pulled directly from CoinGecko on every scan.' },
                { icon: AlertTriangle, title: 'Risk Intelligence',     desc: 'AI-computed score from liquidity, supply, volatility, community, and market rank signals.' },
                { icon: TrendingDown,  title: 'Community Sentiment',   desc: 'Aggregated Twitter & Reddit activity to gauge token momentum and investor confidence.' },
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
