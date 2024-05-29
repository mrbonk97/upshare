"use client";
import { foldersApi } from "@/api/folders-api";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";
import { useFile } from "@/context/file-context";
import { useEffect } from "react";

const HomePage = ({ params }: { params: { id: string } }) => {
  const { files, setFiles } = useFile();

  useEffect(() => {
    const handleFileRequest = async () => {
      const result = await foldersApi.getFolder(params.id);
      if (result.status == 200) setFiles(result.data.files);
    };

    handleFileRequest();
  }, [setFiles]);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} folderId={params.id} />
    </main>
  );
};

export default HomePage;
