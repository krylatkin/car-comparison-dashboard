import { describe, expect, it } from 'vitest';
import {
  filterCars,
  getCarBySlug,
  getCars,
  sortCars,
} from '@/features/cars/data/cars.repository';

describe('cars.repository', () => {
  it('returns validated cars', async () => {
    const cars = await getCars();

    expect(cars.length).toBeGreaterThan(0);
    expect(cars[0]).toHaveProperty('slug');
  });

  it('returns a car by slug', async () => {
    const car = await getCarBySlug('tesla-model-y-2024');

    expect(car?.brand).toBe('Tesla');
  });

  it('filters cars by brand, type, price, and rating', async () => {
    const cars = await getCars();
    const filteredCars = filterCars(cars, {
      brands: ['Tesla', 'Hyundai'],
      types: ['Electric'],
      priceMax: 53_000,
      ratingMin: 4.7,
    });

    expect(filteredCars.map((car) => car.slug)).toEqual([
      'tesla-model-y-2024',
      'hyundai-ioniq-5-2024',
    ]);
  });

  it('sorts cars by price descending', async () => {
    const cars = await getCars();
    const sortedCars = sortCars(cars, {
      field: 'price',
      direction: 'desc',
    });

    expect(sortedCars[0]?.slug).toBe('bmw-x5-2023');
  });

  it('returns filtered and sorted cars from the repository', async () => {
    const cars = await getCars({
      filters: {
        brands: ['BMW', 'Kia', 'Tesla'],
        types: ['SUV', 'Electric'],
        priceMax: 60_000,
        ratingMin: 4.1,
      },
      sort: {
        field: 'rating',
        direction: 'desc',
      },
    });

    expect(cars.map((car) => car.slug)).toEqual([
      'tesla-model-y-2024',
      'kia-sportage-2024',
    ]);
  });

  it('returns an empty list when no cars match the filters', async () => {
    const cars = await getCars({
      filters: {
        brands: ['Tesla'],
        types: ['Truck'],
        priceMin: 100_000,
      },
      sort: {
        field: 'brand',
        direction: 'asc',
      },
    });

    expect(cars).toEqual([]);
  });
});
