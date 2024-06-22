import { StateCreator } from "zustand";

interface FolderState {
  folderId: string;
}

interface FolderAction {
  setFolder: (folderId?: string) => void;
}

export interface FolderSlice extends FolderState, FolderAction {}

export const createFolderSlice: StateCreator<
  FolderSlice,
  [],
  [],
  FolderSlice
> = (set) => ({
  folderId: "",
  setFolder: (folderId) => set({ folderId: folderId || "" }),
});
