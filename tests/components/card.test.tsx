import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

describe('Card', () => {
  it('renders composed content', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Electric cars</CardTitle>
          <CardDescription>Compare efficient daily drivers.</CardDescription>
        </CardHeader>
        <CardContent>8 results</CardContent>
      </Card>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /electric cars/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/compare efficient daily drivers/i)).toBeVisible();
    expect(screen.getByText('8 results')).toBeVisible();
  });
});

