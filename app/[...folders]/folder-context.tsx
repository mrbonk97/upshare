"use client";
import { useToast } from "@/hooks/use-toast";
import { createContext, useState } from "react";
import { mutate } from "swr";

type TableItemType = {
  type: "FILE" | "FOLDER";
  id: number | null;
};

interface TableContextProps {
  hoverItem: TableItemType | null;
  dragItem: TableItemType | null;
  onDragStart: (item: TableItemType) => void;
  onDragOver: (item: TableItemType) => void;
  onDragEnd: () => void;
  onDrop: () => void;
  onDragLeave: () => void;
  getFolderId: () => string | undefined;
  revalidate: () => Promise<void>;
}

export const FolderContext = createContext<TableContextProps>({
  hoverItem: null,
  dragItem: null,
  onDragStart: () => {},
  onDragOver: () => {},
  onDragEnd: () => {},
  onDrop: () => {},
  onDragLeave: () => {},
  getFolderId: () => {
    return "";
  },
  revalidate: async () => {},
});

interface Props {
  folderId: string;
  children: React.ReactNode;
}

export const FolderContextProvider = ({ folderId, children }: Props) => {
  const { toast } = useToast();
  const [hoverItem, setHoverItem] = useState<TableItemType | null>(null);
  const [dragItem, setDragItem] = useState<TableItemType | null>(null);

  const getFolderId = () => {
    return folderId;
  };

  const revalidate = async () => {
    let url = "/api/folders";
    if (folderId != undefined) url += `/${folderId}`;
    await mutate(url);
  };

  const onDragStart = (item: TableItemType) => {
    setDragItem(item);
    setHoverItem(null);
  };

  const onDragOver = (item: TableItemType) => {
    if (!dragItem) return;
    if (dragItem.id == item.id) return;
    setHoverItem(item);
  };

  const onDragEnd = () => {
    setHoverItem(null);
    setDragItem(null);
  };

  const onDrop = async () => {
    if (!dragItem) return;
    if (!hoverItem) return;
    if (dragItem.id == hoverItem.id) return;

    try {
      if (dragItem.type == "FILE" && hoverItem.type == "FOLDER") {
        await fetch(`/api/files/${dragItem.id}`, {
          method: "PATCH",
          body: JSON.stringify({ id: hoverItem.id }),
        });
      }

      if (dragItem.type == "FOLDER" && hoverItem.type == "FOLDER") {
        await fetch(`/api/folders/${dragItem.id}`, {
          method: "PATCH",
          body: JSON.stringify({ id: hoverItem.id }),
        });
      }
      await revalidate();
      toast({ title: "폴더 변경 성공" });
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "폴더 변경 실패" });
    }
  };

  const onDragLeave = () => {
    setHoverItem(null);
  };

  return (
    <FolderContext.Provider
      value={{
        hoverItem,
        dragItem,
        onDragStart,
        onDragOver,
        onDragEnd,
        onDrop,
        onDragLeave,
        getFolderId,
        revalidate,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
