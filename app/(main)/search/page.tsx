"use client";

import { searchFile } from "@/api/file-api";
import { DataTable2 } from "@/components/data-table";
import { DeleteModal } from "@/components/modal/delete-modal";
import { ShareModal } from "@/components/modal/share-modal";
import { useFile } from "@/context/file-context";
import { File } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const { files, setFiles } = useFile();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  useEffect(() => {
    const handleSearch = async () => {
      if (search == null || search == "") {
        setFiles([]);
        return;
      }

      const result = await searchFile(search);
      setFiles(result);
    };
    handleSearch();
  }, [search]);

  const handleModalOpen = (file: File, type: string) => {
    if (type == "SHARE") setIsShareOpen(true);
    if (type == "DELETE") setIsDeleteOpen(true);
    setFile(file);
  };

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
        <section className="mt-5 pr-5">
          <DataTable2 data={files} modalOpen={handleModalOpen} />
        </section>
      </main>
    </>
  );
};

export default Search;
