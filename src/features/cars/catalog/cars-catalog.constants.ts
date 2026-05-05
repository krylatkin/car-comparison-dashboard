import type { SelectOption } from '@/shared/ui';

export const carSortFieldOptions: SelectOption[] = [
  {
    label: 'Brand',
    value: 'brand',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Rating',
    value: 'rating',
  },
];

export const carSortDirectionOptions: SelectOption[] = [
  {
    label: 'Ascending',
    value: 'asc',
  },
  {
    label: 'Descending',
    value: 'desc',
  },
];

export const carRatingOptions: SelectOption[] = [
  {
    label: 'Any rating',
    value: '',
  },
  {
    label: '4.0 and up',
    value: '4',
  },
  {
    label: '4.5 and up',
    value: '4.5',
  },
  {
    label: '4.7 and up',
    value: '4.7',
  },
];

