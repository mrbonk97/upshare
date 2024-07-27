"use client";
import { useFolder2 } from "@/hooks/useFolder2";
import { FolderBreadCrumb } from "../_components/breadcrumb/folder-breadcrumb";

const SearchPage = () => {
  useFolder2();

  return (
    <section className="p-5">
      <FolderBreadCrumb />
    </section>
  );
};

export default SearchPage;
