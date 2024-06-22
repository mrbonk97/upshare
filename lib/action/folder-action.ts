"use client";
import { api } from "@/lib/api";
import { File } from "@/type/type";

export const getHome = async () => {
  const result = await api.get("/folders");
  if (result.status === 200) return result.data.files;
  return [];
};

export const getFolder = async (folderId: string) => {
  const result = await api.get(`/folders/${folderId}`);
  if (result.status === 200) return result.data.files;
  return [];
};

export const createFolder = async (data: any) => {
  console.log("gg");
  const result = await api.post("/folders", data);
  return result.status === 200;
};

export const deleteFolder = async (folderId: string) => {
  const result = await api.post(`/folders/${folderId}`);
  return result.status === 200;
};

export const folderMoveFolder = async (
  folderId: string,
  parentFolderId: string
) => {
  return api.put("/folders/move-folder", {
    folderId,
    parentFolderId,
  });
};

export const folderDepth = async (folderId?: string) => {
  if (folderId == null) return [];
  const result = await api.get(`/folders/find-depth/${folderId}`);
  if (result.status === 200) return result.data.toReversed();
  else return [];
};

export const folderHeartChange = async (fileId: string): Promise<File> => {
  return await api.patch(`/folders/heart/${fileId}`).then((res) => res.data);
};
