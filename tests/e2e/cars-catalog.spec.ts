import { expect, test } from '@playwright/test';

test.describe('/cars catalog', () => {
  test('renders the catalog grid and default sorting state', async ({ page }) => {
    await page.goto('/cars');

    await expect(
      page.getByRole('heading', { name: /^cars$/i }),
    ).toBeVisible();
    await expect(page.getByText('8 results')).toBeVisible();
    await expect(page.getByText('Sorted by brand (asc)')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'A5' }).first(),
    ).toBeVisible();
  });

  test('applies filters and sorting from the form and persists them in the URL', async ({
    page,
  }) => {
    await page.goto('/cars');

    await page.getByLabel('Tesla').check();
    await page.getByLabel('Electric').check();
    await page.getByLabel('Minimum rating').selectOption('4.7');
    await page.getByLabel('Field').selectOption('rating');
    await page.getByLabel('Direction').selectOption('desc');
    await page.getByRole('button', { name: /apply filters/i }).click();

    await expect(page).toHaveURL(/\/cars\?/);

    const url = new URL(page.url());
    expect(url.pathname).toBe('/cars');
    expect(url.searchParams.get('sort')).toBe('rating');
    expect(url.searchParams.get('direction')).toBe('desc');
    expect(url.searchParams.get('brand')).toBe('Tesla');
    expect(url.searchParams.get('type')).toBe('Electric');
    expect(url.searchParams.get('ratingMin')).toBe('4.7');

    await expect(page.getByText('1 results')).toBeVisible();
    await expect(page.getByText('Sorted by rating (desc)')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Model Y' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ioniq 5' })).toHaveCount(0);
  });

  test('shows the empty state when filters produce no matches', async ({ page }) => {
    await page.goto(
      '/cars?brand=Tesla&type=Truck&priceMin=100000&sort=brand&direction=asc',
    );

    await expect(page.getByText('0 results')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /no cars match these filters/i }),
    ).toBeVisible();
  });
});
