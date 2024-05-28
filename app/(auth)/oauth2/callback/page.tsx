"use client";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const access_token = useSearchParams().get("access_token");

  const handleSignIn = () => {
    const result = auth.signIn();
    if (result) router.push("/home");
  };

  useEffect(() => {
    if (access_token != null) {
      localStorage.setItem("access_token", access_token);
      handleSignIn();
    } else {
      router.push("/error");
    }
  }, []);

  return (
    <main>
      <Spinner loading />
    </main>
  );
};

export default CallbackPage;
