import Link from 'next/link';
import type {
  CarsCatalogFilterOptions,
  CarsCatalogState,
} from '@/features/cars/catalog/cars-catalog.types';
import {
  carRatingOptions,
  carSortDirectionOptions,
  carSortFieldOptions,
} from '@/features/cars/catalog/cars-catalog.constants';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  PriceRangeInput,
  Select,
} from '@/shared/ui';

type CarsCatalogFiltersProps = {
  options: CarsCatalogFilterOptions;
  state: CarsCatalogState;
  selectedComparisonSlugs: string[];
};

export function CarsCatalogFilters({
  options,
  state,
  selectedComparisonSlugs,
}: CarsCatalogFiltersProps) {
  const resetHref =
    selectedComparisonSlugs.length > 0
      ? `/cars?cars=${selectedComparisonSlugs.join(',')}`
      : '/cars';

  return (
    <Card className="h-fit">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
              Filters
            </p>
            <CardTitle>Refine inventory</CardTitle>
          </div>
          <Link
            href={resetHref}
            className="text-sm font-medium text-accentDark no-underline hover:underline"
          >
            Reset
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <form action="/cars" className="space-y-6">
          {selectedComparisonSlugs.length > 0 ? (
            <input
              type="hidden"
              name="cars"
              value={selectedComparisonSlugs.join(',')}
            />
          ) : null}
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-ink">Sort by</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Select
                name="sort"
                label="Field"
                options={carSortFieldOptions}
                defaultValue={state.sort.field}
              />
              <Select
                name="direction"
                label="Direction"
                options={carSortDirectionOptions}
                defaultValue={state.sort.direction}
              />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-ink">Brand</legend>
            <div className="grid gap-2">
              {options.brands.map((brand) => (
                <Checkbox
                  key={brand.value}
                  name="brand"
                  value={brand.value}
                  label={brand.label}
                  defaultChecked={state.filters.brands.includes(brand.value)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-ink">Type</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {options.types.map((type) => (
                <Checkbox
                  key={type}
                  name="type"
                  value={type}
                  label={type}
                  defaultChecked={state.filters.types.includes(type)}
                />
              ))}
            </div>
          </fieldset>

          <PriceRangeInput
            label="Price range"
            minName="priceMin"
            maxName="priceMax"
            minValue={state.filters.priceMin}
            maxValue={state.filters.priceMax}
            minPlaceholder="20000"
            maxPlaceholder="70000"
            description="Leave either field empty to keep the range open."
          />

          <Select
            name="ratingMin"
            label="Minimum rating"
            options={carRatingOptions}
            defaultValue={
              state.filters.ratingMin === undefined
                ? ''
                : String(state.filters.ratingMin)
            }
          />

          <div className="flex flex-wrap gap-3">
            <Button type="submit">Apply filters</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
