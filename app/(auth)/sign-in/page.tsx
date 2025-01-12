import { signIn } from "@/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignInPage = async () => {
  return (
    <main className="h-full grid grid-cols-2">
      <Image
        src="/images/background.svg"
        alt="background"
        height={1920}
        width={1920}
        className="col-span-1 h-full w-full object-cover"
      />
      <section className="p-10 col-span-1 h-full w-full">
        <Image
          src={"/file-share.svg"}
          alt="logo"
          height={96}
          width={96}
          className="mx-auto"
        />
        <div className="mt-40 mx-auto max-w-sm">
          <h1 className="w-full text-3xl font-bold opacity-80">로그인</h1>
          <form
            className="mt-5 w-full"
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
          >
            <input
              readOnly
              aria-hidden
              type="hidden"
              name="redirectTo"
              value={"/folders"}
            />
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="upshare123"
              className="mt-2 mb-5 py-6"
            />
            <Label htmlFor="password">패스워드</Label>
            <Input
              type="text"
              name="password"
              placeholder="* * * * * * * *"
              className="mt-2 py-6"
            />
            <Button
              type="submit"
              className="mt-20 py-6 w-full rounded-2xl bg-blue-400"
            >
              로그인
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
