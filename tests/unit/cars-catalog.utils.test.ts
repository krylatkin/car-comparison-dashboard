import { describe, expect, it } from 'vitest';
import {
  getCarsCatalogFilterOptions,
  parseCarsCatalogSearchParams,
} from '@/features/cars/catalog/cars-catalog.utils';
import { carFixtures } from '@/features/cars/data/cars.mock';

describe('cars-catalog.utils', () => {
  it('parses filters and sorting from search params', () => {
    const state = parseCarsCatalogSearchParams({
      brand: ['Tesla', 'BMW'],
      type: ['Electric', 'SUV'],
      priceMin: '30000',
      priceMax: '70000',
      ratingMin: '4.5',
      sort: 'price',
      direction: 'desc',
    });

    expect(state).toEqual({
      filters: {
        brands: ['Tesla', 'BMW'],
        types: ['Electric', 'SUV'],
        priceMin: 30000,
        priceMax: 70000,
        ratingMin: 4.5,
      },
      sort: {
        field: 'price',
        direction: 'desc',
      },
    });
  });

  it('falls back to defaults when search params are invalid', () => {
    const state = parseCarsCatalogSearchParams({
      type: ['Electric', 'Boat'],
      priceMin: 'abc',
      ratingMin: '9',
      sort: 'unknown',
      direction: 'sideways',
    });

    expect(state).toEqual({
      filters: {
        brands: [],
        types: ['Electric'],
      },
      sort: {
        field: 'brand',
        direction: 'asc',
      },
    });
  });

  it('builds distinct brand and type options from inventory', () => {
    const options = getCarsCatalogFilterOptions(carFixtures);

    expect(options.brands[0]).toEqual({
      label: 'Audi',
      value: 'Audi',
    });
    expect(options.types).toEqual([
      'Coupe',
      'Electric',
      'Hatchback',
      'Sedan',
      'SUV',
      'Truck',
    ]);
  });
});
