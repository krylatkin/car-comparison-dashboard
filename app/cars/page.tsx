import type { Metadata } from 'next';
import Link from 'next/link';
import { getCars } from '@/features/cars/data/cars.repository';
import { formatCurrency } from '@/shared/lib/formatters';
import { PageShell } from '@/shared/ui/page-shell';

export const metadata: Metadata = {
  title: 'Cars',
  description: 'Browse the car inventory and prepare filters and comparisons.',
  alternates: {
    canonical: '/cars',
  },
};

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <PageShell>
      <section className="space-y-6">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
            Inventory
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Cars</h1>
          <p className="max-w-2xl text-base leading-7 text-ink/80">
            This route is intentionally lightweight for now. It proves the
            domain and SEO plumbing before we build the full filter and
            comparison experience.
          </p>
        </header>

        <ul className="grid gap-4 md:grid-cols-2">
          {cars.map((car) => (
            <li
              key={car.id}
              className="rounded-3xl border border-line bg-surface p-6 shadow-card"
            >
              <div className="space-y-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-ink/60">
                    {car.brand} • {car.type}
                  </p>
                  <h2 className="text-2xl font-semibold">
                    <Link className="no-underline" href={`/cars/${car.slug}`}>
                      {car.model}
                    </Link>
                  </h2>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-ink/60">Price</dt>
                    <dd className="font-medium">{formatCurrency(car.price)}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/60">Rating</dt>
                    <dd className="font-medium">{car.rating.toFixed(1)}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/60">Year</dt>
                    <dd className="font-medium">{car.year}</dd>
                  </div>
                  <div>
                    <dt className="text-ink/60">Weight</dt>
                    <dd className="font-medium">{car.weightKg} kg</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

