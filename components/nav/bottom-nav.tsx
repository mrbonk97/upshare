"use client";
import { Plus, PlusCircle } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { FileUploadModal } from "../modal/file-upload-modal";
import { FolderCreateModal } from "../modal/folder-create-modal";

export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-10 left-10 z-30">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={"outline"} className="" size={"icon"}>
            <Plus className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerFooter>
              <FileUploadModal />
              <FolderCreateModal />
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};
