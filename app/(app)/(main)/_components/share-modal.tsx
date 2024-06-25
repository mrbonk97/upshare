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
import { toast } from "@/components/ui/use-toast";

import { Spinner } from "@/components/spinner";
import { File, modalType } from "@/type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import useStore from "@/store/store";
import { shareFile } from "@/lib/action/file-action";

export const ShareModal = () => {
  const files = useStore.use.files();
  const selectedFile = useStore.use.selectedFile();
  const setIsModalOpen = useStore.use.setIsModalOpen();
  const updateFile = useStore.use.updateFile();
  const isModalOpen = useStore.use.isModalOpen();
  const modal = useStore.use.modal();
  const queryClient = useQueryClient();

  const { isPending, mutate, isSuccess, error, data, reset } = useMutation({
    mutationFn: () => shareFile(selectedFile!.id),
    onSuccess: (e) => {
      const _files = files.map((item: File) => {
        if (item.id != selectedFile?.id) return item;
        item.code = e.code;
        return item;
      });
      updateFile(_files);
      queryClient.removeQueries({ queryKey: ["folders"] });
    },
  });

  const handleCopy = () => {
    toast({
      title: "클립보드에 복사하였습니다.",
      description: `파일 코드: ${data?.data.code || selectedFile?.code}`,
    });

    const baseUrl = window.location.href.split("/");
    navigator.clipboard.writeText(
      `${baseUrl[0]}//${baseUrl[2]}/share?code=${
        data?.data.code || selectedFile?.code
      }`
    );
  };

  return (
    <AlertDialog
      open={isModalOpen && modal == modalType.SHARE}
      onOpenChange={() => {
        reset();
        setIsModalOpen(false);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>공유하기</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedFile?.code != null || isSuccess
              ? "현재 파일을 공유하고 있습니다."
              : "공유 준비중..."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="h-32 flex2 flex-col">
          {(selectedFile?.code != null || isSuccess) && (
            <div className="flex items-center">
              <span className="text-2xl px-5">
                코드: {selectedFile?.code || data?.data.code}
              </span>
              <Button
                variant={"ghost"}
                onClick={handleCopy}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Copy />
              </Button>
            </div>
          )}
          {selectedFile?.code == null && !isPending && !isSuccess && (
            <Button className="h-24 w-24 rounded-full" onClick={() => mutate()}>
              공유하기
            </Button>
          )}
          {isPending && <Spinner />}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
