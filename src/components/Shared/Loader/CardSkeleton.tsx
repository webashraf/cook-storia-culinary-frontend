import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5">
      <Card className="min-h-[400px] w-full space-y-5 p-4" radius="lg">
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-4/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
          <Skeleton className="w-3/5 rounded-lg flex">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
      </Card>
      <Card className="min-h-[400px] w-full space-y-5 p-4" radius="lg">
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-4/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
          <Skeleton className="w-3/5 rounded-lg flex">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
      </Card>
      <Card className="min-h-[400px] w-full space-y-5 p-4" radius="lg">
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-4/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
          <Skeleton className="w-3/5 rounded-lg flex">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
      </Card>
      <Card className="min-h-[400px] w-full space-y-5 p-4" radius="lg">
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="h-40 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-4/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
          <Skeleton className="w-3/5 rounded-lg flex">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
          <div className="flex gap-2">
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/5 rounded-lg flex">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-3/5 rounded-lg flex">
              <div className="h-10 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardSkeleton;
