import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/logo";
import { FileUploadModal } from "../file-upload-modal";
import { FolderCreateModal } from "../folder-create-modal";
import Link from "next/link";
import { Blocks, HeartIcon, HomeIcon } from "lucide-react";
import { DataUsage } from "./data-usage";

export const Sidenav = () => {
  return (
    <>
      <aside className="hidden md:block fixed z-10 left-0 p-5 pt-10 h-full w-80 space-y-5 bg-background">
        <div className="flex justify-center">
          <Link href={"/home"}>
            <Logo />
          </Link>
        </div>

        <FileUploadModal />
        <FolderCreateModal />
        <Separator className="my-5 h-0.5 rounded-full" />

        <div className="w-full space-y-5">
          <Link
            href={"/home"}
            className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
          >
            홈
            <HomeIcon size={14} className="text-rose-400" />
          </Link>
          <Link
            href={"/folders/favorite"}
            className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
          >
            즐겨찾기
            <HeartIcon size={14} className="text-rose-400" />
          </Link>
          <Link
            href={"/folders/share"}
            className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
          >
            공유중
            <Blocks size={14} className="text-rose-400" />
          </Link>
        </div>
        <div className="pt-60">
          <DataUsage />
        </div>
      </aside>
    </>
  );
};
