import type { Car } from '@/features/cars/domain/car.types';

export type CarsComparisonState = {
  slugs: string[];
};

export type CarsComparisonTableRow = {
  label: string;
  renderValue: (car: Car) => string;
};
