import { Button } from "@/components/ui/button";
import { DeleteAccountModal } from "./delete-account-modal";
import { UserImage } from "./user-image";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const Sidenav = () => {
  return (
    <aside className="fixed h-full left-0 w-80 pt-20 pb-10 px-5 bg-secondary">
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
