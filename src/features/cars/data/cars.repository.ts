import { cache } from 'react';
import { carFixtures } from './cars.mock';
import { CarListSchema } from '@/features/cars/domain/car.schemas';
import type { Car, CarFilters, CarSortDirection, CarSortField } from '@/features/cars/domain/car.types';
import { filterCars as applyFilters, sortCars as applySort } from '@/features/cars/domain/car.utils';

const loadCars = cache(async (): Promise<Car[]> => CarListSchema.parse(carFixtures));

export const getCars = cache(
  async (options?: {
    filters?: CarFilters;
    sort?: {
      field: CarSortField;
      direction?: CarSortDirection;
    };
  }) => {
    const cars = await loadCars();
    const filteredCars = options?.filters ? applyFilters(cars, options.filters) : cars;

    return options?.sort ? applySort(filteredCars, options.sort) : filteredCars;
  },
);

export const getCarBySlug = cache(async (slug: string) => {
  const cars = await loadCars();

  return cars.find((car) => car.slug === slug) ?? null;
});

export function filterCars(cars: Car[], filters: CarFilters) {
  return applyFilters(cars, filters);
}

export function sortCars(
  cars: Car[],
  sort: {
    field: CarSortField;
    direction?: CarSortDirection;
  },
) {
  return applySort(cars, sort);
}

