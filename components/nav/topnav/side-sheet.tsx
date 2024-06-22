import { FileUploadModal } from "@/app/(app)/(main)/_components/file-upload-modal";
import { FolderCreateModal } from "@/app/(app)/(main)/_components/folder-create-modal";
import { DataUsage } from "@/app/(app)/(main)/_components/navbar/data-usage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import { UserAvatar } from "@/components/user-avatar";
import { HeartIcon, HomeIcon, MenuIcon, UserRound } from "lucide-react";
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
          <FileUploadModal />
          <FolderCreateModal />
          <Separator className="my-5 h-0.5 rounded-full" />

          <div className="w-full space-y-5">
            <Link
              href={"/profile"}
              className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
            >
              프로필
              <UserRound size={14} />
            </Link>
            <Link
              href={"/home"}
              className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
            >
              홈
              <HomeIcon size={14} />
            </Link>
            <Link
              href={"/folders/favorite"}
              className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
            >
              즐겨찾기
              <HeartIcon size={14} />
            </Link>
          </div>
          <div className="pt-80">
            <DataUsage />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
