# Car Comparison Dashboard

Production-grade project is designed as an SEO-friendly, accessible, URL-driven car comparison application built with Next.js App Router, React, TypeScript, and Tailwind CSS.

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

## Performance

### Lighthouse targets

- Performance: 90+
- Accessibility: 95+
- SEO: 95+

### Current performance approach

- Prefer Server Components by default and keep client-side interactivity minimal.
- Store filter and comparison state in URL search params instead of duplicating it in client state.
- Use `next/image` for catalog and detail images with responsive `sizes`, optimized delivery, and lazy loading for non-critical images.
- Keep the car detail hero image prioritized while allowing catalog cards to load lazily.
- Add route-level loading UI with skeletons so transitions remain visually stable without converting pages to client components.
- Keep filtering, sorting, and comparison rules in pure domain helpers so rendering stays lightweight and predictable.

### Production performance checklist

- Replace mock data with a cacheable API or CMS endpoint and use `fetch` caching, ISR, or tag-based revalidation based on inventory freshness needs.
- Add real image blur placeholders or CDN-generated low-quality placeholders for large catalogs.
- Measure real pages with Lighthouse and WebPageTest after deployment, especially `/cars`, `/cars/[slug]`, and `/compare`.
- Track Core Web Vitals in production and review image payload size, TTFB, LCP, and CLS before handoff.

## CDN and cache strategy

### Vercel

- Serve App Router pages from Vercel’s edge network and let static assets be cached aggressively by the platform CDN.
- Use static generation where possible for car detail pages and keep metadata, sitemap, and robots server-generated but cacheable.
- For a future backend, use ISR or tag-based revalidation for car inventory updates instead of shifting the catalog to full client fetching.
- Cache remote car images behind the Next.js image optimizer or move them to a first-party image CDN when traffic patterns justify it.

### AWS S3 and CloudFront

- Build the app with Next.js hosting that supports SSR/ISR rather than treating S3 alone as the application host if dynamic App Router behavior is required.
- Use S3 for static assets and CloudFront as the CDN layer with long TTLs for hashed assets such as JS, CSS, fonts, and optimized images.
- Keep HTML and data responses on shorter TTLs or pair them with explicit invalidation/revalidation when inventory changes.
- Configure CloudFront behaviors separately for HTML, image assets, and immutable build artifacts so cache policy matches content volatility.

### Cache policy guidance

- Immutable build assets: long TTL, `Cache-Control: public, max-age=31536000, immutable`
- Catalog/detail HTML: shorter TTL or framework-managed revalidation
- API/inventory responses: tuned to update frequency, preferably with surrogate cache support or explicit revalidation tags
- Images: long CDN caching with responsive derivatives and modern formats

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
