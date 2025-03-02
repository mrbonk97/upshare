"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangleIcon } from "lucide-react";
import { useContext, useState } from "react";
import { FolderContext } from "../folder-context";
import { Spinner } from "@/components/spinner";

interface Props {
  type: "FILE" | "FOLDER";
  isOpen: boolean;
  closeModal: () => void;
  id: number;
  name: string;
}

export const DeleteFileModal = ({ type, isOpen, closeModal, id, name }: Props) => {
  const context = useContext(FolderContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const title = type == "FILE" ? "파일" : "폴더";
  const apiUrl = type == "FILE" ? `/api/files/${id}` : `/api/folders/${id}`;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(apiUrl, { method: "DELETE" });
      if (result.ok) {
        await context.revalidate();
        toast({ title: "파일 삭제 성공" });
        closeModal();
      }
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "[오류] 파일 삭제 실패" });
    }

    setIsLoading(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title} 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            {title} 삭제는 즉시 서버에 반영되며, 복구가 불가능합니다.
          </AlertDialogDescription>
          <div className="py-6 flex2 flex-col gap-4">
            <AlertTriangleIcon size={48} className="text-destructive" />
            <p className="font-medium opacity-80">{name}</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-6" onClick={closeModal} disabled={isLoading}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => handleDelete()}
            className="py-6 w-full bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
          >
            {isLoading ? <Spinner /> : "삭제"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
