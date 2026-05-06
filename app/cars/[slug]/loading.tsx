import { PageShell, Skeleton } from '@/shared/ui';

export default function CarDetailLoading() {
  return (
    <PageShell>
      <article className="space-y-8" aria-label="Loading car details">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <Skeleton className="aspect-[16/11] rounded-none" />
            <div className="space-y-8 p-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-16 rounded-full" />
                </div>
                <Skeleton className="h-12 w-full max-w-md" />
                <Skeleton className="h-24 w-full" />
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-11 w-40 rounded-full" />
                  <Skeleton className="h-11 w-36 rounded-full" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-24" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </article>
    </PageShell>
  );
}

