import { useEffect, useState } from "react";
import { refreshLenis } from "../components/lenis";

// ─── Scroll reveal ────────────────────────────────────────────────────────────
export const useScrollReveal = () => {
  useEffect(() => {
    const getEls = () => document.querySelectorAll(".scroll-reveal--animate");

    const revealIfVisible = (el) => {
      if (el.classList.contains("visible")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
        el.classList.add("visible");
      }
    };

    const checkVisible = () => {
      getEls().forEach(revealIfVisible);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 8% 0px" }
    );

    const observeAll = () => {
      getEls().forEach((el) => {
        revealIfVisible(el);
        if (!el.classList.contains("visible")) {
          obs.observe(el);
        }
      });
    };

    observeAll();

    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(checkVisible);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onLayoutChange = () => {
      refreshLenis();
      requestAnimationFrame(observeAll);
    };
    window.addEventListener("load", onLayoutChange);
    document.fonts?.ready?.then(onLayoutChange);

    const fallbackTimer = setTimeout(() => {
      getEls().forEach((el) => el.classList.add("visible"));
    }, 1500);

    return () => {
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(scrollRaf);
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onLayoutChange);
    };
  }, []);
};

// ─── Count-up animation ───────────────────────────────────────────────────────
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
    <div className="flex cursor-default flex-col gap-[9px] px-6 py-[18px]">
      <span className="font-syne text-[24px] font-black leading-none tracking-[0] text-white tabular-nums">
        {value === 49 ? "4.9" : display}{suffix}
      </span>
      <span className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.15em] text-[#384452]">
        {label}
      </span>
    </div>
  );
};

// ─── How-it-works steps ───────────────────────────────────────────────────────
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

// ─── Scroll-driven accent color shift ────────────────────────────────────────
export const useScrollEnvironment = (processRef) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    const BASE = { hue: 352, sat: 67, lgt: 37, bgL: 0.0 };
    const END  = { hue: 348, sat: 60, lgt: 34, bgL: 0.4 };
    const SCROLL_RANGE = 480;

    let rafId = null;
    let scrollTarget = 0;
    let scrollCurrent = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onScroll = () => { scrollTarget = window.scrollY; };

    const tick = () => {
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.08;
      const process = processRef.current;
      if (process) {
        const sectionTop = process.getBoundingClientRect().top + window.scrollY;
        const start = sectionTop - window.innerHeight * 0.9;
        const raw   = (scrollCurrent - start) / SCROLL_RANGE;
        const t     = Math.max(0, Math.min(1, raw));
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const root  = document.documentElement;
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
