import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      <TableCell className="text-center">
        {updatedAt.substring(0, 10)}
      </TableCell>
      <TableCell className="text-center">{username}</TableCell>
      <TableCell className="text-center"></TableCell>
      <TableCell
        className="hidden lg:table-cell text-center cursor-pointer"
        onClick={handleHeart}
      >
        {isFavourite ? "❤️" : "🤍"}
      </TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>메뉴</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteM id={id} title={title} type="FOLDER" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
