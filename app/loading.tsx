import { PageShell, Skeleton } from '@/shared/ui';

export default function RootLoading() {
  return (
    <PageShell>
      <div className="space-y-6 rounded-3xl border border-line bg-surface p-8 shadow-card">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-12 w-80 max-w-full" />
        <Skeleton className="h-24 w-full max-w-3xl" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-11 w-36 rounded-full" />
          <Skeleton className="h-11 w-32 rounded-full" />
        </div>
      </div>
    </PageShell>
  );
}

