import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

console.time("startup:react-render");
performance.mark("main.jsx loaded");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

requestAnimationFrame(() => {
  console.timeEnd("startup:react-render");
  performance.mark("first-frame-after-render");
});
