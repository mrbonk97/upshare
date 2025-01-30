import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { DownloadCard } from "@/components/download-card";
import { Logo } from "@/components/logo";

const Home = () => {
  return (
    <main className="h-full">
      <Image
        src={"/images/bg5.svg"}
        alt="bg"
        height={4000}
        width={2500}
        className="fixed -z-10 h-full w-full object-cover opacity-20 lg:opacity-80"
      />
      <header className="h-16 px-2 lg:px-10 flex items-center justify-end">
        <div className="space-x-2">
          <Button className="py-4 rounded-full" variant={"secondary"} asChild>
            <Link href={"/sign-in"}>로그인</Link>
          </Button>
          <Button className="py-4 rounded-full" asChild>
            <Link href={"/sign-up"}>회원가입</Link>
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-4rem)]">
        <section className="pt-20 p-5 col-span-1 flex flex-col items-center">
          <div className="max-w-[600px] w-full flex items-center justify-center lg:justify-start">
            <Image
              src={"/file-share.svg"}
              height={128}
              width={128}
              alt="upshare"
              className="h-24 w-24 lg:h-32 lg:w-32"
            />
            <h1 className="text-5xl lg:text-6xl font-bold opacity-80">Upshare</h1>
          </div>
          <h2 className="mt-2 max-w-[600px] w-full lg:text-xl text-center lg:text-left font-medium opacity-70">
            보안적으로 너무나도 취약한, 그렇기에 가벼운 드라이브
          </h2>
          <div className="py-5 mt-5 max-w-[600px] w-full border-y">
            <p className="font-medium opacity-80 break-keep">
              &quot;요즘 로그인 절차가 너무 복잡하다고 느끼시죠? 그래서 저희는 2FA를 없앴습니다.
              물론, 조금 위험할 수 있지만, 편하게 쓰자는 게 저희의 모토입니다.&quot;
            </p>
            <div className="mt-10 flex gap-5 items-center">
              <div className="bg-rose-200 h-14 aspect-square rounded-full" />
              <div className="mb-1">
                <span className="block text-lg font-medium opacity-80">김현석</span>
                <span className="block text-sm font-medium opacity-70">Front / Back 개발자</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[600px]">
            <Link
              className="mt-5 h-14 w-36 flex2 font-medium rounded-full bg-blue-400 text-background hover:opacity-80 duration-150"
              href={"/sign-up"}
            >
              시작하기
            </Link>
          </div>
        </section>
        <section className="hidden lg:flex items-center justify-center">
          <DownloadCard />
        </section>
      </div>
    </main>
  );
};

export default Home;
