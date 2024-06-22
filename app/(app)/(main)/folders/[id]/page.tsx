"use client";
import { DataTable } from "@/components/data-table";
import { FolderBread } from "@/components/folder-bread";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useStore from "@/store/store";
import { api } from "@/lib/api";
import { DeleteModal } from "../../_components/delete-modal";
import { ShareModal } from "../../_components/share-modal";
import { StopShareModal } from "../../_components/stop-share-modal";
import { SkeletonList } from "@/components/skeleton-list";

const FolderPage = ({ params }: { params?: { id: string } }) => {
  const setFolder = useStore.use.setFolder();
  const updateFile = useStore.use.updateFile();
  const query = params?.id == undefined ? "" : `/${params.id}`;

  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ["folders", params?.id],
    queryFn: () => api.get(`http://localhost:8080/api/folders${query}`),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    setFolder(params?.id);
    if (isPending) return;
    updateFile(data?.data.files);
  }, [isPending, params?.id]);

  return (
    <>
      <DeleteModal />
      <ShareModal />
      <StopShareModal />
      <section className="min-h-full grid bg-secondary">
        <div className="h-full p-5 rounded-tl-lg bg-background">
          <FolderBread folderId={params?.id} />
          {isPending ? <SkeletonList /> : <DataTable />}
        </div>
      </section>
    </>
  );
};

export default FolderPage;
