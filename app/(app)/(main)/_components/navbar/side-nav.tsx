import { Separator } from "@/components/ui/separator";

import { Logo } from "@/components/logo";
import Link from "next/link";
import { DataUsage } from "./data-usage";
import { FileUploadM } from "../modal/file-upload-m";
import { FolderCreateM } from "../modal/folder-create-m";
import { Menu } from "./menu";

export const Sidenav = () => {
  return (
    <>
      <aside className="hidden md:flex flex-col justify-between fixed z-10 left-0 px-5 pt-12 pb-16 h-full w-80 bg-background">
        <div className="space-y-5 mb-2">
          <Link href={"/home"} className="w-full flex justify-center">
            <Logo />
          </Link>
          <FileUploadM />
          <FolderCreateM />
          <Separator className="my-5 h-0.5 rounded-full" />
          <Menu />
        </div>
        <DataUsage />
      </aside>
    </>
  );
};
