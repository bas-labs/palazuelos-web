# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing website for Grupo Palazuelos, a Mexican logistics company (customs brokerage, freight forwarding, port operations). Built with React 19, TypeScript, Vite, and Tailwind CSS. All content is in Spanish.

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — TypeScript check + Vite production build
- `npm run lint` — ESLint across all .ts/.tsx files
- `npm run preview` — Preview production build locally

## Architecture

**Single-file app:** All components live in `src/App.tsx` (~650 lines). There is no router — navigation uses anchor links (`#historia`, `#servicios`, etc.) with CSS smooth scrolling.

**Section components** defined in App.tsx: Navbar → Hero → Certifications → Historia → Servicios → Empresas → Cobertura → CTA → Contacto → Footer.

**Animation system:** Framer Motion throughout. Key patterns:
- `Reveal` wrapper component — fade-in + slide-up on viewport entry via `useInView`
- `Counter` component — animated number counting from 0 to target
- Hero uses `useScroll` + `useTransform` for parallax

**Utility:** `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.

## Styling

Tailwind CSS 4 with `@tailwindcss/vite` plugin (no tailwind.config file — uses CSS-based config in `src/index.css`).

Brand colors: primary red `#c41e3a`, dark backgrounds `zinc-900`, white/gray text. Fonts: Playfair Display (headings), Plus Jakarta Sans (body) loaded via Google Fonts in `index.html`.

## Path Aliases

`@/*` maps to `./src/*` (configured in both tsconfig and vite.config.ts).

## Key Config

- **components.json** — shadcn/ui setup (New York style, Lucide icons, CSS variables)
- **TypeScript** — strict mode enabled, ES2022 target
- **ESLint** — flat config format with typescript-eslint and React plugins

## Contact Form

The "Cotizador rápido" form in the Contacto section has no backend integration yet — `onSubmit` only prevents default.
