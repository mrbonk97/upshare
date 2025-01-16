import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const Home = () => {
  return (
    <main className="h-full">
      <Image
        src={"/images/bg5.svg"}
        alt="bg"
        height={4000}
        width={2500}
        className="fixed -z-10 h-full w-full object-cover opacity-80"
      />
      <header className="h-16 px-10 flex items-center justify-end">
        <div className="space-x-2">
          <Button className="rounded-full" variant={"secondary"}>
            로그인
          </Button>
          <Button className="rounded-full">회원가입</Button>
        </div>
      </header>
      <div className="grid grid-cols-2 h-[calc(100%-4rem)]">
        <section className="pt-20 p-5 col-span-1 flex justify-center">
          <div className="w-fit space-y-10">
            <div className="space-x-5">
              <Image
                src={"/file-share.svg"}
                alt="logo"
                height={128}
                width={128}
                className="inline"
              />
              <h1 className="translate-y-2 inline-block text-5xl font-bold opacity-80">
                UpShare
              </h1>
            </div>
            <h2 className="text-xl font-medium opacity-70">
              보안적으로 너무나도 취약한, 그렇기에 가벼운 클라우드 스토리지
            </h2>
            <div className="p-5 w-[650px] border-y">
              <p className="font-medium opacity-80 break-keep">
                &quot;요즘 로그인 절차가 너무 복잡하다고 느끼시죠? 그래서 저희는
                2FA를 없앴습니다. 물론, 조금 위험할 수 있지만, 스릴을 즐기자는
                게 저희의 모토입니다.&quot;
              </p>
              <div className="mt-10 flex gap-5 items-center">
                <div className="bg-rose-200 h-14 aspect-square rounded-full" />
                <div className="mb-1">
                  <span className="block text-lg font-medium opacity-80">
                    김현석
                  </span>
                  <span className="block text-sm font-medium opacity-70">
                    Front / Back 개발자
                  </span>
                </div>
              </div>
            </div>
            <Link
              className="inline-block h-14 w-36 flex2 font-medium rounded-full bg-blue-400 text-background hover:opacity-80 duration-150"
              href={"/sign-up"}
            >
              시작하기
            </Link>
          </div>
        </section>
        <section className="p-5 col-span-1 flex2 flex-col gap-16">
          <form className="p-5 w-2/3 max-w-[450px] flex flex-col items-center gap-14 bg-background shadow-lg rounded-xl">
            <h2 className="w-full text-2xl font-semibold opacity-80">
              파일 다운로드
            </h2>
            <Image
              src={"/icons/attorney.svg"}
              alt="bear"
              height={128}
              width={128}
            />
            <InputOTP maxLength={6} className="w-full">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <button className="my-5 py-4 w-full bg-blue-400 hover:bg-blue-300 duration-150 text-xl font-bold rounded-full text-background">
              다운로드
            </button>
          </form>
          <div role="button" className="relative h-14 w-24 cursor-pointer">
            <div className="h-full bg-blue-400 rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-2 h-2/3 aspect-square rounded-full bg-background" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
