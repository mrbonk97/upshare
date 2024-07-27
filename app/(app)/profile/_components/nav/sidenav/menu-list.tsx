import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MenuListProps {
  title: string;
  url: string;
}

export const MenuList = ({ title, url }: MenuListProps) => {
  return (
    <li>
      <Button className="w-full py-6 bg-blue-400/80 hover:bg-blue-400" asChild>
        <Link href={url}>{title}</Link>
      </Button>
    </li>
  );
};
