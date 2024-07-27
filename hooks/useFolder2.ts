"use client";
import useStore from "@/store/store";
import { useEffect } from "react";

export function useFolder2() {
  const setFolder = useStore.use.setFolder();

  useEffect(() => {
    const baseUrl = window.location.href.split("/");
    let folderId: string | null = baseUrl[4];
    if (folderId == "share" || folderId == "favorite") folderId = null;
    setFolder(folderId);
  }, []);
}
