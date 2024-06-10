"use client";
import { File } from "@/types/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { FileIcon, FolderIcon, MoreHorizontal } from "lucide-react";
import { fileDownload, fileMoveFolder } from "@/api/file-api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFile } from "@/context/file-context";
import { folderMoveFolder } from "@/api/folder-api";

interface DataTableProps {
  modalOpen: (file: File, type: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ modalOpen }) => {
  const router = useRouter();
  const { files, refreshFolder } = useFile();
  const [hoverRow, setHoverRow] = useState<File | null>(null);
  const [dragRow, setDragRow] = useState<File | null>(null);

  const handleDoubleClick = (id: string, type: string, filename: string) => {
    if (type == "FILE") fileDownload(id, filename);
    if (type == "FOLDER") router.push(`/folders/${id}`);
  };

  const handleFolderChange = async (e: any) => {
    e.preventDefault();
    if (hoverRow == null || dragRow == null) return;
    if (hoverRow == dragRow) return;

    if (hoverRow.type == "FOLDER" && dragRow.type == "FOLDER") {
      const isSuccess = await folderMoveFolder(dragRow.id, hoverRow.id);
      if (isSuccess) refreshFolder();
    }

    if (hoverRow.type == "FOLDER" && dragRow.type == "FILE") {
      const isSuccess = await fileMoveFolder(dragRow.id, hoverRow.id);
      if (isSuccess) refreshFolder();
    }
  };

  useEffect(() => {
    refreshFolder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>파일명</TableHead>
          <TableHead>수정한 사람</TableHead>
          <TableHead>수정한 날짜</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.length == 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-primary">
              파일이 없습니다.
            </TableCell>
          </TableRow>
        )}
        {files.map((item) => {
          return (
            <TableRow
              key={item.id}
              draggable
              onDragStart={() => setDragRow(item)}
              onDragOver={(e) => {
                e.preventDefault();
                setHoverRow(item);
              }}
              onDrop={handleFolderChange}
              onDragEnd={() => {
                setDragRow(null);
                setHoverRow(null);
              }}
              className={`${
                item.id == hoverRow?.id &&
                hoverRow.id != dragRow?.id &&
                "border-2 border-secondary border-dashed"
              }`}
            >
              <TableCell
                className="text-md font-medium cursor-pointer hover:underline underline-offset-2 flex items-center gap-2"
                onDoubleClick={() =>
                  handleDoubleClick(item.id, item.type, item.originalFileName)
                }
              >
                {item.type == "FOLDER" ? <FolderIcon /> : <FileIcon />}
                {item.originalFileName}
              </TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.updatedAt?.substring(0, 10)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>메뉴</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {item.type == "FILE" && (
                      <DropdownMenuItem
                        className="flex2 font-medium py-3 cursor-pointer"
                        onClick={() => modalOpen(item, "SHARE")}
                      >
                        공유 {item.code != null ? "보기" : "하기"}
                      </DropdownMenuItem>
                    )}
                    {item.type == "FILE" && item.code != null && (
                      <DropdownMenuItem
                        className="flex2 font-medium py-3 cursor-pointer"
                        onClick={() => modalOpen(item, "SHARE_STOP")}
                      >
                        공유중지
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="flex2 font-medium py-3 cursor-pointer"
                      onClick={() => modalOpen(item, "DELETE")}
                    >
                      삭제하기
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
