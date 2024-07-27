import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserAvatar } from "@/components/user-avatar";
import { Blocks, HeartIcon, HomeIcon, MenuIcon, UserRound } from "lucide-react";
import Link from "next/link";

export function SideSheet() {
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
      </SheetContent>
    </Sheet>
  );
}
