import { api } from "@/lib/api";
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

export const deleteFile = async (fileId: string) => {
  const result = await api.delete(`/files/${fileId}`);
  return result.status === 200;
};

export const fileMove = async (data: any) => {
  return await api.put("/files", data);
};

export const fileUpload = async (formDate: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const result = await api.post("/files", formDate, config);
  return result.status === 200;
};

export const fileMoveFolder = async (fileId: string, folderId: string) => {
  const result = await api.put("/files/change-folder", {
    fileId,
    folderId,
  });

  return result.status === 200;
};

export const searchFile = async (query: string) => {
  const result = await api.get(`/files/search?q=${query}`);
  if (result.status === 200) return result.data.files;
  return [];
};

export async function shareFile(fileId: string) {
  return api.get(`/files/share/${fileId!}`);
}

export const fileDownloadCode = async (code: string) => {
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

export const stopShareFile = async (fileId: string) => {
  return await api.get(`/files/share-stop/${fileId}`);
};

export const fileHeartChange = async (fileId: string): Promise<File> => {
  return (await api.patch(`/files/heart/${fileId}`)).data;
};
