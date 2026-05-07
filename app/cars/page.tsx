import type { Metadata } from 'next';
import {
  getCarsCatalogFilterOptions,
  parseCarsCatalogSearchParams,
} from '@/features/cars/catalog/cars-catalog.utils';
import { parseComparisonCarsParam } from '@/features/cars/compare/cars-compare.utils';
import { getCars } from '@/features/cars/data/cars.repository';
import { CarCard } from '@/features/cars/ui/car-card';
import { ComparisonSelectionBar } from '@/features/cars/ui/comparison-selection-bar';
import { CarsCatalogFilters } from '@/features/cars/ui/cars-catalog-filters';
import { Badge, EmptyState, PageShell } from '@/shared/ui';

export const metadata: Metadata = {
  title: 'Cars',
  description: 'Browse the car inventory and prepare filters and comparisons.',
  alternates: {
    canonical: '/cars',
  },
};

type CarsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const state = parseCarsCatalogSearchParams(params);
  const selectedComparisonSlugs = parseComparisonCarsParam(params.cars);
  const [allCars, cars] = await Promise.all([
    getCars(),
    getCars({
      filters: state.filters,
      sort: state.sort,
    }),
  ]);
  const filterOptions = getCarsCatalogFilterOptions(allCars);

  return (
    <PageShell>
      <section className="space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
            Inventory
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Cars</h1>
          <p className="max-w-2xl text-base leading-7 text-ink/80">
            Browse, filter, and sort the catalog with URL-driven state that
            stays shareable, indexable, and easy to test.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="subtle">{cars.length} results</Badge>
            <Badge variant="subtle">
              Sorted by {state.sort.field} ({state.sort.direction})
            </Badge>
          </div>
        </header>

        <ComparisonSelectionBar selectedSlugs={selectedComparisonSlugs} />

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside aria-label="Catalog filters">
            <CarsCatalogFilters
              options={filterOptions}
              state={state}
              selectedComparisonSlugs={selectedComparisonSlugs}
            />
          </aside>

          <div>
            {cars.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {cars.map((car) => (
                  <li key={car.id}>
                    <CarCard
                      car={car}
                      selectedComparisonSlugs={selectedComparisonSlugs}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="No cars match these filters"
                description="Try widening the price range, lowering the minimum rating, or clearing a brand or type filter."
              />
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
