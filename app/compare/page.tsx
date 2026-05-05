import type { Metadata } from 'next';
import { PageShell } from '@/shared/ui/page-shell';

export const metadata: Metadata = {
  title: 'Compare Cars',
  description: 'Side-by-side comparison route prepared for URL-driven state.',
  alternates: {
    canonical: '/compare',
  },
};

type ComparePageProps = {
  searchParams: Promise<{
    cars?: string;
  }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const selectedCars = params.cars?.split(',').filter(Boolean) ?? [];

  return (
    <PageShell>
      <section className="space-y-4 rounded-3xl border border-line bg-surface p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
          Compare
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Comparison state will live in the URL
        </h1>
        <p className="max-w-2xl text-base leading-7 text-ink/80">
          The route already reads the <code>cars</code> search param so the
          upcoming compare UI can stay shareable, bookmarkable, and server
          render-friendly.
        </p>
        <p className="text-sm text-ink/60">
          Selected slugs: {selectedCars.length > 0 ? selectedCars.join(', ') : 'none'}
        </p>
      </section>
    </PageShell>
  );
}

