import Link from 'next/link';
import { buildComparisonCarsParam } from '@/features/cars/compare/cars-compare.utils';
import { MAX_COMPARISON_CARS } from '@/features/cars/compare/cars-compare.constants';
import { Badge, Card, CardContent } from '@/shared/ui';

type ComparisonSelectionBarProps = {
  selectedSlugs: string[];
};

export function ComparisonSelectionBar({
  selectedSlugs,
}: ComparisonSelectionBarProps) {
  const compareHref =
    selectedSlugs.length > 0
      ? `/compare?cars=${buildComparisonCarsParam(selectedSlugs)}`
      : '/compare';

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
            Compare
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="subtle">
              {selectedSlugs.length} of {MAX_COMPARISON_CARS} selected
            </Badge>
            <p className="text-sm text-ink/70">
              Choose up to four cars and open a side-by-side specs table.
            </p>
          </div>
        </div>
        <Link
          href={compareHref}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface no-underline transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:w-auto"
        >
          Compare selected cars
        </Link>
      </CardContent>
    </Card>
  );
}
