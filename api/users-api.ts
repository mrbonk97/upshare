import { api } from "@/lib/api";

export const changeName = async (username: string) => {
  const result = await api.patch("/users/me/change-name", {
    username,
  });
  return result.status === 200;
};

export const deleteAccount = async () => {
  const result = await api.delete("/users/me");
  return result.status === 200;
};
