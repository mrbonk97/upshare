"use client";
import { Spinner } from "@/components/spinner";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const access_token = useSearchParams().get("access_token");

  useEffect(() => {
    if (access_token == null) throw "오류: 토큰이 존재하지 않습니다.";
    else {
      localStorage.setItem("access_token", access_token);
      redirect("/home");
    }
  }, [access_token]);

  return (
    <main className="h-full flex2">
      <Spinner />
    </main>
  );
};

export default CallbackPage;
