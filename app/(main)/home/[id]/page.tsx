"use client";
import { folderDepth } from "@/api/folder-api";
import { DataTable2 } from "@/components/data-table";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DeleteModal } from "@/components/modal/delete-modal";
import { ShareModal } from "@/components/modal/share-modal";
import { useFile } from "@/context/file-context";
import { File, FolderBreadCrumbType } from "@/types/type";
import { useEffect, useState } from "react";

const FolderPage = ({ params }: { params: { id: string } }) => {
  const { files, refreshFolder } = useFile();
  const [depth, setDepth] = useState<FolderBreadCrumbType[]>([]);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleBreadCrumb = async (folderId: string) => {
    if (folderId == "") return;
    const result = await folderDepth(folderId);
    setDepth(result);
  };

  const handleModalOpen = (file: File, type: string) => {
    if (type == "SHARE") setIsShareOpen(true);
    if (type == "DELETE") setIsDeleteOpen(true);
    setFile(file);
  };

  useEffect(() => {
    refreshFolder(params.id);
    handleBreadCrumb(params.id);
  }, []);

  return (
    <>
      <ShareModal
        isOpen={isShareOpen}
        file={file}
        modalClose={() => setIsShareOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        file={file}
        modalClose={() => setIsDeleteOpen(false)}
      />
      <main className="h-full w-full pl-[400px] pt-16">
        <FolderBreadCrumb depth={depth} />
        <section className="mt-5 pr-5">
          <DataTable2 data={files} modalOpen={handleModalOpen} />
        </section>
      </main>
    </>
  );
};

export default FolderPage;
