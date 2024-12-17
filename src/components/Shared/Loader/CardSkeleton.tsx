import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

type CardSkeletonProps = {
  count?: number; // Number of skeleton cards to render
};

const CardItemSkeleton = () => (
  <Card className="min-h-[400px] w-full space-y-5 p-4" radius="lg">
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <Skeleton className="flex rounded-full w-12 h-12" />
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton className="h-3 w-4/5 rounded-lg" />
      <Skeleton className="h-3 w-2/5 rounded-lg" />
      <Skeleton className="h-3 w-2/5 rounded-lg" />
    </div>
    <Skeleton className="h-40 rounded-lg" />
    <div className="space-y-3">
      <Skeleton className="h-3 w-2/5 rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
      </div>
      <Skeleton className="h-3 w-3/5 rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-1/5 rounded-lg" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
        <Skeleton className="h-10 w-3/5 rounded-lg" />
      </div>
    </div>
  </Card>
);

const CardSkeleton = ({ count = 4 }: CardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 px-5">
      {Array.from({ length: count }, (_, i) => (
        <CardItemSkeleton key={i} />
      ))}
    </div>
  );
};

export default CardSkeleton;
