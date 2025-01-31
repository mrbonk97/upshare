export const TableSkeleton = () => {
  return (
    <>
      <Sekeleton delay={"0"} />
      <Sekeleton delay={"100ms"} />
      <Sekeleton delay={"200ms"} />
      <Sekeleton delay={"300ms"} />
      <Sekeleton delay={"400ms"} />
    </>
  );
};

const Sekeleton = ({ delay }: { delay: string }) => (
  <div
    role="row"
    className="mt-1 py-2 lg:py-4 px-1 h-10 lg:h-14 grid grid-cols-6 lg:grid-cols-10 gap-2 animate-pulse"
    style={{ animationDelay: delay }}
  >
    <div className="col-span-3 flex gap-2 justify-between">
      <div className="aspect-square rounded-full bg-primary/10" />
      <div className="w-full rounded-lg bg-primary/10" />
    </div>
    <div className="hidden lg:flex col-span-2 justify-end">
      <div className="h-full w-2/3 rounded-lg bg-primary/10" />
    </div>
    <div className="hidden lg:flex col-span-1 justify-end">
      <div className="h-full w-2/3 rounded-lg bg-primary/10" />
    </div>
    <div className="flex col-span-2 justify-center">
      <div className="h-full w-2/3 rounded-lg bg-primary/10" />
    </div>
    <div className="hidden lg:flex col-span-1 justify-center">
      <div className="h-full w-2/3 rounded-lg bg-primary/10" />
    </div>
    <div className="col-span-1 flex justify-end">
      <div className="h-full w-2/3 rounded-lg bg-primary/10" />
    </div>
  </div>
);
