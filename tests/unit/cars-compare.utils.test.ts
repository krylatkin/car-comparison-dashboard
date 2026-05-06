import { describe, expect, it } from 'vitest';
import {
  buildComparisonCarsParam,
  getCarsBySelectedSlugs,
  parseComparisonCarsParam,
  removeComparisonCar,
  toggleComparisonCar,
} from '@/features/cars/compare/cars-compare.utils';
import { carFixtures } from '@/features/cars/data/cars.mock';

describe('cars-compare.utils', () => {
  it('parses comparison slugs from a comma-separated param', () => {
    expect(
      parseComparisonCarsParam(
        'tesla-model-y-2024,bmw-x5-2023,tesla-model-y-2024,ford-f-150-2024,kia-sportage-2024,extra-car',
      ),
    ).toEqual([
      'tesla-model-y-2024',
      'bmw-x5-2023',
      'ford-f-150-2024',
      'kia-sportage-2024',
    ]);
  });

  it('toggles cars while enforcing the max comparison limit', () => {
    expect(
      toggleComparisonCar(['tesla-model-y-2024'], 'bmw-x5-2023'),
    ).toEqual(['tesla-model-y-2024', 'bmw-x5-2023']);

    expect(
      toggleComparisonCar(
        ['tesla-model-y-2024', 'bmw-x5-2023', 'audi-a5-2023', 'ford-f-150-2024'],
        'kia-sportage-2024',
      ),
    ).toEqual([
      'tesla-model-y-2024',
      'bmw-x5-2023',
      'audi-a5-2023',
      'ford-f-150-2024',
    ]);

    expect(
      toggleComparisonCar(['tesla-model-y-2024', 'bmw-x5-2023'], 'bmw-x5-2023'),
    ).toEqual(['tesla-model-y-2024']);
  });

  it('removes a car from comparison and serializes the param', () => {
    const selectedSlugs = removeComparisonCar(
      ['tesla-model-y-2024', 'bmw-x5-2023', 'audi-a5-2023'],
      'bmw-x5-2023',
    );

    expect(selectedSlugs).toEqual(['tesla-model-y-2024', 'audi-a5-2023']);
    expect(buildComparisonCarsParam(selectedSlugs)).toBe(
      'tesla-model-y-2024,audi-a5-2023',
    );
  });

  it('returns cars in the same order as the selected slugs', () => {
    const cars = getCarsBySelectedSlugs(carFixtures, [
      'ford-f-150-2024',
      'tesla-model-y-2024',
      'missing-slug',
    ]);

    expect(cars.map((car) => car.slug)).toEqual([
      'ford-f-150-2024',
      'tesla-model-y-2024',
    ]);
  });
});

