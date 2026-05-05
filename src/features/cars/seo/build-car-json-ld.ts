import type { Car } from '@/features/cars/domain/car.types';

export function buildCarJsonLd(car: Car) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    brand: {
      '@type': 'Brand',
      name: car.brand,
    },
    name: `${String(car.year)} ${car.brand} ${car.model}`,
    image: [car.image.src],
    sku: car.id,
    category: car.type,
    description: `Compare the ${String(car.year)} ${car.brand} ${car.model} by price, weight, rating, and category.`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: car.price,
      priceCurrency: 'USD',
      url: `https://car-comparison.example.com/cars/${car.slug}`,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: `${String(car.weightKg)} kg`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Rating',
        value: car.rating.toFixed(1),
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: car.rating.toFixed(1),
      bestRating: '5',
      worstRating: '0',
      reviewCount: '1',
    },
  };
}
