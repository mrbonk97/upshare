"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { FolderContext } from "../folder-context";

interface Props {
  fileId: number;
  isShare: boolean;
  shareCode: string | null;
  isOpen: boolean;
  closeModal: () => void;
}

export const ShareFileModal = ({ fileId, isShare, shareCode, isOpen, closeModal }: Props) => {
  const context = useContext(FolderContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(`/api/files/${fileId}/share`);
      if (result.ok) {
        context.revalidate();
      }
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "파일 공유에 실패했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    navigator.clipboard
      .writeText(`${protocol}//${host}/share?code=${shareCode}`)
      .then(() =>
        toast({
          title: "클립보드에 복사됨",
          description: "파일 다운로드 URL을 복사했습니다",
        })
      )
      .catch((err) => {
        toast({
          title: "클립보드에 복사 실패",
          description: err,
        });
      });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (!isLoading) closeModal();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 공유</DialogTitle>
          <DialogDescription>파일을 공유하실 수 있습니다</DialogDescription>
        </DialogHeader>
        {isShare ? (
          <>
            <div className="py-6 flex2 flex-col gap-2">
              <div className="font-medium opacity-70">공유중입니다</div>
              <div className="text-2xl font-medium opacity-80">
                코드: {shareCode}
                <Button
                  onClick={() => handleCopy()}
                  size={"icon"}
                  variant={"ghost"}
                  className="ml-2"
                >
                  <CopyIcon size={20} />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isLoading} variant={"outline"}>
                  닫기
                </Button>
              </DialogClose>
              <Button disabled={isLoading} onClick={() => handleShare()} className="w-full">
                공유 중지
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex2">
            <Button
              disabled={isLoading}
              onClick={() => handleShare()}
              className="h-20 aspect-square rounded-full"
            >
              공유하기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
