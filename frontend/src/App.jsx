import { Toaster } from "react-hot-toast";
import { SidebarDemo } from "./components/Sidebardemo";
import { checkSessionAuth } from "./store/authStore";
import { useEffect } from "react";
import SmoothScroll from "./components/SmoothScroll";

let didStartAuthBootstrap = false;

function App() {
  useEffect(() => {
    if (didStartAuthBootstrap) return;
    didStartAuthBootstrap = true;

    console.time("startup:auth-total");
    checkSessionAuth().finally(() => {
      console.timeEnd("startup:auth-total");
    });
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full">
        <Toaster position="top-center" />
        <SidebarDemo />
      </div>
    </SmoothScroll>
  );
}

export default App;
