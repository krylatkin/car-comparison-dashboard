import Link from 'next/link';
import { PageShell } from '@/shared/ui/page-shell';

export default function HomePage() {
  return (
    <PageShell>
      <section className="space-y-6 rounded-3xl border border-line bg-surface p-8 shadow-card">
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">
            Car Comparison Dashboard foundation
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/80">
            The initial architecture is ready: feature modules, validated mock
            data, API-ready access functions, and SEO-aware routes for the
            listing and detail pages.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface no-underline hover:bg-ink/90 hover:text-surface"
            href="/cars"
          >
            Browse cars
          </Link>
          <Link
            className="rounded-full border border-line px-5 py-3 text-sm font-medium no-underline"
            href="/compare"
          >
            Compare route
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
