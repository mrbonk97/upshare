import { FileUploadModal } from "../modal/file-upload-modal";
import { FolderCreateModal } from "../modal/folder-create-modal";
import { SpaceIndicator } from "../space-indicator";

export const LeftNavbar = () => {
  return (
    <aside className="hidden md:block fixed h-full pt-14 w-96 bg-tertiary">
      <div className="h-full p-10 flex flex-col justify-between">
        <div className="space-y-5">
          <FileUploadModal />
          <FolderCreateModal />
        </div>
        <SpaceIndicator />
      </div>
    </aside>
  );
};
