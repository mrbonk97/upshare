"use client";
import { getFolder } from "@/api/folder-api";
import { File, LayoutProps } from "@/types/type";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface FileContextProps {
  files: File[];
  setFiles: React.Dispatch<File[]>;
  folderId: string | null;
  refreshFolder: (folderId?: string) => void;
}

const FileContext = createContext<FileContextProps>({
  files: [],
  setFiles: () => {},
  folderId: null,
  refreshFolder: () => {},
});

export const useFile = () => useContext(FileContext);

export const FileProvider: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const folderId = pathname.split("/home/")[1];
  const [files, setFiles] = useState<File[]>([]);

  const refreshFolder = async () => {
    const result = await getFolder(folderId);
    setFiles(result.files);
  };

  const values = {
    files,
    folderId,
    setFiles,
    refreshFolder,
  };

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};
