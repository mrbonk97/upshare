import { api } from "../api";

export const getHome = async () => api.get("/folders");

export const getFolder = async (folderId: string) =>
  api.get(`/folders/${folderId}`);

export const moveFolder = async (folderId: string, parentFolderId: string) =>
  api.put(`/folders/${folderId}/move`, { parentFolderId });

export const deleteFolder = async (folderId: string) =>
  api.delete(`/folders/${folderId}`);

export const changeFolderHeart = async (folderId: string) =>
  api.patch(`/folders/heart/${folderId}`);

export const createFolder = async (
  folderName: string,
  parentFolderId: string | null
) => api.post("/folders", { folderName, parentFolderId });

export const findFolderHierarchy = async (folderId: string | null) => {
  if (!folderId) return null;
  return api.get(`/folders/find-depth/${folderId}`);
};

/////////////////////////////////////////////////////////////////////////
///////////////////////          파일          //////////////////////////
////////////////////////////////////////////////////////////////////////

export const moveFile = async (fileId: string, folderId: string) =>
  api.put(`/files/${fileId}/move`, { folderId });

export const deleteFile = async (fileId: string) =>
  api.delete(`/files/${fileId}`);

export const shareFile = async (fileId: string) =>
  api.get(`/files/share/${fileId}`);

export const stopShareFile = async (fileId: string) =>
  api.get(`/files/share-stop/${fileId}`);

export const changeFileHeart = async (fileId: string) =>
  api.patch(`/files/heart/${fileId}`);

export const getFavorite = async () => api.get("/files/favorite");

export const getShare = async () => api.get("/files/share");

export const uploadFile = async (formData: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return api.post("/files", formData, config);
};

export const searchFile = async (q: string) => api.get(`/files/search?q=${q}`);

export const getUserInfo = async () => api.get("/users/me");
