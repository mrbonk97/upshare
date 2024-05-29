"use client";
import { foldersApi } from "@/api/folders-api";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";
import { useFile } from "@/context/file-context";
import { useEffect } from "react";

const HomePage = () => {
  const { files, setFiles } = useFile();

  useEffect(() => {
    const handleFileRequest = async () => {
      const result = await foldersApi.getFolder();
      if (result.status == 200) setFiles(result.data.files);
    };

    handleFileRequest();
  }, [setFiles]);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} />
    </main>
  );
};

export default HomePage;
