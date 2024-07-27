import { api } from "../api";

export const deleteAccount = () => api.delete("/users/me");

export const signOutUser = async () =>
  api.get("/users/me/sign-out", { withCredentials: true });
