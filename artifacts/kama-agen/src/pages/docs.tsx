import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';

const sections = [
  {
    id: 'overview',
    title: 'Project Overview',
    content: (
      <div className="space-y-4 font-mono text-sm text-muted-foreground leading-relaxed">
        <p>
          <span className="text-primary">LIZA OS</span> is a landing page for an autonomous AI crypto agent token. Built on a pnpm monorepo with a React 19 + Vite 7 frontend and an Express 5 API backend, backed by PostgreSQL via Drizzle ORM.
        </p>
        <ul className="space-y-2 pl-4">
          {[
            'Cinematic multi-section landing page with a cyberpunk dark aesthetic',
            'Live token analyzer powered by the CoinGecko public API',
            'Custom video player for the cinematic introduction',
            'Neural-render image gallery with fullscreen lightbox',
            'Animated stats counter, roadmap, capabilities grid, community section',
            'Express 5 API server with PostgreSQL ready to extend',
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
    id: 'structure',
    title: 'Monorepo Structure',
    content: (
      <div className="space-y-4">
        <p className="font-mono text-sm text-muted-foreground">Each package under <code className="text-primary">artifacts/</code> and <code className="text-primary">lib/</code> is its own <code className="text-primary">@workspace/&lt;name&gt;</code> npm package managed by pnpm workspaces.</p>
        <pre className="bg-[#050505] border border-white/10 p-5 rounded-none text-xs font-mono text-white/80 overflow-x-auto leading-relaxed">{`workspace/
├── artifacts/
│   ├── kama-agen/       # React + Vite frontend
│   ├── api-server/      # Express 5 API backend
│   └── mockup-sandbox/  # Design mockup preview
├── lib/
│   ├── api-spec/        # OpenAPI 3.1 spec (source of truth)
│   ├── api-zod/         # Orval-generated Zod schemas
│   ├── api-client-react/# React Query hooks + custom fetch
│   └── db/              # Drizzle ORM schema + DB client
├── scripts/
│   └── post-merge.sh    # Runs after every task-agent merge
├── attached_assets/     # Images, videos, generated media
├── pnpm-workspace.yaml  # Workspace + shared dep catalog
└── tsconfig.json        # Root TS project references`}</pre>
      </div>
    ),
  },
  {
    id: 'stack',
    title: 'Tech Stack',
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-primary/30">
              <th className="text-left py-2 pr-6 text-primary uppercase tracking-widest font-normal">Layer</th>
              <th className="text-left py-2 text-primary uppercase tracking-widest font-normal">Technology</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ['Package manager', 'pnpm 10 with workspaces'],
              ['Language', 'TypeScript 5.9 (strict)'],
              ['Runtime', 'Node.js 24'],
              ['Frontend', 'React 19 + Vite 7'],
              ['Styling', 'Tailwind CSS v4 + tw-animate-css'],
              ['Animation', 'Framer Motion 12'],
              ['UI components', 'shadcn/ui (Radix UI)'],
              ['Routing', 'Wouter 3'],
              ['Data fetching', 'TanStack React Query 5'],
              ['API backend', 'Express 5'],
              ['ORM', 'Drizzle ORM (PostgreSQL)'],
              ['Validation', 'Zod v4 + drizzle-zod'],
              ['API codegen', 'Orval (from OpenAPI spec)'],
              ['API spec', 'OpenAPI 3.1'],
              ['Build (API)', 'esbuild'],
              ['Icons', 'Lucide React'],
              ['Charts', 'Recharts'],
              ['Logging', 'Pino + pino-http'],
              ['External data', 'CoinGecko public API'],
            ].map(([layer, tech]) => (
              <tr key={layer} className="hover:bg-white/3 transition-colors">
                <td className="py-2.5 pr-6 text-muted-foreground">{layer}</td>
                <td className="py-2.5 text-white/80">{tech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'env',
    title: 'Environment & Config',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Required Environment Variables</h4>
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-primary/30">
                {['Variable', 'Managed by', 'Description'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-primary/70 uppercase tracking-wider font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['PORT', 'Replit (per workflow)', 'Port the service listens on'],
                ['BASE_PATH', 'Replit (per workflow)', 'URL prefix for the frontend (/)'],
                ['DATABASE_URL', 'Replit (runtime-managed)', 'PostgreSQL connection string'],
                ['NODE_ENV', 'Dev script', 'development or production'],
              ].map(([k, m, d]) => (
                <tr key={k} className="hover:bg-white/3 transition-colors">
                  <td className="py-2.5 pr-4 text-primary">{k}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{m}</td>
                  <td className="py-2.5 text-white/70">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 font-mono text-xs text-muted-foreground/60">
            <span className="text-primary">Note:</span> DATABASE_URL is automatically provided by Replit's built-in PostgreSQL — never set it manually.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Workflows</h4>
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-primary/30">
                {['Workflow', 'Port', 'Purpose'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-primary/70 uppercase tracking-wider font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ['artifacts/kama-agen: web', 'Auto', 'Vite dev server (frontend)'],
                ['artifacts/api-server: API Server', '8080', 'Express API (build + start)'],
              ].map(([w, p, d]) => (
                <tr key={w} className="hover:bg-white/3 transition-colors">
                  <td className="py-2.5 pr-4 text-primary">{w}</td>
                  <td className="py-2.5 pr-4 text-white/80">{p}</td>
                  <td className="py-2.5 text-muted-foreground">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'frontend',
    title: 'Frontend — kama-agen',
    content: (
      <div className="space-y-8">
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Page Sections (render order)</h4>
          <div className="space-y-3">
            {[
              { name: 'Navbar', file: 'components/layout/navbar.tsx', desc: 'Fixed sticky header, transparent → frosted-glass on scroll. Slide-in from top on load.' },
              { name: 'Hero', file: 'components/sections/hero.tsx', desc: '30 animated floating particles (Framer Motion), mascot image with corner frame, two CTA buttons.' },
              { name: 'Stats', file: 'components/sections/stats.tsx', desc: 'Counts from 0 to target using requestAnimationFrame with easeOutQuart. Triggers on scroll-into-view.' },
              { name: 'About', file: 'components/sections/about.tsx', desc: 'Two-column: narrative text + trading image with mix-blend-lighten aesthetic.' },
              { name: 'VideoShowcase', file: 'components/sections/video-showcase.tsx', desc: 'Custom HTML5 player with terminal chrome, scanline overlay, play/pause, mute controls.' },
              { name: 'Gallery', file: 'components/sections/gallery.tsx', desc: '4-column image grid. Click any image → fullscreen lightbox. Hover reveals corner brackets + scan line.' },
              { name: 'TokenAnalyzer', file: 'components/sections/token-analyzer.tsx', desc: 'Live CoinGecko search + computed risk score (0–100). Outputs LOW/MEDIUM/HIGH/CRITICAL verdict.' },
              { name: 'Capabilities', file: 'components/sections/capabilities.tsx', desc: '6-card grid of AI features. Hover reveals neon glow + corner accents.' },
              { name: 'HowItWorks', file: 'components/sections/how-it-works.tsx', desc: '4-step pipeline (Scan → Analyze → Execute → Evolve) with connecting line.' },
              { name: 'Roadmap', file: 'components/sections/roadmap.tsx', desc: '4-phase card grid (Genesis Q1 → Dominance Q4 2026). Cards glow on hover.' },
              { name: 'Community', file: 'components/sections/community.tsx', desc: 'Social links (Telegram, X, Discord) + contract address with one-click copy.' },
              { name: 'Footer', file: 'components/sections/footer.tsx', desc: 'Logo, nav links, disclaimer, copyright.' },
            ].map(({ name, file, desc }) => (
              <div key={name} className="border border-white/8 bg-[#050505] p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <span className="font-mono text-sm text-white font-bold">{name}</span>
                  <span className="font-mono text-[10px] text-primary/60 shrink-0">{file}</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Path Aliases</h4>
          <pre className="bg-[#050505] border border-white/10 p-4 text-xs font-mono text-white/80 overflow-x-auto">{`@        → artifacts/kama-agen/src/
@assets  → attached_assets/

// Usage:
import { cn }       from '@/lib/utils';
import heroImg      from '@assets/generated_images/kama-trading.jpg';
import kamaVideo    from '@assets/generated_videos/kama-intro.mp4';`}</pre>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Design Tokens</h4>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[
              { token: 'font-mono', value: 'Space Mono', usage: 'Body, labels, terminal UI' },
              { token: 'font-display', value: 'Orbitron', usage: 'Headings, section titles' },
              { token: 'font-sans', value: 'Inter', usage: 'General prose' },
              { token: 'text-primary', value: '#CCFF00', usage: 'Neon green accent' },
              { token: 'bg-background', value: 'hsl(0 0% 2%)', usage: 'Near-black base' },
              { token: 'text-muted-foreground', value: 'hsl(0 0% 45%)', usage: 'Subdued text' },
            ].map(({ token, value, usage }) => (
              <div key={token} className="border border-white/8 bg-[#050505] p-3">
                <div className="text-primary mb-0.5">{token}</div>
                <div className="text-white/70 mb-0.5">{value}</div>
                <div className="text-muted-foreground text-[10px]">{usage}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'token-analyzer',
    title: 'Token Analyzer Deep Dive',
    content: (
      <div className="space-y-6">
        <p className="font-mono text-sm text-muted-foreground">The most complex component. Calls the CoinGecko public API to compute a 0–100 risk score for any token.</p>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">CoinGecko API Calls</h4>
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-primary/30">
                {['Step', 'Endpoint', 'Purpose'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-primary/70 uppercase tracking-wider font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-2.5 pr-4 text-white/80">Search</td>
                <td className="py-2.5 pr-4 text-primary break-all">/api/v3/search?query=&#123;q&#125;</td>
                <td className="py-2.5 text-muted-foreground">Autocomplete dropdown</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 text-white/80">Fetch</td>
                <td className="py-2.5 pr-4 text-primary break-all">/api/v3/coins/&#123;id&#125;?community_data=true&developer_data=true</td>
                <td className="py-2.5 text-muted-foreground">Full data for analysis</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Score Computation</h4>
          <pre className="bg-[#050505] border border-white/10 p-5 text-xs font-mono text-white/80 overflow-x-auto leading-relaxed">{`function computeScore(d: CoinData) {
  let score = 50; // base

  // 1. Market cap rank (biggest trust signal)
  const rank = d.market_cap_rank ?? 9999;
  if (rank <= 10)   score += 30;
  else if (rank <= 50)  score += 22;
  else if (rank <= 100) score += 15;
  else if (rank <= 300) score += 8;
  else if (rank <= 500) score += 2;
  else score -= 8;

  // 2. Liquidity — volume/mcap ratio
  const liqRatio = mcap > 0 ? volume / mcap : 0;
  if (liqRatio > 0.3)       score += 10;
  else if (liqRatio > 0.1)  score += 6;
  else if (liqRatio < 0.01) score -= 8;

  // 3. 24h volatility
  if (Math.abs(ch24) > 50)  score -= 15;
  else if (Math.abs(ch24) > 25) score -= 8;

  // 4. ATH drawdown, supply ratio,
  //    community size, developer activity...

  score = Math.max(0, Math.min(100, score));
  const risk =
    score >= 75 ? 'LOW'      :
    score >= 55 ? 'MEDIUM'   :
    score >= 35 ? 'HIGH'     : 'CRITICAL';
  return { score, risk };
}`}</pre>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Risk Levels</h4>
          <div className="grid grid-cols-4 gap-3">
            {[
              { risk: 'LOW',      score: '≥ 75', color: 'text-primary',     border: 'border-primary/40' },
              { risk: 'MEDIUM',   score: '55–74', color: 'text-yellow-400', border: 'border-yellow-400/40' },
              { risk: 'HIGH',     score: '35–54', color: 'text-orange-400', border: 'border-orange-400/40' },
              { risk: 'CRITICAL', score: '< 35',  color: 'text-red-400',    border: 'border-red-400/40' },
            ].map(({ risk, score, color, border }) => (
              <div key={risk} className={`border ${border} bg-[#050505] p-3 text-center`}>
                <div className={`font-mono text-sm font-bold ${color} mb-1`}>{risk}</div>
                <div className="font-mono text-xs text-muted-foreground">{score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'api',
    title: 'API Server',
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Available Endpoints</h4>
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-primary/30">
                {['Method', 'Path', 'Response', 'Description'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-primary/70 uppercase tracking-wider font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2.5 pr-4 text-primary">GET</td>
                <td className="py-2.5 pr-4 text-white/80">/api/healthz</td>
                <td className="py-2.5 pr-4 text-white/60">&#123; status: "ok" &#125;</td>
                <td className="py-2.5 text-muted-foreground">Health check</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Health Route</h4>
          <pre className="bg-[#050505] border border-white/10 p-4 text-xs font-mono text-white/80 overflow-x-auto leading-relaxed">{`// artifacts/api-server/src/routes/health.ts
import { HealthCheckResponse } from "@workspace/api-zod";

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});`}</pre>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">App Setup</h4>
          <pre className="bg-[#050505] border border-white/10 p-4 text-xs font-mono text-white/80 overflow-x-auto leading-relaxed">{`// artifacts/api-server/src/app.ts
app.use(pinoHttp({ logger })); // structured request logging
app.use(cors());
app.use(express.json());
app.use("/api", router);       // all routes under /api`}</pre>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Adding a New Endpoint</h4>
          <div className="space-y-2 font-mono text-xs text-muted-foreground">
            {[
              '1. Add path + schema to lib/api-spec/openapi.yaml',
              '2. Run: pnpm --filter @workspace/api-spec run codegen',
              '3. Implement the route in artifacts/api-server/src/routes/',
              '4. Register it in artifacts/api-server/src/routes/index.ts',
              '5. The React Query hook is auto-generated — do not edit it',
            ].map((step, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-primary flex-shrink-0">&gt;</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'database',
    title: 'Database',
    content: (
      <div className="space-y-6">
        <p className="font-mono text-sm text-muted-foreground">Uses Replit's built-in PostgreSQL. The schema is currently empty and ready to extend.</p>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">DB Client</h4>
          <pre className="bg-[#050505] border border-white/10 p-4 text-xs font-mono text-white/80 overflow-x-auto leading-relaxed">{`// lib/db/src/index.ts
import { drizzle } from "drizzle-orm/node-postgres";

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db   = drizzle(pool, { schema });
export * from "./schema";`}</pre>
        </div>
        <div>
          <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Adding a Table</h4>
          <pre className="bg-[#050505] border border-white/10 p-4 text-xs font-mono text-white/80 overflow-x-auto leading-relaxed">{`// lib/db/src/schema/tokens.ts
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const tokensTable = pgTable("tokens", {
  id:     serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name:   text("name").notNull(),
});

export const insertTokenSchema =
  createInsertSchema(tokensTable).omit({ id: true });
export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokensTable.$inferSelect;`}</pre>
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">Then push: <code className="text-primary">pnpm --filter @workspace/db run push</code></p>
        </div>
        <div className="border border-primary/20 bg-primary/5 p-4">
          <p className="font-mono text-xs text-primary/80">
            <span className="text-primary font-bold">Production note:</span> Schema migrations in production are handled automatically by Replit's Publish flow. Never write custom migration scripts.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'commands',
    title: 'Commands',
    content: (
      <div className="space-y-4">
        {[
          {
            label: 'Install dependencies',
            cmd: 'pnpm install',
          },
          {
            label: 'Start frontend (Vite dev server)',
            cmd: 'pnpm --filter @workspace/kama-agen run dev',
          },
          {
            label: 'Start API server',
            cmd: 'pnpm --filter @workspace/api-server run dev',
          },
          {
            label: 'Push DB schema changes',
            cmd: 'pnpm --filter @workspace/db run push',
          },
          {
            label: 'Regenerate API hooks from OpenAPI spec',
            cmd: 'pnpm --filter @workspace/api-spec run codegen',
          },
          {
            label: 'Full TypeScript typecheck',
            cmd: 'pnpm run typecheck',
          },
          {
            label: 'Build all packages',
            cmd: 'pnpm run build',
          },
        ].map(({ label, cmd }) => (
          <div key={label}>
            <p className="font-mono text-xs text-muted-foreground mb-1.5">{label}</p>
            <pre className="bg-[#050505] border border-white/10 px-4 py-3 text-xs font-mono text-primary overflow-x-auto">{cmd}</pre>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'assets',
    title: 'Assets',
    content: (
      <div className="space-y-6">
        <p className="font-mono text-sm text-muted-foreground">All media lives in <code className="text-primary">attached_assets/</code> and is imported via the <code className="text-primary">@assets</code> alias.</p>
        <table className="w-full text-xs font-mono border-collapse">
          <thead>
            <tr className="border-b border-primary/30">
              {['File', 'Used in'].map(h => (
                <th key={h} className="text-left py-2 pr-4 text-primary/70 uppercase tracking-wider font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ['-i3mn72_1785058119232.jpg', 'Hero (mascot), Gallery (original)'],
              ['generated_images/kama-trading.jpg', 'About section, Gallery'],
              ['generated_images/kama-fullbody.jpg', 'Gallery'],
              ['generated_images/kama-chart.jpg', 'Gallery'],
              ['generated_videos/kama-intro.mp4', 'VideoShowcase (MEET LIZA)'],
            ].map(([file, usage]) => (
              <tr key={file} className="hover:bg-white/3 transition-colors">
                <td className="py-2.5 pr-4 text-primary break-all">{file}</td>
                <td className="py-2.5 text-muted-foreground">{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border border-white/10 bg-[#050505] p-4">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">Updating the video:</span> Replace <code className="text-primary">attached_assets/generated_videos/kama-intro.mp4</code> — no code change needed.
          </p>
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
            <span className="font-mono text-xs text-primary uppercase tracking-widest">LIZA_OS // DOCUMENTATION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-black text-white uppercase">
            System <span className="text-primary">Docs</span>
          </h1>
          <p className="font-mono text-muted-foreground mt-3 text-sm max-w-xl">
            Complete technical reference for the LIZA OS autonomous AI crypto agent platform.
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
                  docs/{active.id}.md
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
                    {prev ? (
                      <button onClick={() => setActiveId(prev.id)} className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors border border-white/10 hover:border-primary/40 px-4 py-2">
                        <ArrowLeft className="w-3.5 h-3.5" /> {prev.title}
                      </button>
                    ) : <div />}
                    {next ? (
                      <button onClick={() => setActiveId(next.id)} className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors border border-white/10 hover:border-primary/40 px-4 py-2 ml-auto">
                        {next.title} <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : <div />}
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
