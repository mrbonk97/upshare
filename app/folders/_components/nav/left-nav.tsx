import { ApertureIcon, FolderPlusIcon } from "lucide-react";
import { LEFT_MENU } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { FileUploadModal } from "../modal/file-upload-modal";
import { FolderCreateModal } from "../modal/folder-create-modal";

export const Leftnav = () => {
  return (
    <aside className="fixed z-30 top-0 left-0 hidden lg:block pt-20 p-5 h-full w-72 font-semibold">
      <div className="space-y-5 text-xl">
        <Link href={"/folders"} className="block mx-auto w-fit">
          <Image
            src={"/file-share.svg"}
            alt="logo"
            height={0}
            width={0}
            priority
            className="w-32 h-auto"
          />
        </Link>
        <FileUploadModal>
          <button className="py-3 w-full rounded-xl bg-blue-400 text-background">
            <ApertureIcon className="inline mr-2 mb-1" />
            파일 업로드
          </button>
        </FileUploadModal>
        <FolderCreateModal>
          <button className="py-3 w-full rounded-xl bg-blue-400 text-background">
            <FolderPlusIcon className="inline mr-2 mb-1" />
            폴더 생성
          </button>
        </FolderCreateModal>
      </div>
      <ul className="mt-5 w-full space-y-5 text-right">
        {LEFT_MENU.map((item) => (
          <LinkList key={item.url} title={item.title} url={item.url} icon={item.icon} />
        ))}
      </ul>
    </aside>
  );
};

interface LinkListProps {
  title: string;
  url: string;
  icon: React.ReactNode;
}

const LinkList = ({ title, url, icon }: LinkListProps) => (
  <li>
    <Link
      className="px-5 py-2 block rounded bg-background hover:opacity-80 duration-150"
      href={url}
    >
      {title}
      {icon}
    </Link>
  </li>
);
