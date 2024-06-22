"use client";
import axios from "axios";
export const api = axios.create({ baseURL: "http://localhost:8080/api" });

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
