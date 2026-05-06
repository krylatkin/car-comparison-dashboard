import { PageShell, Skeleton } from '@/shared/ui';

export default function CompareLoading() {
  return (
    <PageShell>
      <section className="space-y-6" aria-label="Loading comparison table">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-72 max-w-full" />
          <Skeleton className="h-20 w-full max-w-2xl" />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] rounded-3xl border border-line bg-surface p-6 shadow-card">
            <div className="grid grid-cols-[180px_repeat(3,minmax(0,1fr))] gap-4">
              {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} className="h-16" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

