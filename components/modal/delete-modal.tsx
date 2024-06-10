import { deleteFile } from "@/api/file-api";
import { deleteFolder } from "@/api/folder-api";
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
import { useFile } from "@/context/file-context";
import { File } from "@/types/type";

interface DeleteModalProps {
  file: File | null;
  isOpen: boolean;
  modalClose: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  file,
  isOpen,
  modalClose,
}) => {
  const { refreshFolder } = useFile();

  const handleFileDelete = async () => {
    if (file == null) return;

    let isSuccess = false;
    if (file.type === "FOLDER") isSuccess = await deleteFolder(file.id);
    if (file.type === "FILE") isSuccess = await deleteFile(file.id);
    if (isSuccess) refreshFolder();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={modalClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제 이후에는 복구하실 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleFileDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
