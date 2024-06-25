"use client";
import { DataTable } from "@/components/data-table";
import { SkeletonList } from "@/components/skeleton-list";
import { FolderBread } from "@/components/folder-bread";
import { useSearchParams } from "next/navigation";
import { useFolder } from "@/hooks/useFolder";

const SearchPage = () => {
  const q = useSearchParams().get("q");
  const [isPending, isError] = useFolder({ type: "SEARCH", query: q });

  if (isError) throw "오류 발생";

  return (
    <section className="p-5">
      <FolderBread />
      {isPending ? <SkeletonList /> : <DataTable />}
    </section>
  );
};

export default SearchPage;
