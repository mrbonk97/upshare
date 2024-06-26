"use client";
import axios from "axios";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (req) => req,
  async (error) => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/tokens/refresh",
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_URL,
        },
      }
    );

    if (res.status == 200) {
      error.config.headers["Authorization"] = `Bearer ${res.data.access_token}`;
      localStorage.setItem("access_token", res.data.access_token);
      return axios(error.config);
    }
  }
);
