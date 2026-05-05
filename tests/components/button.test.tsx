import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '@/shared/ui/button';

describe('Button', () => {
  it('renders an accessible button and triggers click handlers', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Compare</Button>);

    const button = screen.getByRole('button', { name: /compare/i });
    fireEvent.click(button);

    expect(button).toHaveAttribute('type', 'button');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables itself while loading', () => {
    render(<Button isLoading>Save</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});

