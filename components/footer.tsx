import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="w-full flex2 flex-col">
      <Separator className="w-full" />
      <nav className="mt-5 mb-10 flex items-center">
        <ul className="flex items-center">
          <li>
            <Link href={"/policy"}>개인정보처리방침</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
