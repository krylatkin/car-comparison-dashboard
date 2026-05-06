# Car Comparison Dashboard

Production-grade project is designed as an SEO-friendly, accessible, URL-driven car comparison application built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Project goal

Build a car catalog where users can:

- browse inventory on a crawlable `/cars` route
- filter and sort cars through URL search params
- open SEO-friendly detail pages on `/cars/[slug]`
- select up to four cars and compare them side by side on `/compare`

The project is intentionally structured like a production frontend rather than a quick demo: domain logic is separated from rendering, search params are the source of truth, and the codebase is ready to evolve from mock data to a real backend.

## Stack

- Next.js App Router
- React
- TypeScript with strict compiler settings
- Tailwind CSS
- Zod
- ESLint
- Prettier
- Vitest
- React Testing Library
- Playwright

## Setup

### Prerequisites

- Node.js 22+
- npm 10+

### Install dependencies

```bash
npm install
```

### Development command

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

### Test commands

```bash
npm run test:unit
npm run test:e2e
npm run test
```

### Quality checks

```bash
npm run lint
npm run typecheck
npm run format
```

### Build command

```bash
npm run build
npm run start
```

## Architecture decisions

### Feature-based structure

The main product logic lives under `src/features/cars`, grouped by concern:

- `data/` for repository and mock data
- `domain/` for schemas, types, filtering, and sorting rules
- `catalog/` for catalog-specific query-state parsing
- `compare/` for comparison-state parsing and compare helpers
- `seo/` for structured data helpers
- `ui/` for feature-specific view components

Shared primitives live under `src/shared`.

### Domain logic separated from UI

Filtering, sorting, query parsing, and comparison state are kept out of page components. This makes the behavior easier to test and easier to migrate to a real API later.

The main data surface is intentionally API-ready:

- `getCars`
- `getCarBySlug`
- `filterCars`
- `sortCars`

### URL as the source of truth

The catalog and compare flows are URL-driven by design:

- filters and sorting live in `/cars?...`
- comparison selection lives in `/compare?cars=slug1,slug2`

This improves:

- shareability
- back/forward navigation
- SSR consistency
- testability
- SEO crawlability

### Server-first rendering

Most of the app is built with Server Components. Client state is minimized to avoid unnecessary hydration and to keep routes meaningful without JavaScript.

### Testing strategy

The app includes three layers of tests:

- unit tests for pure domain and query-state logic
- component tests for reusable UI building blocks
- e2e tests for user flows such as filtering, selecting cars, and opening the comparison table

## SEO approach

The app is built to be crawlable and meaningful without client-side interaction.

Current SEO strategy includes:

- server-rendered routes for `/`, `/cars`, `/cars/[slug]`, and `/compare`
- static params for all car detail pages
- dynamic metadata per car detail page
- canonical URLs
- Open Graph and Twitter metadata
- `robots.txt`
- `sitemap.xml`
- JSON-LD Product structured data on detail pages

The goal is that search engines can extract meaningful inventory and detail information directly from HTML, without waiting for client-side rendering.

## Performance approach

### Lighthouse targets

- Performance: 90+
- Accessibility: 95+
- SEO: 95+

### Current implementation

- Prefer Server Components by default.
- Keep filters and compare state in URL params rather than client stores.
- Use `next/image` for responsive image delivery.
- Keep catalog images lazy and prioritize the detail hero image.
- Add route-level `loading.tsx` skeleton states for perceived performance.
- Avoid unnecessary client components and hydration-heavy patterns.
- Keep expensive behavior in pure utilities rather than interactive UI state.

### CDN and cache strategy

#### Vercel

- Let App Router pages and static assets ride on Vercel’s CDN.
- Use static generation for car detail pages where possible.
- Use ISR or tag-based revalidation when the mock layer is replaced by a real data source.
- Continue serving images through `next/image` or move image assets to a first-party CDN if volume grows.

#### AWS S3 and CloudFront

- Use S3 for immutable static assets rather than as the only host for SSR App Router behavior.
- Put CloudFront in front of assets and configure separate cache behaviors for HTML, data, and media.
- Use long TTLs for hashed assets and shorter TTLs for HTML or API responses.
- Add invalidation or framework-driven revalidation when inventory changes.

#### Suggested cache policy

- immutable JS/CSS/font assets: `public, max-age=31536000, immutable`
- HTML pages: shorter TTL or framework-managed revalidation
- inventory APIs: tuned to freshness requirements
- image derivatives: long CDN caching with modern formats and responsive variants

## Accessibility approach

Accessibility is treated as a default engineering concern rather than a polish step.

Current approach includes:

- semantic headings, lists, tables, forms, and fieldsets
- labeled form controls by default in shared UI
- visible focus styles
- comparison table with real table semantics
- keyboard-accessible links and controls
- meaningful empty states and loading states
- server-rendered content so important information is available even without client-side execution

The target is Lighthouse Accessibility 95+ with additional manual QA for keyboard navigation and screen reader semantics.

## Trade-offs

- The project currently uses mock data instead of a real backend, so cache invalidation and network failure states are only partially represented.
- The filter form uses server-driven navigation instead of richer client-side instant filtering in order to keep SSR, shareability, and crawlability first.
- Images use remote demo assets, which is fine for an assignment but would likely move to a managed product image pipeline in production.
- The compare flow is link-driven rather than stateful client-side drag-and-drop, which keeps the architecture simpler and more resilient.

## Future improvements

- Replace mock data with a real API or CMS-backed inventory service.
- Add pagination or virtualized browsing for larger catalogs.
- Add blur placeholders and stronger image pipeline controls.
- Add analytics and Core Web Vitals monitoring in production.
- Add richer empty, error, and stale-data states once a backend exists.
- Expand e2e coverage for detail-page SEO and metadata-adjacent flows.
- Add design-system documentation or Storybook if the shared UI layer grows.

## Folder structure

```text
app/
  cars/
  compare/
src/
  features/
    cars/
      catalog/
      compare/
      data/
      domain/
      seo/
      ui/
  shared/
    lib/
    ui/
tests/
  unit/
  components/
  e2e/
```
