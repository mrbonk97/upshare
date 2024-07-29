import { modalType } from "@/type/type";
import { StateCreator } from "zustand";

interface FileState {
  files: File[];
  selectedFile: File | null;
  isModalOpen: boolean;
  modal: modalType;
}

interface FileAction {
  selectFile: (file: File) => void;
  setIsModalOpen: (isOpen: boolean, modal?: modalType) => void;
  deleteFile: () => void;
  refreshFile: () => void;
  updateFile: (files: File[]) => void;
  addFile: (files: File) => void;
}

export interface FileSlice extends FileState, FileAction {}

export const createFileSlice: StateCreator<FileSlice, [], [], FileSlice> = (
  set
) => ({
  files: [],
  selectedFile: null,
  isModalOpen: false,
  modal: modalType.CREATE_FOLDER,
  selectFile: (file: File) => set({ selectedFile: file }),
  setIsModalOpen: (isOpen: boolean, modal?: modalType) =>
    set({ isModalOpen: isOpen, modal: modal }),
  deleteFile: () => {},
  refreshFile: () => {},
  updateFile: (files: File[]) => set({ files: files }),
  addFile: (file: File) =>
    set((state) => ({
      files: [...state.files, file],
    })),
});
