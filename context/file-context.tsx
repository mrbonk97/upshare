"use client";
import { searchFile } from "@/api/file-api";
import { getFolder, getHome } from "@/api/folder-api";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";
import { File, LayoutProps } from "@/types/type";
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
  const [files, setFiles] = useState<File[]>([]);
  const route = useCurrentRoute();

  const refreshFolder = async () => {
    if (route.path == "home") {
      const result = await getHome();
      setFiles(result);
    }
    if (route.path == "folders") {
      if (route.folderId == null) {
        setFiles([]);
        return;
      }
      const result = await getFolder(route.folderId);
      setFiles(result);
    }
    if (route.path == "search") {
      if (route.query == null || route.query == "") {
        setFiles([]);
        return;
      }
      const result = await searchFile(route.query);
      setFiles(result);
    }
  };

  const values = {
    files,
    folderId: route.folderId,
    setFiles,
    refreshFolder,
  };

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};
