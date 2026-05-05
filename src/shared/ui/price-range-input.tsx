import * as React from 'react';
import { cn } from '@/shared/lib/cn';

type PriceFieldLabels = {
  min?: string;
  max?: string;
};

export type PriceRangeInputProps = {
  id?: string;
  label: string;
  minValue?: number;
  maxValue?: number;
  onMinValueChange?: (value: number | undefined) => void;
  onMaxValueChange?: (value: number | undefined) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  labels?: PriceFieldLabels;
  description?: string;
  className?: string;
};

function parseOptionalNumber(value: string) {
  if (value.trim() === '') {
    return undefined;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? undefined : parsedValue;
}

export function PriceRangeInput({
  className,
  description,
  id,
  label,
  labels,
  maxPlaceholder = 'Max price',
  maxValue,
  minPlaceholder = 'Min price',
  minValue,
  onMaxValueChange,
  onMinValueChange,
}: PriceRangeInputProps) {
  const generatedId = React.useId();
  const fieldsetId = id ?? generatedId;
  const descriptionId = description ? `${fieldsetId}-description` : undefined;

  return (
    <fieldset className={cn('space-y-3', className)} aria-describedby={descriptionId}>
      <legend className="text-sm font-medium text-ink">{label}</legend>
      {description ? (
        <p id={descriptionId} className="text-sm text-ink/65">
          {description}
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm text-ink/70">{labels?.min ?? 'Minimum'}</span>
          <input
            inputMode="numeric"
            type="number"
            min={0}
            value={minValue ?? ''}
            placeholder={minPlaceholder}
            onChange={(event) => {
              onMinValueChange?.(parseOptionalNumber(event.currentTarget.value));
            }}
            className="min-h-11 w-full rounded-2xl border border-line bg-surface px-4 py-2 text-sm text-ink shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm text-ink/70">{labels?.max ?? 'Maximum'}</span>
          <input
            inputMode="numeric"
            type="number"
            min={0}
            value={maxValue ?? ''}
            placeholder={maxPlaceholder}
            onChange={(event) => {
              onMaxValueChange?.(parseOptionalNumber(event.currentTarget.value));
            }}
            className="min-h-11 w-full rounded-2xl border border-line bg-surface px-4 py-2 text-sm text-ink shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
      </div>
    </fieldset>
  );
}

