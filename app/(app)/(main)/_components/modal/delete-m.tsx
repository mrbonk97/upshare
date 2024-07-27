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
import { deleteFile, deleteFolder } from "@/lib/api/folder-api";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";

interface DeleteMProps {
  type: "FILE" | "FOLDER";
  id: string;
  title: string;
}

export const DeleteM = ({ type, id, title }: DeleteMProps) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: () => {
      if (type == "FILE") return deleteFile(id);
      else return deleteFolder(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      }),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-full w-full py-1 text-center hover:bg-secondary">
        삭제하기
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>삭제하기</AlertDialogTitle>
          <AlertDialogDescription>
            선택하신 항목을 삭제하려고 합니다. 삭제된 파일은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="h-36 flex2 flex-col">
          <TriangleAlert size={48} className="text-destructive" />
          <span className="mt-5">{title}</span>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <Button variant={"destructive"} onClick={() => mutate.mutate()}>
            삭제하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
