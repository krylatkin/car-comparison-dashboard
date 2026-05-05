import * as React from 'react';
import { cn } from '@/shared/lib/cn';

const buttonVariants = {
  variant: {
    primary: 'bg-ink text-surface hover:bg-ink/90',
    secondary: 'border border-line bg-surface text-ink hover:bg-canvas',
    ghost: 'bg-transparent text-ink hover:bg-ink/5',
    danger: 'bg-red-700 text-white hover:bg-red-800',
  },
  size: {
    sm: 'min-h-10 px-4 text-sm',
    md: 'min-h-11 px-5 text-sm',
    lg: 'min-h-12 px-6 text-base',
  },
} as const;

type ButtonVariant = keyof typeof buttonVariants.variant;
type ButtonSize = keyof typeof buttonVariants.size;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      size = 'md',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled === true || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full font-medium no-underline transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60',
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className,
        )}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
              aria-hidden="true"
            />
            <span>Loading</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
