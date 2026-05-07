'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MAX_COMPARISON_CARS } from '@/features/cars/compare/cars-compare.constants';
import {
  buildComparisonCarsParam,
  toggleComparisonCar,
} from '@/features/cars/compare/cars-compare.utils';
import { cn } from '@/shared/lib/cn';

type CompareToggleButtonProps = {
  slug: string;
  selectedSlugs: string[];
  className?: string;
  limitReachedClassName?: string;
  variant?: 'inline' | 'pill';
};

export function CompareToggleButton({
  slug,
  selectedSlugs,
  className,
  limitReachedClassName,
  variant = 'inline',
}: CompareToggleButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isHydrated, setIsHydrated] = useState(false);
  const selectedSlugsKey = useMemo(
    () => selectedSlugs.join(','),
    [selectedSlugs],
  );
  const [optimisticSelectedSlugs, setOptimisticSelectedSlugs] =
    useState(selectedSlugs);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    setOptimisticSelectedSlugs(selectedSlugs);
  }, [selectedSlugs, selectedSlugsKey]);

  const isSelected = optimisticSelectedSlugs.includes(slug);
  const nextSelectedSlugs = toggleComparisonCar(optimisticSelectedSlugs, slug);
  const canAddMore =
    optimisticSelectedSlugs.length < MAX_COMPARISON_CARS || isSelected;

  const buttonClassName =
    variant === 'pill'
      ? 'inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-surface transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto disabled:cursor-not-allowed disabled:opacity-60'
      : 'inline-flex w-full text-left leading-6 text-accentDark transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto disabled:cursor-not-allowed disabled:opacity-60';

  function handleClick() {
    if (!canAddMore || isPending) {
      return;
    }

    setOptimisticSelectedSlugs(nextSelectedSlugs);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      const nextCarsParam = buildComparisonCarsParam(nextSelectedSlugs);

      if (nextCarsParam.length > 0) {
        params.set('cars', nextCarsParam);
      } else {
        params.delete('cars');
      }

      const nextUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(nextUrl, { scroll: false });
    });
  }

  if (!canAddMore) {
    return (
      <span className={cn('text-ink/50', limitReachedClassName)}>
        Compare limit reached
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending || !isHydrated}
      aria-pressed={isSelected}
      className={cn(buttonClassName, className)}
    >
      {isSelected ? 'Remove from compare' : 'Add to compare'}
    </button>
  );
}
