import { Logo } from "@/components/logo";
import { SearchBox } from "./search";
import { SideSheet } from "./side-sheet";
import { UserButton } from "./user-button";
import Link from "next/link";
import { RoundEdge } from "@/components/round-edge";

export const Topnav = () => {
  return (
    <>
      <RoundEdge />
      <header className="fixed top-0 z-20 w-full h-14 flex items-center justify-between px-5 sm:px-10 bg-background">
        <div className="hidden md:block" />
        <Link href={"/home"} className="md:hidden">
          <Logo width={50} height={50} />
        </Link>
        <div className="hidden md:block"></div>
        <SearchBox />
        <div className="hidden md:block">
          <UserButton />
        </div>
        <SideSheet />
      </header>
    </>
  );
};
