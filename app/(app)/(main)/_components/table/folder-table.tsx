"use client";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RowType } from "@/type/type";
import { TableLayout } from "./table-layout";
import { TableRowFile } from "./table-row-file";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  changeFileHeart,
  changeFolderHeart,
  moveFile,
  moveFolder,
} from "@/lib/api/folder-api";
import { TableRowFolder } from "./table-row-folder";

interface FolderTableProps {
  folders: [];
  files: [];
}

export const FolderTable = ({ files, folders }: FolderTableProps) => {
  const qc = useQueryClient();
  const [dragRow, setDragRow] = useState<RowType | null>(null);
  const [hoverRow, setHoverRow] = useState<RowType | null>(null);

  const mutateMoveFolder = useMutation({
    mutationFn: () => moveFolder(dragRow!.id, hoverRow!.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });

  const mutateMoveFile = useMutation({
    mutationFn: () => moveFile(dragRow!.id, hoverRow!.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });

  const mutateFolderHeart = useMutation({
    mutationFn: (folderId: string) => changeFolderHeart(folderId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });

  const mutateFileHeart = useMutation({
    mutationFn: (folderId: string) => changeFileHeart(folderId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });

  const handleDragStart = (row: RowType) => setDragRow(row);
  const handleDragOver = (row: RowType) => setHoverRow(row);
  //prettier-ignore
  const handleDragEnd = () => { setDragRow(null); setHoverRow(null);};
  const handleDrop = () => {
    if (!hoverRow) return;
    if (!dragRow) return;
    if (!hoverRow.folderName) return;
    if (dragRow.id == hoverRow.id) return;

    if (dragRow.folderName) mutateMoveFolder.mutate();
    else mutateMoveFile.mutate();
  };

  if (files.length == 0 && folders.length == 0)
    return (
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>파일명</TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              수정된 날짜
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              수정한 사람
            </TableHead>
            <TableHead className="hidden lg:table-cell text-center">
              파일크기
            </TableHead>
            <TableHead className="text-center p-0">좋아요</TableHead>
            <TableHead className="text-center">메뉴</TableHead>
          </TableRow>
        </TableHeader>
        <TableCaption>폴더가 비어있습니다.</TableCaption>
      </Table>
    );

  return (
    <TableLayout>
      {files.map((item: RowType) => (
        <TableRowFile
          key={item.id}
          id={item.id}
          code={item.code}
          row={item}
          title={item.originalFilename}
          isFavourite={item.heart}
          size={item.size}
          updatedAt={item.updatedAt}
          username={item.username}
          isDragHover={dragRow != null && hoverRow?.id == item.id}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
          handleDrop={handleDrop}
          handleHeart={() => mutateFileHeart.mutate(item.id)}
        />
      ))}

      {folders.map((item: RowType) => (
        <TableRowFolder
          key={item.id}
          id={item.id}
          row={item}
          title={item.folderName}
          isFavourite={item.heart}
          updatedAt={item.updatedAt}
          username={item.username}
          isDragHover={dragRow != null && hoverRow?.id == item.id}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
          handleDrop={handleDrop}
          handleHeart={() => mutateFolderHeart.mutate(item.id)}
        />
      ))}
    </TableLayout>
  );
};
