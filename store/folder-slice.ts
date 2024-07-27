import { StateCreator } from "zustand";

interface FolderState {
  folderId: string | null;
}

interface FolderAction {
  setFolder: (folderId: string | null) => void;
}

export interface FolderSlice extends FolderState, FolderAction {}

export const createFolderSlice: StateCreator<
  FolderSlice,
  [],
  [],
  FolderSlice
> = (set) => ({
  folderId: null,
  setFolder: (folderId) => set({ folderId: folderId }),
});
