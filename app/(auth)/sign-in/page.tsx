import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { SignInForm } from "@/components/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 - UPSHARE",
};

const SignInPage = () => {
  return (
    <main className="p-5 h-full md:min-h-[800px] flex2 md:bg-blue-400">
      <section className="p-5 h-full w-full md:max-h-[700px] max-w-[1000px] bg-background md:bg-secondary rounded-xl flex justify-between gap-5">
        <div className="hidden md:flex w-full relative items-center justify-center">
          <Link href={"/"} className="absolute top-2 left-2">
            <Logo />
          </Link>
          <Image
            src={"/images/login.png"}
            width={384}
            height={384}
            alt="login image"
            priority
            className="object-contain h-96 w-96"
          />
        </div>
        <SignInForm />
      </section>
    </main>
  );
};

export default SignInPage;
