import * as React from 'react';
import { cn } from '@/shared/lib/cn';

export type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
};

export function EmptyState({
  action,
  className,
  description,
  icon,
  title,
  ...props
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        'rounded-3xl border border-dashed border-line bg-surface px-6 py-12 text-center shadow-card',
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-md space-y-4">
        {icon ? (
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-ink/5 text-ink/70">
            {icon}
          </div>
        ) : null}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm leading-6 text-ink/70">{description}</p>
        </div>
        {action ? <div className="flex justify-center">{action}</div> : null}
      </div>
    </section>
  );
}

