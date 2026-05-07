import { expect, test } from '@playwright/test';

test.describe('/compare flow', () => {
  test('opens the car detail page when the catalog image is clicked', async ({
    page,
  }) => {
    await page.goto('/cars?sort=brand&direction=asc');

    const imageLink = page.getByRole('link', {
      name: /view details for 2023 audi a5/i,
    });

    await Promise.all([
      page.waitForURL(/\/cars\/audi-a5-2023$/),
      imageLink.click(),
    ]);

    await expect(
      page.getByRole('heading', { name: /2023 audi a5/i }),
    ).toBeVisible();
  });

  test('filters the catalog, selects two cars, and opens the comparison table', async ({
    page,
  }) => {
    await page.goto('/cars');

    await page.getByLabel('Electric').check();
    await page.getByRole('button', { name: /apply filters/i }).click();

    await expect(page).toHaveURL(/\/cars\?/);
    await expect(page.getByText('2 results')).toBeVisible();

    await page.getByRole('button', { name: 'Add to compare' }).nth(0).click();
    await expect(page.getByText('1 of 4 selected')).toBeVisible();

    await page.getByRole('button', { name: 'Add to compare' }).nth(0).click();
    await expect(page.getByText('2 of 4 selected')).toBeVisible();

    const compareLink = page.getByRole('link', {
      name: /compare selected cars/i,
    });
    await Promise.all([
      page.waitForURL(/\/compare\?cars=/),
      compareLink.click(),
    ]);

    await expect(
      page.getByRole('heading', { name: /compare selected cars/i }),
    ).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Ioniq 5' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Model Y' })).toBeVisible();
  });

  test('lets the user add cars from a detail page without redirecting to comparison', async ({
    page,
  }) => {
    await page.goto('/cars?sort=brand&direction=asc');

    await page.getByRole('button', { name: 'Add to compare' }).nth(0).click();
    await expect(page.getByText('1 of 4 selected')).toBeVisible();

    await Promise.all([
      page.waitForURL(/\/cars\/bmw-x5-2023\?cars=audi-a5-2023$/),
      page.getByRole('link', { name: /view details for 2023 bmw x5/i }).click(),
    ]);

    await expect(
      page.getByRole('heading', { name: /2023 bmw x5/i }),
    ).toBeVisible();
    await expect(page).toHaveURL(/cars=bmw-x5-2023|cars=audi-a5-2023/);

    await Promise.all([
      page.waitForURL(/\/cars\/bmw-x5-2023\?cars=audi-a5-2023,bmw-x5-2023$/),
      page
        .locator('header')
        .getByRole('button', { name: 'Add to compare' })
        .click(),
    ]);
    await expect(
      page.getByRole('button', { name: 'Remove from compare' }),
    ).toBeVisible();

    const detailUrl = new URL(page.url());
    expect(detailUrl.pathname).toBe('/cars/bmw-x5-2023');
    expect(detailUrl.searchParams.get('cars')).toBe('audi-a5-2023,bmw-x5-2023');

    await Promise.all([
      page.waitForURL(/\/compare\?cars=audi-a5-2023,bmw-x5-2023$/),
      page.getByRole('link', { name: /open comparison/i }).click(),
    ]);

    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'A5' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'X5' })).toBeVisible();
  });

  test('renders selected cars in the comparison table from URL params', async ({
    page,
  }) => {
    await page.goto('/compare?cars=tesla-model-y-2024,bmw-x5-2023');

    await expect(
      page.getByRole('heading', { name: /compare selected cars/i }),
    ).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Model Y' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'X5' })).toBeVisible();
    await expect(page.getByRole('rowheader', { name: 'Price' })).toBeVisible();
    await expect(page.getByText('$52,990')).toBeVisible();
    await expect(page.getByText('$68,100')).toBeVisible();
  });

  test('preserves comparison params when navigating from compare to a car detail page', async ({
    page,
  }) => {
    await page.goto('/compare?cars=tesla-model-y-2024,bmw-x5-2023');

    await Promise.all([
      page.waitForURL(
        /\/cars\/tesla-model-y-2024\?cars=tesla-model-y-2024,bmw-x5-2023$/,
      ),
      page.getByRole('link', { name: 'Model Y' }).click(),
    ]);

    const detailUrl = new URL(page.url());
    expect(detailUrl.pathname).toBe('/cars/tesla-model-y-2024');
    expect(detailUrl.searchParams.get('cars')).toBe(
      'tesla-model-y-2024,bmw-x5-2023',
    );

    await expect(
      page.getByRole('heading', { name: /2024 tesla model y/i }),
    ).toBeVisible();
  });

  test('supports selecting cars from the catalog and removing one from comparison', async ({
    page,
  }) => {
    await page.goto('/cars?sort=brand&direction=asc');

    await page.getByRole('button', { name: 'Add to compare' }).nth(0).click();
    await expect(page).toHaveURL(/cars\?sort=brand&direction=asc&cars=/);
    await expect(page.getByText('1 of 4 selected')).toBeVisible();

    await page.getByRole('button', { name: 'Add to compare' }).nth(0).click();
    await expect(page.getByText('2 of 4 selected')).toBeVisible();

    const compareLink = page.getByRole('link', {
      name: /compare selected cars/i,
    });
    await expect(compareLink).toHaveAttribute('href', /\/compare\?cars=/);
    await Promise.all([
      page.waitForURL(/\/compare\?cars=/),
      compareLink.click(),
    ]);

    const compareUrl = new URL(page.url());
    expect(compareUrl.pathname).toBe('/compare');
    expect(compareUrl.searchParams.get('cars')).toContain('audi-a5-2023');
    expect(compareUrl.searchParams.get('cars')).toContain('bmw-x5-2023');

    await expect(page.getByRole('heading', { name: 'A5' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'X5' })).toBeVisible();

    const audiColumn = page.locator('th', {
      has: page.getByRole('heading', { name: 'A5' }),
    });
    await Promise.all([
      page.waitForURL(/\/compare\?cars=bmw-x5-2023$/),
      audiColumn.getByRole('link', { name: 'Remove from comparison' }).click(),
    ]);

    const updatedUrl = new URL(page.url());
    expect(updatedUrl.pathname).toBe('/compare');
    expect(updatedUrl.searchParams.get('cars')).toBe('bmw-x5-2023');
    await expect(page.getByRole('heading', { name: 'A5' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'X5' })).toBeVisible();
  });

  test('shows the empty state when no cars are selected', async ({ page }) => {
    await page.goto('/compare');

    await expect(
      page.getByRole('heading', { name: /no cars selected for comparison/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /browse cars/i }),
    ).toBeVisible();
  });
});
