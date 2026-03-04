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
  const display =
    value === 49    ? "4.9"
    : value >= 1000 ? `${Math.floor(count / 1000)}K`
    : String(count);
  return (
    <div
      className="stat-item flex flex-col gap-[9px] px-6 py-[18px] cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="text-[24px] font-black text-white tabular-nums leading-none"
        style={{ fontFamily: "Syne, sans-serif", letterSpacing: "-0.03em" }}
      >
        {value === 49 ? "4.9" : display}{suffix}
      </span>
      <span
        className="text-[9.5px] font-semibold uppercase leading-none"
        style={{ color: "#384452", letterSpacing: "0.15em" }}
      >
        {label}
      </span>
    </div>
  );
};

export const RANK_HISTORY = [14, 18, 16, 22, 20, 26, 24, 30, 28, 34, 33, 38];

export const RankBar = ({ h, i, total }) => {
  const isLast = i === total - 1;
  const [hov, setHov] = useState(false);
  return (
    <div
      className="rank-bar flex-1 rounded-[2px] relative cursor-default"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: `${(h / 40) * 100}%`,
        animationDelay: `${0.04 + i * 0.042}s`,
        background: isLast
          ? "linear-gradient(to top, #8E1C2A, #B0243A)"
          : `linear-gradient(to top,
              rgba(110,18,30,${0.07 + i * 0.044}),
              rgba(155,26,42,${0.10 + i * 0.050}))`,
        boxShadow: isLast && hov ? "0 0 6px rgba(160,28,44,0.28)" : "none",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {hov && (
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[9px] font-semibold pointer-events-none"
          style={{
            background: "rgba(12,16,22,0.92)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#8A96A6",
          }}
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
    className="mesh-float w-full max-w-[380px] fade-up-4 hidden lg:block flex-shrink-0"
    style={{
      opacity: 0.22,
      maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
      // ↑ FIX 2: Added WebkitMaskImage — Safari/Chrome require the prefixed
      //   version or maskImage won't apply, making the mesh show hard edges.
      willChange: "transform",
    }}
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
  const light2Ref   = useRef(null);
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
          `radial-gradient(ellipse 70% 60% at ${px}% ${py}%,
            rgba(255,255,255,0.07) 0%,
            rgba(255,255,255,0.025) 40%,
            transparent 72%)`;
      }

      if (light2Ref.current) {
        const px = 50 - mX * 36;
        const py = 50 - mY * 28;
        light2Ref.current.style.background =
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

  return { lightRef, light2Ref, headlineRef, accentRef, barsRef, meshRef };
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