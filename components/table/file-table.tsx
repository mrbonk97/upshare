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
  const result = useSWR(`/api/folders${params}`, Fetcher);

  return (
    <div role="table" className="w-full font-medium opacity-80">
      <div role="tablehead" className="sticky px-2 mt-5 border-y py-2">
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
              fileExtension={item.FILE_EXTENSION}
              createdAt={item.CREATED_AT}
            />
          ))}
      </div>
    </div>
  );
};
