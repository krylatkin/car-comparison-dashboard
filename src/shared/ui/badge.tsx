import * as React from 'react';
import { cn } from '@/shared/lib/cn';

const badgeVariants = {
  neutral: 'bg-ink/8 text-ink',
  accent: 'bg-accent/15 text-accentDark',
  success: 'bg-emerald-100 text-emerald-800',
  subtle: 'border border-line bg-surface text-ink/80',
} as const;

type BadgeVariant = keyof typeof badgeVariants;

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
