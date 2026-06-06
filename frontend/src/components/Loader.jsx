import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = ["INITIALIZING", "JUST A MOMENT", "LOADING ROSTER"];
  const progressScale =
    progress < 10 ? "scale-x-[0.05]" :
    progress < 20 ? "scale-x-[0.15]" :
    progress < 30 ? "scale-x-[0.25]" :
    progress < 40 ? "scale-x-[0.35]" :
    progress < 50 ? "scale-x-[0.45]" :
    progress < 60 ? "scale-x-[0.55]" :
    progress < 70 ? "scale-x-[0.65]" :
    progress < 80 ? "scale-x-[0.75]" :
    progress < 90 ? "scale-x-[0.85]" :
    progress < 100 ? "scale-x-[0.95]" : "scale-x-100";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 33) setPhase(0);
    else if (progress < 66) setPhase(1);
    else setPhase(2);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-[var(--elv-bg)] flex flex-col items-center justify-center z-50 overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="elv-loader-grid absolute inset-0 opacity-[0.04]"
      />

      {/* Top-left corner bracket */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-[#ff4655] opacity-60" />
      {/* Bottom-right corner bracket */}
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-[#ff4655] opacity-60" />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-10 w-full max-w-sm px-8">

        {/* Logo / wordmark */}
        <div className="flex flex-col items-center gap-1">
          <span
            className="font-barlow text-xs font-medium uppercase tracking-[0.35em] text-white"
          >
            COACHING ROSTER
          </span>
          <h1
            className="font-barlow text-5xl font-black uppercase leading-none tracking-tight text-white"
          >
            ELEV<span className="text-[#ff4655]">A</span>TE
          </h1>
        </div>

        {/* Spinner ring + percentage */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Outer ring track */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48" cy="48" r="42"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="3"
            />
            <circle
              cx="48" cy="48" r="42"
              fill="none"
              stroke="#ff4655"
              strokeWidth="3"
              strokeLinecap="square"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
              className="transition-[stroke-dashoffset] duration-75 ease-linear"
            />
          </svg>
          {/* Percentage text */}
          <span
            className="font-barlow text-lg font-bold tabular-nums text-white"
          >
            {progress}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-[2px] bg-[#1a1a1a] relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full origin-left bg-[#ff4655] shadow-[0_0_8px_#ff4655] transition-transform duration-75 ease-linear ${progressScale}`}
            />
          </div>

          {/* Phase label */}
          <div className="flex justify-between items-center">
            <span
              className="font-barlow text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ff4655]"
            >
              {phases[phase]}
            </span>
            <span
              className="font-barlow text-[10px] font-medium tracking-widest text-[#3a3a3a]"
            >
              {progress}%
            </span>
          </div>
        </div>

        {/* Blinking dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`block h-1 w-1 rounded-full bg-[#ff4655] opacity-30 animate-dotPulse ${i === 1 ? "[animation-delay:0.2s]" : i === 2 ? "[animation-delay:0.4s]" : i === 3 ? "[animation-delay:0.6s]" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
