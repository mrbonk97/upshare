import { SearchIcon } from "lucide-react";
import { ProfileButton } from "./profile-button";
import Image from "next/image";
import Link from "next/link";

export const Topnav2 = () => {
  return (
    <nav className="fixed z-10 top-0 left-0 py-3 lg:pt-2 lg:pb-1 px-5 lg:px-10 w-full bg-secondary">
      <div className="flex items-center justify-between gap-2">
        <button className="lg:hidden">
          <Image src={"/file-share.svg"} alt="logo" height={40} width={40} />
        </button>
        <Link href={"/folders"} className="hidden lg:block translate-y-2">
          <Image src={"/file-share.svg"} alt="logo" height={80} width={80} />
        </Link>
        <form action={"/search"} className="relative w-full lg:w-96">
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
      </div>
      <ul className="hidden lg:block mx-auto lg:max-w-screen-xl font-medium opacity-80">
        <li className="inline border-b-4 border-blue-400">기본정보</li>
      </ul>
    </nav>
  );
};
