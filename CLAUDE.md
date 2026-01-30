# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development Server**
```bash
yarn dev          # Start Next.js development server (uses turbopack)
```

**Build & Production**
```bash
yarn build        # Production build
yarn serve        # Start production server
```

**Code Quality**
```bash
yarn lint         # Run Biome linter and auto-fix issues
yarn format       # Format code with Biome
yarn check        # Check code without auto-fixing
```

**Note**: Use `yarn` (v1.22.22) as the package manager, though `bun` can also be used for installation.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 (App Router with React 19)
- **Styling**: Tailwind CSS v4, Biome for linting/formatting
- **Content**: MDX with `next-mdx-remote` for blog posts
- **Animation**: GSAP, Motion, Lenis (smooth scrolling)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics, Vercel Speed Insights

### Project Structure

**App Router Pages** (`app/`)
- `/` - Home page with Hero, Intro, Works, Contact sections
- `/thoughts` - Blog listing
- `/thoughts/[slug]` - Individual blog post with table of contents and scroll progress
- `/projects` - Project showcase
- `/uses` - Tools/setup page (MDX content)

**Component Architecture**
```
app/
├── components/
│   ├── analytics/          # Vercel Analytics
│   ├── providers/          # LenisProvider, ThemeProvider, ScrollProvider
│   ├── layouts/            # PageContainer, SectionContainer, BackNavigation, ThemeSwitch
│   ├── hero/               # Landing hero section with animations
│   ├── work/               # Project tiles with hover effects
│   ├── tiles/              # Reusable tile system with TileContext
│   └── mdx.tsx             # Custom MDX components
└── thoughts/
    ├── posts/              # MDX blog posts with frontmatter
    └── utils.ts            # MDX parsing, post fetching utilities
```

### Key Patterns

**MDX Blog Posts**
- Posts stored as `.mdx` files in `app/thoughts/posts/`
- Frontmatter parsed manually in `utils.ts` with fields: `title`, `publishedAt`, `summary`, `draft`, `image`
- Use `rehype-pretty-code` with Dracula theme for syntax highlighting
- Dynamic routes in `app/thoughts/[slug]/` handle rendering

**Animation & Scroll**
- `LenisProvider` wraps the entire app for smooth scrolling
- `ScrollProvider` tracks scroll position for section-based animations
- GSAP used for complex animations (hero section, work tiles)
- Motion library for declarative animations

**Theme System**
- `next-themes` with dark/light modes
- Default theme: dark
- ThemeSwitch component with sun/moon icons

**Environment Variables**
No external API keys required. The blog runs entirely self-contained.

### Code Style

**Biome Configuration** (`biome.json`)
- Indentation: Tabs (width 80)
- Quotes: Single quotes for JS/JSX
- Semicolons: Always
- Trailing commas: Always
- Import organization: Auto-organize enabled
- Use Node.js import protocol (`node:` prefix)
- Use `import type` for type-only imports

**React Patterns**
- React Compiler enabled (experimental in Next.js)
- Use Server Components by default
- Client Components only when needed (use `'use client'` directive)
- Avoid `any` types (warns in Biome)

### Pre-commit Hooks

Husky runs `lint-staged` on commit:
- Automatically runs `biome check --write` on staged files
- Checks: `*.+(js|jsx|ts|tsx|json|css|md|mdx)`

### Next.js Configuration

**Special Features**
- Turbopack enabled with filesystem caching
- React Compiler enabled
- Page extensions: `.ts`, `.tsx` only (no `.js`, `.jsx`)

### Common Workflows

**Adding a Blog Post**
1. Create `app/thoughts/posts/your-slug.mdx`
2. Add frontmatter:
   ```mdx
   ---
   title: Your Title
   publishedAt: 2025-01-29
   summary: Brief summary
   draft: false
   ---
   ```
3. Post automatically appears in `/thoughts` when `draft: false`

**Working with Components**
- Read components in context (e.g., tiles use `TileContext` for shared state)
- Use `SectionContainer` for consistent page sections
- Use `BackNavigation` for secondary pages

**Modifying Styles**
- Tailwind configuration in `tailwind.css`
- Custom CSS in `app/tailwind.css`
- Use Tailwind's dark mode variants (`dark:`)
