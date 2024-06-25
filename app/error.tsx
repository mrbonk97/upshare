"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="h-full flex-col md:flex-row flex2 gap-2">
      <div className=" ">
        <h1 className="text-6xl font-semibold text-rose-500">ERROR!</h1>
        <p className="mt-2 text-xl font-medium">오류가 발생했습니다</p>
        <Button className="hidden md:block mt-2 rounded-none" onClick={reset}>
          다시 시도하기
        </Button>
      </div>
      <div className="md:max-w-[50%]">
        <Image
          src={"/images/error.png"}
          width={400}
          height={400}
          alt="not-found"
        />
      </div>
      <Button asChild className="md:hidden mt-2 rounded-none">
        <Link href={"/"}>돌아가기</Link>
      </Button>
    </main>
  );
}
