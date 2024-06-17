"use client";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();
  const { signIn } = useAuth();

  useEffect(() => {
    const handleSignIn = async () => {
      const isSuccess = await signIn();
      if (isSuccess) router.push("/home");
      else router.push("/error");
    };

    handleSignIn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Spinner loading />
    </main>
  );
};

export default CallbackPage;
