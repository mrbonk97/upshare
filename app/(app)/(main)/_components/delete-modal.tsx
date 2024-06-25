"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/spinner";
import { modalType } from "@/type/type";
import { useMutation } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import useStore from "@/store/store";
import { FileDelete, FolderDelete } from "@/lib/action/file-action";

export const DeleteModal = () => {
  const selectedFile = useStore.use.selectedFile();
  const setMemory = useStore.use.setMemory();
  const setIsModalOpen = useStore.use.setIsModalOpen();
  const isModalOpen = useStore.use.isModalOpen();
  const modal = useStore.use.modal();
  const files = useStore.use.files();
  const updateFile = useStore.use.updateFile();

  const { isPending, mutate } = useMutation({
    mutationFn: () => {
      if (selectedFile?.type == "FILE") return FileDelete(selectedFile.id);
      if (selectedFile?.type == "FOLDER") return FolderDelete(selectedFile.id);
      return new Promise(() => true);
    },
    onSuccess: () => {
      updateFile(files.filter((item) => item.id != selectedFile?.id));
      setIsModalOpen(false);
      setMemory("DECREMENT", selectedFile!.size);
    },
  });

  return (
    <AlertDialog
      open={isModalOpen && modal == modalType.DELETE}
      onOpenChange={setIsModalOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>삭제하기</AlertDialogTitle>
          <AlertDialogDescription>
            선택하신 파일을 삭제하려고 합니다. 삭제된 파일은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="h-36 flex2 flex-col">
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <TriangleAlert size={48} className="text-destructive" />
              <span className="mt-5">{selectedFile?.originalFileName}</span>
            </>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>취소하기</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={() => mutate()}
            disabled={isPending}
          >
            삭제하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
