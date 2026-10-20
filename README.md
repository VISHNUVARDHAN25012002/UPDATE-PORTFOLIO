# Vishnu Vardhan R — Portfolio

Interactive 3D portfolio built with **React 18 + TypeScript + Vite**, **Three.js** (react-three-fiber / drei) and **Framer Motion**. Live at [vishnuportfolio.in](https://vishnuportfolio.in).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (http://localhost:5173) |
| `npm run build` | Type-check and build to `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run the TypeScript compiler only |
| `npm run deploy` | Build and publish `build/` to GitHub Pages |

## Structure

```
src/
├── data.ts               all content: profile, projects, skills, certificates
├── App.tsx               page composition (3D scene is lazy-loaded)
├── components/
│   ├── Scene3D.tsx       fixed WebGL background: liquid core, floating shapes, galaxy, stars
│   ├── Hero.tsx          3D photo portal, split-letter name, rotating roles
│   ├── About.tsx         About, Skills (draggable 3D tag sphere), Experience timeline
│   ├── Work.tsx          Projects (live previews), 3D certificate carousel, Contact (EmailJS)
│   ├── Chrome.tsx        Loader, custom cursor, scroll progress, navbar, footer
│   └── Motion.tsx        TiltCard, Magnetic, Reveal, SectionHeading primitives
├── hooks/useMedia.ts     reduced-motion / fine-pointer media queries
└── styles/global.css     design tokens + all styles
```

Edit `src/data.ts` to change any text. Animations respect `prefers-reduced-motion`; the custom cursor and tilt effects are desktop-only.
