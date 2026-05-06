import { CarCardSkeleton } from '@/features/cars/ui/car-card-skeleton';
import { PageShell, Skeleton } from '@/shared/ui';

export default function CarsLoading() {
  return (
    <PageShell>
      <section className="space-y-8" aria-label="Loading cars catalog">
        <header className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-20 w-full max-w-2xl" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-40 rounded-full" />
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-line bg-surface p-6 shadow-card">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-11 w-36 rounded-full" />
          </aside>

          <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

