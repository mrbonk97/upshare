import { api } from "@/lib/api";

export async function useUserInfo() {
  try {
    const result = await api.get("/users/me");
    if (result.status == 200) return result.data;
    return null;
  } catch {
    return null;
  }
}
