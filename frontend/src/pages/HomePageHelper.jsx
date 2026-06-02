import React, { useEffect, useRef, useState } from "react";

export const useScrollReveal = () => {
  useEffect(() => {
    const sectionEls = document.querySelectorAll(".scroll-reveal");
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            sectionObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: "0px 0px -32px 0px" }
    );
    sectionEls.forEach((el) => sectionObs.observe(el));

    const barContainer = document.querySelector(".rank-bars-trigger");
    const barObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rank-bars-visible");
            barObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (barContainer) barObs.observe(barContainer);

    return () => {
      sectionObs.disconnect();
      barObs.disconnect();
    };
  }, []);
};

export const useCountUp = (target, duration = 1300, delay = 700) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setVal(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
};

export const AnimatedStat = ({ value, suffix, label, delay }) => {
  const count = useCountUp(value, 1400, delay);
  const delayClass = delay >= 1000 ? "[animation-delay:1020ms]" : delay >= 850 ? "[animation-delay:870ms]" : "[animation-delay:720ms]";
  const display =
    value === 49    ? "4.9"
    : value >= 1000 ? `${Math.floor(count / 1000)}K`
    : String(count);
  return (
    <div
      className={`stat-item flex cursor-default flex-col gap-[9px] px-6 py-[18px] ${delayClass}`}
    >
      <span className="font-syne text-[24px] font-black leading-none tracking-[0] text-white tabular-nums">
        {value === 49 ? "4.9" : display}{suffix}
      </span>
      <span className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.15em] text-[#384452]">
        {label}
      </span>
    </div>
  );
};

export const RANK_HISTORY = [14, 18, 16, 22, 20, 26, 24, 30, 28, 34, 33, 38];
const rankBarHeights = ["h-[35%]", "h-[45%]", "h-[40%]", "h-[55%]", "h-1/2", "h-[65%]", "h-[60%]", "h-[75%]", "h-[70%]", "h-[85%]", "h-[82.5%]", "h-[95%]"];
const rankBarDelays = ["[animation-delay:0.04s]", "[animation-delay:0.082s]", "[animation-delay:0.124s]", "[animation-delay:0.166s]", "[animation-delay:0.208s]", "[animation-delay:0.25s]", "[animation-delay:0.292s]", "[animation-delay:0.334s]", "[animation-delay:0.376s]", "[animation-delay:0.418s]", "[animation-delay:0.46s]", "[animation-delay:0.502s]"];
const rankBarColors = [
  "bg-gradient-to-t from-[#6e121e]/10 to-[#9b1a2a]/10",
  "bg-gradient-to-t from-[#6e121e]/15 to-[#9b1a2a]/15",
  "bg-gradient-to-t from-[#6e121e]/20 to-[#9b1a2a]/20",
  "bg-gradient-to-t from-[#6e121e]/25 to-[#9b1a2a]/25",
  "bg-gradient-to-t from-[#6e121e]/30 to-[#9b1a2a]/30",
  "bg-gradient-to-t from-[#6e121e]/35 to-[#9b1a2a]/35",
  "bg-gradient-to-t from-[#6e121e]/40 to-[#9b1a2a]/40",
  "bg-gradient-to-t from-[#6e121e]/45 to-[#9b1a2a]/45",
  "bg-gradient-to-t from-[#6e121e]/50 to-[#9b1a2a]/50",
  "bg-gradient-to-t from-[#6e121e]/55 to-[#9b1a2a]/55",
  "bg-gradient-to-t from-[#6e121e]/60 to-[#9b1a2a]/60",
  "bg-gradient-to-t from-[#8E1C2A] to-[#B0243A] hover:shadow-[0_0_6px_rgba(160,28,44,0.28)]",
];

