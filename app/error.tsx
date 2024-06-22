"use client"; // Error components must be Client Components

import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="h-full flex2 flex-col">
      <h1 className="mb-10 text-4xl font-bold text-purple-500">
        오류가 발생했습니다.
      </h1>
      <Image
        src={"/images/3d-modeling-concept-illustration.png"}
        alt="error"
        width={400}
        height={400}
      />
    </main>
  );
}
