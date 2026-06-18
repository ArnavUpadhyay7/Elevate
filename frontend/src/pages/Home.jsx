import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "../lib/testimonials";
import { IconMessageCircle } from "@tabler/icons-react";
import { useScrollReveal, useScrollEnvironment } from "./HomePageHelper";
import { Link } from "react-router-dom";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { TimelineDemo } from "../components/TimelineDemo";
import { ProcessSection } from "../components/landing/ProcessSection";

const ChatBot = lazy(() => import("./ChatBot"));

// ─── Coaches ──────────────────────────────────────────────────────────────────
const SHOWCASE_COACHES = [
  {
    id: 1,
    name: "AXIOM",
    label: "DUELIST",
    rank: "Radiant",
    rating: "4.9",
    sessions: "340+",
    src: "https://i.pinimg.com/736x/0f/7d/93/0f7d93c934be56866ebde24130647aa8.jpg",
    bgGradient:
      "linear-gradient(175deg, #C47B2B 0%, #7A3A08 60%, #3A1A02 100%)",
    fanRotate: -32,
    fanOffsetX: -340,
    fanOffsetY: 0,
    fanScale: 0.76,
    zOrder: 1,
  },
  {
    id: 2,
    name: "VEYRA",
    label: "CONTROLLER",
    rank: "Radiant",
    rating: "4.8",
    sessions: "210+",
    src: "https://i.pinimg.com/736x/d0/7c/36/d07c36e9e511ff9c18e2e3a5153e87b8.jpg",
    bgGradient:
      "linear-gradient(175deg, #7B5EC4 0%, #3A2080 60%, #180A40 100%)",
    fanRotate: -16,
    fanOffsetX: -170,
    fanOffsetY: 0,
    fanScale: 0.88,
    zOrder: 2,
  },
  {
    id: 3,
    name: "KESTREssL",
    label: "DUELIST",
    rank: "Radiant",
    rating: "5.0",
    sessions: "480+",
    src: "https://i.pinimg.com/736x/a3/11/88/a31188cfe104c6256b4bed3bdc80bfdf.jpg",
    bgGradient:
      "linear-gradient(175deg, #C0303E 0%, #7A0F1E 60%, #3A0008 100%)",
    fanRotate: 0,
    fanOffsetX: 0,
    fanOffsetY: 0,
    fanScale: 1,
    zOrder: 5,
  },
  {
    id: 4,
    name: "SOLACE",
    label: "INITIATOR",
    rank: "Radiant",
    rating: "4.7",
    sessions: "190+",
    src: "https://i.pinimg.com/1200x/94/d0/5f/94d05f8c09ff63fe5bc609eaabe31dec.jpg",
    bgGradient:
      "linear-gradient(175deg, #2E9A5C 0%, #0F5A2A 60%, #022A10 100%)",
    fanRotate: 16,
    fanOffsetX: 170,
    fanOffsetY: 0,
    fanScale: 0.88,
    zOrder: 4,
  },
  {
    id: 5,
    name: "NYTRO",
    label: "SENTINEL",
    rank: "Radiant",
    rating: "4.6",
    sessions: "155+",
    src: "https://i.pinimg.com/736x/2f/33/4a/2f334a7023da7959558b0c9bb2dfcce3.jpg",
    bgGradient:
      "linear-gradient(175deg, #2B6EC4 0%, #0F3A80 60%, #021840 100%)",
    fanRotate: 32,
    fanOffsetX: 340,
    fanOffsetY: 0,
    fanScale: 0.76,
    zOrder: 3,
  },
];

