import { z } from 'zod';

export const CarTypeSchema = z.enum([
  'Sedan',
  'SUV',
  'Hatchback',
  'Coupe',
  'Truck',
  'Electric',
]);

export const CarImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().min(10),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const CarSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/),
  brand: z.string().min(2).max(60),
  model: z.string().min(1).max(80),
  year: z.number().int().min(1990).max(2035),
  type: CarTypeSchema,
  price: z.number().positive(),
  rating: z.number().min(0).max(5),
  weightKg: z.number().int().positive(),
  image: CarImageSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CarListSchema = z.array(CarSchema);

export const CarFiltersSchema = z.object({
  brands: z.array(z.string()).default([]),
  types: z.array(CarTypeSchema).default([]),
  priceMin: z.number().int().nonnegative().optional(),
  priceMax: z.number().int().nonnegative().optional(),
  ratingMin: z.number().min(0).max(5).optional(),
});

export const CarSortFieldSchema = z.enum(['brand', 'price', 'rating']);
export const CarSortDirectionSchema = z.enum(['asc', 'desc']);

export const CarSortSchema = z.object({
  field: CarSortFieldSchema,
  direction: CarSortDirectionSchema.default('asc'),
});

