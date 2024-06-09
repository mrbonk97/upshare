"use client";
import { searchFile } from "@/api/file-api";
import { getFolder, getHome } from "@/api/folder-api";
import { File, LayoutProps } from "@/types/type";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const pathname = usePathname().split("/");
  const route = pathname[1];
  const folderId = pathname[2] || null;

  const refreshFolder = async () => {
    if (route == "home") {
      const result = await getHome();
      console.log(result);
      setFiles(result);
    }

    if (route == "folders") {
      const result = await getFolder(folderId);
      setFiles(result);
    }

    if (route == "search") {
      if (search == null || search == "") {
        setFiles([]);
      } else {
        const result = await searchFile(search);
        setFiles(result);
      }
    }
  };

  const values = {
    files,
    folderId,
    setFiles,
    refreshFolder,
  };

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};