// ─── Single card ──────────────────────────────────────────────────────────────
const ShowcaseCard = ({ coach, index, isFeatured, isAnimating, isMobile }) => {
  const [hovered, setHovered] = React.useState(false);
  if (isMobile && !isFeatured) return null;

  const CARD_W = isMobile ? 280 : 390;
  const CARD_H = isMobile ? 420 : 570;

  const initial = { x: 0, rotate: 0, scale: 0.6, opacity: 0 };
  const fanAnimate = {
    x: isMobile ? 0 : coach.fanOffsetX,
    rotate: isMobile ? 0 : coach.fanRotate,
    scale: isMobile ? 0.92 : coach.fanScale,
    opacity: 1,
  };

  const baseZ = coach.zOrder * 10;

  return (
    <motion.div
      key={coach.id}
      initial={initial}
      animate={isAnimating ? initial : fanAnimate}
      transition={{
        duration: 0.9,
        delay: isAnimating ? 0 : 0.15 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute bottom-0 left-1/2 select-none"
      style={{
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        transformOrigin: "bottom center",
        zIndex: hovered ? 100 : baseZ,
        cursor: "default",
      }}
      onHoverStart={() => !isMobile && setHovered(true)}
      onHoverEnd={() => !isMobile && setHovered(false)}>
      <motion.div
        className="w-full h-full"
        animate={
          hovered && !isMobile ? { y: -24, scale: 1.03 } : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}>
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: 22,
            background: coach.bgGradient,
            boxShadow: isFeatured
              ? "0 48px 120px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.11)"
              : "0 24px 70px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.06)",
          }}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "300px",
            }}
          />
          <svg
            className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.08]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={`rg-${coach.id}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[1, 2, 3, 4, 5].map((n) => (
              <ellipse
                key={n}
                cx="50%"
                cy="40%"
                rx={`${30 + n * 12}%`}
                ry={`${20 + n * 8}%`}
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity={0.7 - n * 0.12}
              />
            ))}
          </svg>
          <img
            src={coach.src}
            alt={coach.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ opacity: 0.8 }}
            draggable={false}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, transparent 25%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.82) 100%)",
            }}
          />
          <div className="absolute left-[18px] top-[18px] z-10">
            <div
              className="mb-[4px] text-[8px] font-bold uppercase tracking-[0.28em] leading-none"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              {coach.label}
            </div>
            <div
              className="font-syne font-black uppercase leading-[0.88] text-white"
              style={{
                fontSize: isFeatured ? (isMobile ? "26px" : "32px") : "24px",
                textShadow: "0 2px 18px rgba(0,0,0,0.65)",
                letterSpacing: "0.025em",
              }}>
              {coach.name}
            </div>
          </div>
          <div
            className="absolute right-[14px] top-[14px] z-10 flex items-center gap-[5px] rounded-full px-[10px] py-[5px]"
            style={{
              background: "rgba(160,30,46,0.22)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(160,30,46,0.45)",
            }}>
            <span className="block h-[5px] w-[5px] rounded-full bg-[#FF4060] shrink-0" />
            <span className="font-syne text-[9.5px] font-bold text-[#FF6B7A] uppercase tracking-[0.12em]">
              Radiant
            </span>
          </div>
          <div className="absolute bottom-0 inset-x-0 z-10 px-[14px] pb-[14px]">
            <div
              className="flex items-center justify-between rounded-[10px] px-3 py-2.5"
              style={{
                background: "rgba(0,0,0,0.48)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF6B7A]">
                  {coach.sessions} sessions
                </div>
                <div className="text-[10px] font-medium text-white/40 mt-[2px]">
                  {coach.label}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[#FF4060] text-[11px]">★</span>
                <span className="font-syne text-[13px] font-bold text-white">
                  {coach.rating}
                </span>
              </div>
            </div>
          </div>
          {isFeatured && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Home ─────────────────────────────────────────────────────────────────────
const Home = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const processRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  useScrollReveal();
  useScrollEnvironment(processRef);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsAnimating(false), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="elv-root relative z-[1] min-h-screen w-full min-w-0 max-w-full bg-[var(--elv-bg)] text-white">
      {/* Chat FAB */}
      <button
        onClick={() => setShowChatBot(true)}
        className="btn-primary fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#A01E2E] text-white shadow-[0_4px_24px_rgba(160,30,46,0.4)] transition-transform duration-200 hover:scale-105"
        aria-label="Open chat">
        <IconMessageCircle size={17} />
      </button>

      {showChatBot && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end bg-black/70 backdrop-blur-md">
          <Suspense fallback={null}>
            <ChatBot onClose={() => setShowChatBot(false)} />
          </Suspense>
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full min-w-0 max-w-full flex-col items-center overflow-x-clip">
        <div
          className="pointer-events-none absolute left-1/2 top-[12%] h-[500px] w-[700px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(160,30,46,0.18) 0%, transparent 72%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex w-full min-w-0 flex-col items-center px-4 pt-[10vh] text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#A01E2E]/25 bg-[#A01E2E]/[0.08] px-4 py-1.5">
            <span className="block h-[5px] w-[5px] rounded-full bg-[#A01E2E]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A01E2E]">
              Performance Coaching
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 font-syne font-extrabold leading-[0.91] tracking-[-0.01em] uppercase">
            <span className="block text-[clamp(36px,5.5vw,74px)] text-white/75">
              Rank Up.
            </span>
            <span className="block text-[clamp(36px,5.5vw,74px)] text-white">
              Coached by
            </span>
            <span
              className="block text-[clamp(36px,5.5vw,74px)] text-[#A01E2E]"
              style={{
                textShadow:
                  "0 0 60px rgba(160,30,46,0.4), 0 0 20px rgba(200,40,60,0.2)",
              }}>
              Radiants.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-7 max-w-[400px] text-[14px] font-normal leading-[1.82] text-[#7A8FA0]">
            VOD reviews from Radiant coaches. Agent-specific feedback,
            structured plans, and measurable rank progress — not guesswork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/coaches"
              className="rounded-[8px] bg-[#A01E2E] px-7 py-[11px] text-[13px] font-semibold text-white shadow-[0_4px_24px_rgba(160,30,46,0.42)] transition-all duration-200 hover:brightness-110 hover:-translate-y-[2px]">
              Find a Coach
            </Link>
            <Link
              to="/coach-signup"
              className="rounded-[8px] border border-white/[0.10] bg-white/[0.04] px-7 py-[11px] text-[13px] font-medium text-[#6A7888] transition-all duration-200 hover:border-white/[0.18] hover:text-[#9AABB8]">
              Become a Coach →
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Card fan ─────────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: cardsY }}
          className="relative z-10 mt-4 flex w-full min-w-0 flex-1 items-end justify-center overflow-hidden">
          <div
            className="relative w-full max-w-full overflow-hidden"
            style={{
              maxWidth: isMobile ? "100%" : "1400px",
              height: isMobile ? "460px" : "600px",
            }}>
            {SHOWCASE_COACHES.map((coach, i) => (
              <ShowcaseCard
                key={coach.id}
                coach={coach}
                index={i}
                isFeatured={i === 2}
                isAnimating={isAnimating}
                isMobile={isMobile}
              />
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: "160px",
              background:
                "linear-gradient(to top, var(--elv-bg) 0%, rgba(8,10,14,0.9) 30%, rgba(8,10,14,0.4) 70%, transparent 100%)",
            }}
          />
        </motion.div>

        {!isMobile && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24"
              style={{
                background:
                  "linear-gradient(to right, var(--elv-bg), transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-24"
              style={{
                background:
                  "linear-gradient(to left, var(--elv-bg), transparent)",
              }}
            />
          </>
        )}
      </section>

      {/* ── Scroll bridge ──────────────────────────────────────────────────── */}
      <div className="bg-[var(--elv-bg)] flex flex-col items-center pt-6 pb-0">
        <div className="flex flex-col items-center gap-3 opacity-30">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#A01E2E]" />
          <div
            className="w-5 h-5 rounded-full border border-[#A01E2E]/50 flex items-center justify-center"
            style={{ background: "rgba(160,30,46,0.1)" }}>
            <div className="w-[5px] h-[5px] rounded-full bg-[#A01E2E]" />
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-[#A01E2E] to-transparent" />
        </div>
        <div className="section-rule w-full max-w-[1120px] mx-auto mt-6" />
      </div>

      <ProcessSection processRef={processRef} />

      <div className="section-rule" />

      <section className="scroll-reveal scroll-reveal--animate relative z-[1] min-w-0 max-w-full">
        <TimelineDemo />
      </section>

      <div className="section-rule" />

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <section className="scroll-reveal scroll-reveal--animate relative z-[1] mx-auto min-w-0 max-w-[1120px] px-4 py-20 sm:px-6 md:px-8 lg:px-12 md:py-28">
        <div className="mb-14">
          <div className="inline-flex items-center gap-[10px] mb-5">
            <span className="w-[5px] h-[1px] bg-[#A01E2E]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">
              Results
            </span>
          </div>
          <h2 className="mb-3 font-syne text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.06] uppercase tracking-[-0.01em] text-white">
            From players who climbed.
          </h2>
          <p className="max-w-[280px] text-[13px] leading-[1.72] text-[#3E4A58]">
            Real results from players who committed to the process.
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />
      </section>

      <div className="section-rule" />

      {/* ── CTA + Footer ──────────────────────────────────────────────────── */}
      <section className="scroll-reveal scroll-reveal--animate relative z-[1] w-full overflow-hidden">
        {/* ── Top: headline + columns ───────────────────────────────────────── */}
        <div className="w-full px-10 sm:px-14 lg:px-20 pt-16 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-x-16 gap-y-12 items-start">
            {/* Left: headline + button */}
            <div className="flex flex-col gap-8">
              <h2 className="font-syne font-extrabold text-[clamp(40px,6vw,80px)] leading-[0.92] tracking-[-0.02em] uppercase text-white">
                Stop guessing.
                <br />
                Start climbing<span className="text-[#A01E2E]">.</span>
              </h2>
              <div>
                <Link
                  to="/coaches"
                  className="inline-flex items-center gap-2.5 rounded-[7px] bg-[#A01E2E] px-6 py-[11px] text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-[1px]">
                  Browse Coaches
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true">
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: 4 info columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-10 pt-1">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3E4A58]">
                  Location
                </span>
                <p className="text-[12.5px] leading-[1.85] text-[#2A3540]">
                  Valorant District
                  <br />
                  Diamond Server, NA
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3E4A58]">
                  Social
                </span>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: "Instagram", dot: true },
                    { label: "Twitter/X", dot: false },
                    { label: "YouTube", dot: true },
                    { label: "Discord", dot: false },
                  ].map(({ label, dot }) => (
                    <li key={label}>
                      <a
                        href="/"
                        className="flex items-center gap-[7px] text-[12.5px] text-[#2A3540] hover:text-[#5A6A78] transition-colors duration-150">
                        {dot && (
                          <span className="block h-[4px] w-[4px] rounded-full bg-[#A01E2E] shrink-0" />
                        )}
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3E4A58]">
                  Contact
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="mailto:hello@elevate.gg"
                    className="text-[12.5px] text-[#2A3540] hover:text-[#5A6A78] transition-colors duration-150 leading-[1.6]">
                    hello@elevate.gg
                  </a>
                  <a
                    href="/"
                    className="text-[12.5px] text-[#2A3540] hover:text-[#5A6A78] transition-colors duration-150">
                    Support Center
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3E4A58]">
                  Helpful Links
                </span>
                <ul className="flex flex-col gap-2">
                  {["Find a Coach", "How it Works", "Pricing", "About"].map(
                    (link) => (
                      <li key={link}>
                        <Link
                          to="/"
                          className="text-[12.5px] text-[#2A3540] hover:text-[#5A6A78] transition-colors duration-150">
                          {link}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Bottom strip ──────────────────────────────────────────────────── */}
          <div className="border-t border-white/[0.04] mt-12 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-[11px] text-[#1E2A34]">
              © {new Date().getFullYear()} Elevate · Not affiliated with Riot
              Games
            </span>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
                (item) => (
                  <Link
                    key={item}
                    to="/"
                    className="text-[11px] text-[#1E2A34] hover:text-[#3E4A58] transition-colors duration-150">
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ── Big brand text — subtle gray watermark ───────────────────────── */}
        <div className="relative w-full select-none overflow-hidden -mt-[4px]">
          <span className="block w-full text-center font-syne font-black uppercase leading-[0.85] tracking-[-0.01em] text-[clamp(60px,14.5vw,240px)] text-white/[0.04]">
            ELEVATE
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;
