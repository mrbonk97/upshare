import { Spinner } from "@/components/spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="h-full w-full">
      <Spinner loading={true} />
    </main>
  );
}
