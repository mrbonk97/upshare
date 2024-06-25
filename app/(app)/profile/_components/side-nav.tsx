import { Button } from "@/components/ui/button";
import { DeleteAccountModal } from "./delete-account-modal";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const Sidenav = () => {
  return (
    <aside className="hidden md:block fixed z-10 left-0 p-5 pt-10 h-full w-80 space-y-5 bg-background">
      <div className="flex justify-center">
        <Link href={"/home"}>
          <Logo />
        </Link>
      </div>
      <div className="space-y-5 mt-10">
        <Button
          className="w-full py-6 bg-blue-400/80 hover:bg-blue-400"
          asChild
        >
          <Link href="/profile">프로필 수정</Link>
        </Button>
        <Button
          className="w-full py-6 bg-blue-400/80 hover:bg-blue-400"
          asChild
        >
          <Link href="/profile?mode=faq">FAQ</Link>
        </Button>
        <Button
          className="w-full py-6 bg-blue-400/80 hover:bg-blue-400"
          asChild
        >
          <Link href="/profile?mode=policy">개인정보 처리방침</Link>
        </Button>
        <DeleteAccountModal />
      </div>
    </aside>
  );
};
