"use client";
import { Spinner } from "@/components/spinner";
import { signOutUser } from "@/lib/action/user-action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import useStore from "@/store/store";
import { useEffect } from "react";
import Image from "next/image";

const SignOutPage = () => {
  const signOut = useStore.use.signOut();
  const queryClient = useQueryClient();

  const { isPending, isError, isSuccess } = useQuery({
    queryKey: ["signOut"],
    queryFn: signOutUser,
  });

  useEffect(() => {
    if (!isSuccess) return;
    localStorage.removeItem("access_token");
    signOut();
    queryClient.clear();
  }, [isSuccess]);

  if (isError) throw "오류 발생";

  return (
    <main className="h-full min-h-[500px] flex2 flex-col gap-10 overflow-hidden">
      <h2 className="text-center text-xl md:text-2xl font-bold">
        {isPending
          ? "로그아웃 중..."
          : "로그아웃 되었습니다. 안전한 하루 되세요!"}
      </h2>

      <div className="relative">
        <div className="absolute w-[2000px] h-[600px] bg-blue-400 rounded-[80%] -z-10 -translate-x-96 translate-y-36"></div>
        {isPending ? (
          <div className="h-[294px] flex2">
            <Spinner />
          </div>
        ) : (
          <Image src="/images/bye.png" width={300} height={300} alt="bye" />
        )}
      </div>
      {isPending ? (
        <p>...</p>
      ) : (
        <p>
          첫 페이지로{" "}
          <Link href="/">
            <u>이동</u>
          </Link>
        </p>
      )}
    </main>
  );
};

export default SignOutPage;
