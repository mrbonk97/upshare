import { FileType, FolderType } from "@/constants/type";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FolderList } from "./folder-list";
import { FileList } from "./file-list";

interface Props {
  folderList: FolderType[];
  fileList: FileType[];
}

export const FileTable = ({ folderList, fileList }: Props) => {
  return (
    <div role="table" className="w-full font-medium opacity-80">
      <div role="tablehead" className="px-2 mt-5 border-y py-2">
        <div role="row" className="grid grid-cols-10">
          <div role="columnheader" className="col-span-4">
            파일명
          </div>
          <div role="columnheader" className="col-span-2 text-center">
            등록 날짜
          </div>
          <div role="columnheader" className="col-span-1 text-center">
            파일 크기
          </div>
          <div role="columnheader" className="col-span-1 text-center">
            공유
          </div>
          <div role="columnheader" className="col-span-1 text-center">
            남은 시간
          </div>
          <div role="columnheader" className="text-right col-span-1">
            옵션
          </div>
        </div>
      </div>
      <div role="tablebody">
        {folderList.map((item) => (
          <FolderList
            key={`folder-${item.folder_id}`}
            folderId={item.folder_id}
            folderName={item.folder_name}
          />
        ))}
        {fileList.map((item) => (
          <FileList
            key={`file-${item.file_id}`}
            fileId={item.file_id}
            fileName={item.file_name}
            createdAt={item.created_at}
          />
        ))}
      </div>
    </div>
  );
};
