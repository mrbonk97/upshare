import { api } from "../api";

export const getUserInfo = async () => api.get("/users/me");

export const deleteAccount = () => api.delete("/users/me");

export const signOutUser = async () =>
  api.get("/users/me/sign-out", { withCredentials: true });

export const changeUsername = async (username: string) =>
  api.patch("/users/me/change-name", { username });
