import { FolderCreateModal } from "@/components/modal/folder-create-modal";
import { FileUploadModal } from "@/components/modal/file-upload-modal";
import { ApertureIcon, FolderPlusIcon } from "lucide-react";
import { LEFT_MENU } from "@/constants";
import { LinkList } from "./link-list";

export const Leftnav = () => {
  return (
    <aside className="fixed top-0 left-0 hidden lg:block pt-20 px-5 h-full w-72 font-semibold">
      <div className="mt-10 space-y-5 text-xl">
        <FileUploadModal>
          <button className="py-3 w-full rounded-xl bg-blue-200">
            <ApertureIcon className="inline mr-2 mb-1" />
            파일 업로드
          </button>
        </FileUploadModal>
        <FolderCreateModal>
          <button className="py-3 w-full rounded-xl bg-blue-200">
            <FolderPlusIcon className="inline mr-2 mb-1" />
            폴더 생성
          </button>
        </FolderCreateModal>
      </div>
      <ul className="mt-10 w-full space-y-5 text-right">
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
