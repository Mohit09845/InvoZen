import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-5/6" />
    </div>
  );
}
