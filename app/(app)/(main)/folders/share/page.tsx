"use client";
import { DataTable } from "@/components/data-table";
import { SkeletonList } from "@/components/skeleton-list";
import { FolderBread } from "@/components/folder-bread";
import { useFolder } from "@/hooks/useFolder";

const SharePage = () => {
  const [isPending, isError] = useFolder({
    type: "SHARE",
  });

  if (isError) throw "뭔가 오류발생";

  return (
    <section className="p-5">
      <FolderBread />
      {isPending ? <SkeletonList /> : <DataTable />}
    </section>
  );
};

export default SharePage;
