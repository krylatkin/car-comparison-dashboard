import type { MetadataRoute } from 'next';
import { getCars } from '@/features/cars/data/cars.repository';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();

  return [
    {
      url: 'https://car-comparison.example.com/',
      lastModified: new Date(),
    },
    {
      url: 'https://car-comparison.example.com/cars',
      lastModified: new Date(),
    },
    {
      url: 'https://car-comparison.example.com/compare',
      lastModified: new Date(),
    },
    ...cars.map((car) => ({
      url: `https://car-comparison.example.com/cars/${car.slug}`,
      lastModified: new Date(car.updatedAt),
    })),
  ];
}

