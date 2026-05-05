import { z } from 'zod';
import {
  CarFiltersSchema,
  CarSortDirectionSchema,
  CarSortFieldSchema,
  CarTypeSchema,
} from '@/features/cars/domain/car.schemas';
import type { Car } from '@/features/cars/domain/car.types';
import type {
  CarsCatalogFilterOptions,
  CarsCatalogState,
} from './cars-catalog.types';

type RawSearchParams = Record<string, string | string[] | undefined>;

function getValues(value: string | string[] | undefined) {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

function parseOptionalNumber(value: string | string[] | undefined) {
  const [firstValue] = getValues(value);

  if (!firstValue) {
    return undefined;
  }

  const parsedValue = Number(firstValue);
  return Number.isFinite(parsedValue) ? parsedValue : undefined;
}

function parseOptionalFilterNumber(
  value: string | string[] | undefined,
  schema: z.ZodType<number | undefined>,
) {
  const parsedValue = parseOptionalNumber(value);
  const result = schema.safeParse(parsedValue);

  return result.success ? result.data : undefined;
}

export function parseCarsCatalogSearchParams(
  searchParams: RawSearchParams,
): CarsCatalogState {
  const rawBrands = getValues(searchParams.brand).filter(Boolean);
  const rawTypes = getValues(searchParams.type)
    .map((value) => CarTypeSchema.safeParse(value))
    .flatMap((result) => (result.success ? [result.data] : []));
  const sortFieldResult = CarSortFieldSchema.safeParse(searchParams.sort);
  const sortDirectionResult = CarSortDirectionSchema.safeParse(
    searchParams.direction,
  );

  const filters = CarFiltersSchema.parse({
    brands: rawBrands,
    types: rawTypes,
    priceMin: parseOptionalFilterNumber(
      searchParams.priceMin,
      CarFiltersSchema.shape.priceMin,
    ),
    priceMax: parseOptionalFilterNumber(
      searchParams.priceMax,
      CarFiltersSchema.shape.priceMax,
    ),
    ratingMin: parseOptionalFilterNumber(
      searchParams.ratingMin,
      CarFiltersSchema.shape.ratingMin,
    ),
  });

  return {
    filters,
    sort: {
      field: sortFieldResult.success ? sortFieldResult.data : 'brand',
      direction: sortDirectionResult.success ? sortDirectionResult.data : 'asc',
    },
  };
}

export function getCarsCatalogFilterOptions(cars: Car[]): CarsCatalogFilterOptions {
  const brands = Array.from(new Set(cars.map((car) => car.brand)))
    .sort((left, right) => left.localeCompare(right))
    .map((brand) => ({
      label: brand,
      value: brand,
    }));

  const types = Array.from(new Set(cars.map((car) => car.type))).sort((left, right) =>
    left.localeCompare(right),
  );

  return {
    brands,
    types,
  };
}
