"use client";
import { FolderBreadCrumb } from "../_components/breadcrumb/folder-breadcrumb";
import { FolderTable } from "../_components/table/folder-table";
import { useQuery } from "@tanstack/react-query";
import { searchFile } from "@/lib/api/folder-api";
import { useSearchParams } from "next/navigation";
import useStore from "@/store/store";
import { SkeletonList } from "@/components/skeleton-list";

const SearchPage = () => {
  const setFolder = useStore.use.setFolder();
  setFolder(null);
  const q = useSearchParams().get("q");

  const query = useQuery({
    queryKey: ["folders", q],
    queryFn: () => searchFile(q),
  });

  if (query.isError) throw "뭔가 오류발생";

  return (
    <section className="p-5">
      <FolderBreadCrumb />
      {query.isPending ? (
        <SkeletonList />
      ) : (
        <FolderTable
          files={query.data?.data.result.files}
          folders={query.data?.data.result.folders}
        />
      )}
    </section>
  );
};

export default SearchPage;
