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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createFolder } from "@/app/actions";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const FileUploadModal = ({ children }: Props) => {
  let folderId = usePathname().split("/").at(-1);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>폴더 생성</DialogTitle>
          <DialogDescription>현재 경로에 폴더를 생성합니다.</DialogDescription>
          <form
            className="pt-5 h-40 flex flex-col justify-between"
            action={createFolder}
          >
            <input type="hidden" name="folderId" value={folderId} />
            <input type="file" name="file" />

            <div className="grid grid-cols-5 gap-2">
              <Button type="submit" className="py-6 col-span-4">
                생성
              </Button>
              <DialogClose asChild>
                <Button className="py-6 col-span-1" variant={"destructive"}>
                  취소
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
