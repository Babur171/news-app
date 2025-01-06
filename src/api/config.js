import axios from "axios";

export const BASE_URL = "BASE_URL";

export const newsAPIInstance = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_NEWSAPI_KEY",
  },
});
export const openNewsInstance = axios.create({
  baseURL: "https://opennewsapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_OPENNEWS_API_KEY",
  },
});
export const guardianInstance = axios.create({
  baseURL: "https://content.guardianapis.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_GUARDIAN_API_KEY",
  },
});
const api = {
  request(instance, config) {
    return instance.request(config);
  },
  get(instance, url, config) {
    return instance.get(`${url}`, config);
  },
  pageSize: 999999,
};

export default api;
