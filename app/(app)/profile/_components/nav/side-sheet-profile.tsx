import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PROFILE_MENU } from "@/constants";
import { MenuIcon } from "lucide-react";
import { MenuList } from "./sidenav/menu-list";
import { DeleteAccountM } from "../delete-account-m";

export const SideSheetProfile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="block md:hidden p-0 m-0 bg-primary-foreground aspect-square flex2"
        >
          <MenuIcon className="aspect-square" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <ul className="mt-10 space-y-5">
          {PROFILE_MENU.map((item) => (
            <MenuList key={item.title} title={item.title} url={item.url} />
          ))}
          <DeleteAccountM />
        </ul>
      </SheetContent>
    </Sheet>
  );
};
