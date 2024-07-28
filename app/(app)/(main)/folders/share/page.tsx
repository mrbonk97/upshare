"use client";
import { useQuery } from "@tanstack/react-query";
import { getShare } from "@/lib/api/folder-api";
import { FolderTable } from "@/app/(app)/(main)/_components/table/folder-table";
import { FolderBreadCrumb } from "../../_components/breadcrumb/folder-breadcrumb";
import { SkeletonList } from "@/components/skeleton-list";

const FolderPage = () => {
  const query = useQuery({
    queryKey: ["folders", "share"],
    queryFn: getShare,
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

export default FolderPage;
