# ⚡ CRETACEOUS PROTOCOL

**A narrative survival terminal interface powered by AI**

```
████████████████████████████████████████████████████████████████
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
█░  CRETACEOUS PROTOCOL v1.0  |  SECTOR SURVIVAL MODE ACTIVE  ░█
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
████████████████████████████████████████████████████████████████
```

Cretaceous Protocol is an immersive narrative RPG experience where survival, choice, and AI-generated storytelling converge. Every decision shapes your journey through a primitive world abundant with danger and wonder. Real-time generative imagery adapts to your narrative context, while a CRT-inspired terminal aesthetic intensifies the narrative immersion.

**Status:** Operational | **Classification:** Full-Stack Next.js Narrative Engine

---

## THE PROTOCOL: Core Features

### Adaptive Narrative Engine
- **Dynamic Story Generation** – Real-time narrative evolution based on user actions via Google Gemini 2.5 Flash Lite
- **Contextual Continuity** – Prompt engineering maintains narrative coherence across extended gameplay sessions
- **Failure State Integration** – API errors seamlessly woven into the narrative ("Satellite Signal Lost")

### Visual Synthesis
- **Pixel Art Generation** – Automatic image synthesis via Hugging Face Inference (16-bit aesthetic)
- **Cinematic Lighting** – Crafted prompts inject mood, atmosphere, and visual consistency
- **Asynchronous Loading States** – "Processing visual signal..." feedback during generation

### Terminal Experience
- **Typewriter Effect** – Text unfolds character-by-character for narrative immersion
- **Intelligent Scrolling** – Automatic viewport management for optimal readability
- **System Alerts** – CRT scanlines and Phosphor Green aesthetic evoke classic terminal interfaces
- **Mobile-First Responsive Interface** – Fluid terminal layout optimized for all screen sizes, from ultra-wide monitors to mobile devices, including touch-optimized interaction targets.
- **Dynamic Viewport Management** – Intelligent height handling (`dvh`) to prevent UI breakage on mobile browsers with virtual keyboards.
- **Custom Animation** – Framer Motion transitions for UI interactions
- **Custom Terminal Modals** – Replaced native browser alerts with high-fidelity, animated CRT-style modals for critical system actions (e.g., Reset Protocol).
- **Framer Motion Orchestration** – Smooth entrance/exit animations for UI elements, maintaining the retro-hardware feel.

### Narrative Resilience
- **API Quota Handling** – Graceful degradation with in-world narrative explanations
- **State Persistence** – User progress tracked through game session lifecycle
- **Message History** – Complete conversation log for narrative reference

---

## TECH STACK

### Frontend Framework
- **Next.js 16.1** – App Router architecture with React 19
- **TypeScript** – Strong type safety across codebase
- **Tailwind CSS 4** – Utility-first styling with Phosphor Green Terminal Theme
    - **Adaptive Terminal Typography** – Dynamic scaling from `text-sm` to `text-base` for optimal readability across devices.
    - **Flexible Media Assets** – Responsive image containers with `aspect-ratio` locking to maintain visual consistency in the prehistoric feed.
- **Framer Motion** – Advanced UI animations, layout transitions, and specialized CRT/Scanline modal effects.
- **Lucide Icons** – Minimal icon library for terminal-style UI

### AI & Generative Services
- **Vercel AI SDK** – Unified interface for LLM streaming and interactions
- **Groq LPU Inference** – Ultra-low latency narrative generation (Llama 3.3 70B).
- **Pollinations AI (OpenAI-compatible)** – High-fidelity image synthesis using the **Flux** model.

### Development & Quality
- **Biome** – Unified linting, formatting, and code analysis
- **TypeScript 5** – Next-generation type system
- **Node.js 20+** – Runtime environment

---

## SYSTEM ARCHITECTURE

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with global styling
│   ├── page.tsx                # Main game interface entry point
│   ├── globals.css             # Terminal aesthetic styles
│
│   ├── api/
│   │   ├── generate-story/     # Gemini endpoint (narrative synthesis)
│   │   └── generate-image/     # Hugging Face endpoint (visual synthesis)
│   ├── components/
│       ├── GameConsole.tsx     # Primary UI container & state orchestration
│       ├── Typewriter.tsx      # Character-by-character text renderer
│       └── ResetModal.tsx      # System alert & confirmation interface
│   └── hooks/
│       └── useGame.ts          # Central game state machine
│            ├── Message management
│            ├── API fetch orchestration
│            ├── Session lifecycle
│            └── Error handling
├── lib/
│   ├── consts.ts               # Configuration constants
│   ├── prompts.ts              # Session system prompts
│   │   ├── INITIAL_STORY       # Sector entry bootstrap
│   │   ├── CONTINUE_STORY      # Conversational context injection
│   │   └── GENERATE_IMAGE      # Visual synthesis directives
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

### Prompt Engineering Strategy
- **INITIAL_STORY** – Establishes Cretaceous sector context and survival stakes
- **CONTINUE_STORY** – Maintains narrative thread while injecting prior context windows
- **GENERATE_IMAGE** – Specifies 16-bit pixel art style, cinematic framing, and thematic consistency

### API Flow
```
User Action
    ↓
GameConsole → useGame Hook
    ↓
Validates Input & Prepares Prompt
    ↓
/api/generate-story (POST)  &  /api/generate-image (POST)
    ↓
Stream Response → Typewriter → Terminal Display
    ↓
Update Message history & Re-render
```

### State Management
The `useGame` hook centralizes:
- Message queue (user inputs + AI responses)
- Loading states (story generation, image synthesis)
- Session metadata (game phase, narrative context)
- Error boundaries with narrative redirection

---

## INSTALLATION & QUICKSTART

### Prerequisites
- **Node.js** 20.x or higher
- **npm** or **pnpm**
- Active API keys for Google Gemini and Pollination

### Step 1: Clone Repository
```bash
git clone https://github.com/Juansegomezn/cretaceous-protocol.git
cd cretaceous-protocol
```

### Step 2: Environment Configuration
Create `.env.local` in the project root:
```env
GROQ_API_KEY=your_groq_api_key
POLLINATIONS_API_KEY=your_pollinations_api_token
```

Obtain keys from:
- [Groq AI](https://console.groq.com/keys) – Groq API key
- [Pollinations AI](https://enter.pollinations.ai/) – Pollinations API key

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Launch Development Server
```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser. The Cretaceous sector awaits.

### Step 5: Production Build
```bash
npm run build
npm run start
```

### Code Quality
Run Biome for formatting and linting:
```bash
npm run lint      # Check issues
npm run format    # Auto-fix formatting
```

---

## NARRATIVE DESIGN PHILOSOPHY

Cretaceous Protocol merges procedural storytelling with thematic consistency. Each prompt layer—from entry narrative to image synthesis to error states—maintains a cohesive sci-fi/survival atmosphere. The terminal interface reinforces player agency through a command-like interaction model, while real-time generative content ensures unique experiences across playthroughs.

---

*Made by [Juan Sebastian Gomez Ayala](https://github.com/Juansegomezn)*