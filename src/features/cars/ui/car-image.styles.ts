import type { CSSProperties } from 'react';
import type { CarImage } from '@/features/cars/domain/car.types';

export function getCarImageObjectPosition(image: CarImage): CSSProperties {
  return {
    objectPosition: `${image.focalPoint.x}% ${image.focalPoint.y}%`,
  };
}
