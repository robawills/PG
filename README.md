# PG

A Next.js prototype site exploring scroll-driven animations with GSAP and Lenis.

## Tech Stack

- **Framework:** Next.js 16 (Pages Router)
- **Language:** TypeScript (strict mode)
- **Styling:** SCSS Modules with CSS custom properties (design tokens)
- **Animation:** GSAP + ScrollTrigger
- **Smooth Scroll:** Lenis
- **Images:** Next.js Image with Unsplash

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── components/         # React components (each with index.tsx + .module.scss)
│   ├── Card/           # Base card with image + overlay panel
│   ├── CardGrid/       # Responsive card grid layout
│   ├── CTABanner/      # Call-to-action banner
│   ├── Hero/           # Full-height hero section
│   ├── Layout/         # Page layout wrapper
│   ├── StatsBar/       # Statistics grid
│   ├── StickyCardSlider/ # Scroll-driven card with clip-path reveals + GSAP
│   └── TextBlock/      # Split text section
├── pages/              # Next.js pages (Pages Router)
├── styles/             # SCSS architecture
│   ├── base/           # Reset, document, layout, links, images, SVG
│   ├── semantics/      # Colour, themes, typography
│   ├── tokens/         # Design tokens (spacing, colour, radius, animation)
│   ├── mixins/         # Breakpoints, a11y
│   └── utils/          # Utility classes
├── next.config.ts
└── tsconfig.json
```

## Key Component: StickyCardSlider

A scroll-pinned card component featuring:

- **Clip-path image reveals** scrubbed to scroll position (bottom-up wipe)
- **Subtle scale** on incoming/outgoing images for depth
- **Staggered text fade-in** with configurable timing
- **White overlay panel** with content that swaps at the 75% reveal mark
- Integrated with GSAP ScrollTrigger + Lenis smooth scroll

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run format` | Check Prettier formatting |

## Styling

Uses a token-based SCSS system mirroring the [kyan.com](https://kyan.com) architecture:

- **Tokens:** CSS custom properties for spacing, colour, radius, animation, z-index
- **Semantic colours:** Background, foreground, border with inverse theme support
- **Breakpoints:** Mobile-first via `@include breakpoint(s/m/l/xl)`
- **Typography:** Fluid type with `clamp()` for responsive sizing
