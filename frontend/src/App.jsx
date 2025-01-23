import { Toaster } from "react-hot-toast";
import { SidebarDemo } from "./components/Sidebardemo";
import { coachStore, playerStore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import {useThemeStore} from './store/useThemeStore';

function App() {
  const checkPlayerAuth = playerStore((state) => state.checkPlayerAuth);
  const isCheckingPlayerAuth = playerStore((state) => state.isCheckingPlayerAuth);
  const checkCoachAuth = coachStore((state) => state.checkCoachAuth);
  const isCheckingCoachAuth = coachStore((state) => state.isCheckingCoachAuth);

  const {theme} = useThemeStore();

  useEffect(() => {
    checkPlayerAuth();
    checkCoachAuth();
  }, [checkPlayerAuth, checkCoachAuth]);

  if(isCheckingPlayerAuth || isCheckingCoachAuth) {
    return (
      <div data-theme={theme}>
        <div className="flex justify-center items-center h-screen">
          <Loader className="size-12 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <div className="min-h-screen w-full">
        <Toaster position="top-center" />
        <SidebarDemo />
      </div>
    </div>
  );
}

export default App;
