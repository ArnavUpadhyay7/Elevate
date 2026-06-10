const fallbackBaseUrl =
  import.meta.env.MODE === "development"
    ? ""
    : "https://elevate-xqw2.onrender.com";

export const BASE_URL = (import.meta.env.VITE_API_URL ?? fallbackBaseUrl).replace(/\/$/, "");
