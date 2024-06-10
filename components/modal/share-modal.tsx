"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Copy } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { shareFile } from "@/api/file-api";
import { useEffect, useState } from "react";
import { File } from "@/types/type";
import { useFile } from "@/context/file-context";

interface ShareModalProps {
  file: File | null;
  isOpen: boolean;
  modalClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  file,
  isOpen,
  modalClose,
}) => {
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const { refreshFolder } = useFile();

  useEffect(() => {
    if (!isOpen) return;

    const handleShare = async () => {
      if (file == null) return;
      const _code = await shareFile(file!.id);
      setCode(_code);
      if (_code != null) refreshFolder();
    };

    handleShare();
  }, [isOpen, file, refreshFolder]);

  const handleCopy = () => {
    toast({
      title: "클립보드에 복사하였습니다.",
      description: `파일 코드: ${code}`,
    });

    const baseUrl = window.location.href.split("/");
    navigator.clipboard.writeText(
      `${baseUrl[0]}//${baseUrl[2]}/share?code=${code}`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={modalClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>파일을 공유하고 있습니다.</DialogTitle>
          <DialogDescription>
            아래 코드를 통해 파일에 접근하실 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-5 mt-16 mb-10">
          <span className="text-2xl px-5">코드: {code}</span>
          <Button
            variant={"ghost"}
            onClick={handleCopy}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
