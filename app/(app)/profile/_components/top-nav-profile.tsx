import { Logo } from "@/components/logo";
import Link from "next/link";
import { SideSheetProfile } from "./side-sheet-profile";
import { RoundEdge } from "@/components/round-edge";
import { UserButton } from "@/components/nav/topnav/user-button";

export const TopnavProfile = () => {
  return (
    <>
      <RoundEdge />
      <header className="fixed top-0 z-10 w-full h-14 flex items-center justify-between md:justify-end px-5 sm:px-10 bg-background">
        <Link href={"/home"} className="md:hidden">
          <Logo width={50} height={50} />
        </Link>
        <SideSheetProfile />
        <div className="hidden md:block">
          <UserButton />
        </div>
      </header>
    </>
  );
};
