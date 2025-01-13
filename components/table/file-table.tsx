"use client";

import useSWR from "swr";
import { FileType, FolderType } from "@/constants/type";
import { FolderList } from "@/components/table/folder-list";
import { FileList } from "@/components/table/file-list";
import { Fetcher } from "@/lib/utils";

interface Props {
  folderId: string | undefined;
}

export const FileTable = ({ folderId }: Props) => {
  const params = folderId ? `/${folderId}` : "";
  const folderSWR = useSWR(`/api/folders${params}`, Fetcher);
  const fileSWR = useSWR(`/api/files${params}`, Fetcher);

  console.log(folderId);

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
        {folderSWR.data &&
          folderSWR.data.data.map((item: FolderType) => (
            <FolderList
              key={`folder-${item.folder_id}`}
              folderId={item.folder_id}
              folderName={item.folder_name}
            />
          ))}
        {fileSWR.data &&
          fileSWR.data.data.map((item: FileType) => (
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
