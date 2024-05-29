import { api } from "@/lib/api";

export const foldersApi = {
  // 폴더 생성 API
  // 성공시 true, 실패시 false 리턴
  createFolder: async (data: any) => {
    try {
      await api.post("/folders", data);
    } catch {
      return false;
    }
    return true;
  },

  // 폴더 내부에 있는 파일들을 가져오는 API
  getFolder: (folderId?: string) =>
    api.get(`/folders${folderId != null ? "/" + folderId : ""}`),
};
