// import { deleteFile } from "@/api/file-api";
// import { deleteFolder } from "@/api/folder-api";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { useFile } from "@/context/file-context";

// interface DeleteModalProps {
//   id: string;
//   type: string;
// }

// export const DeleteModal: React.FC<DeleteModalProps> = ({ id, type }) => {
//   const { refreshFolder } = useFile();

//   const handleFileDelete = async () => {
//     let isSuccess = false;
//     if (type === "FOLDER") isSuccess = await deleteFolder(id);
//     if (type === "FILE") isSuccess = await deleteFile(id);
//     if (isSuccess) refreshFolder();
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant={"ghost"} className="w-full">
//           삭제하기
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
//           <AlertDialogDescription>
//             삭제 이후에는 복구하실 수 없습니다.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>취소</AlertDialogCancel>
//           <AlertDialogAction onClick={handleFileDelete}>삭제</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFile } from "@/context/file-context";

interface DeleteModalProps {
  id: string;
  type: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ id, type }) => {
  const { refreshFolder } = useFile();

  const handleFileDelete = async () => {
    let isSuccess = false;
    if (type === "FOLDER") isSuccess = await deleteFolder(id);
    if (type === "FILE") isSuccess = await deleteFile(id);
    if (isSuccess) refreshFolder();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="w-full">
          삭제하기
        </Button>
      </AlertDialogTrigger>
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
