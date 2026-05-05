import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCarBySlug,
  getCars,
} from '@/features/cars/data/cars.repository';
import { buildCarJsonLd } from '@/features/cars/seo/build-car-json-ld';
import { formatCurrency } from '@/shared/lib/formatters';
import { PageShell } from '@/shared/ui/page-shell';

type CarDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const cars = await getCars();

  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: 'Car not found',
    };
  }

  return {
    title: `${car.brand} ${car.model}`,
    description: `View specs, pricing, and rating for the ${car.year} ${car.brand} ${car.model}.`,
    alternates: {
      canonical: `/cars/${car.slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${car.brand} ${car.model}`,
      description: `Detailed information for the ${car.year} ${car.brand} ${car.model}.`,
      url: `https://car-comparison.example.com/cars/${car.slug}`,
      images: [
        {
          url: car.image.src,
          width: car.image.width,
          height: car.image.height,
          alt: car.image.alt,
        },
      ],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const jsonLd = buildCarJsonLd(car);

  return (
    <PageShell>
      <article className="space-y-8 rounded-3xl border border-line bg-surface p-8 shadow-card">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentDark">
            {car.type}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {car.year} {car.brand} {car.model}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-ink/80">
            SEO metadata, canonical routing, and structured data are already in
            place for this detail page. The richer product layout comes next.
          </p>
        </header>

        <dl className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line p-4">
            <dt className="text-sm text-ink/60">Price</dt>
            <dd className="mt-1 text-2xl font-semibold">
              {formatCurrency(car.price)}
            </dd>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <dt className="text-sm text-ink/60">Rating</dt>
            <dd className="mt-1 text-2xl font-semibold">{car.rating}</dd>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <dt className="text-sm text-ink/60">Weight</dt>
            <dd className="mt-1 text-2xl font-semibold">{car.weightKg} kg</dd>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <dt className="text-sm text-ink/60">Slug</dt>
            <dd className="mt-1 text-2xl font-semibold">{car.slug}</dd>
          </div>
        </dl>
      </article>
    </PageShell>
  );
}

