import { SearchIcon } from "lucide-react";
import { ProfileButton } from "./profile-button";
import Image from "next/image";
import Link from "next/link";

export const Topnav = () => {
  return (
    <nav className="fixed top-0 left-0 px-2 lg:px-[5%] h-14 lg:h-16 w-full flex items-center justify-between gap-2">
      <Link href={"/folders"} className="hidden lg:block">
        <Image src={"/file-share.svg"} alt="logo" height={64} width={64} />
      </Link>
      <form className="relative w-full lg:w-96">
        <input className="pl-10 pr-5 h-8 w-full rounded lg:rounded-full focus:outline-none" />
        <button className="absolute left-2 top-1/2 -translate-y-1/2 hover:opacity-80 duration-150">
          <SearchIcon />
        </button>
      </form>
      <ProfileButton />
      <button className="lg:hidden">
        <Image src={"/file-share.svg"} alt="logo" height={40} width={40} />
      </button>
    </nav>
  );
};
