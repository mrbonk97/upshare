"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { uploadFile } from "@/lib/api/folder-api";
import useStore from "@/store/store";
import { XCircleIcon } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import getFileIcon from "@/lib/get-file-icons";
import { Dz } from "./dz";

export const FileUploadM = () => {
  const folderId = useStore.use.folderId();
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const qc = useQueryClient();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (formData: FormData) => uploadFile(formData, progressRef),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const handleFile = (e: File) => {
    console.log(e);
    setFile(e);
    setErrorMessage("");
  };

  const handleUpload = () => {
    if (file == null) {
      setErrorMessage("업로드 할 파일이 없습니다.");
      return;
    }
    if (file.size >= 10_245_000) {
      setErrorMessage("파일의 용량이 10mb를 초과하였습니다.");
      return;
    }
    setErrorMessage("");
    const formData = new FormData();
    formData.append("file", file);
    if (folderId) formData.append("folderId", folderId);
    mutate(formData);
  };

  return (
    <Dialog onOpenChange={() => setFile(null)}>
      <DialogTrigger asChild>
        <Button
          ref={buttonRef}
          className="py-6 w-full bg-blue-400/80 hover:bg-blue-400"
        >
          업로드
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>
            업로드 버튼을 클릭해서 추가해주세요(최대 10mb)
          </DialogDescription>
        </DialogHeader>
        <Dz handleFile={handleFile} />

        <div className="pl-2 -mt-3 flex justify-between text-sm">
          <span className="text-destructive">{errorMessage}</span>
          <span>최대 용량: 10MB</span>
        </div>
        {file && (
          <div className="relative pt-5 pb-2 px-5 flex flex-col justify-between gap-3 rounded-lg bg-secondary w-full">
            <button
              disabled={isPending}
              className="absolute top-2 right-2 hover:opacity-70 duration-200"
              onClick={() => setFile(null)}
            >
              <XCircleIcon />
            </button>
            <div className="flex gap-5">
              {getFileIcon(file.type.split("/")[1], 48)}
              <div className="flex flex-col text-sm gap-1">
                <span>{file?.name}</span>
                <span>{formatBytes(file.size)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <progress
                ref={progressRef}
                className="h-2 w-full rounded-full"
                max={1}
                value={0}
              />
            </div>
          </div>
        )}
        <Button onClick={handleUpload} disabled={isPending}>
          업로드
        </Button>
      </DialogContent>
    </Dialog>
  );
};
