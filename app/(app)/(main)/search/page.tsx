"use client";
import { DataTable } from "@/components/data-table";
import { FolderBread } from "@/components/folder-bread";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useStore from "@/store/store";
import { api } from "@/lib/api";
import { SkeletonList } from "@/components/skeleton-list";
import { DeleteModal } from "../_components/delete-modal";
import { ShareModal } from "../_components/share-modal";
import { StopShareModal } from "../_components/stop-share-modal";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const q = useSearchParams().get("q");
  const setFolder = useStore.use.setFolder();
  const updateFile = useStore.use.updateFile();

  const { isPending, isSuccess, error, data } = useQuery({
    queryKey: ["search", q],
    queryFn: () => api.get(`/files/search?q=${q}`),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (isPending) return;
    setFolder("");
    if (isPending) return;
    updateFile(data?.data.files);
  }, [isPending, q]);

  return (
    <>
      <DeleteModal />
      <ShareModal />
      <StopShareModal />
      <section className="min-h-full grid bg-secondary">
        <div className="h-full p-5 rounded-tl-lg bg-background">
          <FolderBread />
          {isPending ? <SkeletonList /> : <DataTable />}
        </div>
      </section>
    </>
  );
};

export default SearchPage;
