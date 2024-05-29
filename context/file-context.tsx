import { LayoutProps } from "@/types/type";
import { createContext, useState } from "react";

const FileContext = createContext();

const FileProvider: React.FC<LayoutProps> = ({ children }) => {
  return <FileContext.Provider>{children}</FileContext.Provider>;
};
