import axios from "axios";

export const api = axios.create({
  // baseURL: "https://file-share-s-350ee7e71639.herokuapp.com/api",
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  function (config) {
    const access_token = document.cookie
      .split(`; access_token=`)[0]
      .split("=")[1];
    config.headers.Authorization = `Bearer ${access_token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
