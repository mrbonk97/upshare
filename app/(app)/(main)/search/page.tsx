"use client";
import { useFolder2 } from "@/hooks/useFolder2";
import { FolderBreadCrumb } from "../_components/breadcrumb/folder-breadcrumb";
import { FolderTable } from "../_components/table/folder-table";
import { useQuery } from "@tanstack/react-query";
import { searchFile } from "@/lib/api/folder-api";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const q = useSearchParams().get("q");

  const query = useQuery({
    queryKey: ["folders", q],
    queryFn: () => searchFile(q),
  });

  if (query.isError) throw "뭔가 오류발생";
  if (query.isPending) return <div>로딩중</div>;

  return (
    <section className="p-5">
      <FolderBreadCrumb />
      <FolderTable
        files={query.data?.data.result.files}
        folders={query.data?.data.result.folders}
      />
    </section>
  );
};

export default SearchPage;
