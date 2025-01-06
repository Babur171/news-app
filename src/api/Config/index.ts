import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const BASE_URL = "BASE_URL";

export const newsAPIInstance: AxiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_NEWSAPI_KEY",
  },
});
export const openNewsInstance: AxiosInstance = axios.create({
  baseURL: "https://opennewsapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_OPENNEWS_API_KEY",
  },
});
export const guardianInstance: AxiosInstance = axios.create({
  baseURL: "https://content.guardianapis.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_GUARDIAN_API_KEY",
  },
});
const api = {
  request(instance: AxiosInstance, config: AxiosRequestConfig = {}) {
    return instance.request(config);
  },
  get(instance: AxiosInstance, url: string, config: AxiosRequestConfig = {}) {
    return instance.get(`${url}`, config);
  },
  pageSize: 999999,
};

export default api;
