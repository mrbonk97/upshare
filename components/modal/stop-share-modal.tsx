import { useFile } from "@/context/file-context";
import { File } from "@/types/type";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Spinner2 } from "../spinner2";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ThumbsUp } from "lucide-react";
import { stopShareFile } from "@/api/file-api";

interface StopShareModalProps {
  file: File | null;
  isOpen: boolean;
  modalClose: () => void;
}

export const StopShareModal: React.FC<StopShareModalProps> = ({
  file,
  isOpen,
  modalClose,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);
  const { refreshFolder } = useFile();

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isOpen) return;
    if (file?.id == null) return;

    setTimeout(() => {
      setIsDelayed(true);
    }, 1000);

    const handleShareStop = async () => {
      setIsSuccess(await stopShareFile(file!.id));
    };

    handleShareStop();
  }, [isOpen, file, refreshFolder]);

  const handleModalClose = () => {
    refreshFolder();
    modalClose();
    setTimeout(() => {
      setIsSuccess(false);
      setIsDelayed(false);
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>파일 공유 중지</DialogTitle>
          <DialogDescription>
            {isSuccess && isDelayed
              ? "파일 공유를 중지 했습니다."
              : "파일 공유를 중지하는 중입니다..."}
          </DialogDescription>
          <div className="py-10">
            <div className="w-full flex2 py-5">
              {isSuccess && isDelayed ? (
                <ThumbsUp size={48} className="text-tertiary" />
              ) : (
                <Spinner2 loading={true} />
              )}
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
