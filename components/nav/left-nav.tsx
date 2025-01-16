import { FolderCreateModal } from "@/components/modal/folder-create-modal";
import { FileUploadModal } from "@/components/modal/file-upload-modal";
import { ApertureIcon, FolderPlusIcon } from "lucide-react";
import { LEFT_MENU } from "@/constants";
import { LinkList } from "./link-list";
import Link from "next/link";
import Image from "next/image";

interface Props {
  folderId: string | undefined;
}

export const Leftnav = ({ folderId }: Props) => {
  return (
    <aside className="fixed z-30 top-0 left-0 hidden lg:block pt-20 px-5 h-full w-72 font-semibold">
      <div className="space-y-5 text-xl">
        <Link href={"/folders"} className="flex justify-center">
          <Image src={"/file-share.svg"} alt="logo" height={128} width={128} />
        </Link>
        <FileUploadModal folderId={folderId}>
          <button className="py-3 w-full rounded-xl bg-blue-400 text-background">
            <ApertureIcon className="inline mr-2 mb-1" />
            파일 업로드
          </button>
        </FileUploadModal>
        <FolderCreateModal folderId={folderId}>
          <button className="py-3 w-full rounded-xl bg-blue-400 text-background">
            <FolderPlusIcon className="inline mr-2 mb-1" />
            폴더 생성
          </button>
        </FolderCreateModal>
      </div>
      <ul className="mt-5 w-full space-y-5 text-right">
        {LEFT_MENU.map((item) => (
          <LinkList
            key={item.url}
            title={item.title}
            url={item.url}
            icon={item.icon}
          />
        ))}
      </ul>
    </aside>
  );
};
