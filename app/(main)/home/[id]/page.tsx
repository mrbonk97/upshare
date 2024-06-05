"use client";
import { folderDepth } from "@/api/folder-api";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";
import { useFile } from "@/context/file-context";
import { FolderBreadCrumbType } from "@/types/type";
import { useEffect, useState } from "react";

const FolderPage = ({ params }: { params: { id: string } }) => {
  const { files, refreshFolder } = useFile();
  const [depth, setDepth] = useState<FolderBreadCrumbType[]>([]);

  const handleBreadCrumb = async (folderId: string) => {
    const result = await folderDepth(folderId);
    setDepth(result);
  };

  useEffect(() => {
    refreshFolder(params.id);
    handleBreadCrumb(params.id);
  }, []);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb depth={depth} />
      <DataTableDemo data={files} />
    </main>
  );
};

export default FolderPage;
