import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';

const sections = [
  {
    id: 'overview',
    title: 'What is LIZAOS',
    content: (
      <div className="space-y-5 font-mono text-sm text-muted-foreground leading-relaxed">
        <p>
          <span className="text-primary">LIZAOS</span> is an autonomous AI crypto agent designed to analyze,
          monitor, and act on on-chain opportunities — 24/7, without human intervention.
        </p>
        <p>
          Powered by a multi-layer neural architecture, LIZAOS processes real-time market signals,
          sentiment data, and on-chain metrics to execute decisions faster than any human trader.
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Fully autonomous — no manual input required once initialized',
            'Real-time token risk analysis across all major chains',
            'On-chain execution with smart contract safety checks',
            'Community-governed strategy modules',
            'Live market intelligence dashboard',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary flex-shrink-0 mt-0.5">&gt;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'token',
    title: 'The LIZAOS Token',
    content: (
      <div className="space-y-6 font-mono text-sm text-muted-foreground">
        <p>
          The <span className="text-primary">LIZAOS</span> token is the core utility and governance asset of the ecosystem.
          Holding LIZAOS grants access to premium agent features, revenue sharing, and on-chain voting rights.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Token Name',    value: 'LIZAOS' },
            { label: 'Network',       value: 'Ethereum (ERC-20)' },
            { label: 'Total Supply',  value: '1,000,000,000' },
            { label: 'Token Type',    value: 'Utility + Governance' },
          ].map(({ label, value }) => (
            <div key={label} className="border border-white/10 bg-[#060606] p-4">
              <div className="text-[10px] uppercase tracking-widest text-primary/60 mb-1">{label}</div>
              <div className="text-white font-bold">{value}</div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Token Utility</h4>
          <div className="space-y-2">
            {[
              { title: 'Agent Access', desc: 'Stake LIZAOS to activate autonomous trading modules.' },
              { title: 'Revenue Share', desc: 'Holders receive a portion of protocol-generated profits.' },
              { title: 'Governance',   desc: 'Vote on strategy upgrades and treasury allocation.' },
              { title: 'Priority Queue', desc: 'Higher holdings = faster execution priority on-chain.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-3 border border-white/8 bg-[#050505] p-3">
                <span className="text-primary shrink-0">&gt;</span>
                <div>
                  <span className="text-white">{title}</span>
                  <span className="text-muted-foreground"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'analyzer',
    title: 'Token Risk Analyzer',
    content: (
      <div className="space-y-6">
        <p className="font-mono text-sm text-muted-foreground">
          The LIZAOS Risk Analyzer scans any token in real time and outputs a 0–100 safety score
          using market cap, liquidity, volatility, community size, and developer activity signals.
        </p>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">How to Use</h4>
          <div className="space-y-2 font-mono text-xs text-muted-foreground">
            {[
              '1. Navigate to the _ANALYZER section on the home page.',
              '2. Type any token name or ticker into the search field.',
              '3. Select your token from the autocomplete suggestions.',
              '4. The agent will fetch live data and compute the risk score.',
              '5. Review the verdict: LOW / MEDIUM / HIGH / CRITICAL.',
            ].map((step, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-primary shrink-0">&gt;</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Scoring Signals</h4>
          <div className="space-y-2">
            {[
              { signal: 'Market Cap Rank',    weight: 'High',   desc: 'Higher rank = more trust, lower risk.' },
              { signal: 'Liquidity Ratio',    weight: 'High',   desc: 'Volume vs market cap — thin liquidity is a red flag.' },
              { signal: '24h Volatility',     weight: 'Medium', desc: 'Extreme swings increase CRITICAL risk threshold.' },
              { signal: 'ATH Drawdown',       weight: 'Medium', desc: 'Severe depreciation from all-time high raises risk.' },
              { signal: 'Community Activity', weight: 'Low',    desc: 'Reddit / Twitter engagement signals organic growth.' },
              { signal: 'Developer Activity', weight: 'Low',    desc: 'Active Github commits indicate a live project.' },
            ].map(({ signal, weight, desc }) => (
              <div key={signal} className="border border-white/8 bg-[#050505] p-3 flex items-start gap-4">
                <div className="shrink-0 min-w-[140px]">
                  <div className="font-mono text-xs text-white">{signal}</div>
                  <div className={`font-mono text-[10px] mt-0.5 ${
                    weight === 'High' ? 'text-primary' : weight === 'Medium' ? 'text-yellow-400' : 'text-muted-foreground'
                  }`}>weight: {weight}</div>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Risk Levels</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { risk: 'LOW',      score: '≥ 75', color: 'text-primary',     border: 'border-primary/40',    desc: 'Generally safe to engage.' },
              { risk: 'MEDIUM',   score: '55–74', color: 'text-yellow-400', border: 'border-yellow-400/40', desc: 'Proceed with caution.' },
              { risk: 'HIGH',     score: '35–54', color: 'text-orange-400', border: 'border-orange-400/40', desc: 'Significant risk present.' },
              { risk: 'CRITICAL', score: '< 35',  color: 'text-red-400',    border: 'border-red-400/40',    desc: 'Avoid or extreme caution.' },
            ].map(({ risk, score, color, border, desc }) => (
              <div key={risk} className={`border ${border} bg-[#050505] p-4 text-center`}>
                <div className={`font-mono text-sm font-bold ${color} mb-1`}>{risk}</div>
                <div className="font-mono text-xs text-white/60 mb-2">{score}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-primary/20 bg-primary/5 p-4">
          <p className="font-mono text-xs text-primary/80">
            <span className="text-primary font-bold">Disclaimer:</span> The Risk Analyzer is an informational tool only.
            It does not constitute financial advice. Always do your own research before investing.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'how-it-works',
    title: 'How LIZAOS Works',
    content: (
      <div className="space-y-6 font-mono text-sm text-muted-foreground">
        <p>
          LIZAOS operates through a continuous four-phase autonomous loop, running every cycle
          without requiring human input.
        </p>
        <div className="space-y-4">
          {[
            {
              phase: '01 // SCAN',
              title: 'Market Surveillance',
              desc: 'The agent continuously monitors thousands of on-chain data points — token flows, wallet clustering, DEX liquidity shifts, and cross-chain bridge activity — to detect emerging patterns before they become visible to retail.',
            },
            {
              phase: '02 // ANALYZE',
              title: 'Neural Processing',
              desc: 'Scanned data is fed into a multi-layer scoring engine that assigns probability-weighted risk and opportunity scores, cross-referenced against historical patterns and real-time sentiment feeds.',
            },
            {
              phase: '03 // EXECUTE',
              title: 'Autonomous Action',
              desc: 'When thresholds are met, LIZAOS executes on-chain transactions via smart contracts — buy signals, exit triggers, liquidity provision, or protective hedges — with gas optimization baked in.',
            },
            {
              phase: '04 // EVOLVE',
              title: 'Adaptive Learning',
              desc: 'Each cycle feeds back into the model. Successful and failed trades both inform future scoring weights, making LIZAOS increasingly precise over time without manual retraining.',
            },
          ].map(({ phase, title, desc }) => (
            <div key={phase} className="border border-white/10 bg-[#050505] p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">{phase}</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <h4 className="font-mono text-sm text-white font-bold mb-1">{title}</h4>
              <p className="font-mono text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    content: (
      <div className="space-y-5 font-mono text-sm text-muted-foreground">
        <p>Four phases from genesis to full autonomous dominance.</p>
        <div className="space-y-4">
          {[
            {
              phase: 'PHASE 01 — GENESIS',
              period: 'Q1 2026',
              status: 'COMPLETE',
              statusColor: 'text-primary',
              items: [
                'Core agent architecture deployed',
                'LIZAOS token launch on Ethereum',
                'Risk Analyzer v1 live',
                'Community channels established',
              ],
            },
            {
              phase: 'PHASE 02 — EXPANSION',
              period: 'Q2 2026',
              status: 'ACTIVE',
              statusColor: 'text-yellow-400',
              items: [
                'Multi-chain support (Base, Arbitrum, Solana)',
                'Staking dashboard launch',
                'Governance module v1',
                'Partner integrations announced',
              ],
            },
            {
              phase: 'PHASE 03 — AUTONOMY',
              period: 'Q3 2026',
              status: 'UPCOMING',
              statusColor: 'text-muted-foreground',
              items: [
                'Fully autonomous execution module',
                'Revenue distribution to stakers begins',
                'On-chain governance voting live',
                'Advanced analytics dashboard',
              ],
            },
            {
              phase: 'PHASE 04 — DOMINANCE',
              period: 'Q4 2026',
              status: 'UPCOMING',
              statusColor: 'text-muted-foreground',
              items: [
                'Cross-chain autonomous arbitrage',
                'DAO transition — full community control',
                'Institutional-grade API access tier',
                'LIZAOS v2 neural model release',
              ],
            },
          ].map(({ phase, period, status, statusColor, items }) => (
            <div key={phase} className="border border-white/10 bg-[#050505] p-5 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-mono text-xs text-white font-bold">{phase}</div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{period}</div>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${statusColor}`}>{status}</span>
              </div>
              <ul className="space-y-1.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-primary shrink-0">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'security',
    title: 'Security & Safety',
    content: (
      <div className="space-y-6 font-mono text-sm text-muted-foreground">
        <p>
          LIZAOS is built with a security-first philosophy. Every execution path is guarded by
          multiple safety layers to protect user funds and protocol integrity.
        </p>
        <div className="space-y-3">
          {[
            {
              title: 'Smart Contract Audits',
              desc: 'All LIZAOS smart contracts are audited by independent third-party security firms before deployment. Audit reports are published publicly.',
            },
            {
              title: 'Non-Custodial Design',
              desc: 'LIZAOS never holds user funds directly. All operations are executed via user-authorized smart contract interactions — you remain in control at all times.',
            },
            {
              title: 'Circuit Breakers',
              desc: 'Automated kill-switches halt all agent activity if anomalous behavior is detected — protecting against flash crashes, oracle manipulation, or unexpected market conditions.',
            },
            {
              title: 'Timelocked Governance',
              desc: 'All governance changes are subject to a 48-hour timelock, giving the community time to review and react before any change takes effect on-chain.',
            },
            {
              title: 'Bug Bounty Program',
              desc: 'Responsible disclosure is rewarded. Critical vulnerabilities qualify for up to $50,000 LIZAOS in bounty rewards.',
            },
          ].map(({ title, desc }) => (
            <div key={title} className="border border-white/8 bg-[#050505] p-4 hover:border-primary/20 transition-colors">
              <div className="text-white text-xs font-bold mb-1">{title}</div>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div className="border border-primary/20 bg-primary/5 p-4">
          <p className="font-mono text-xs text-primary/80">
            <span className="text-primary font-bold">Important:</span> LIZAOS is experimental software.
            Never invest more than you can afford to lose. This documentation is not financial advice.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'faq',
    title: 'FAQ',
    content: (
      <div className="space-y-4 font-mono text-sm">
        {[
          {
            q: 'Do I need to be online for LIZAOS to work?',
            a: 'No. The agent operates autonomously on-chain. Once your strategy is configured and activated, it runs 24/7 without requiring your presence.',
          },
          {
            q: 'Is my wallet safe when using LIZAOS?',
            a: 'LIZAOS never holds your private keys or custody of your funds. All transactions require your wallet approval and are executed via audited smart contracts.',
          },
          {
            q: 'What chains does LIZAOS support?',
            a: 'Currently Ethereum mainnet. Multi-chain expansion to Base, Arbitrum, and Solana is scheduled for Phase 02.',
          },
          {
            q: 'How does the Risk Analyzer get its data?',
            a: 'The analyzer pulls live data from public market APIs, aggregating price, volume, liquidity, and on-chain activity into a single composite score.',
          },
          {
            q: 'Where can I buy LIZAOS tokens?',
            a: 'LIZAOS tokens are available on decentralized exchanges. Check the community channels for the latest verified liquidity pool addresses.',
          },
          {
            q: 'How do I participate in governance?',
            a: 'Hold and stake LIZAOS tokens to earn voting power. Governance proposals and voting are conducted fully on-chain via the LIZAOS DAO module, launching in Phase 03.',
          },
          {
            q: 'Who controls the LIZAOS treasury?',
            a: 'The treasury is managed by a multi-sig controlled by the founding team during early phases. Full DAO handover is planned for Phase 04.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="border border-white/8 bg-[#050505] p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-primary shrink-0 font-bold">Q</span>
              <p className="text-white text-xs font-bold">{q}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0 font-bold">A</span>
              <p className="text-muted-foreground text-xs">{a}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'community',
    title: 'Community',
    content: (
      <div className="space-y-6 font-mono text-sm text-muted-foreground">
        <p>
          LIZAOS is community-powered. Join the network of holders, traders, and builders
          shaping the future of autonomous AI trading.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { platform: 'Telegram', handle: '@LIZAOS_Official', desc: 'Main community hub. Announcements, alpha, and live discussion.' },
            { platform: 'X (Twitter)', handle: '@LIZAOS_AI', desc: 'Real-time market intel, agent updates, and governance alerts.' },
            { platform: 'Discord', handle: 'discord.gg/lizaos', desc: 'Developer forums, strategy sharing, and support channels.' },
          ].map(({ platform, handle, desc }) => (
            <div key={platform} className="border border-white/10 bg-[#050505] p-5 hover:border-primary/30 transition-colors">
              <div className="text-primary font-bold text-xs mb-1">{platform}</div>
              <div className="text-white text-xs mb-2">{handle}</div>
              <p className="text-[10px] text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Stay Updated</h4>
          <div className="space-y-2">
            {[
              'Follow the official X account for real-time agent activity reports.',
              'Join the Telegram for early access to new features and strategy modules.',
              'Participate in governance — your vote shapes the protocol.',
              'Report security issues through the bug bounty program.',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="text-primary shrink-0">&gt;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-white/10 bg-[#050505] p-5">
          <div className="font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-2">Official Contract Address</div>
          <div className="font-mono text-xs text-white break-all">Verify on official channels before interacting with any contract.</div>
          <div className="mt-2 font-mono text-[10px] text-muted-foreground">Always verify links in official LIZAOS channels. Never trust DMs.</div>
        </div>
      </div>
    ),
  },
];

export default function Docs() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const active = sections.find(s => s.id === activeId)!;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="crt-line" />
      <Navbar />

      <div className="container mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Core
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono text-xs text-primary uppercase tracking-widest">LIZAOS // DOCUMENTATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-black text-white uppercase">
            System <span className="text-primary">Docs</span>
          </h1>
          <p className="font-mono text-muted-foreground mt-3 text-sm max-w-xl">
            Complete reference for the LIZAOS autonomous AI crypto agent platform.
          </p>
        </motion.div>

        <div className="flex gap-8 items-start">
          {/* Sidebar navigation */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:flex flex-col gap-1 w-56 shrink-0 sticky top-24"
          >
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveId(section.id)}
                className={`flex items-center gap-2 text-left px-3 py-2 font-mono text-xs uppercase tracking-wide transition-all ${
                  activeId === section.id
                    ? 'text-primary border-l-2 border-primary bg-primary/5 pl-3'
                    : 'text-muted-foreground hover:text-white border-l-2 border-transparent hover:border-white/20 pl-3'
                }`}
              >
                {activeId === section.id && <ChevronRight className="w-3 h-3 shrink-0" />}
                {section.title}
              </button>
            ))}
          </motion.nav>

          {/* Mobile section picker */}
          <div className="lg:hidden w-full mb-4">
            <select
              value={activeId}
              onChange={e => setActiveId(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-primary/30 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-primary"
            >
              {sections.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>

          {/* Main content */}
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-w-0"
          >
            {/* Content card */}
            <div className="relative border border-primary/20 bg-[#050505]">
              {/* Corner decorators */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

              {/* Terminal header */}
              <div className="flex items-center gap-3 border-b border-primary/20 px-5 py-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60 border border-primary" />
                </div>
                <span className="font-mono text-xs text-primary/70 uppercase tracking-widest">
                  lizaos/{active.id}.sys
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] text-primary uppercase">live</span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white uppercase mb-6 pb-4 border-b border-white/10">
                  {active.title}
                </h2>
                {active.content}
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex justify-between mt-6 gap-4">
              {(() => {
                const idx = sections.findIndex(s => s.id === activeId);
                const prev = sections[idx - 1];
                const next = sections[idx + 1];
                return (
                  <>
                    <button
                      onClick={() => prev && setActiveId(prev.id)}
                      disabled={!prev}
                      className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-20 disabled:pointer-events-none"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {prev?.title ?? ''}
                    </button>
                    <button
                      onClick={() => next && setActiveId(next.id)}
                      disabled={!next}
                      className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-20 disabled:pointer-events-none"
                    >
                      {next?.title ?? ''}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
