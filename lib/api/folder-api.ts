import { api } from "../api";
import { RefObject } from "react";

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

export const changeFolderName = async (folderId: string, folderName: string) =>
  api.patch(`/folders/${folderId}`, { folderName });

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

export const uploadFile = async (
  formData: FormData,
  progressRef: RefObject<HTMLProgressElement>
) => {
  return api.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress(progressEvent) {
      if (!progressRef.current) return;
      if (!progressEvent.progress) return;
      progressRef.current!.value = progressEvent.progress;
    },
  });
};

export const searchFile = async (q: string | null) =>
  api.get(`/files/search?q=${q}`);

export const changeFileName = async (fileId: string, fileName: string) =>
  api.patch(`/files/${fileId}`, { fileName });

export const downloadFileByCode = async (code: string) => {
  const result = await api.get(`/files/code/${code}`);

  if (result.status === 200) {
    const dataUrl = `data:${result.data.result.contentType};base64,${result.data.result.fileData}`;
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = result.data.result.originalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const downloadFile = async (fileId: string) => {
  const result = await api.get(`/files/${fileId}`);

  if (result.status === 200) {
    const dataUrl = `data:${result.data.result.contentType};base64,${result.data.result.fileData}`;
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = result.data.result.originalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
