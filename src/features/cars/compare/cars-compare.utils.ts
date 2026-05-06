import type { Car } from '@/features/cars/domain/car.types';
import { formatCurrency } from '@/shared/lib/formatters';
import { MAX_COMPARISON_CARS } from './cars-compare.constants';
import type { CarsComparisonTableRow } from './cars-compare.types';

export function parseComparisonCarsParam(
  rawValue: string | string[] | undefined,
): string[] {
  const normalizedValue = Array.isArray(rawValue) ? rawValue[0] : rawValue;

  if (!normalizedValue) {
    return [];
  }

  return Array.from(
    new Set(
      normalizedValue
        .split(',')
        .map((slug) => slug.trim())
        .filter(Boolean),
    ),
  ).slice(0, MAX_COMPARISON_CARS);
}

export function toggleComparisonCar(
  selectedSlugs: string[],
  slug: string,
): string[] {
  if (selectedSlugs.includes(slug)) {
    return selectedSlugs.filter((selectedSlug) => selectedSlug !== slug);
  }

  if (selectedSlugs.length >= MAX_COMPARISON_CARS) {
    return selectedSlugs;
  }

  return [...selectedSlugs, slug];
}

export function removeComparisonCar(
  selectedSlugs: string[],
  slug: string,
): string[] {
  return selectedSlugs.filter((selectedSlug) => selectedSlug !== slug);
}

export function buildComparisonCarsParam(selectedSlugs: string[]) {
  return selectedSlugs.join(',');
}

export function buildComparisonTableRows(): CarsComparisonTableRow[] {
  return [
    {
      label: 'Brand',
      renderValue: (car) => car.brand,
    },
    {
      label: 'Model',
      renderValue: (car) => car.model,
    },
    {
      label: 'Year',
      renderValue: (car) => String(car.year),
    },
    {
      label: 'Type',
      renderValue: (car) => car.type,
    },
    {
      label: 'Price',
      renderValue: (car) => formatCurrency(car.price),
    },
    {
      label: 'Rating',
      renderValue: (car) => car.rating.toFixed(1),
    },
    {
      label: 'Weight',
      renderValue: (car) => `${car.weightKg} kg`,
    },
  ];
}

export function getCarsBySelectedSlugs(cars: Car[], selectedSlugs: string[]) {
  const carMap = new Map(cars.map((car) => [car.slug, car]));

  return selectedSlugs.flatMap((slug) => {
    const car = carMap.get(slug);
    return car ? [car] : [];
  });
}

