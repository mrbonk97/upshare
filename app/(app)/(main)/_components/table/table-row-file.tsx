"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { RowType } from "@/type/type";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { DeleteM } from "@/app/(app)/(main)/_components/modal/delete-m";
import { ShareM } from "@/app/(app)/(main)/_components/modal/share-m";
import { formatBytes } from "@/lib/utils";
import getFileIcon from "@/lib/get-file-icons";
import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "@/lib/api/folder-api";
import { ChangeTitleM } from "../modal/change-title-m";
import { useState } from "react";

interface TableRowFileProps {
  id: string;
  code: string | null;
  row: RowType;
  title: string;
  updatedAt: string;
  username: string;
  size: number;
  isFavourite: boolean;
  isDragHover: boolean;
  handleDragStart: (e: RowType) => void;
  handleDragOver: (e: RowType) => void;
  handleDragEnd: () => void;
  handleDrop: () => void;
  handleHeart: () => void;
}
export const TableRowFile = ({
  id,
  code,
  row,
  title,
  updatedAt,
  username,
  size,
  isFavourite,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  handleHeart,
}: TableRowFileProps) => {
  const [isOn, setIsOn] = useState(false);
  const titles = title.split(".");
  const type = titles[titles.length - 1];
  const mutate = useMutation({
    mutationFn: () => downloadFile(id),
  });

  return (
    <TableRow
      draggable
      onDragStart={() => handleDragStart(row)}
      onDragOver={(e) => {
        e.preventDefault();
        handleDragOver(row);
      }}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <TableCell
        onClick={() => mutate.mutate()}
        className="flex items-center gap-2 text-ellipsis cursor-pointer hover:underline underline-offset-4"
      >
        {getFileIcon(type, 24)}
        <span>{title}</span>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        {updatedAt.substring(0, 10)}
      </TableCell>
      <TableCell className="hidden sm:table-cell text-center">
        {username}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        {formatBytes(size)}
      </TableCell>
      <TableCell
        className="hidden lg:table-cell text-center cursor-pointer"
        onClick={handleHeart}
      >
        {isFavourite ? "❤️" : "🤍"}
      </TableCell>
      <TableCell className="text-center">
        <DropdownMenu open={isOn} onOpenChange={setIsOn}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-24">
            <DropdownMenuLabel>메뉴</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ShareM id={id} code={code}>
              <DropdownMenuLabel>파일 공유</DropdownMenuLabel>
            </ShareM>
            <DeleteM id={id} title={title} type="FILE" setIsMenuOn={setIsOn}>
              <DropdownMenuLabel>파일 삭제</DropdownMenuLabel>
            </DeleteM>
            <ChangeTitleM
              id={id}
              title={title}
              type="FILE"
              setIsMenuOn={setIsOn}
            >
              <DropdownMenuLabel>이름 변경</DropdownMenuLabel>
            </ChangeTitleM>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
