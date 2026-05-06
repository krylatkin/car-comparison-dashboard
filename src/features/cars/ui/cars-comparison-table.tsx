import Link from 'next/link';
import type { Car } from '@/features/cars/domain/car.types';
import {
  buildComparisonCarsParam,
  buildComparisonTableRows,
  removeComparisonCar,
} from '@/features/cars/compare/cars-compare.utils';
import { Card } from '@/shared/ui';

type CarsComparisonTableProps = {
  cars: Car[];
};

export function CarsComparisonTable({ cars }: CarsComparisonTableProps) {
  const rows = buildComparisonTableRows();

  return (
    <div className="overflow-x-auto">
      <Card className="min-w-[720px] overflow-hidden">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Compare selected cars side by side by brand, model, year, type,
            price, rating, and weight.
          </caption>
          <thead>
            <tr className="border-b border-line bg-canvas/80">
              <th
                scope="col"
                className="w-44 px-4 py-4 text-sm font-semibold text-ink"
              >
                Specification
              </th>
              {cars.map((car) => {
                const nextSlugs = removeComparisonCar(
                  cars.map((currentCar) => currentCar.slug),
                  car.slug,
                );
                const removeHref =
                  nextSlugs.length > 0
                    ? `/compare?cars=${buildComparisonCarsParam(nextSlugs)}`
                    : '/compare';

                return (
                  <th
                    key={car.slug}
                    scope="col"
                    className="min-w-56 px-4 py-4 align-top"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-ink/55">
                          {car.brand}
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight text-ink">
                          {car.model}
                        </h2>
                      </div>
                      <Link
                        href={removeHref}
                        className="text-sm font-medium text-accentDark no-underline hover:underline"
                      >
                        Remove from comparison
                      </Link>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-b-0">
                <th
                  scope="row"
                  className="bg-surface px-4 py-4 text-sm font-medium text-ink"
                >
                  {row.label}
                </th>
                {cars.map((car) => (
                  <td
                    key={`${car.slug}-${row.label}`}
                    className="px-4 py-4 text-sm text-ink/80"
                  >
                    {row.renderValue(car)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

