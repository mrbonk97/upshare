"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { firebaseSignOut, githubSignIn, googleSignIn } from "@/firebase/auth";
import { firebaseAuth } from "@/firebase/firebase";
import { getRedirectResult } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { ErrorModal } from "@/components/modal/error-modal";

const SignInPage = () => {
  const auth = useAuth();
  const [isPending, setPending] = useState(false);
  const [isError, setError] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("pending") == "true") {
      setPending(true);
    }
  });

  getRedirectResult(firebaseAuth)
    .then((result) => {
      setPending(false);
      sessionStorage.removeItem("pending");
      if (result != null) {
        auth.signIn(result.user);
      }
    })
    .catch((error) => {
      setErrorTitle("이미 다른 방식으로 가입하셨습니다.");
      setErrorDescription("기존의 로그인 방식으로 진행해주세요.");
      setError(true);
    });

  const handleClick = (provider: string) => {
    firebaseSignOut();
    window.sessionStorage.setItem("pending", "true");
    if (provider === "google") googleSignIn();
    if (provider === "github") githubSignIn();
  };

  return (
    <main
      className="h-full w-full flex relative"
      onClick={() => setError(false)}
    >
      <ErrorModal
        isOpen={isError}
        title={errorTitle}
        description={errorDescription}
      />
      {isPending && <Spinner loading={isPending} />}
      <section className="absolute md:static h-full w-full md:w-1/2 flex items-center justify-center flex-col p-5">
        <article className="w-full max-w-96 bg-primary-foreground p-5 rounded-lg shadow-md md:shadow-none md:rounded-none md:bg-transparent">
          <h1 className="pl-2 text-5xl font-bold break-words text-secondary">
            Welcome Back
          </h1>
          <div className="mt-16 space-y-6">
            <Button
              className="w-full py-6"
              onClick={() => handleClick("google")}
              disabled={isPending}
            >
              <FaGoogle className="text-2xl mr-2 w-10" />
              <span className="w-20">구글 로그인</span>
            </Button>
            <Button
              className="w-full py-6"
              onClick={() => handleClick("github")}
              disabled={isPending}
            >
              <FaGithub className="text-2xl mr-2 w-10" />
              <span className="w-20">깃허브 로그인</span>
            </Button>
          </div>
        </article>
      </section>
      <section className="h-full w-full md:w-1/2 overflow-hidden relative -z-10">
        <div className="h-full w-full absolute fade"></div>
        <Image
          src={"/images/background.jpg"}
          alt="background"
          height={1500}
          width={1500}
          priority
          className="object-cover h-full"
        />
      </section>
    </main>
  );
};

export default SignInPage;
