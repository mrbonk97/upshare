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

import { Spinner } from "@/components/spinner";
import { modalType } from "@/type/type";
import { useMutation } from "@tanstack/react-query";
import useStore from "@/store/store";
import { stopShareFile } from "@/lib/action/file-action";
import { useEffect } from "react";

export const StopShareModal = () => {
  const files = useStore.use.files();
  const updateFile = useStore.use.updateFile();
  const selectedFile = useStore.use.selectedFile();
  const setIsModalOpen = useStore.use.setIsModalOpen();
  const isModalOpen = useStore.use.isModalOpen();
  const modal = useStore.use.modal();

  const { isPending, mutate } = useMutation({
    mutationFn: () => stopShareFile(selectedFile!.id),
    onSuccess: () => {
      const _files = files.map((item) => {
        if (selectedFile?.id != item.id) return item;
        item.code = null;
        return item;
      });
      updateFile(_files);
    },
  });

  useEffect(() => {
    if (!isModalOpen) return;
    if (modal != modalType.SHARE_STOP) return;
    mutate();
  }, [isModalOpen]);

  return (
    <AlertDialog
      open={isModalOpen && modal == modalType.SHARE_STOP}
      onOpenChange={(e) => {
        setIsModalOpen(e);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>공유중지</AlertDialogTitle>
          <AlertDialogDescription>
            {isPending ? "공유를 중지하고 있습니다." : "공유 중지 완료"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="h-32 flex2 flex-col">
          {isPending ? (
            <Spinner />
          ) : (
            <div className="flex items-center">
              <span className="text-xl px-5 font-semibold">
                공유를 중지했습니다.
              </span>
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
