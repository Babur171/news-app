import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const BASE_URL = "BASE_URL";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

const api = {
  request(config: AxiosRequestConfig = {}) {
    return axiosInstance.request(config);
  },
  get(url: string, config: AxiosRequestConfig = {}) {
    return axiosInstance.get(`${url}`, config);
  },
  pageSize: 999999,
};

export default api;
