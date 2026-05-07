import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  buildComparisonCarsParam,
  parseComparisonCarsParam,
} from '@/features/cars/compare/cars-compare.utils';
import { getCarBySlug, getCars } from '@/features/cars/data/cars.repository';
import { CompareToggleButton } from '@/features/cars/ui/compare-toggle-button';
import { getCarImageObjectPosition } from '@/features/cars/ui/car-image.styles';
import { buildCarJsonLd } from '@/features/cars/seo/build-car-json-ld';
import { formatCurrency } from '@/shared/lib/formatters';
import { Badge, Card, CardContent, PageShell } from '@/shared/ui';

export const dynamicParams = false;

type CarDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function buildCarDescription(
  brand: string,
  model: string,
  year: number,
  type: string,
) {
  return `Explore pricing, rating, weight, and category details for the ${year} ${brand} ${model}, a ${type.toLowerCase()} available in the car comparison catalog.`;
}

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

  const title = `${car.year} ${car.brand} ${car.model}`;
  const description = buildCarDescription(
    car.brand,
    car.model,
    car.year,
    car.type,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/cars/${car.slug}`,
    },
    openGraph: {
      type: 'website',
      title,
      description,
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [car.image.src],
    },
  };
}

export default async function CarDetailPage({
  params,
  searchParams,
}: CarDetailPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const jsonLd = buildCarJsonLd(car);
  const selectedComparisonSlugs = parseComparisonCarsParam(query.cars);
  const selectedCarsParam = buildComparisonCarsParam(selectedComparisonSlugs);
  const compareHref =
    selectedCarsParam.length > 0
      ? `/compare?cars=${selectedCarsParam}`
      : `/compare?cars=${car.slug}`;
  const backToCatalogHref =
    selectedCarsParam.length > 0 ? `/cars?cars=${selectedCarsParam}` : '/cars';

  return (
    <PageShell>
      <article className="space-y-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="relative aspect-[16/11] lg:aspect-auto lg:h-full">
              <Image
                src={car.image.src}
                alt={car.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                style={getCarImageObjectPosition(car.image)}
              />
            </div>

            <CardContent className="space-y-8 p-8">
              <header className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="accent">{car.type}</Badge>
                  <Badge variant="subtle">{car.year}</Badge>
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-tight">
                    {car.year} {car.brand} {car.model}
                  </h1>
                  <p className="text-base leading-7 text-ink/80">
                    Compare this {car.type.toLowerCase()} by price, rating,
                    weight, and model year. This detail page is fully rendered
                    on the server so search engines can crawl the full content
                    without any client-side interaction.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <CompareToggleButton
                    slug={car.slug}
                    selectedSlugs={selectedComparisonSlugs}
                    variant="pill"
                  />
                  <Link
                    href={compareHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-ink no-underline transition hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Open comparison
                  </Link>
                  <Link
                    href={backToCatalogHref}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-ink no-underline transition hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Back to catalog
                  </Link>
                </div>
              </header>

              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line p-4">
                  <dt className="text-sm text-ink/60">Price</dt>
                  <dd className="mt-1 text-2xl font-semibold">
                    {formatCurrency(car.price)}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line p-4">
                  <dt className="text-sm text-ink/60">Rating</dt>
                  <dd className="mt-1 text-2xl font-semibold">
                    {car.rating.toFixed(1)}
                  </dd>
                </div>
                <div className="rounded-2xl border border-line p-4">
                  <dt className="text-sm text-ink/60">Weight</dt>
                  <dd className="mt-1 text-2xl font-semibold">
                    {car.weightKg} kg
                  </dd>
                </div>
                <div className="rounded-2xl border border-line p-4">
                  <dt className="text-sm text-ink/60">Slug</dt>
                  <dd className="mt-1 text-base font-medium">{car.slug}</dd>
                </div>
              </dl>
            </CardContent>
          </div>
        </Card>

        <section className="grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card>
            <CardContent className="space-y-4 p-5 sm:p-6 lg:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Overview
              </h2>
              <p className="leading-7 text-ink/80">
                The {car.year} {car.brand} {car.model} is listed as a{' '}
                {car.type.toLowerCase()} in this comparison catalog. Use this
                page to inspect the core specs first, then add the car to the
                comparison table to evaluate it against other models side by
                side.
              </p>
              <p className="leading-7 text-ink/80">
                Because this page is rendered with static params, dynamic
                metadata, and embedded structured data, it stays indexable and
                useful for both users and crawlers even before any interactive
                enhancements are loaded.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-5 sm:p-6 lg:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Next actions
              </h2>
              <ul className="space-y-3 text-sm leading-6 text-ink/80">
                <li>Open the comparison table with this car preselected.</li>
                <li>Return to the catalog to compare more models.</li>
                <li>Review structured specs before filtering alternatives.</li>
              </ul>
              <CompareToggleButton
                slug={car.slug}
                selectedSlugs={selectedComparisonSlugs}
              />
            </CardContent>
          </Card>
        </section>
      </article>
    </PageShell>
  );
}
