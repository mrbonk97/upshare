import { DownloadCard } from "@/components/download-card";
import { Logo } from "@/components/logo";
import Link from "next/link";

const SharePage = () => {
  return (
    <main className="pb-10 h-full flex2 flex-col gap-5 bg-secondary">
      <Link href={"/"}>
        <Logo />
      </Link>
      <DownloadCard />
    </main>
  );
};

export default SharePage;
