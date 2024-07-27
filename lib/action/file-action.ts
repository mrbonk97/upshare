// import { api } from "@/lib/api";
// import { File } from "@/type/type";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { File } from "@/type/type";

export const fileDownload = async (fileId: string, fileName: string) => {
  const result = await api.get(`/files/${fileId}`, { responseType: "blob" });
  if (result.status === 200) {
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};

export const fileMove = async (data: any) => {
  return await api.put("/files", data);
};

export const fileMoveFolder = async (fileId: string, folderId: string) => {
  const result = await api.put("/files/change-folder", {
    fileId,
    folderId,
  });

  return result.status === 200;
};

export const fileHeartChange = async (fileId: string): Promise<File> => {
  return (await api.patch(`/files/heart/${fileId}`)).data;
};

export const FileDelete = async (fileId: string) =>
  await api.delete(`/files/${fileId}`).then((res) => res.data);

export const FolderDelete = async (folderId: string) =>
  await api.delete(`/folders/${folderId}`).then((res) => res.data);

export const FileUpload = async (formData: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return await api.post("/files", formData, config).then((res) => res.data);
};

export const FolderCreate = async (
  folderName: string,
  parentFolderId?: string
) => {
  if (parentFolderId == undefined)
    return await api.post("/folders", { folderName }).then((res) => res.data);
  else
    return await api
      .post("/folders", { folderName, parentFolderId })
      .then((res) => res.data);
};

export async function shareFile(fileId: string) {
  return await api.get(`/files/share/${fileId!}`).then((res) => res.data);
}

export const stopShareFile = async (fileId: string) => {
  return await api.get(`/files/share-stop/${fileId}`).then((res) => res.data);
};

export const findFolder = async (fileId?: string) => {
  if (fileId == undefined) return api.get("/folders").then((res) => res.data);
  else return api.get(`/folders/${fileId}`).then((res) => res.data);
};

export const findFavoriteFiles = async () =>
  api.get(`/files/favorite`).then((res) => res.data);

export const findShareFiles = async () =>
  api.get("/files/share").then((res) => res.data);

export const findSearchFiles = async (q: string) => {
  if (q == null) return;
  return api.get(`/files/search?q=${q}`).then((res) => res.data);
};

export const fileDownloadByCode = async (code: string) => {
  let name = "unknown";
  const result2 = await api.get(`/files/code-info/${code}`);
  if (result2.status === 200) name = result2.data;
  else return;

  const result = await api.get(`/files/code/${code}`, { responseType: "blob" });
  if (result.status === 200) {
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};
