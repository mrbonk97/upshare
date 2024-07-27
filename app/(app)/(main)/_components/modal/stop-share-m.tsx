"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Spinner } from "@/components/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { stopShareFile } from "@/lib/api/folder-api";

interface StopShareMProps {
  id: string;
}

export const StopShareM = ({ id }: StopShareMProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: () => stopShareFile(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["folders"] }),
  });

  if (isError) throw "공유 중지 중 오류 발생";

  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-full w-full py-1 text-center hover:bg-secondary">
        공유중지
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>공유중지</AlertDialogTitle>
          <AlertDialogDescription>
            {isPending && "공유를 중지하고 있습니다."}
            {isSuccess && "공유 중지 완료"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isPending && (
          <div className="h-32 flex2">
            <Spinner />
          </div>
        )}

        {isSuccess && <div className="h-32 flex2">공유를 중지했습니다.</div>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
