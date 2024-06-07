import { FileUploadModal } from "../modal/file-upload-modal";
import { FolderCreateModal } from "../modal/folder-create-modal";
import { SpaceIndicator } from "../space-indicator";

export const LeftNavbar = () => {
  return (
    <aside className="fixed h-full pt-14 w-96">
      <div className="h-full bg-secondary p-10 flex flex-col justify-between">
        <div className="space-y-5">
          <FileUploadModal />
          <FolderCreateModal />
        </div>
        <SpaceIndicator />
      </div>
    </aside>
  );
};
