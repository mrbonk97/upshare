"use client";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://file-share-s-350ee7e71639.herokuapp.com/api",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
