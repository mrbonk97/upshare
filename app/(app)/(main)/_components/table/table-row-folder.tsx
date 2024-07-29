"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RowType } from "@/type/type";
import { FileFolderIcon } from "./file-folder-icon";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteM } from "@/app/(app)/(main)/_components/modal/delete-m";
import { ChangeTitleM } from "../modal/change-title-m";
import { useState } from "react";

interface TableRowFolderProps {
  id: string;
  row: RowType;
  title: string;
  updatedAt: string;
  username: string;
  size?: number;
  isFavourite: boolean;
  isDragHover: boolean;
  handleDragStart: (e: RowType) => void;
  handleDragOver: (e: RowType) => void;
  handleDragEnd: () => void;
  handleDrop: () => void;
  handleHeart: () => void;
}

export const TableRowFolder = ({
  id,
  row,
  title,
  updatedAt,
  username,
  isFavourite,
  isDragHover,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  handleHeart,
}: TableRowFolderProps) => {
  const [isOn, setIsOn] = useState(false);

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
      className={`cursor-pointer
        ${isDragHover && "border-2 border-blue-500 border-dashed"}`}
    >
      <TableCell>
        <Link
          href={`/folders/${id}`}
          className="h-full w-full flex items-center gap-2"
        >
          <FileFolderIcon type={"FOLDER"} isDragHover={isDragHover} />
          <span>{title}</span>
        </Link>
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        {updatedAt.substring(0, 10)}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center">
        {username}
      </TableCell>
      <TableCell className="hidden lg:table-cell text-center"></TableCell>
      <TableCell
        className="hidden lg:table-cell text-center cursor-pointer"
        onClick={handleHeart}
      >
        {isFavourite ? "❤️" : "🤍"}
      </TableCell>
      <TableCell className="text-center">
        <DropdownMenu onOpenChange={setIsOn} open={isOn}>
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
            <DeleteM id={id} title={title} type="FOLDER" setIsMenuOn={setIsOn}>
              <DropdownMenuLabel>파일 삭제</DropdownMenuLabel>
            </DeleteM>
            <ChangeTitleM
              id={id}
              title={title}
              type="FOLDER"
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
