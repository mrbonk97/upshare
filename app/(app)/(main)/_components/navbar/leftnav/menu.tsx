import { Blocks, HeartIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

const MENU = [
  {
    title: "홈",
    link: "/home",
    icon: <HomeIcon size={14} className="text-rose-400" />,
  },
  {
    title: "즐겨찾기",
    link: "/folders/favorite",
    icon: <HeartIcon size={14} className="text-rose-400" />,
  },
  {
    title: "공유중",
    link: "/folders/share",
    icon: <Blocks size={14} className="text-rose-400" />,
  },
];

interface MenuListProps {
  title: string;
  link: string;
  icon: React.ReactNode;
}

const MenuList = ({ title, link, icon }: MenuListProps) => {
  return (
    <li>
      <Link
        href={link}
        className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
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
