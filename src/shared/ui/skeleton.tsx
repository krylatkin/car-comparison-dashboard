import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse rounded-2xl bg-gradient-to-r from-ink/10 via-ink/5 to-ink/10',
        className,
      )}
      {...props}
    />
  );
}

