"use client";

import { searchFile } from "@/api/file-api";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";
import { useFile } from "@/context/file-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Search = () => {
  const { files, setFiles } = useFile();
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    const handleSearch = async () => {
      if (search == null || search == "") setFiles([]);
      else {
        const result = await searchFile(search);
        setFiles(result);
      }
    };

    handleSearch();
  }, [search]);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} />
    </main>
  );
};

export default Search;
