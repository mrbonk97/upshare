import { MENU } from "@/constants";
import Link from "next/link";

interface MenuListProps {
  title: string;
  link: string;
  icon: React.ReactNode;
}

const MenuList = ({ title, link, icon }: MenuListProps) => {
  return (
    <li className="text-rose-400">
      <Link
        href={link}
        className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm text-primary"
      >
        {title}
        {icon}
      </Link>
    </li>
  );
};

export const Menu = () => {
  return (
    <ul className="w-full space-y-5">
      {MENU.map((item) => (
        <MenuList
          key={item.link}
          title={item.title}
          link={item.link}
          icon={item.icon}
        />
      ))}
    </ul>
  );
};
