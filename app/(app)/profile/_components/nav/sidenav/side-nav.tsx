import Link from "next/link";
import { Logo } from "@/components/logo";
import { MenuList } from "./menu-list";
import { PROFILE_MENU } from "@/constants";
import { DeleteAccountM } from "../../delete-account-m";

export const Sidenav = () => {
  return (
    <aside className="hidden md:block fixed z-10 left-0 px-5 py-12 h-full w-80 bg-background">
      <Link className="flex justify-center" href={"/home"}>
        <Logo />
      </Link>
      <ul className="mt-10 space-y-5">
        {PROFILE_MENU.map((item) => (
          <MenuList key={item.title} title={item.title} url={item.url} />
        ))}
        <DeleteAccountM />
      </ul>
    </aside>
  );
};
