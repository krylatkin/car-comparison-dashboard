import { CarFiltersSchema, CarSortSchema } from './car.schemas';
import type {
  Car,
  CarFilters,
  CarSortDirection,
  CarSortField,
} from './car.types';

export function filterCars(cars: Car[], filters: CarFilters): Car[] {
  const parsedFilters = CarFiltersSchema.parse(filters);

  return cars.filter((car) => {
    const matchesBrand =
      parsedFilters.brands.length === 0 ||
      parsedFilters.brands.includes(car.brand);
    const matchesType =
      parsedFilters.types.length === 0 || parsedFilters.types.includes(car.type);
    const matchesMinPrice =
      parsedFilters.priceMin === undefined || car.price >= parsedFilters.priceMin;
    const matchesMaxPrice =
      parsedFilters.priceMax === undefined || car.price <= parsedFilters.priceMax;
    const matchesRating =
      parsedFilters.ratingMin === undefined || car.rating >= parsedFilters.ratingMin;

    return (
      matchesBrand &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesRating
    );
  });
}

const sortAccessors: Record<CarSortField, (car: Car) => number | string> = {
  brand: (car) => `${car.brand} ${car.model}`,
  price: (car) => car.price,
  rating: (car) => car.rating,
};

function compareValues(
  left: number | string,
  right: number | string,
  direction: CarSortDirection,
) {
  const multiplier = direction === 'asc' ? 1 : -1;

  if (typeof left === 'number' && typeof right === 'number') {
    return (left - right) * multiplier;
  }

  return String(left).localeCompare(String(right)) * multiplier;
}

export function sortCars(
  cars: Car[],
  sort: {
    field: CarSortField;
    direction?: CarSortDirection;
  },
): Car[] {
  const parsedSort = CarSortSchema.parse(sort);

  return [...cars].sort((left, right) =>
    compareValues(
      sortAccessors[parsedSort.field](left),
      sortAccessors[parsedSort.field](right),
      parsedSort.direction,
    ),
  );
}

