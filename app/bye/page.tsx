import Image from "next/image";
import Link from "next/link";

const ByePage = () => {
  return (
    <main className="h-full min-h-[500px] flex2 flex-col gap-10 overflow-hidden">
      <h2 className="text-center text-xl md:text-2xl font-bold">
        이용해주셔서 감사합니다. 잘가세요!
      </h2>
      <div className="relative">
        <div className="absolute w-[2000px] h-[600px] bg-blue-400 rounded-[80%] -z-10 -translate-x-96 translate-y-36"></div>
        <Image src="/images/bye.png" width={300} height={300} alt="bye" />
      </div>
      <p>
        첫 페이지로{" "}
        <Link href="/">
          <u>이동</u>
        </Link>
      </p>
    </main>
  );
};

export default ByePage;
