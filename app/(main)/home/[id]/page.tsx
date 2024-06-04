"use client";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";
import { useFile } from "@/context/file-context";
import { useEffect } from "react";

const FolderPage = ({ params }: { params: { id: string } }) => {
  const { files, refreshFolder } = useFile();

  useEffect(() => {
    refreshFolder(params.id);
  }, []);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} />
    </main>
  );
};

export default FolderPage;
