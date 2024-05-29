"use client";
import { File, LayoutProps } from "@/types/type";
import { createContext, useContext, useState } from "react";

interface FileContextProps {
  files: File[];
  setFiles: React.Dispatch<File[]>;
}

const FileContext = createContext<FileContextProps>({
  files: [],
  setFiles: () => {},
});

export const useFile = () => useContext(FileContext);

export const FileProvider: React.FC<LayoutProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);

  const values = {
    files,
    setFiles,
  };

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
};
