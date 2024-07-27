import Image from "next/image";
import Link from "next/link";

const ByePage = () => {
  return (
    <main className="h-full flex2 flex-col gap-10">
      <h2 className="text-center text-xl md:text-2xl font-bold">
        지금까지 이용해주셔서 감사했습니다!
      </h2>
      <Image src="/images/bye.png" width={300} height={300} alt="bye" />
      <span>
        첫 페이지로{" "}
        <Link href="/">
          <u className="underline-offset-4">이동</u>
        </Link>
      </span>
    </main>
  );
};

export default ByePage;
