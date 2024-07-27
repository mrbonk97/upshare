import { FolderCreateModal } from "@/app/(app)/(main)/_components/folder-create-modal";
import { DataUsage } from "@/app/(app)/(main)/_components/navbar/data-usage";
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
        <div className="mt-10 space-y-5">
          <div className="w-full flex justify-center">
            <UserAvatar className="w-20 h-20" />
          </div>
          <FolderCreateModal />
          <Separator className="my-5 h-0.5 rounded-full" />

          <nav className="w-full space-y-5">
            <SheetClose asChild>
              <Link
                href={"/home"}
                className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
              >
                홈
                <HomeIcon size={14} className="text-rose-400" />
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={"/folders/favorite"}
                className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
              >
                즐겨찾기
                <HeartIcon size={14} className="text-rose-400" />
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={"/folders/share"}
                className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
              >
                공유중
                <Blocks size={14} className="text-rose-400" />
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={"/profile"}
                className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
              >
                프로필
                <UserRound size={14} className="text-rose-400" />
              </Link>
            </SheetClose>
          </nav>
          <div className="absolute bottom-16 w-[calc(100%-2.5rem)]">
            <DataUsage />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
