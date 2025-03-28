"use client";

import useSWR from "swr";
import { FileType, FolderType } from "@/constants/type";
import { Fetcher } from "@/lib/utils";
import { TableSkeleton } from "./skeleton";
import { useContext } from "react";
import { FolderList } from "./folder-list";
import { FileList } from "./file-list";
import { FolderContext } from "../folder-context";

export type DragItem = {
  type: "FILE" | "FOLDER";
  id: number;
};

export const FileTable = () => {
  const context = useContext(FolderContext);
  const folderId = context.getFolderId();
  const q = context.getQuery();

  const params1 = folderId ? `/${folderId}` : "";
  const params2 = q ? `?q=${q}` : "";
  const result = useSWR(`/api/folders${params1}${params2}`, Fetcher);

  return (
    <div role="table" className="w-full font-medium opacity-80 text-sm">
      <div role="tablehead" className="sticky px-2 mt-5 border-y py-2">
        <div role="row" className="grid grid-cols-8 xl:grid-cols-10 gap-2">
          <div role="columnheader" className="px-1 col-span-7 sm:col-span-5">
            파일명
          </div>
          <div
            role="columnheader"
            className="hidden sm:block col-span-2 md:col-span-1 px-1 text-right"
          >
            등록 날짜
          </div>
          <div role="columnheader" className="hidden md:block px-1 col-span-1 text-right">
            파일 크기
          </div>
          <div role="columnheader" className="hidden xl:block px-1 col-span-1 text-center">
            공유 여부
          </div>
          <div role="columnheader" className="hidden xl:block px-1 col-span-1 text-center">
            남은 시간
          </div>
          <div role="columnheader" className="px-1 col-span-1 text-right">
            옵션
          </div>
        </div>
      </div>
      <div role="tablebody">
        {result.isLoading && <TableSkeleton />}

        {result.data &&
          result.data.data.folders.map((item: FolderType) => (
            <FolderList
              key={`folder-${item.FOLDER_ID}`}
              folderId={item.FOLDER_ID}
              folderName={item.FOLDER_NAME}
            />
          ))}
        {result.data &&
          result.data.data.files.map((item: FileType) => (
            <FileList
              key={`file-${item.FILE_ID}`}
              fileId={item.FILE_ID}
              fileName={item.FILE_NAME}
              fileSize={item.FILE_SIZE}
              isShare={item.IS_SHARE == 1}
              shareCode={item.SHARE_CODE}
              fileExtension={item.FILE_EXTENSION}
              createdAt={item.CREATED_AT}
              deleteAt={item.DELETE_AT}
            />
          ))}
      </div>
    </div>
  );
};
