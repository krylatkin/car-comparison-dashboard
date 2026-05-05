import type { CarFilters, CarSortDirection, CarSortField, CarType } from '@/features/cars/domain/car.types';

export type CarsCatalogState = {
  filters: CarFilters;
  sort: {
    field: CarSortField;
    direction: CarSortDirection;
  };
};

export type CarFilterOption = {
  label: string;
  value: string;
};

export type CarsCatalogFilterOptions = {
  brands: CarFilterOption[];
  types: CarType[];
};

