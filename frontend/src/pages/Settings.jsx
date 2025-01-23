import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useState } from "react";

const tips = [
  {
    title: "Master Crosshair Placement",
    description: "Always aim at head level for quick eliminations.",
    image: "https://i.pinimg.com/736x/00/95/cd/0095cd4f82eacd340cd0d726218785a8.jpg", // Replace with your image URL
  },
  {
    title: "Learn Agent Lineups",
    description: "Master utility lineups to dominate the battlefield.",
    image: "https://i.pinimg.com/736x/7b/9a/fd/7b9afda092a239ffda016a733ac8ba36.jpg", // Replace with your image URL
  },
  {
    title: "Communicate Effectively",
    description: "Use callouts to share enemy locations with your team.",
    image: "https://i.pinimg.com/736x/3c/0e/52/3c0e52d634d736e2a398e71e77497258.jpg", // Replace with your image URL
  },
  {
    title: "Control the Economy",
    description: "Plan your buys wisely to maintain a strong economy.",
    image: "https://i.pinimg.com/736x/50/02/6b/50026b1839712154e44e469c1608f806.jpg", // Replace with your image URL
  },
  {
    title: "Map Awareness",
    description: "Learn the maps to predict enemy movements effectively.",
    image: "https://i.pinimg.com/236x/56/ae/cf/56aecfc3c9207858a20e7cad3e93803a.jpg", // Replace with your image URL
  },
  {
    title: "Warm-Up Before Matches",
    description: "Practice in aim trainers to get sharp before games.",
    image: "https://i.pinimg.com/236x/08/5e/aa/085eaa8ccfa35e2f1c83d424b703eb66.jpg", // Replace with your image URL
  },
];

const SettingsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen pb-10 container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        

        <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4 text-center">Pro Tips to Elevate Your Gameplay</h2>
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
        {tips.map((step, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col justify-end p-6 bg-cover text-white transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${step.image})` }}
          >
            <div className="bg-black/60 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-sm mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-primary" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>



      </div>
    </div>
  );
};
export default SettingsPage;