export const RankBar = ({ h, i, total }) => {
  const isLast = i === total - 1;
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`rank-bar relative flex-1 cursor-default rounded-[2px] transition-shadow duration-300 ${rankBarHeights[i]} ${rankBarDelays[i]} ${rankBarColors[i]}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {hov && (
        <div
          className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-white/[0.07] bg-[#0C1016]/90 px-1.5 py-0.5 text-[9px] font-semibold text-[#8A96A6]"
        >
          {isLast ? "+4 rnk" : `+${Math.round((h - RANK_HISTORY[0]) * 0.4)} RR`}
        </div>
      )}
    </div>
  );
};

export const AbstractMesh = ({ meshRef }) => (
  <div
    ref={meshRef}
    className="mesh-float fade-up-4 hidden w-full max-w-[380px] flex-shrink-0 opacity-[0.22] will-change-transform [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)] lg:block"
    aria-hidden
  >
    <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 44 + 10}
            cy={row * 38 + 10}
            r={1.0}
            fill="rgba(255,255,255,0.09)"
          />
        ))
      )}
      {[
        [10,10,98,86],[98,86,230,48],[230,48,362,124],
        [10,124,186,200],[186,200,362,162],
        [54,238,274,276],[274,276,406,238],
        [10,314,186,352],[186,352,406,314],
      ].map(([x1,y1,x2,y2], idx) => (
        // ↑ FIX 3: Renamed map parameter from `i` to `idx` — `i` was already
        //   used in the outer RankBar scope and could shadow/confuse linters.
        //   Minor but clean.
        <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
      ))}
      <circle cx="230" cy="48"  r="2.5" fill="#A01E2E" opacity="0.38"/>
      <circle cx="362" cy="162" r="2"   fill="#A01E2E" opacity="0.26"/>
      <circle cx="186" cy="200" r="2"   fill="#A01E2E" opacity="0.22"/>
      <circle cx="274" cy="276" r="1.5" fill="#A01E2E" opacity="0.18"/>
      <g transform="translate(100, 220)">
        <rect x="0" y="0" width="220" height="100" rx="6"
          fill="rgba(8,11,15,0.90)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
        <text x="12" y="18" fontFamily="DM Sans, sans-serif" fontSize="6.5"
          fill="rgba(255,255,255,0.18)" letterSpacing="1.3">RANK PROGRESSION</text>
        <text x="182" y="18" fontFamily="Syne, sans-serif" fontSize="7.5"
          fill="#A01E2E" fontWeight="800">+4</text>
        {RANK_HISTORY.map((h, i) => (
          <rect
            key={i}
            x={12 + i * 16} y={72 - (h / 40) * 48}
            width="10" height={(h / 40) * 48} rx="1.5"
            fill={i === RANK_HISTORY.length - 1
              ? "#A01E2E"
              : `rgba(140,22,36,${0.08 + i * 0.048})`}
          />
        ))}
      </g>
    </svg>
  </div>
);

export const HOW_STEPS = [
  {
    num: "01",
    title: "Submit your VOD",
    desc: "Upload a ranked match. Pre-tagged moments, economy flags, and positioning errors are surfaced before your coach begins review.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16l4-4 4 4 4-8 4 8"/><rect x="2" y="3" width="20" height="18" rx="2"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Reviewed by a Radiant",
    desc: "Matched to a Radiant-rank coach who specialises in your agent pool. Timestamped, structured notes — not generic advice.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/><path d="M17 11l1.5 1.5L21 10"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "A plan you can act on",
    desc: "Written breakdown with drill sets, map-specific adjustments, and a 30-day roadmap. Every recommendation is tied to your data.",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
];

export const useAdaptiveDepth = () => {
  const lightRef    = useRef(null);
  const headlineRef = useRef(null);
  const accentRef   = useRef(null);
  const barsRef     = useRef(null);
  const meshRef     = useRef(null);

  const mouse = useRef({ x: 0.5, y: 0.5 });
  const slow  = useRef({ x: 0.5, y: 0.5 });
  const mid   = useRef({ x: 0.5, y: 0.5 });
  const fast  = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let rafId;

    const onMove = (e) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };

    const tick = () => {
      slow.current.x += (mouse.current.x - slow.current.x) * 0.035;
      slow.current.y += (mouse.current.y - slow.current.y) * 0.035;
      mid.current.x  += (mouse.current.x - mid.current.x)  * 0.085;
      mid.current.y  += (mouse.current.y - mid.current.y)   * 0.085;
      fast.current.x += (mouse.current.x - fast.current.x) * 0.18;
      fast.current.y += (mouse.current.y - fast.current.y) * 0.18;

      const sX = (slow.current.x - 0.5) * 2;
      const sY = (slow.current.y - 0.5) * 2;
      const mX = (mid.current.x  - 0.5) * 2;
      const mY = (mid.current.y  - 0.5) * 2;
      const fX = (fast.current.x - 0.5) * 2;
      const fY = (fast.current.y - 0.5) * 2;

      if (lightRef.current) {
        const px = 50 + sX * 42;
        const py = 50 + sY * 36;
        lightRef.current.style.background =
          `radial-gradient(ellipse 45% 40% at ${px}% ${py}%,
            rgba(160,30,46,0.16) 0%,
            rgba(140,20,36,0.06) 50%,
            transparent 78%)`;
      }

      if (headlineRef.current) {
        headlineRef.current.style.transform =
          `translate(${-mX * 10}px, ${-mY * 6}px)`;
      }

      if (accentRef.current) {
        const hue = 352 + fX * 10;
        const sat = 68  + Math.abs(fX) * 6;
        const lgt = 38  + (-fY) * 7;
        accentRef.current.style.color = `hsl(${hue}deg, ${sat}%, ${lgt}%)`;
        const gA = 0.18 + Math.abs(fX) * 0.14;
        accentRef.current.style.textShadow =
          `0 0 32px rgba(160,30,46,${gA.toFixed(3)}), 0 0 8px rgba(200,40,60,${(gA * 0.5).toFixed(3)})`;
      }

      if (barsRef.current) {
        barsRef.current.style.transform =
          `translate(${fX * 14}px, ${fY * 5}px)`;
      }

      if (meshRef.current) {
        meshRef.current.style.transform =
          `translate(${sX * 18}px, ${sY * 10}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { lightRef, headlineRef, accentRef, barsRef, meshRef };
};

export const useScrollEnvironment = (processRef) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    const BASE = { hue: 352, sat: 67, lgt: 37, bgL: 0.0 };
    const END  = { hue: 348, sat: 60, lgt: 34, bgL: 0.4 };
    const SCROLL_RANGE = 480;

    // FIX 4: Removed unused `current` and `SCROLL_START` variables.
    // `current` was initialized from BASE but never read or written —
    // the lerp values are computed inline each frame instead.

    let rafId = null;
    let scrollTarget = 0;
    let scrollCurrent = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onScroll = () => {
      scrollTarget = window.scrollY;
    };

    const tick = () => {
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;

      const process = processRef.current;
      if (process) {
        const sectionTop = process.getBoundingClientRect().top + window.scrollY;
        const start = sectionTop - window.innerHeight * 0.9;
        const raw   = (scrollCurrent - start) / SCROLL_RANGE;
        const t     = Math.max(0, Math.min(1, raw));
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const root = document.documentElement;
        root.style.setProperty("--elv-accent-h", `${lerp(BASE.hue, END.hue, eased).toFixed(2)}deg`);
        root.style.setProperty("--elv-accent-s", `${lerp(BASE.sat, END.sat, eased).toFixed(2)}%`);
        root.style.setProperty("--elv-accent-l", `${lerp(BASE.lgt, END.lgt, eased).toFixed(2)}%`);
        root.style.setProperty("--elv-bg-darken", `${(lerp(BASE.bgL, END.bgL, eased) * 0.012).toFixed(4)}`);
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [processRef]);
};
