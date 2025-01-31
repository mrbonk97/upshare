"use client";
import { useToast } from "@/hooks/use-toast";
import { createContext, ReactNode, useReducer } from "react";
import { mutate } from "swr";

type TableItemType = {
  type: "FILE" | "FOLDER";
  id: number | null;
};

type Action =
  | { type: "DRAG_START"; payload: TableItemType | null }
  | { type: "DRAG_OVER"; payload: TableItemType | null }
  | { type: "DRAG_END" }
  | { type: "DRAG_LEAVE" };

type State = {
  hoverItem: TableItemType | null;
  dragItem: TableItemType | null;
};

const folderReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "DRAG_START":
      return { ...state, dragItem: action.payload, hoverItem: null };
    case "DRAG_OVER":
      return { ...state, hoverItem: action.payload };
    case "DRAG_LEAVE":
      return { ...state, hoverItem: null };
    case "DRAG_END":
      return { ...state, dragItem: null, hoverItem: null };
    default:
      return state;
  }
};

export const FolderContext = createContext<{
  hoverItem: TableItemType | null;
  dragItem: TableItemType | null;
  getFolderId: () => string | undefined;
  getQuery: () => string | undefined;
  revalidate: () => Promise<void>;
  onDragStart: (item: TableItemType) => void;
  onDragOver: (item: TableItemType) => void;
  onDragEnd: () => void;
  onDrop: () => void;
  onDragLeave: () => void;
}>({
  hoverItem: null,
  dragItem: null,
  getFolderId: () => undefined,
  getQuery: () => undefined,
  revalidate: async () => {},
  onDragStart: () => {},
  onDragOver: () => {},
  onDragEnd: () => {},
  onDrop: () => {},
  onDragLeave: () => {},
});

interface Props {
  folderId: string | undefined;
  q: string | undefined;
  children: ReactNode;
}

export const FolderContextProvider = ({ folderId, q, children }: Props) => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(folderReducer, {
    dragItem: null,
    hoverItem: null,
  });

  const getFolderId = () => folderId;
  const getQuery = () => q;

  const revalidate = async () => {
    let url = "/api/folders";
    if (folderId) url += `/${folderId}`;
    await mutate(url);
  };

  const onDragStart = (item: TableItemType) => dispatch({ type: "DRAG_START", payload: item });

  const onDragOver = (item: TableItemType) => dispatch({ type: "DRAG_OVER", payload: item });

  const onDragLeave = () => dispatch({ type: "DRAG_LEAVE" });

  const onDragEnd = () => dispatch({ type: "DRAG_END" });

  const onDrop = async () => {
    if (!state.dragItem) return;
    if (!state.hoverItem) return;
    if (state.dragItem.id == state.hoverItem.id) return;

    try {
      if (state.dragItem.type == "FILE" && state.hoverItem.type == "FOLDER") {
        await fetch(`/api/files/${state.dragItem.id}`, {
          method: "PATCH",
          body: JSON.stringify({ id: state.hoverItem.id }),
        });
      }

      if (state.dragItem.type == "FOLDER" && state.hoverItem.type == "FOLDER") {
        await fetch(`/api/folders/${state.dragItem.id}`, {
          method: "PATCH",
          body: JSON.stringify({ id: state.hoverItem.id }),
        });
      }
      await revalidate();
      toast({ title: "폴더 변경 성공" });
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "폴더 변경 실패" });
    }
  };

  return (
    <FolderContext.Provider
      value={{
        hoverItem: state.hoverItem,
        dragItem: state.dragItem,
        getFolderId,
        getQuery,
        revalidate,
        onDragStart,
        onDragOver,
        onDragEnd,
        onDrop,
        onDragLeave,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
