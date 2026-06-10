import axios from "axios";
import { BASE_URL } from "../constants";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: import.meta.env.DEV ? 2500 : 5000,
});

if (import.meta.env.DEV) {
  axiosInstance.interceptors.request.use((config) => {
    config.metadata = { start: performance.now() };
    console.log("[api:start]", config.method?.toUpperCase(), config.url);
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const start = response.config.metadata?.start ?? performance.now();
      console.log("[api:done]", response.config.url, Math.round(performance.now() - start), "ms");
      return response;
    },
    (error) => {
      const start = error.config?.metadata?.start ?? performance.now();
      console.log("[api:fail]", error.config?.url, Math.round(performance.now() - start), "ms", error.message);
      return Promise.reject(error);
    }
  );
}
