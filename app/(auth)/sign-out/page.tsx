import Link from "next/link";

const SignOutPage = async () => {
  return (
    <main className="h-full flex items-center justify-center flex-col gap-5">
      로그아웃
      <Link href={"/folders"}>홈으로</Link>
    </main>
  );
};

export default SignOutPage;
