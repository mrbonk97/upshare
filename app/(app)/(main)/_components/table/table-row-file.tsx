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
import { Button } from "@/components/ui/button";
import { FileFolderIcon } from "./file-folder-icon";
import { MoreHorizontalIcon } from "lucide-react";
import { DeleteM } from "@/app/(app)/(main)/_components/modal/delete-m";
import { ShareM } from "@/app/(app)/(main)/_components/modal/share-m";
import { formatBytes } from "@/lib/utils";

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
  isDragHover,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  handleDrop,
  handleHeart,
}: TableRowFileProps) => {
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
      <TableCell className="flex items-center gap-2">
        <FileFolderIcon type={"FILE"} isDragHover={isDragHover} />
        <span>{title}</span>
      </TableCell>
      <TableCell className="text-center">
        {updatedAt.substring(0, 10)}
      </TableCell>
      <TableCell className="text-center">{username}</TableCell>
      <TableCell className="text-center">{formatBytes(size)}</TableCell>
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
              <ShareM id={id} code={code} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteM id={id} title={title} type="FILE" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
