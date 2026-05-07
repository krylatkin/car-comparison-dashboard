import type { z } from 'zod';
import type {
  CarFiltersSchema,
  CarImageSchema,
  CarSchema,
  CarSortDirectionSchema,
  CarSortFieldSchema,
  CarTypeSchema,
} from './car.schemas';

export type Car = z.infer<typeof CarSchema>;
export type CarImage = z.infer<typeof CarImageSchema>;
export type CarType = z.infer<typeof CarTypeSchema>;
export type CarFilters = z.infer<typeof CarFiltersSchema>;
export type CarSortField = z.infer<typeof CarSortFieldSchema>;
export type CarSortDirection = z.infer<typeof CarSortDirectionSchema>;
