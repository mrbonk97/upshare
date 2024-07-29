"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "@/store/store";
import { useEffect } from "react";
import Image from "next/image";
import { signOutUser } from "@/lib/api/user-api";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const SignOutPage = () => {
  const signOut = useStore.use.signOut();
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });

  useEffect(() => {
    localStorage.removeItem("access_token");
    signOut();
    mutate();
  }, []);

  if (isError) throw "오류 발생";

  if (isSuccess)
    return (
      <main className="h-full flex2 flex-col">
        <Image src="/images/bye.png" width={300} height={300} alt="bye" />
        <span className="mt-2">로그아웃 완료</span>
        <div className="mt-0.5 opacity-70">
          <span>메인 화면으로</span>
          <Link href="/" className="ml-1 underline underline-offset-4">
            이동
          </Link>
        </div>
      </main>
    );

  return (
    <main className="h-full flex2 flex-col">
      <Spinner />
    </main>
  );
};

export default SignOutPage;
