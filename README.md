# Car Comparison Dashboard

Production-grade take-home assignment foundation for a Senior Frontend Engineer role. The project is designed as an SEO-friendly, accessible, URL-driven car comparison application built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Goal

Build a comparison experience where users can browse cars, filter and sort the inventory, open indexable detail pages, and compare multiple vehicles side-by-side without relying on unnecessary global client state.

## Stack

- Next.js App Router
- React
- TypeScript with strict compiler settings
- Tailwind CSS
- Zod for runtime validation
- ESLint with typed rules
- Prettier
- Vitest and React Testing Library
- Playwright

## Architecture decisions

### Feature-based structure

The codebase starts with a `src/features/cars` module that groups together domain types, Zod schemas, mock data, repository functions, and SEO helpers. Shared layout primitives and utilities live under `src/shared`.

### Domain logic separated from UI

Filtering and sorting are implemented as pure functions in the domain layer. The repository module composes those functions and exposes an API-ready surface:

- `getCars`
- `getCarBySlug`
- `filterCars`
- `sortCars`

This makes the data layer easy to swap from mock fixtures to a remote API or CMS without reworking UI components.

### URL-driven state

The future listing and compare experiences are intentionally designed around search params. This supports server rendering, shareable URLs, browser navigation, and predictable state recovery.

### SEO-first routing

The foundation already includes:

- route metadata for `/`, `/cars`, `/cars/[slug]`, and `/compare`
- `robots.txt`
- `sitemap.xml`
- JSON-LD generation for car detail pages
- canonical URLs per route

### Testing strategy

The project is prepared for three testing layers:

- unit tests for domain logic and repositories
- component tests for React UI
- e2e tests for route-level behavior and URL-driven flows

Initial smoke tests are included so the test setup is exercised from the start.

## Folder structure

```text
app/
  cars/
  compare/
src/
  features/
    cars/
      data/
      domain/
      seo/
  shared/
    lib/
    ui/
tests/
  unit/
  components/
  e2e/
```

## Current scope

This first iteration focuses on the production-ready foundation rather than the full UI:

- Next.js App Router project structure
- strict TypeScript, Tailwind, ESLint, and Prettier configuration
- validated `Car` domain model
- mock inventory data
- repository functions for retrieval, filtering, and sorting
- placeholder routes that prove SEO and routing architecture

## Next implementation steps

1. Build the `/cars` listing UI with filter controls driven by search params.
2. Add reusable form and card primitives under `src/shared/ui`.
3. Implement selection and comparison flows that sync to the URL.
4. Expand tests to cover filter parsing, accessibility, and compare interactions.

## Performance and deployment notes

- Prefer server components for data-heavy routes and isolate interactivity to small client islands.
- Keep filter and compare state in the URL to reduce client-side state duplication and hydration overhead.
- Treat the repository layer as cacheable server data and move to CDN-friendly APIs when the mock layer is replaced.
- Configure long-lived cache headers for static assets and use ISR or tag-based revalidation for inventory data when a backend is introduced.
- Optimize images with `next/image`, responsive sizing, and modern formats once the full UI is in place.

## Getting started

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```
