const fallbackBaseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:4001"
    : "https://elevate-xqw2.onrender.com";

export const BASE_URL = (import.meta.env.VITE_API_URL || fallbackBaseUrl).replace(/\/$/, "");
