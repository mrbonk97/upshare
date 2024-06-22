import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/logo";
import { FileUploadModal } from "../file-upload-modal";
import { FolderCreateModal } from "../folder-create-modal";
import Link from "next/link";
import { HeartIcon, HomeIcon } from "lucide-react";
import { DataUsage } from "./data-usage";

export const Navbar = () => {
  return (
    <aside className="hidden md:block fixed left-0 px-5 pb-10 pt-20 min-h-full w-80 bg-secondary space-y-5">
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
          <HomeIcon size={14} />
        </Link>
        <Link
          href={"/folders/favorite"}
          className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
        >
          즐겨찾기
          <HeartIcon size={14} />
        </Link>
        <Link
          href={"/folders/favorite"}
          className="flex justify-end items-center gap-2 w-full py-2 px-4 rounded bg-primary-foreground font-medium text-sm"
        >
          공유중
          <HeartIcon size={14} />
        </Link>
      </div>
      <div className="-80">
        <DataUsage />
      </div>
    </aside>
  );
};
