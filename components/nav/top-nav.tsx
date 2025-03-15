import { SearchIcon } from "lucide-react";
import { ProfileButton } from "./profile-button";
import Image from "next/image";
import Link from "next/link";
import { MobileSearchIcon } from "./mobile-search-icon";

export const Topnav = () => {
  return (
    <nav className="fixed z-20 top-0 left-0 px-5 lg:px-10 h-14 lg:h-16 w-full flex items-center justify-between gap-2 bg-background lg:bg-secondary">
      <Link href={"/folders"}>
        <Image
          src={"/file-share.svg"}
          alt="logo"
          height={0}
          width={0}
          className="lg:hidden w-12 h-auto"
          priority
        />
      </Link>
      <form action={"/folders/search"} className="hidden lg:block relative w-full lg:w-96">
        <input
          name="q"
          autoComplete="off"
          className="pl-10 pr-5 h-8 w-full rounded-full focus:outline-none"
        />
        <button
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 hover:opacity-80 duration-150"
        >
          <SearchIcon />
        </button>
      </form>
      <div className="flex items-center gap-2">
        <MobileSearchIcon />
        <ProfileButton />
      </div>
    </nav>
  );
};
