"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { DeleteFileModal } from "../modal/delete-file-modal";
import { ChangeNameModal } from "../modal/change-name-modal";
import { FolderContext } from "../folder-context";

interface Props {
  folderId: number;
  folderName: string;
}

export const FolderList = ({ folderId, folderName }: Props) => {
  const context = useContext(FolderContext);
  const hoverItem = context.hoverItem;
  const [isModalOpen, setIsModalOpen] = useState("NONE");
  const closeModal = () => setIsModalOpen("NONE");

  return (
    <>
      <DeleteFileModal
        type="FOLDER"
        isOpen={isModalOpen == "DELETE"}
        closeModal={closeModal}
        id={folderId}
        name={folderName}
      />
      <ChangeNameModal
        type="FOLDER"
        id={folderId}
        defaultName={folderName}
        closeModal={closeModal}
        isOpen={isModalOpen == "PATCH"}
      />
      <Link
        draggable
        role="row"
        href={`/folders/${folderId}`}
        aria-selected={hoverItem?.id == folderId}
        className={`px-2 py-4 grid grid-cols-8 xl:grid-cols-10 gap-2 hover:lg:bg-blue-50 border-2 border-transparent aria-selected:border-blue-400 border-dashed`}
        onDrop={context.onDrop}
        onDragEnd={context.onDragEnd}
        onDragLeave={context.onDragLeave}
        onDragStart={() => context.onDragStart({ type: "FOLDER", id: folderId })}
        onDragOver={() => context.onDragOver({ type: "FOLDER", id: folderId })}
      >
        <div role="cell" className="px-1 col-span-7 xl:col-span-9">
          <Image
            src={"/icons/001-folder.svg"}
            alt="folder"
            height={24}
            width={24}
            className="inline mr-2 h-4 w-4 lg:h-6 lg:w-6"
          />
          {folderName}
        </div>
        <div role="cell" className="px-1 col-span-1 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisIcon className="inline" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen("PATCH");
                }}
              >
                이름변경
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen("DELETE");
                }}
              >
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
    </>
  );
};
