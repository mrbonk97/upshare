"use client";

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

import { cn } from "@/lib/utils";
import { File, modalType } from "@/type/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import useStore from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileDownload, fileHeartChange } from "@/lib/action/file-action";
import { folderHeartChange } from "@/lib/action/folder-action";
import { api } from "@/lib/api";

export const DataTable = () => {
  const files = useStore.use.files();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [hoverRow, setHoverRow] = useState<File | null>(null);
  const [dragRow, setDragRow] = useState<File | null>(null);
  const setIsModalOpen = useStore.use.setIsModalOpen();
  const selectFile = useStore.use.selectFile();
  const updateFile = useStore.use.updateFile();

  const { mutate: mutateFileDownload } = useMutation({
    mutationFn: (file: File) => fileDownload(file.id, file.originalFileName),
  });

  const { mutate: mutateFileHeart } = useMutation({
    mutationFn: (file: File) => fileHeartChange(file.id),
    onSuccess: (e: File) => {
      const _files = files.map((item) => {
        if (e.id != item.id) return item;
        return e;
      });

      updateFile(_files);
      console.log("업데이트 완료", _files);
      queryClient.removeQueries({ queryKey: ["favorite"] });
      queryClient.removeQueries({ queryKey: ["folders"] });
    },
  });

  const { mutate: mutateFolderHeart } = useMutation({
    mutationFn: (file: File) => folderHeartChange(file.id),
    onSuccess: (e) => {
      const _files = files.map((item) => {
        if (e.id != item.id) return item;
        return e;
      });
      updateFile(_files);
      queryClient.removeQueries({ queryKey: ["favorite"] });
      queryClient.removeQueries({ queryKey: ["folders"] });
    },
  });

  const { mutate: mutateFolderFolderChange } = useMutation({
    mutationFn: ({
      folderId,
      parentFolderId,
    }: {
      folderId: string;
      parentFolderId: string;
    }): Promise<File> =>
      api
        .put("/folders/move-folder", { folderId, parentFolderId })
        .then((res) => res.data),
    onSuccess: (e: File) => {
      const _files = files.filter((item) => {
        if (e.id != item.id) return item;
      });
      updateFile(_files);
    },
  });

  const { mutate: mutateFileFolderChange } = useMutation({
    mutationFn: ({
      fileId,
      folderId,
    }: {
      fileId: string;
      folderId: string;
    }): Promise<File> =>
      api
        .put("/files/change-folder", { fileId, folderId })
        .then((res) => res.data),
    onSuccess: (e: File) => {
      const _files = files.filter((item) => {
        if (e.id != item.id) return item;
      });
      updateFile(_files);
    },
  });

  const handleClick = (file: File) => {
    if (file.type == "FOLDER") router.push(`/folders/${file.id}`);
    if (file.type == "FILE") {
      mutateFileDownload(file);
    }
  };

  const handleFolderChange = async (e: any) => {
    e.preventDefault();
    if (hoverRow == null || dragRow == null) return;
    if (hoverRow == dragRow) return;
    console.log(hoverRow, dragRow);

    if (hoverRow.type == "FOLDER" && dragRow.type == "FOLDER") {
      mutateFolderFolderChange({
        folderId: dragRow.id,
        parentFolderId: hoverRow.id,
      });
    }

    if (hoverRow.type == "FOLDER" && dragRow.type == "FILE") {
      mutateFileFolderChange({
        fileId: dragRow.id,
        folderId: hoverRow.id,
      });
    }
  };

  const handleHeart = async (e: File) => {
    if (e.type == "FILE") mutateFileHeart(e);
    if (e.type == "FOLDER") mutateFolderHeart(e);
  };

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
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((item: File) => (
          <TableRow
            draggable
            key={item.id}
            className={cn(
              dragRow?.id != hoverRow?.id &&
                hoverRow?.id == item.id &&
                "border-2 border-blue-500 border-dashed"
            )}
            onDragStart={() => setDragRow(item)}
            onDragOver={(e) => {
              e.preventDefault();
              setHoverRow(item);
            }}
            onDragEnd={() => {
              setDragRow(null);
              setHoverRow(null);
            }}
            onDrop={handleFolderChange}
          >
            <TableCell
              className="cursor-pointer flex items-center gap-2"
              onClick={() => handleClick(item)}
            >
              {item.type == "FILE" && (
                <Image
                  src={"/images/folder/document.svg"}
                  width={28}
                  height={28}
                  alt="document"
                />
              )}

              {item.type == "FOLDER" && (
                <Image
                  src={`/images/folder/${
                    dragRow?.id != hoverRow?.id && hoverRow?.id == item.id
                      ? "folder-open.svg"
                      : "folder-close.svg"
                  }`}
                  width={28}
                  height={28}
                  alt="folder"
                />
              )}
              <span className="w-40 sm:w-80 md:w-40 lg:w-60 xl:w-96 2xl:w-[600px] overme">
                {item.originalFileName}
              </span>
            </TableCell>
            <TableCell className="hidden lg:table-cell text-center">
              {item.updatedAt?.substring(0, 10)}
            </TableCell>
            <TableCell className="hidden md:table-cell text-center">
              {item.username}
            </TableCell>
            <TableCell className="hidden lg:table-cell text-center">
              {item.size < 1048576 &&
                item.type == "FILE" &&
                (item?.size / 1024).toFixed(1) + "kb"}
              {item.size >= 1048576 &&
                item.type == "FILE" &&
                (item?.size / 1048576).toFixed(1) + "mb"}
            </TableCell>
            <TableCell
              className="text-center cursor-pointer"
              onClick={() => handleHeart(item)}
            >
              {item.heart ? "❤️" : "🤍"}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <span className="sr-only">메뉴 열기</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>메뉴</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {item.type == "FILE" && item.code == null && (
                    <DropdownMenuItem
                      onClick={() => {
                        setIsModalOpen(true, modalType.SHARE);
                        selectFile(item);
                      }}
                    >
                      공유하기
                    </DropdownMenuItem>
                  )}
                  {item.type == "FILE" && item.code != null && (
                    <>
                      <DropdownMenuItem
                        onClick={() => {
                          selectFile(item);
                          setIsModalOpen(true, modalType.SHARE);
                        }}
                      >
                        공유보기
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          selectFile(item);
                          setIsModalOpen(true, modalType.SHARE_STOP);
                        }}
                      >
                        공유중지
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={() => {
                      selectFile(item);
                      setIsModalOpen(true, modalType.DELETE);
                    }}
                  >
                    삭제하기
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
