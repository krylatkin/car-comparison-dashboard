import { render, screen } from '@testing-library/react';
import HomePage from '../../app/page';

describe('HomePage', () => {
  it('renders the foundation headline', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /car comparison dashboard foundation/i,
      }),
    ).toBeInTheDocument();
  });
});
