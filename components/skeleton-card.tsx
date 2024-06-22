import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="mt-5 flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl pul-pul" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 pul-pul" />
        <Skeleton className="h-6 w-1/2 pul-pul" />
      </div>
    </div>
  );
}
