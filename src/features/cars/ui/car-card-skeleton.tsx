import { Card, CardContent, Skeleton } from '@/shared/ui';

export function CarCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-7 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-36" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="ml-auto h-4 w-14" />
            <Skeleton className="ml-auto h-7 w-10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>
      </CardContent>
    </Card>
  );
}

