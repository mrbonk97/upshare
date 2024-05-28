"use client";
import { Spinner } from "@/components/spinner";

export default function LoadingPage() {
  return (
    <main className="h-full w-full flex2">
      <Spinner loading />
    </main>
  );
}
