"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { convertByte, getFileIcon } from "@/lib/utils";
import { CircleIcon, EllipsisIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { DeleteFileModal } from "../modal/delete-file-modal";
import { ChangeNameModal } from "../modal/change-name-modal";
import { ShareFileModal } from "../modal/share-file-modal";
import { FolderContext } from "@/app/[...folders]/folder-context";

interface Props {
  fileId: number;
  fileName: string;
  fileSize: number;
  fileExtension: string;
  isShare: boolean;
  shareCode: string | null;
  createdAt: string;
}

export const FileList = ({
  fileId,
  fileName,
  fileSize,
  fileExtension,
  isShare,
  shareCode,
  createdAt,
}: Props) => {
  const context = useContext(FolderContext);
  const hoverItem = context.hoverItem;

  const [isModalOpen, setIsModalOpen] = useState("NONE");
  const closeModal = () => setIsModalOpen("NONE");

  const handleDownload = async () => {
    const response = await fetch(`/api/files/${fileId}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <DeleteFileModal
        type="FILE"
        isOpen={isModalOpen == "DELETE"}
        closeModal={closeModal}
        id={fileId}
        name={fileName}
      />
      <ChangeNameModal
        type="FILE"
        id={fileId}
        defaultName={fileName}
        closeModal={closeModal}
        isOpen={isModalOpen == "PATCH"}
      />
      <ShareFileModal
        fileId={fileId}
        closeModal={closeModal}
        isShare={isShare}
        isOpen={isModalOpen == "SHARE"}
        shareCode={shareCode}
      />
      <div
        draggable
        role="row"
        aria-selected={hoverItem?.id == fileId}
        className={`px-2 py-4 grid grid-cols-6 lg:grid-cols-10 gap-5 hover:lg:bg-blue-50 border-2 border-transparent aria-selected:border-blue-400 border-dashed`}
        onDrop={context.onDrop}
        onDragEnd={context.onDragEnd}
        onDragLeave={context.onDragLeave}
        onDragStart={() => context.onDragStart({ type: "FILE", id: fileId })}
        onDragOver={() => context.onDragOver({ type: "FILE", id: fileId })}
      >
        <div
          onClick={() => handleDownload()}
          role="cell"
          className="px-1 col-span-3 cursor-pointer text-sm lg:text-base"
        >
          <Image
            src={getFileIcon(fileExtension)}
            alt="folder"
            height={24}
            width={24}
            className="inline mr-2 h-4 w-4 lg:h-6 lg:w-6"
          />
          {fileName}
        </div>
        <div role="cell" className="hidden lg:block px-1 col-span-2 text-right">
          {new Date(createdAt).toISOString().split("T")[0]}
        </div>
        <div role="cell" className="hidden lg:block px-1 col-span-1 text-right">
          {convertByte(fileSize)}
        </div>
        <div role="cell" className="px-1 col-span-2 flex2 opacity-80">
          {isShare ? (
            <CircleIcon size={16} className="h-3 w-3 lg:h-4 lg:w-4" />
          ) : (
            <XIcon size={18} className="h-3 w-3 lg:h-4 lg:w-4" />
          )}
        </div>
        <div role="cell" className="hidden lg:block px-1 col-span-1 text-center">
          6일 남음
        </div>
        <div role="cell" className="px-1 col-span-1 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisIcon className="inline" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setIsModalOpen("PATCH")}>
                이름변경
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setIsModalOpen("SHARE")}>
                공유하기
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => setIsModalOpen("DELETE")}>
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
