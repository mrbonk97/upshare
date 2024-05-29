import { api } from "@/lib/api";

export const filesApi = {
  createFile: async (formData: FormData) => {
    try {
      await api.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return true;
    } catch {
      return false;
    }
  },
  moveFile: (data: any) => api.put("/files", data),
};
