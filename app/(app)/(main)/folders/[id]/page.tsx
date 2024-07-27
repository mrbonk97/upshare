"use client";
import { useQuery } from "@tanstack/react-query";
import { getFolder } from "@/lib/api/folder-api";
import { FolderTable } from "@/app/(app)/(main)/_components/table/folder-table";

const FolderPage = ({ params }: { params: { id: string } }) => {
  const query = useQuery({
    queryKey: ["folders", params.id],
    queryFn: () => getFolder(params.id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  if (query.isError) throw "뭔가 오류발생";
  if (query.isPending) return <div>로딩중</div>;

  return (
    <section className="p-5">
      <FolderTable
        files={query.data?.data.result.files}
        folders={query.data?.data.result.folders}
      />
    </section>
  );
};

export default FolderPage;
