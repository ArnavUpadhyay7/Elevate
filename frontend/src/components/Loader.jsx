import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = ["INITIALIZING", "JUST A MOMENT", "LOADING ROSTER"];

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
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50 overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ff4655 1px, transparent 1px), linear-gradient(90deg, #ff4655 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
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
            className="text-white tracking-[0.35em] text-xs font-medium uppercase"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
          >
            COACHING ROSTER
          </span>
          <h1
            className="text-5xl font-black uppercase text-white leading-none tracking-tight"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
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
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>
          {/* Percentage text */}
          <span
            className="text-white text-lg font-bold tabular-nums"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
          >
            {progress}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-[2px] bg-[#1a1a1a] relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#ff4655]"
              style={{
                width: `${progress}%`,
                transition: "width 0.05s linear",
                boxShadow: "0 0 8px #ff4655",
              }}
            />
          </div>

          {/* Phase label */}
          <div className="flex justify-between items-center">
            <span
              className="text-[#ff4655] text-[10px] tracking-[0.25em] font-semibold uppercase"
              style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
            >
              {phases[phase]}
            </span>
            <span
              className="text-[#3a3a3a] text-[10px] tracking-widest font-medium"
              style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
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
              className="block w-1 h-1 rounded-full bg-[#ff4655]"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}