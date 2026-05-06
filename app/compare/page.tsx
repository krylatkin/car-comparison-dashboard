import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getCarsBySelectedSlugs,
  parseComparisonCarsParam,
} from '@/features/cars/compare/cars-compare.utils';
import { getCars } from '@/features/cars/data/cars.repository';
import { CarsComparisonTable } from '@/features/cars/ui/cars-comparison-table';
import { EmptyState, PageShell } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Compare Cars',
  description: 'Compare selected cars side by side in an accessible table.',
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
  const selectedCarSlugs = parseComparisonCarsParam(params.cars);
  const cars = getCarsBySelectedSlugs(await getCars(), selectedCarSlugs);

  return (
    <PageShell>
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
          Compare
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Compare selected cars
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/80">
            This table is driven entirely by the <code>cars</code> URL search
            param so the comparison stays shareable, bookmarkable, and server
            render-friendly.
          </p>
        </div>

        {cars.length > 0 ? (
          <CarsComparisonTable cars={cars} />
        ) : (
          <EmptyState
            title="No cars selected for comparison"
            description="Pick up to four cars from the catalog to compare their specs side by side."
            action={
              <Link
                href="/cars"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface no-underline transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Browse cars
              </Link>
            }
          />
        )}
      </section>
    </PageShell>
  );
}
