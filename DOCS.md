# LIZA OS — Project Documentation

> Complete technical reference for the LIZA OS autonomous AI crypto agent landing page and API stack.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Monorepo Structure](#2-monorepo-structure)
3. [Tech Stack](#3-tech-stack)
4. [Environment & Configuration](#4-environment--configuration)
5. [Frontend — `artifacts/kama-agen`](#5-frontend--artifactskama-agen)
   - 5.1 [Entry Points](#51-entry-points)
   - 5.2 [Routing](#52-routing)
   - 5.3 [Design System & CSS](#53-design-system--css)
   - 5.4 [Layout Components](#54-layout-components)
   - 5.5 [Page Sections (in render order)](#55-page-sections-in-render-order)
   - 5.6 [Hooks](#56-hooks)
   - 5.7 [Utilities](#57-utilities)
   - 5.8 [Assets](#58-assets)
   - 5.9 [Vite Configuration](#59-vite-configuration)
6. [API Server — `artifacts/api-server`](#6-api-server--artifactsapi-server)
   - 6.1 [Entry Point & Server Bootstrap](#61-entry-point--server-bootstrap)
   - 6.2 [Express App Setup](#62-express-app-setup)
   - 6.3 [Routes](#63-routes)
   - 6.4 [Logger](#64-logger)
   - 6.5 [Build System](#65-build-system)
7. [Shared Libraries](#7-shared-libraries)
   - 7.1 [OpenAPI Spec — `lib/api-spec`](#71-openapi-spec--libapispec)
   - 7.2 [Zod Schemas — `lib/api-zod`](#72-zod-schemas--libapizod)
   - 7.3 [React Query Client — `lib/api-client-react`](#73-react-query-client--libapiclientreact)
   - 7.4 [Database — `lib/db`](#74-database--libdb)
8. [Scripts](#8-scripts)
9. [Workspace Configuration](#9-workspace-configuration)
10. [Running the Project](#10-running-the-project)
11. [Data Flow Diagram](#11-data-flow-diagram)
12. [Extending the Project](#12-extending-the-project)

---

## 1. Project Overview

**LIZA OS** is a landing page for an autonomous AI crypto agent token. It features:

- A cinematic multi-section landing page with a cyberpunk dark aesthetic
- A **live token analyzer** powered by the CoinGecko public API — searches any coin and returns a computed risk score, liquidity analysis, sentiment data, and AI-generated verdict
- A custom video player for the cinematic introduction
- A neural-render image gallery with lightbox
- An animated stats counter, roadmap, capabilities grid, and community section
- A backend Express 5 API server with PostgreSQL (via Drizzle ORM) ready to be extended

---

## 2. Monorepo Structure

```
workspace/
├── artifacts/
│   ├── kama-agen/          # React + Vite frontend (the landing page)
│   ├── api-server/         # Express 5 API backend
│   └── mockup-sandbox/     # Design mockup preview server
├── lib/
│   ├── api-spec/           # OpenAPI 3.1 spec (source of truth for API contracts)
│   ├── api-zod/            # Orval-generated Zod schemas from the spec
│   ├── api-client-react/   # Orval-generated React Query hooks + custom fetch
│   └── db/                 # Drizzle ORM schema + database client
├── scripts/
│   └── post-merge.sh       # Runs after every task agent merge
├── attached_assets/        # Images, videos, and generated media
├── package.json            # Workspace root
├── pnpm-workspace.yaml     # pnpm workspace + shared dependency catalog
├── tsconfig.base.json      # Base TypeScript config
└── tsconfig.json           # Root TypeScript project references
```

Each package under `artifacts/` and `lib/` is its own `@workspace/<name>` npm package, managed by pnpm workspaces.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Package manager | pnpm 10 with workspaces |
| Language | TypeScript 5.9 (strict) |
| Runtime | Node.js 24 |
| Frontend framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Animation | Framer Motion 12 |
| UI components | shadcn/ui (Radix UI primitives) |
| Routing (frontend) | Wouter 3 |
| Data fetching | TanStack React Query 5 |
| API backend | Express 5 |
| ORM | Drizzle ORM (PostgreSQL) |
| Validation | Zod v4 + drizzle-zod |
| API codegen | Orval (from OpenAPI spec) |
| API spec | OpenAPI 3.1 |
| Build (API) | esbuild (CJS bundle) |
| Icons | Lucide React |
| Charts | Recharts |
| Logging | Pino + pino-http |
| External data | CoinGecko public API |

---

## 4. Environment & Configuration

### Required Environment Variables

| Variable | Managed by | Description |
|---|---|---|
| `PORT` | Replit (injected per workflow) | Port the service listens on |
| `BASE_PATH` | Replit (injected per workflow) | URL prefix for the frontend (`/`) |
| `DATABASE_URL` | Replit (runtime-managed) | PostgreSQL connection string |
| `NODE_ENV` | Set in dev script | `development` or `production` |

> **Note:** `DATABASE_URL` is automatically provided by Replit's built-in PostgreSQL — never set it manually.

### Workflows

| Workflow name | Command | Port | Purpose |
|---|---|---|---|
| `artifacts/kama-agen: web` | `pnpm --filter @workspace/kama-agen run dev` | Auto-assigned | Vite dev server for frontend |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` | 8080 | Express API (build + start) |

---

## 5. Frontend — `artifacts/kama-agen`

### 5.1 Entry Points

**`src/main.tsx`** — mounts the React app:

```tsx
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
```

**`src/App.tsx`** — sets up providers and routing:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

> `BASE_URL` is injected by Vite from the `base` config (which reads `BASE_PATH` env var). This ensures all routes are correctly prefixed in Replit's path-based routing system.

---

### 5.2 Routing

Two routes — `src/pages/home.tsx` (main landing) and `src/pages/not-found.tsx` (404).

**`src/pages/home.tsx`** — assembles all sections in order:

```tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Global CRT scanline effect overlay */}
      <div className="crt-line" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <VideoShowcase />
        <Gallery />
        <TokenAnalyzer />
        <Capabilities />
        <HowItWorks />
        <Roadmap />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
```

**`src/pages/not-found.tsx`** — 404 page:

```tsx
export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-mono relative overflow-hidden">
      <div className="crt-line" />
      <div className="text-center z-10 p-8 border border-primary/20 bg-black/50 backdrop-blur-md">
        <AlertCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold text-white mb-2 uppercase">
          404 <span className="text-primary">Error</span>
        </h1>
        <p className="text-muted-foreground mb-8">System critical failure. Route not found.</p>
        <Link href="/" className="inline-block border border-primary text-primary hover:bg-primary hover:text-black px-6 py-2 uppercase tracking-widest transition-colors">
          Return to Core
        </Link>
      </div>
    </div>
  );
}
```

---

### 5.3 Design System & CSS

**`src/index.css`** — global styles and theme tokens.

```css
/* Google Fonts loaded: Orbitron, Space Mono, Inter, Rajdhani */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&family=Rajdhani:wght@500;600;700&display=swap');

@import 'tailwindcss';
@import 'tw-animate-css';
@plugin "@tailwindcss/typography";

/* Custom Tailwind v4 theme */
@theme inline {
  --color-primary: hsl(var(--primary));   /* Neon green: hsl(84 100% 60%) */
  --font-mono: var(--app-font-mono);      /* Space Mono */
  --font-display: var(--app-font-display); /* Orbitron */
}

/* Cyberpunk dark theme defaults */
:root {
  --background: 0 0% 2%;   /* near-black */
  --foreground: 0 0% 95%;
  --primary: 84 100% 60%;   /* #CCFF00 neon green */
}
```

**Font roles:**

| Token | Font | Usage |
|---|---|---|
| `font-mono` | Space Mono | Body text, labels, metadata, terminal UI |
| `font-display` | Orbitron | Headings, section titles, bold display |
| `font-sans` | Inter | General prose |
| (inline style) | Rajdhani | Hero `<h1>` title only |

**Key CSS utilities used across components:**

| Class | Effect |
|---|---|
| `.crt-line` | Full-screen CRT scanline overlay animation |
| `.glitch-effect` | CSS text glitch on `data-text` attribute |
| `.glow-text` | `text-shadow` neon glow in `--color-primary` |
| `.bg-grid` | Subtle dot-grid background pattern |
| `shadow-[0_0_Xpx_rgba(0,255,65,Y)]` | Tailwind arbitrary neon glow shadow |

---

### 5.4 Layout Components

#### `src/components/layout/navbar.tsx`

Sticky fixed navbar that switches from transparent to frosted-glass on scroll.

```tsx
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      {/* Logo → LIZA OS */}
      {/* Nav links: _About, _Analyzer, _Core, _Roadmap */}
      {/* CTA button: INITIALIZE */}
    </motion.header>
  );
}
```

**Key behaviors:**
- Logo links to `/`
- Nav anchors use `href="#about"`, `href="#analyzer"`, `href="#capabilities"`, `href="#roadmap"`
- INITIALIZE button links to `#join`
- Entrance animation: slides down from `y: -100`

---

### 5.5 Page Sections (in render order)

#### `Hero` — `src/components/sections/hero.tsx`

Full-viewport hero with animated particles, mascot image, and CTA buttons.

```tsx
export function Hero() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generates 30 random floating particles
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,  // % from left
      y: Math.random() * 100,  // % from top
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2,
      size: 1 + Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  // Each particle animates: y: ["0%", "-100%", "0%"], opacity: [0, 1, 0]
  // Repeat: Infinity, ease: "linear"
}
```

**Content:**
- Badge: `SYSTEM ONLINE // V2.4.0`
- H1: `LIZA OS` with glitch effect on "LIZA"
- Subtitle: description text
- CTA 1: `BUY TOKEN →` → scrolls to `#analyzer`
- CTA 2: `READ DOCS` → scrolls to `#about`
- Stats bar: `Ethereum / NATIVE CHAIN` | `< 50ms / EXECUTION LATENCY`
- Right column: mascot image (`@assets/-i3mn72_1785058119232.jpg`) with decorative corner frame

---

#### `Stats` — `src/components/sections/stats.tsx`

Animated counting numbers that trigger when scrolled into view.

**`Counter` internal component** — counts from 0 to target using `requestAnimationFrame` with `easeOutQuart`:

```tsx
function Counter({ from = 0, to, duration = 2, formatter }) {
  const [value, setValue] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setValue(from + (to - from) * easeProgress);
      if (progress < 1) requestAnimationFrame(updateCounter);
      else setValue(to);
    };
    requestAnimationFrame(updateCounter);
  }, [inView]);
}
```

**Stats displayed:**

| Label | Value | Format |
|---|---|---|
| Trades Executed | 847,293 | `.toLocaleString()` |
| Win Rate | 73.4% | `toFixed(1)%` |
| Total Volume | $124M | `$Xm` |
| Holders | 12,847 | `.toLocaleString()` |
| Active Strategies | 47 | integer |

---

#### `About` — `src/components/sections/about.tsx`

Two-column layout: narrative text on left, trading image on right.

```tsx
export function About() {
  // Uses @assets/generated_images/kama-trading.jpg
  // Section id="about"
  // Features:
  //   - Framer Motion slide-in from left (text) and scale-up (image)
  //   - Image uses mix-blend-lighten for neon aesthetic
  //   - Decorative corner frame border
  //   - Status overlay badge "Analysis Mode Active"
  //   - Quote blockquote: "The market is chaos. I am the algorithm..."
}
```

---

#### `VideoShowcase` — `src/components/sections/video-showcase.tsx`

Custom HTML5 video player with terminal-style UI chrome.

```tsx
import kamaVideo from '@assets/generated_videos/kama-intro.mp4';

export function VideoShowcase() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);  // starts muted

  const togglePlay = () => {
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // Renders:
  //   - Terminal header bar: "liza_agen_cinematic_v1.mp4" + LIVE indicator
  //   - <video> with loop, playsInline, muted by default
  //   - Green tint overlay (bg-primary/5 mix-blend-overlay)
  //   - Scanline effect overlay (repeating-linear-gradient)
  //   - Center play button (shown when paused)
  //   - Bottom controls bar on hover (Play/Pause, progress bar, Mute)
  //   - Corner bracket decorators
}
```

> **To update the video:** replace `attached_assets/generated_videos/kama-intro.mp4` with any `.mp4` file.

---

#### `Gallery` — `src/components/sections/gallery.tsx`

4-column image grid with hover effects and a fullscreen lightbox.

```tsx
const photos = [
  { src: kamaOriginal, label: 'LIZA // SYSTEM BOOT',  sub: 'Original Neural Render',        tag: 'IDENTITY' },
  { src: kamaTrading,  label: 'LIZA // TRADE EXEC',   sub: 'Active Market Analysis',         tag: 'ANALYSIS' },
  { src: kamaFullbody, label: 'LIZA // FULL DEPLOY',  sub: 'Tactical Deployment Mode',       tag: 'DEPLOY'   },
  { src: kamaChart,    label: 'LIZA // CHART_SCAN',   sub: 'Real-Time Signal Processing',    tag: 'SIGNAL'   },
];

export function Gallery() {
  const [active, setActive] = useState(null); // index of lightbox-open photo

  // Each card:
  //   - aspect-[3/4] image with mix-blend-luminosity → mix-blend-normal on hover
  //   - Corner bracket decorators animate in on hover
  //   - Animated bottom scan line on hover
  //   - Tag badge (top-right)
  //   - onClick → opens lightbox (setActive(i))

  // Lightbox:
  //   - Fixed full-screen overlay
  //   - Terminal header bar + enlarged image
  //   - [CLOSE_X] button
}
```

**Assets used:**

| Variable | File |
|---|---|
| `kamaOriginal` | `attached_assets/-i3mn72_1785058119232.jpg` |
| `kamaTrading` | `attached_assets/generated_images/kama-trading.jpg` |
| `kamaFullbody` | `attached_assets/generated_images/kama-fullbody.jpg` |
| `kamaChart` | `attached_assets/generated_images/kama-chart.jpg` |

---

#### `TokenAnalyzer` — `src/components/sections/token-analyzer.tsx`

The most complex component. Live crypto risk analysis engine using the CoinGecko public API.

**Key types:**

```ts
interface SearchCoin {
  id: string; name: string; symbol: string;
  thumb: string; market_cap_rank: number | null;
}

interface CoinData {
  id: string; name: string; symbol: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    price_change_percentage_24h: number | null;
    price_change_percentage_7d: number | null;
    circulating_supply: number | null;
    total_supply: number | null;
    ath: { usd: number };
    ath_change_percentage: { usd: number };
  };
  community_data: { twitter_followers: number | null; reddit_subscribers: number | null };
  developer_data: { stars: number | null; commit_count_4_weeks: number | null };
}

interface AnalysisResult {
  score: number;                          // 0–100
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  metrics: { label: string; value: string; status: 'good' | 'warn' | 'bad' }[];
  verdict: string;                        // AI-generated text verdict
  // ... price, market cap, volume, sentiment, etc.
}
```

**Score computation (`computeScore`):**

```ts
function computeScore(d: CoinData): { score: number; risk: AnalysisResult['risk'] } {
  let score = 50; // base
  const md = d.market_data;

  // 1. Market cap rank (biggest trust signal)
  const rank = d.market_cap_rank ?? 9999;
  if (rank <= 10)   score += 30;
  else if (rank <= 50)  score += 22;
  else if (rank <= 100) score += 15;
  else if (rank <= 300) score += 8;
  else if (rank <= 500) score += 2;
  else score -= 8;

  // 2. Liquidity (volume/mcap ratio)
  const liqRatio = mcap > 0 ? volume / mcap : 0;
  if (liqRatio > 0.3)       score += 10;
  else if (liqRatio > 0.1)  score += 6;
  else if (liqRatio > 0.05) score += 2;
  else if (liqRatio < 0.01) score -= 8;

  // 3. 24h volatility
  if (Math.abs(ch24) > 50) score -= 15;
  else if (Math.abs(ch24) > 25) score -= 8;
  else if (Math.abs(ch24) > 10) score -= 3;

  // 4. ATH drawdown (deep drawdown = at-risk/dead project)
  // 5. Supply ratio, community size, developer activity
  // ...

  score = Math.max(0, Math.min(100, score));
  const risk = score >= 75 ? 'LOW' : score >= 55 ? 'MEDIUM' : score >= 35 ? 'HIGH' : 'CRITICAL';
  return { score, risk };
}
```

**CoinGecko API calls made:**

| Step | Endpoint | Purpose |
|---|---|---|
| Search | `https://api.coingecko.com/api/v3/search?query={q}` | Autocomplete dropdown |
| Fetch | `https://api.coingecko.com/api/v3/coins/{id}?localization=false&tickers=false&community_data=true&developer_data=true` | Full coin data for analysis |

**Risk color map:**

| Risk | Score | Color |
|---|---|---|
| LOW | ≥ 75 | Green (`text-primary`) |
| MEDIUM | 55–74 | Yellow (`text-yellow-400`) |
| HIGH | 35–54 | Orange (`text-orange-400`) |
| CRITICAL | < 35 | Red (`text-red-400`) |

**Format helpers:**

```ts
const fmt    = (n) => n >= 1e12 ? `$${(n/1e12).toFixed(2)}T` : /* B, M, K, raw */
const fmtNum = (n) => n >= 1e9  ? `${(n/1e9).toFixed(1)}B`  : /* M, K, raw */
const fmtPrice = (n) => n >= 1  ? `$${n.toLocaleString(...)}` : /* 4 or 6 decimal places, or exponential */
```

---

#### `Capabilities` — `src/components/sections/capabilities.tsx`

3-column grid of 6 feature cards.

```tsx
const capabilities = [
  { icon: Activity,    title: "On-Chain Autonomous Trading",    description: "..." },
  { icon: BrainCircuit,title: "Real-Time Sentiment Analysis",   description: "..." },
  { icon: Layers,      title: "DeFi Protocol Integration",      description: "..." },
  { icon: ShieldAlert, title: "Risk Management AI",             description: "..." },
  { icon: Network,     title: "Multi-Chain Intelligence",       description: "..." },
  { icon: Cpu,         title: "Self-Learning Market Model",     description: "..." },
];
// Each card: hover reveals bg-primary/5 tint, corner accents, icon glow effect
```

---

#### `HowItWorks` — `src/components/sections/how-it-works.tsx`

4-step execution pipeline with connecting line.

```tsx
const steps = [
  { num: "01", title: "Scan",    desc: "AI ingests global market data" },
  { num: "02", title: "Analyze", desc: "Identifies high-probability setups" },
  { num: "03", title: "Execute", desc: "Deploys capital via smart contracts" },
  { num: "04", title: "Evolve",  desc: "Updates neural weights based on outcome" },
];
// Horizontal connecting line: gradient from transparent → primary → transparent
// Each step: circular badge with number, stagger animation on scroll
```

---

#### `Roadmap` — `src/components/sections/roadmap.tsx`

4-phase timeline rendered as a horizontal card grid.

```tsx
const phases = [
  {
    phase: "Phase 1",
    title: "GENESIS (Q1 2026)",
    items: [
      "Token launch & initial DEX listing",
      "Core LIZA AI model deployment",
      "Live token analyzer engine integration",
      "Community & early node bootstrap",
    ],
  },
  { phase: "Phase 2", title: "AWAKENING (Q2 2026)", items: [...] },
  { phase: "Phase 3", title: "EVOLUTION (Q3 2026)",  items: [...] },
  { phase: "Phase 4", title: "DOMINANCE (Q4 2026)",  items: [...] },
];
// Cards: hover shows border-primary glow, corner brackets animate, dot pulses
```

---

#### `Community` — `src/components/sections/community.tsx`

Social links + contract address copy utility.

```tsx
// Social buttons: Twitter/X, Telegram, Discord
// Contract address display with one-click copy to clipboard
// Uses navigator.clipboard.writeText() → shows "[COPIED]" feedback
```

---

#### `Footer` — `src/components/sections/footer.tsx`

```tsx
export function Footer() {
  // Logo + nav links: Docs, Audit, Github, Terms
  // Disclaimer text
  // Copyright: © {new Date().getFullYear()} LIZA OS NODE
}
```

---

### 5.6 Hooks

#### `src/hooks/use-mobile.tsx`

Detects mobile viewport using `matchMedia`. Breakpoint: `768px`.

```tsx
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
```

#### `src/hooks/use-toast.ts`

Global toast notification state via a singleton reducer pattern (no Context required).

```ts
// Max 1 toast shown at a time (TOAST_LIMIT = 1)
// Auto-dismissal via TOAST_REMOVE_DELAY = 1,000,000ms (effectively manual)

// Usage:
import { useToast, toast } from '@/hooks/use-toast';

// Imperative (outside components):
toast({ title: "Copied!", description: "Contract address copied." });

// Inside components:
const { toast } = useToast();
toast({ title: "Error", variant: "destructive" });
```

**Reducer actions:** `ADD_TOAST` | `UPDATE_TOAST` | `DISMISS_TOAST` | `REMOVE_TOAST`

---

### 5.7 Utilities

#### `src/lib/utils.ts`

```ts
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// Merges Tailwind classes with conflict resolution
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage:
className={cn("base-class", condition && "conditional-class", "override-class")}
```

---

### 5.8 Assets

All assets are imported via the `@assets` alias which points to `attached_assets/`.

```ts
// vite.config.ts alias:
'@assets': path.resolve(import.meta.dirname, '..', '..', 'attached_assets')

// Usage in components:
import kamaVideo from '@assets/generated_videos/kama-intro.mp4';
import mascotImg  from '@assets/-i3mn72_1785058119232.jpg';
```

**Asset inventory:**

| File | Used in |
|---|---|
| `attached_assets/-i3mn72_1785058119232.jpg` | Hero (mascot), Gallery (original) |
| `attached_assets/generated_images/kama-trading.jpg` | About, Gallery |
| `attached_assets/generated_images/kama-fullbody.jpg` | Gallery |
| `attached_assets/generated_images/kama-chart.jpg` | Gallery |
| `attached_assets/generated_videos/kama-intro.mp4` | VideoShowcase |

> **Updating the video:** replace `attached_assets/generated_videos/kama-intro.mp4` — no code change needed.

---

### 5.9 Vite Configuration

**`artifacts/kama-agen/vite.config.ts`**

```ts
const port     = Number(process.env.PORT);       // required — throws if missing
const basePath = process.env.BASE_PATH;          // required — throws if missing

export default defineConfig({
  base: basePath,  // e.g. "/" — sets import.meta.env.BASE_URL
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    // In dev on Replit only:
    cartographer({ root: path.resolve(import.meta.dirname, '..') }),
    devBanner(),
  ],
  resolve: {
    alias: {
      '@':       path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(import.meta.dirname, '..', '..', 'attached_assets'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
  },
  server: {
    port, strictPort: true, host: '0.0.0.0',
    allowedHosts: true,
    fs: { strict: true },
  },
});
```

---

## 6. API Server — `artifacts/api-server`

### 6.1 Entry Point & Server Bootstrap

**`src/index.ts`**

```ts
import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];
if (!rawPort) throw new Error("PORT environment variable is required but was not provided.");

const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);

app.listen(port, (err) => {
  if (err) { logger.error({ err }, "Error listening on port"); process.exit(1); }
  logger.info({ port }, "Server listening");
});
```

---

### 6.2 Express App Setup

**`src/app.ts`**

```ts
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(pinoHttp({
  logger,
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url?.split("?")[0] }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);  // all routes live under /api

export default app;
```

---

### 6.3 Routes

**`src/routes/index.ts`** — route aggregator:

```ts
import { Router, type IRouter } from "express";
import healthRouter from "./health";

const router: IRouter = Router();
router.use(healthRouter);
export default router;
```

**`src/routes/health.ts`** — health check endpoint:

```ts
import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
```

**Available endpoints:**

| Method | Path | Response | Description |
|---|---|---|---|
| `GET` | `/api/healthz` | `{ "status": "ok" }` | Health check |

> **To add a new route:** create `src/routes/my-feature.ts`, import it in `src/routes/index.ts`, and add the corresponding OpenAPI definition in `lib/api-spec/openapi.yaml`, then run codegen.

---

### 6.4 Logger

**`src/lib/logger.ts`** — structured JSON logger via Pino:

```ts
import pino from "pino";
const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
  ],
  // Pretty-print in dev, raw JSON in production
  ...(isProduction ? {} : {
    transport: { target: "pino-pretty", options: { colorize: true } },
  }),
});
```

---

### 6.5 Build System

**`src/build.mjs`** — esbuild-based bundler for production:

The API server is compiled to a single `dist/index.mjs` CJS bundle using esbuild with `esbuild-plugin-pino` for pino's worker threads. Production startup runs the pre-built bundle directly (`node --enable-source-maps ./dist/index.mjs`) for faster cold starts.

**`package.json` scripts:**

```json
{
  "dev":   "export NODE_ENV=development && pnpm run build && pnpm run start",
  "build": "node ./build.mjs",
  "start": "node --enable-source-maps ./dist/index.mjs"
}
```

---

## 7. Shared Libraries

### 7.1 OpenAPI Spec — `lib/api-spec`

**`openapi.yaml`** — the single source of truth for all API contracts:

```yaml
openapi: 3.1.0
info:
  title: Api         # DO NOT change — breaks generated import paths
  version: 0.1.0
servers:
  - url: /api
paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"
components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status: { type: string }
      required: [status]
```

**To add a new endpoint:**
1. Add the path + schema to `openapi.yaml`
2. Run: `pnpm --filter @workspace/api-spec run codegen`
3. Implement the route in `artifacts/api-server/src/routes/`
4. The React Query hook and Zod schema are auto-generated — do not edit them manually

---

### 7.2 Zod Schemas — `lib/api-zod`

Auto-generated by Orval from the OpenAPI spec. **Do not edit manually.**

```ts
// lib/api-zod/src/generated/types/healthStatus.ts
export interface HealthStatus {
  status: string;
}

// lib/api-zod/src/index.ts — re-exports everything
export * from "./generated/api";
```

**Usage in the API server:**

```ts
import { HealthCheckResponse } from "@workspace/api-zod";
const data = HealthCheckResponse.parse({ status: "ok" }); // validates at runtime
```

---

### 7.3 React Query Client — `lib/api-client-react`

Auto-generated React Query hooks + a custom fetch client. **Do not edit generated files.**

**`src/custom-fetch.ts`** — the custom fetch wrapper:

```ts
// Module-level config (call once at app startup)
export function setBaseUrl(url: string | null): void { /* prepends to relative paths */ }
export function setAuthTokenGetter(getter: AuthTokenGetter | null): void { /* bearer token */ }

// Features:
// - Prepends _baseUrl to all relative (/) paths — useful for Expo apps
// - Auto-attaches Authorization: Bearer <token> when getter is set
// - Throws typed ApiError on non-2xx responses
// - Auto-detects JSON content-type from body shape
// - Handles 204/205/304 (no-body) responses correctly
```

**`src/index.ts`** — public API:

```ts
export * from "./generated/api";          // React Query hooks
export * from "./generated/api.schemas";  // Zod response schemas
export { setBaseUrl, setAuthTokenGetter } from "./custom-fetch";
export type { AuthTokenGetter } from "./custom-fetch";
```

**Usage in the frontend (example):**

```tsx
import { useHealthCheck } from "@workspace/api-client-react";

function StatusBadge() {
  const { data, isLoading } = useHealthCheck();
  return <span>{isLoading ? "..." : data?.status}</span>;
}
```

---

### 7.4 Database — `lib/db`

Drizzle ORM client connected to the Replit-managed PostgreSQL database.

**`src/index.ts`** — database client:

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
export * from "./schema";
```

**`src/schema/index.ts`** — table definitions (currently empty, ready to extend):

```ts
// Add tables here. Example:
//
// import { pgTable, text, serial } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { z } from "zod/v4";
//
// export const tokensTable = pgTable("tokens", {
//   id:     serial("id").primaryKey(),
//   symbol: text("symbol").notNull(),
//   name:   text("name").notNull(),
// });
//
// export const insertTokenSchema = createInsertSchema(tokensTable).omit({ id: true });
// export type InsertToken = z.infer<typeof insertTokenSchema>;
// export type Token = typeof tokensTable.$inferSelect;
```

**`drizzle.config.ts`** — Drizzle Kit config for schema push:

```ts
export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL },
});
```

**Pushing schema changes (dev only):**

```bash
pnpm --filter @workspace/db run push
# Runs: drizzle-kit push --config ./drizzle.config.ts
```

> In production, schema migrations are handled automatically by Replit's Publish flow — never write custom migration scripts.

---

## 8. Scripts

**`scripts/post-merge.sh`** — runs automatically after every task-agent merge via the `[postMerge]` hook in `.replit`:

```bash
#!/bin/bash
set -e
pnpm install --frozen-lockfile   # restore all node_modules
pnpm --filter db push             # apply any new DB schema changes
```

---

## 9. Workspace Configuration

**`pnpm-workspace.yaml`** — defines which directories are packages and centralizes dependency versions via the `catalog:`:

```yaml
packages:
  - "artifacts/*"
  - "lib/*"
  - "scripts"

catalog:
  # Key shared versions (partial list)
  react: "^19.0.0"
  react-dom: "^19.0.0"
  vite: "^7.0.0"
  "@tailwindcss/vite": "^4.0.0"
  tailwindcss: "^4.0.0"
  framer-motion: "^12.0.0"
  "@tanstack/react-query": "^5.0.0"
  drizzle-orm: "^0.41.0"
  zod: "^3.24.0"
  typescript: "~5.9.3"
  "@types/node": "^25.0.0"
  lucide-react: "^0.503.0"
```

Packages reference shared versions with `catalog:` in their own `package.json` — a single bump in `pnpm-workspace.yaml` updates all packages.

**`.npmrc`** — security settings:

```
minimumReleaseAge: 1440   # blocks packages < 1 day old (supply-chain defense)
```

---

## 10. Running the Project

### Development

```bash
# Install all dependencies
pnpm install

# Start frontend (Vite dev server)
pnpm --filter @workspace/kama-agen run dev
# Or use the Replit workflow: "artifacts/kama-agen: web"

# Start API server (build + start)
pnpm --filter @workspace/api-server run dev
# Or use the Replit workflow: "artifacts/api-server: API Server"

# Push DB schema changes
pnpm --filter @workspace/db run push

# Full typecheck
pnpm run typecheck

# Regenerate API hooks + Zod schemas from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen
```

### Production Build

```bash
# Build all packages
pnpm run build

# API server only
pnpm --filter @workspace/api-server run build

# Frontend only
pnpm --filter @workspace/kama-agen run build
```

---

## 11. Data Flow Diagram

```
Browser
  │
  │  GET /                           → kama-agen Vite server (port auto-assigned)
  │  GET /api/*                      → api-server Express (port 8080)
  │
  ├─ TokenAnalyzer component
  │    │
  │    ├─ GET https://api.coingecko.com/api/v3/search?query={q}
  │    │    └─ autocomplete dropdown results
  │    │
  │    └─ GET https://api.coingecko.com/api/v3/coins/{id}?...
  │         └─ computeScore() → AnalysisResult → rendered UI
  │
  ├─ React Query hooks (@workspace/api-client-react)
  │    └─ customFetch() → GET /api/healthz → Express → HealthCheckResponse.parse()
  │
  └─ VideoShowcase
       └─ <video src="kama-intro.mp4" />  (served as static asset by Vite)

API Server
  └─ Drizzle ORM → PostgreSQL (DATABASE_URL, runtime-managed by Replit)
```

---

## 12. Extending the Project

### Adding a new API endpoint

1. **Define in OpenAPI spec** (`lib/api-spec/openapi.yaml`):
   ```yaml
   paths:
     /tokens:
       get:
         operationId: listTokens
         tags: [tokens]
         responses:
           "200":
             content:
               application/json:
                 schema:
                   $ref: "#/components/schemas/TokenList"
   components:
     schemas:
       TokenList:
         type: object
         properties:
           items:
             type: array
             items: { $ref: "#/components/schemas/Token" }
   ```

2. **Run codegen:**
   ```bash
   pnpm --filter @workspace/api-spec run codegen
   ```

3. **Add DB schema** (`lib/db/src/schema/tokens.ts`), then push:
   ```bash
   pnpm --filter @workspace/db run push
   ```

4. **Implement the route** (`artifacts/api-server/src/routes/tokens.ts`), register in `routes/index.ts`.

5. **Use in frontend** — the generated hook is immediately available:
   ```tsx
   import { useListTokens } from "@workspace/api-client-react";
   ```

### Adding a new landing page section

1. Create `artifacts/kama-agen/src/components/sections/my-section.tsx`
2. Export a named component following the existing pattern
3. Import and add it to `src/pages/home.tsx` in the desired position
4. Add a nav anchor to `src/components/layout/navbar.tsx` if needed

### Replacing images or video

- **Images:** add to `attached_assets/generated_images/` and import via `@assets/generated_images/filename.jpg`
- **Video:** replace `attached_assets/generated_videos/kama-intro.mp4` (no code change needed) or change the import path in `video-showcase.tsx`
