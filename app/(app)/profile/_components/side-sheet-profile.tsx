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
import { DeleteAccountModal } from "./delete-account-modal";

export function SideSheetProfile() {
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
        <nav className="mt-10 flex flex-col gap-5">
          <SheetClose asChild>
            <Button asChild variant={"secondary"} className="py-6">
              <Link href={"/profile"}>프로필 수정</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant={"secondary"} className="py-6">
              <Link href={"/profile?mode=faq"}>문의사항</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant={"secondary"} className="py-6">
              <Link href={"/profile?mode=policy"}>개인정보처리방침</Link>
            </Button>
          </SheetClose>
        </nav>
        <div className="mt-5" />
        <DeleteAccountModal />
      </SheetContent>
    </Sheet>
  );
}
