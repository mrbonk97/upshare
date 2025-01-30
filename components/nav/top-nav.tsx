import { SearchIcon } from "lucide-react";
import { ProfileButton } from "./profile-button";
import Image from "next/image";

export const Topnav = () => {
  return (
    <nav className="fixed z-20 top-0 left-0 px-5 lg:px-10 h-14 lg:h-16 w-full flex items-center justify-between gap-2 bg-secondary">
      <div className="hidden lg:block" />
      <form action={"/folders/search"} className="relative w-full lg:w-96">
        <input
          name="q"
          className="pl-10 pr-5 h-8 w-full rounded lg:rounded-full focus:outline-none"
        />
        <button
          type="submit"
          className="absolute left-2 top-1/2 -translate-y-1/2 hover:opacity-80 duration-150"
        >
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
