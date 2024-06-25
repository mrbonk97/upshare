import {
  findFavoriteFiles,
  findFolder,
  findSearchFiles,
  findShareFiles,
} from "@/lib/action/file-action";
import useStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// folderId를 가지고 folder 내부 데이터와 폴더 명을 변경한다.

interface useFolderProps {
  folderId?: string;
  query?: string | null;
  type: "NORMAL" | "FAVORITE" | "SHARE" | "SEARCH";
}

export function useFolder({ folderId, query, type }: useFolderProps) {
  const setFolder = useStore.use.setFolder();
  const updateFile = useStore.use.updateFile();

  const { isPending, isError, data } = useQuery({
    queryKey: ["folders", type, folderId || query],
    queryFn: () => {
      if (type == "NORMAL") return findFolder(folderId);
      if (type == "FAVORITE") return findFavoriteFiles();
      if (type == "SHARE") return findShareFiles();
      if (type == "SEARCH") return findSearchFiles(query!);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isPending) return;
    if (isError) return;
    setFolder(folderId);
    updateFile(data.files);
  }, [isPending, isError, folderId]);

  return [isPending, isError, data];
}
