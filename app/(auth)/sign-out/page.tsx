"use client";
import { Spinner } from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

const SignOutPage = () => {
  const queryClient = useQueryClient();
  const { isPending, error } = useQuery({
    queryKey: ["sign-out"],
    queryFn: () => api.get("/users/me/sign-out", { withCredentials: true }),
    refetchOnWindowFocus: false,
  });

  if (!isPending) localStorage.removeItem("access_token");
  if (error) throw "로그아웃 중 오류발생";

  return (
    <main className="h-full flex2">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>로그아웃</CardTitle>
          <CardDescription>
            {isPending
              ? "로그아웃 중..."
              : "로그아웃 되었습니다. 안전한 하루 되세요!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-36 flex items-center">
          {isPending ? (
            <div className="w-full flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center">
              <h4 className="py-8 text-4xl text-center">✌️</h4>
              <h4 className="text-sm text-center">
                메인 화면으로{" "}
                <Link href={"/"}>
                  <u className="underline-offset-2">이동</u>
                </Link>
              </h4>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default SignOutPage;
