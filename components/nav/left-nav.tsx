import { FileUploadModal } from "../modal/file-upload-modal";

export const LeftNavbar = () => {
  return (
    <aside className="fixed h-full w-96 px-10 bg-secondary text-secondary-foreground z-20 pt-20">
      <FileUploadModal />
    </aside>
  );
};
