import { Spinner } from "@/components/spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="h-full w-full flex2">
      <Spinner loading={true} />
    </main>
  );
}
