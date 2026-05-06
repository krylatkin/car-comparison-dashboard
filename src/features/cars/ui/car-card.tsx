import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/features/cars/domain/car.types';
import {
  buildComparisonCarsParam,
  toggleComparisonCar,
} from '@/features/cars/compare/cars-compare.utils';
import { MAX_COMPARISON_CARS } from '@/features/cars/compare/cars-compare.constants';
import { formatCurrency } from '@/shared/lib/formatters';
import { Badge, Card, CardContent } from '@/shared/ui';

type CarCardProps = {
  car: Car;
  compareSearch: string;
  selectedComparisonSlugs: string[];
};

export function CarCard({
  car,
  compareSearch,
  selectedComparisonSlugs,
}: CarCardProps) {
  const isSelected = selectedComparisonSlugs.includes(car.slug);
  const nextSelectedSlugs = toggleComparisonCar(selectedComparisonSlugs, car.slug);
  const canAddMore =
    selectedComparisonSlugs.length < MAX_COMPARISON_CARS || isSelected;
  const separator = compareSearch.includes('?') ? '&' : '?';
  const compareHref = canAddMore
    ? `${compareSearch}${separator}cars=${buildComparisonCarsParam(nextSelectedSlugs)}`
    : compareSearch;

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10] border-b border-line bg-canvas">
        <Image
          src={car.image.src}
          alt={car.image.alt}
          fill
          loading="lazy"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="accent">{car.type}</Badge>
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-ink/55">
                {car.brand}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                <Link className="no-underline" href={`/cars/${car.slug}`}>
                  {car.model}
                </Link>
              </h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-ink/60">Rating</p>
            <p className="text-xl font-semibold">{car.rating.toFixed(1)}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-ink/60">Price</dt>
            <dd className="font-medium">{formatCurrency(car.price)}</dd>
          </div>
          <div>
            <dt className="text-ink/60">Year</dt>
            <dd className="font-medium">{car.year}</dd>
          </div>
          <div>
            <dt className="text-ink/60">Weight</dt>
            <dd className="font-medium">{car.weightKg} kg</dd>
          </div>
          <div>
            <dt className="text-ink/60">Compare</dt>
            <dd className="font-medium">
              {canAddMore ? (
                <Link
                  href={compareHref}
                  className="text-accentDark no-underline hover:underline"
                >
                  {isSelected ? 'Remove from compare' : 'Add to compare'}
                </Link>
              ) : (
                <span className="text-ink/50">
                  Compare limit reached
                </span>
              )}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
