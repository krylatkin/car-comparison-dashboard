import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { carFixtures } from '@/features/cars/data/cars.mock';
import { CarsComparisonTable } from '@/features/cars/ui/cars-comparison-table';

describe('CarsComparisonTable', () => {
  it('renders selected cars in an accessible comparison table', () => {
    render(
      <CarsComparisonTable
        cars={[carFixtures[0], carFixtures[1], carFixtures[2]].flatMap((car) =>
          car ? [car] : [],
        )}
      />,
    );

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const headers = within(table).getAllByRole('columnheader');
    expect(headers).toHaveLength(4);
    expect(within(table).getAllByText('Model Y')).toHaveLength(2);
    expect(within(table).getAllByText('X5')).toHaveLength(2);
    expect(within(table).getAllByText('Camry')).toHaveLength(2);

    expect(
      within(table).getByRole('rowheader', { name: 'Price' }),
    ).toBeVisible();
    expect(within(table).getByText('$52,990')).toBeVisible();
    expect(
      within(table).getAllByRole('link', { name: /remove from comparison/i }),
    ).toHaveLength(3);
  });
});
