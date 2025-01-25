import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE === "development" ? "http://localhost:4001" : "https://elevate-xqw2.onrender.com/",
  withCredentials: true,
});
