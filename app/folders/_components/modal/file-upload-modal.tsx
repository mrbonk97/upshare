"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useContext, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { CloudUploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { convertByte } from "@/lib/utils";
import { useMyFile } from "@/hooks/use-file";
import { useToast } from "@/hooks/use-toast";
import { FolderContext } from "../folder-context";

interface Props {
  children: React.ReactNode;
}

export const FileUploadModal = ({ children }: Props) => {
  const context = useContext(FolderContext);
  const folderId = context.getFolderId();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myFiles, setMyFiles, checkAndAppendFile] = useMyFile();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => checkAndAppendFile(acceptedFiles),
    [checkAndAppendFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (file: FileWithPath) => {
    setMyFiles((prevFiles) => prevFiles.filter((item) => item !== file));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    if (folderId) formData.append("folder_id", folderId);
    myFiles.forEach((file) => formData.append("files", file));

    try {
      const result = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      if (result.ok) {
        await context.revalidate();
        toast({ title: "파일 업로드 성공" });
        setIsOpen(false);
      }
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "파일 업로드 실패" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const files = myFiles.map((file, idx) => (
    <li
      key={`${file.path}-file${idx}`}
      className="relative p-2 px-4 flex gap-2 bg-secondary rounded-xl"
    >
      <Image src={"/icons/004-disc.svg"} alt="icon" height={36} width={36} className="h-full" />
      <div className="w-0 flex-grow">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium opacity-80">
          {file.name}
        </p>
        <p className="text-xs font-medium opacity-70">{convertByte(file.size)}</p>
      </div>
      <XIcon
        role="button"
        className="absolute top-2 right-2 hover:opacity-80"
        size={18}
        opacity={80}
        onClick={() => removeFile(file)}
      />
    </li>
  ));

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setMyFiles([]);
        setIsOpen((cur) => !cur);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>현재 경로에 파일을 추가합니다.</DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className="w-full h-40 rounded-xl border-2 border-dashed flex2 flex-col gap-1 cursor-pointer"
        >
          <input {...getInputProps()} />
          <CloudUploadIcon size={48} className="text-blue-400" />

          <p className="font-medium opacity-70">
            {isDragActive ? "여기에 떨어트리세요" : "파일을 드래그 하거나 클릭하세요"}
          </p>
          <p className="font-medium text-sm opacity-60">파일별 20MB까지 업로드 가능</p>
        </div>
        {files.length > 0 && <ul className="max-h-52 overflow-y-auto space-y-2">{files}</ul>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>취소</Button>
          </DialogClose>
          <Button
            onClick={() => handleSubmit()}
            type="button"
            className="w-full"
            disabled={myFiles.length == 0 || isSubmitting}
          >
            {isSubmitting ? "업로드 중..." : "업로드"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
