import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ApertureIcon, FolderPlusIcon, PlusIcon } from "lucide-react";
import { FileUploadModal } from "@/app/folders/_components/modal/file-upload-modal";
import { FolderCreateModal } from "@/app/folders/_components/modal/folder-create-modal";

export const MobileUploadButton = () => {
  return (
    <Drawer>
      <DrawerTrigger
        title="파일 폴더 생성"
        className="lg:hidden fixed bottom-5 right-5 h-12 aspect-square rounded-full bg-blue-400 text-background flex2"
      >
        <PlusIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>업로드 메뉴</DrawerTitle>
          <DrawerDescription>파일과 폴더를 생성할 수 있습니다.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 space-y-5">
          <FileUploadModal>
            <Button variant={"outline"} className="w-full bg-blue-400 text-background">
              <ApertureIcon className="inline mr-2" />
              파일 업로드
            </Button>
          </FileUploadModal>
          <FolderCreateModal>
            <Button variant={"outline"} className="w-full bg-blue-400 text-background">
              <FolderPlusIcon className="inline mr-2" />
              폴더 생성
            </Button>
          </FolderCreateModal>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              취소
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
