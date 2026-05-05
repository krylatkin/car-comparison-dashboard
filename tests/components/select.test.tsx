import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Select } from '@/shared/ui/select';

describe('Select', () => {
  it('associates the label with the select and renders options', () => {
    render(
      <Select
        label="Sort by"
        options={[
          { label: 'Price', value: 'price' },
          { label: 'Rating', value: 'rating' },
        ]}
        defaultValue="price"
      />,
    );

    const select = screen.getByLabelText(/sort by/i);
    expect(select).toHaveValue('price');
    expect(screen.getByRole('option', { name: 'Rating' })).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', () => {
    const handleChange = vi.fn();

    render(
      <Select
        label="Brand"
        options={[
          { label: 'Tesla', value: 'tesla' },
          { label: 'BMW', value: 'bmw' },
        ]}
        onChange={handleChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(/brand/i), {
      target: { value: 'bmw' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
