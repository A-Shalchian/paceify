@AGENTS.md

# Paceify

Gamified habit tracker with RPG mechanics, companion creature, and 6 modules (gym, calories, pills, French, journal, habits/todos). Web-first with Next.js, iOS built separately in SwiftUI consuming the same API.

## Stack

- **Framework**: Next.js 16 (App Router, `src/` directory)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase PostgreSQL + Prisma ORM
- **Auth**: Supabase Auth (Google, GitHub, Apple OAuth)
- **Deployment**: Vercel

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (MUST run after changes to verify)
- `pnpm lint` — ESLint

## Code Rules

- **No unnecessary comments.** Only add a comment when the code is genuinely confusing and cannot be clarified by renaming or restructuring. Self-documenting code > comments.
- **No unnecessary abstractions.** Don't create helpers, wrappers, or utils for one-time operations. Three similar lines > a premature abstraction.
- **No placeholder or TODO code.** Every line shipped should work. No `// TODO: implement later` stubs.
- **No `any`.** Ever. Use `unknown` and narrow, or define a proper type. If you're tempted to use `any`, you don't understand the data shape yet — go figure it out first.
- **Max 150 lines per component/file.** If a component is getting long, break it into composition. Extract sub-components in the same file or a sibling file — not a new `utils/` folder.
- **No barrel exports.** Don't create `index.ts` files that just re-export from other files. Import directly from the source.

## Next.js Rules (CRITICAL)

This is Next.js 16 — not 14, not 15. APIs and conventions have changed. Before using any Next.js API, check `node_modules/next/dist/docs/` for the current documentation. Do not rely on outdated patterns from training data.

These are the rules that prevent the most common mistakes:

### Server Components by Default
- Every component is a server component unless it NEEDS `"use client"`.
- You NEED `"use client"` ONLY when using: `useState`, `useEffect`, `useRef`, `useContext`, `onClick`/`onChange`/event handlers, browser APIs (`window`, `document`, `localStorage`), or third-party client-only libraries.
- If a component just renders data — it's a server component. No directive needed.
- When a component needs one interactive part, extract ONLY that part as a client component. Don't make the whole page client-side.

### Data Fetching
- Server components fetch data directly with `async/await`. No `useEffect` + `useState` pattern for data that's available at render time.
- Client components receive data as props from server parents, or use TanStack Query for client-side data needs (mutations, polling, optimistic updates).
- Never use `useEffect` to fetch data on mount in a component that could be a server component.

### Use Next.js Primitives
- `next/link` for all internal navigation. Never raw `<a>` for internal links.
- `next/image` for all images. Never raw `<img>`.
- Next.js Metadata API (`export const metadata` or `generateMetadata`) for all page head tags. Never raw `<head>` manipulation.
- `loading.tsx` for loading states. `error.tsx` for error boundaries. `not-found.tsx` for 404s. Use the built-in conventions.

### Environment Variables
- `NEXT_PUBLIC_*` prefix = available in browser. Everything else = server-only.
- Never reference non-public env vars in client components or files with `"use client"`.
- Always access env vars through a validated config object in `src/lib/env.ts`, not scattered `process.env` calls.

### API Routes
- All API responses follow one shape: `{ data: T }` on success, `{ error: string, code: string }` on failure.
- Always return proper HTTP status codes (201 for creation, 400 for bad input, 401 for unauth, 403 for forbidden, 404 for not found, 500 for server errors).
- Always validate request body with Zod before processing.
- API routes serve both the web client and the iOS app. The iOS app sends `Authorization: Bearer <token>` header. The web app uses cookies. Auth middleware must check both.

### Prisma
- Use a singleton Prisma client (`src/lib/db.ts`) to avoid exhausting connections on Vercel serverless.
- Never write raw SQL unless Prisma genuinely can't express the query.

## Security

- Validate all user input at API boundaries with Zod.
- Use parameterized queries (Prisma handles this). Never interpolate user input into SQL.
- Sanitize any user-generated content before rendering (XSS prevention).
- Set proper CORS, CSP, and security headers in `next.config.ts` and middleware.
- Never expose API keys, secrets, or internal error stacks to the client. Return generic error messages.
- Never commit `.env` files. Use `.env.example` for documentation only.
- Rate limit auth endpoints and any public-facing API routes.
- After writing code, run `pnpm build` to catch type errors and build failures before considering a task done.

## SEO

- Every page must have proper `<title>` and `<meta name="description">` via Next.js Metadata API.
- Use semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`, `<h1>`-`<h6>` hierarchy). One `<h1>` per page.
- All images must have descriptive `alt` text.
- Use proper Open Graph and Twitter Card meta tags for shareable pages.
- Implement structured data (JSON-LD) where applicable.
- All public pages must be server-rendered (not client-only).
- Use proper `<link rel="canonical">` tags.
- Ensure good Core Web Vitals: no layout shift, fast LCP, responsive to input.

## File Structure

```
src/
├── app/              # Next.js App Router pages + API routes
│   ├── (auth)/       # Auth pages (login, register)
│   ├── (dashboard)/  # Authenticated pages
│   ├── api/          # REST API routes
│   └── layout.tsx    # Root layout
├── components/       # React components
│   ├── ui/           # Reusable UI primitives
│   └── layout/       # Layout components (nav, sidebar, etc.)
├── lib/              # Utility functions, configs, clients
│   ├── db.ts         # Prisma singleton client
│   ├── env.ts        # Validated environment variables
│   └── supabase.ts   # Supabase client (server + browser)
└── hooks/            # Custom React hooks (client-side only)
```
