"use client";
import { DataTable } from "@/components/data-table";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DeleteModal } from "@/components/modal/delete-modal";
import { ShareModal } from "@/components/modal/share-modal";
import { StopShareModal } from "@/components/modal/stop-share-modal";
import { File } from "@/types/type";
import { useState } from "react";

const FolderPage = ({ params }: { params?: { id: string } }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState({
    share: false,
    stopShare: false,
    delete: false,
  });

  const handleModalOpen = (file: File, type: string) => {
    setFile(file);
    switch (type) {
      case "SHARE":
        setIsModalOpen({ ...isModalOpen, share: true });
        break;
      case "SHARE_STOP":
        setIsModalOpen({ ...isModalOpen, stopShare: true });
        break;
      case "DELETE":
        setIsModalOpen({ ...isModalOpen, delete: true });
        break;
    }
  };

  const handleModalClose = () => {
    setIsModalOpen({
      share: false,
      stopShare: false,
      delete: false,
    });
    setFile(null);
  };

  return (
    <>
      <main className="min-h-full grid w-full px-5 md:pl-[400px] pt-16 bg-secondary">
        <div className="flex-1 px-5 rounded-t-lg bg-primary-foreground">
          <FolderBreadCrumb folderId={params?.id} />
          <ShareModal
            isOpen={isModalOpen.share}
            file={file}
            modalClose={handleModalClose}
          />
          <StopShareModal
            isOpen={isModalOpen.stopShare}
            file={file}
            modalClose={handleModalClose}
          />
          <DeleteModal
            isOpen={isModalOpen.delete}
            file={file}
            modalClose={handleModalClose}
          />
          <section className="mt-5 pr-5">
            <DataTable modalOpen={handleModalOpen} />
          </section>
        </div>
      </main>
    </>
  );
};

export default FolderPage;
