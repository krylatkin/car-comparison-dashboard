import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/features/cars/domain/car.types';
import { buildComparisonCarsParam } from '@/features/cars/compare/cars-compare.utils';
import { formatCurrency } from '@/shared/lib/formatters';
import { Badge, Card, CardContent } from '@/shared/ui';
import { getCarImageObjectPosition } from './car-image.styles';
import { CompareToggleButton } from './compare-toggle-button';

type CarCardProps = {
  car: Car;
  selectedComparisonSlugs: string[];
};

export function CarCard({ car, selectedComparisonSlugs }: CarCardProps) {
  const detailHref =
    selectedComparisonSlugs.length > 0
      ? `/cars/${car.slug}?cars=${buildComparisonCarsParam(selectedComparisonSlugs)}`
      : `/cars/${car.slug}`;

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10] border-b border-line bg-canvas">
        <Link
          href={detailHref}
          aria-label={`View details for ${car.year} ${car.brand} ${car.model}`}
          className="absolute inset-0 block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={car.image.src}
            alt={car.image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            style={getCarImageObjectPosition(car.image)}
          />
        </Link>
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
                <Link className="no-underline" href={detailHref}>
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
        <div className="col-span-2 sm:col-span-1">
          <dd className="font-medium">
          <CompareToggleButton
            slug={car.slug}
            selectedSlugs={selectedComparisonSlugs}
            className="mt-1"
          />
          </dd>
        </div>
        </dl>
      </CardContent>
    </Card>
  );
}
