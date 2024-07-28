"use client";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "@/lib/api/folder-api";
import { FolderTable } from "@/app/(app)/(main)/_components/table/folder-table";
import { FolderBreadCrumb } from "../_components/breadcrumb/folder-breadcrumb";
import { useFolder2 } from "@/hooks/useFolder2";
import { SkeletonList } from "@/components/skeleton-list";

const HomePage = () => {
  useFolder2();
  const query = useQuery({
    queryKey: ["folders"],
    queryFn: getHome,
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

export default HomePage;
