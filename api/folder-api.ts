import { api } from "@/lib/api";

export const getHome = async () => {
  const result = await api.get("/folders");
  if (result.status === 200) return result.data.files;
  return [];
};

export const getFolder = async (folderId?: string) => {
  const result = await api.get(`/folders/${folderId}`);
  if (result.status === 200) return result.data.files;
  return [];
};

export const createFolder = async (data: any) => {
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
  const result = await api.put("/folders/move-folder", {
    folderId,
    parentFolderId,
  });

  return result.status === 200;
};

export const folderDepth = async (folderId: string) => {
  const result = await api.get(`/folders/find-depth/${folderId}`);
  if (result.status === 200) return result.data.toReversed();
  else return [];
};
