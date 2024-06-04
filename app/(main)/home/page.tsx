"use client";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";
import { useFile } from "@/context/file-context";
import { useEffect } from "react";

const HomePage = () => {
  const { files, refreshFolder } = useFile();

  useEffect(() => {
    refreshFolder();
  }, []);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} />
    </main>
  );
};

export default HomePage;
