import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label: string;
  description?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, description, id, label, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;

    return (
      <label
        htmlFor={checkboxId}
        className="flex cursor-pointer items-start gap-3 rounded-2xl p-1 text-left"
      >
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'mt-1 size-4 rounded border-line text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
            className,
          )}
          aria-describedby={descriptionId}
          {...props}
        />
        <span className="space-y-1">
          <span className="block text-sm font-medium text-ink">{label}</span>
          {description ? (
            <span id={descriptionId} className="block text-sm text-ink/65">
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

