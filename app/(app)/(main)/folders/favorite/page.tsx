"use client";
import { FolderBread } from "@/components/folder-bread";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/skeleton-card";
import { api } from "@/lib/api";
import { DeleteModal } from "../../_components/delete-modal";
import { ShareModal } from "../../_components/share-modal";
import { StopShareModal } from "../../_components/stop-share-modal";
import { useEffect } from "react";
import useStore from "@/store/store";
import { DataTable } from "@/components/data-table";

const FavoritePage = () => {
  const updateFile = useStore.use.updateFile();
  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => api.get(`http://localhost:8080/api/files/favorite`),
  });

  useEffect(() => {
    if (isPending) return;
    updateFile(data?.data.files);
  }, [isPending]);

  return (
    <>
      <DeleteModal />
      <ShareModal />
      <StopShareModal />
      <section className="min-h-full grid bg-secondary">
        <div className="h-full p-5 rounded-tl-lg bg-background">
          <FolderBread />
          {isPending ? <SkeletonCard /> : <DataTable />}
        </div>
      </section>
    </>
  );
};

export default FavoritePage;
