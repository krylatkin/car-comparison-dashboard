import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'children'
> & {
  label: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
  placeholder?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, error, hint, id, label, options, placeholder, required, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-ink"
        >
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'min-h-11 w-full appearance-none rounded-2xl border border-line bg-surface px-4 py-2 pr-10 text-sm text-ink shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-canvas disabled:text-ink/50',
              error ? 'border-red-600' : null,
              className,
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            required={required}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled={required}>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-ink/60"
          >
            ▼
          </span>
        </div>
        {hint ? (
          <p id={hintId} className="text-sm text-ink/65">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = 'Select';

