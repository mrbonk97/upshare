import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <main className="h-full w-full flex relative">
      <section className="absolute md:static h-full w-full md:w-1/2 flex items-center justify-center flex-col p-5">
        <article className="w-full max-w-96 p-5 rounded-lg shadow-md md:shadow-none md:rounded-none md:bg-transparent">
          <h1 className="pl-2 text-5xl font-bold break-words text-purple-p">
            Welcome Back
          </h1>
          <div className="mt-16 space-y-6">
            <Button className="w-full py-6">
              <Link
                href={process.env.GOOGLE_OAUTH2_URL!}
                className="flex items-center"
              >
                <Image
                  src={"/images/google.svg"}
                  width={24}
                  height={24}
                  alt="google"
                  className="h-6 w-6 flex2"
                />
                <span className="ml-1 w-24 text-start">구글 로그인</span>
              </Link>
            </Button>
            <Button className="w-full py-6 bg-[#03C75A] hover:bg-[#03C75A]/90">
              <Link
                // href={process.env.NAVER_OAUTH2_URL!}
                href="https://naver.com"
                className="flex items-center"
              >
                <Image
                  src={"/images/naver.svg"}
                  width={24}
                  height={24}
                  alt="naver"
                  className="h-5 w-5 flex2"
                />

                <span className="ml-1 w-24 text-start text-white">
                  네이버 로그인
                </span>
              </Link>
            </Button>
            <Button className="w-full py-6 bg-[#FEE500] hover:bg-[#FEE500]/80">
              <Link
                href={process.env.KAKAO_OAUTH2_URL!}
                className="flex items-center"
              >
                <Image
                  src={"/images/kakao.svg"}
                  width={24}
                  height={24}
                  alt="kakao"
                  className="h-5 w-5 flex2"
                />

                <span className="ml-1 w-24 text-start text-black">
                  카카오 로그인
                </span>
              </Link>
            </Button>
          </div>
        </article>
      </section>
      <section className="h-full w-full md:w-1/2 overflow-hidden relative -z-10">
        <div className="h-full w-full absolute fade"></div>
        <Image
          src={"/images/background.jpg"}
          alt="background"
          height={2000}
          width={2000}
          priority
          className="object-cover h-full"
        />
      </section>
    </main>
  );
};

export default SignInPage;
