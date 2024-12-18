import { Skeleton } from "@nextui-org/skeleton";

const UserSkeleton = () => {
  return (
    <>
      <div className="max-w-[300px] w-full flex items-center gap-3 mt-5">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default UserSkeleton;
