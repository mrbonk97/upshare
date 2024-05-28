"use client";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

const HomePage = ({ params }: { params: { id: string } }) => {
  const [files, setFiles] = useState([]);

  const handleFileRequest = async () => {
    const result = await api.get(`/folders/${params.id}`);
    if (result.status == 200) {
      console.log(result.data.files);
      setFiles(result.data.files);
    }
  };

  useEffect(() => {
    handleFileRequest();
  }, []);

  console.log(params);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} />
    </main>
  );
};

export default HomePage;
