"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { CloudUploadIcon, XIcon } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export const FileUploadModal = ({ children }: Props) => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>현재 경로에 파일을 추가합니다.</DialogDescription>
        </DialogHeader>
        <form>
          <input
            required
            onChange={(e) => {
              if (e.target.files) setFileList(e.target.files);
            }}
            type="file"
            multiple
            aria-hidden
            className="hidden"
            name="upshare_file"
            id="upshare_file"
          />
          <label
            htmlFor="upshare_file"
            className="w-full h-40 border-2 border-dashed rounded-xl cursor-pointer flex2 flex-col"
          >
            <CloudUploadIcon size={96} className="text-blue-400" />
            <p className="text-center text-lg font-semibold opacity-80">
              파일을 선택해주세요
            </p>
            <p className="text-center text-xs font-medium opacity-60">
              최대 20MB까지 가능
            </p>
          </label>
        </form>
        <ul className="space-y-2">
          {fileList &&
            Array.from({ length: fileList.length }).map((_, idx) => {
              return (
                <li
                  key={idx}
                  className="p-2 px-4 bg-blue-100 rounded-xl flex justify-between items-center"
                >
                  <span className="font-medium opacity-80">
                    {fileList![idx].name}
                  </span>
                  <button className="p-1 bg-secondary rounded-full">
                    <XIcon size={20} />
                  </button>
                </li>
              );
            })}
        </ul>
        <div>
          <DialogClose asChild>
            <Button className="py-6 w-full">닫기</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
