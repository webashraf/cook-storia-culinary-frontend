import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const StorySkeleton = () => {
  return (
    <div className="flex gap-5 p-5  w-full">
      {fakeData.map((_, index) => (
        <Card
          key={index}
          className="min-h-[300px w-full  p- bg-transparent"
          radius="lg"
        >
          <div className="max-w-[400px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full size-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-2 w-4/6 rounded-lg" />
            </div>
          </div>

          <Skeleton className="rounded-2xl mt-3 w-full h-60" />
          <div className="space-y-3" />
        </Card>
      ))}
    </div>
  );
};

const fakeData = Array.from({ length: 4 });

export default StorySkeleton;
