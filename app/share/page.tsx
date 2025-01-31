import { DownloadCard } from "@/components/download-card";
import { Logo } from "@/components/logo";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    code: string | undefined;
  }>;
}

const SharePage = async ({ searchParams }: Props) => {
  const sp = await searchParams;
  const code = sp.code;
  console.log(code);
  return (
    <main className="pb-10 h-full flex2 flex-col gap-5 bg-secondary">
      <Link href={"/"}>
        <Logo />
      </Link>
      <DownloadCard defaultCode={code} />
    </main>
  );
};

export default SharePage;
