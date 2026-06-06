import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    label: "A-01",
    title: "ANALYZE",
    desc: "Upload your VOD and surface the mistakes that matter — positioned errors, economy gaps, and missed utility flagged before review begins.",
    meta: ["Any Rank", "Any Agent", "24h Review"],
    status: "READY",
  },
  {
    label: "A-02",
    title: "REVIEW",
    desc: "Matched with a Radiant specialist in your exact role and agent pool. Structured notes, timestamped to the second.",
    meta: ["Top 1% Rank", "Agent Specialist", "Timestamped"],
    status: "ACTIVE",
  },
  {
    label: "A-03",
    title: "EXECUTE",
    desc: "Receive a 30-day roadmap with drills, map-specific priorities, and measurable targets. Every recommendation tied to your data.",
    meta: ["30-Day Plan", "Drill Sets", "Targets"],
    status: "PENDING",
  },
  {
    label: "A-04",
    title: "ASCEND",
    desc: "Track improvement across sessions and convert structured feedback into rank gains. Progress compounds.",
    meta: ["Progress Tracking", "Rank Goals", "Trends"],
    status: "PENDING",
  },
];

const statusColor = {
  READY:   { dot: "#4EC9B0", text: "#4EC9B0" },
  ACTIVE:  { dot: "#FF3B5C", text: "#FF3B5C" },
  PENDING: { dot: "rgba(255,255,255,0.18)", text: "rgba(255,255,255,0.2)" },
};

// Corner bracket SVG
const Bracket = ({ flip }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12" fill="none"
    style={{ transform: flip ? "scale(-1,-1)" : "none" }}
  >
    <path d="M0 6V0H6" stroke="rgba(160,30,46,0.5)" strokeWidth="1" />
  </svg>
);

const StepRow = ({ step, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const sc = statusColor[step.status];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09 }}
      className="relative"
    >
      {/* Thin top rule with reveal animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="relative grid grid-cols-[64px_1fr] lg:grid-cols-[96px_1fr_260px] gap-x-8 lg:gap-x-16 py-10 lg:py-12 group">

        {/* Oversized ghost label */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            right: "-8px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(72px, 10vw, 130px)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            lineHeight: 1,
            userSelect: "none",
            zIndex: 0,
          }}
        >
          {step.label}
        </div>

        {/* Left col — label + status */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.09 + 0.1 }}
          className="relative z-10 flex flex-col gap-3 pt-[2px]"
        >
          {/* Corner bracket + label */}
          <div>
            <div className="mb-[5px]"><Bracket /></div>
            <span
              className="font-syne text-[10px] font-black tracking-[0.22em] uppercase"
              style={{ color: "rgba(160,30,46,0.7)" }}
            >
              {step.label}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-[6px]">
            <div
              className="w-[5px] h-[5px] rounded-full shrink-0"
              style={{
                background: sc.dot,
                boxShadow: step.status === "ACTIVE" ? "0 0 6px rgba(255,59,92,0.7)" : "none",
              }}
            />
            <span
              className="text-[8px] font-bold uppercase tracking-[0.18em]"
              style={{ color: sc.text }}
            >
              {step.status}
            </span>
          </div>
        </motion.div>

        {/* Center col — title + desc */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.09 + 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h3
            className="font-syne font-extrabold uppercase leading-none mb-4 text-white"
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              letterSpacing: "-0.01em",
              opacity: step.status === "PENDING" ? 0.4 : 1,
              transition: "opacity 0.3s",
            }}
          >
            {step.title}
          </h3>
          <p
            className="text-[13px] leading-[1.85]"
            style={{
              color: step.status === "PENDING" ? "#253040" : "#3A5060",
              maxWidth: 400,
            }}
          >
            {step.desc}
          </p>

          {/* Mobile meta */}
          <div className="flex lg:hidden flex-wrap gap-x-3 gap-y-1 mt-4">
            {step.meta.map((m, i) => (
              <span key={i} className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.14)" }}>
                {i > 0 && <span className="mr-3" style={{ color: "rgba(255,255,255,0.08)" }}>·</span>}
                {m}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right col — metadata (desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.09 + 0.22 }}
          className="hidden lg:flex flex-col justify-between items-end relative z-10 py-[2px]"
        >
          {/* Meta tags */}
          <div className="flex flex-col items-end gap-[6px]">
            {step.meta.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.16)" }}
                >
                  {m}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom corner bracket */}
          <div><Bracket flip /></div>
        </motion.div>
      </div>

      {/* Last row closing rule */}
      {isLast && (
        <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
      )}
    </motion.div>
  );
};

export const ProcessSection = ({ processRef }) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={processRef}
      className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden"
      style={{ background: "var(--elv-bg)" }}
    >
      {/* Very faint grid — matches hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ghost PROTOCOL label — far background */}
      <div
        className="pointer-events-none select-none absolute"
        style={{
          right: "-40px",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          fontSize: "clamp(60px,9vw,120px)",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          letterSpacing: "0.18em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.025)",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        PROTOCOL
      </div>

      <div className="relative max-w-[1100px] mx-auto">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-20"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-7">
            <div className="flex items-center gap-[10px]">
              <span className="w-[5px] h-[1px] bg-[#A01E2E]" />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#A01E2E]">
                Process
              </span>
            </div>
            {/* System metadata */}
            <div
              className="hidden sm:flex items-center gap-3 pl-4"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[["QUEUE","COMPETITIVE"],["PROTOCOL","ELEVATE-V1"],["STEPS","04"]].map(([k,v]) => (
                <span key={k} className="text-[8px] font-semibold tracking-[0.12em]"
                  style={{ color: "rgba(255,255,255,0.12)" }}>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>{k}</span>
                  <span style={{ color: "rgba(255,255,255,0.08)", margin: "0 4px" }}>:</span>
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-syne font-extrabold uppercase leading-[1.0]"
              style={{ fontSize: "clamp(30px, 4.2vw, 56px)", letterSpacing: "-0.015em" }}
            >
              <span className="block text-white">Structured</span>
              <span className="block text-white">Improvement,</span>
              <span className="block" style={{ color: "rgba(255,255,255,0.22)" }}>Not Guesswork.</span>
            </h2>
            <p
              className="text-[12.5px] leading-[1.85] shrink-0 lg:text-right"
              style={{ color: "#283848", maxWidth: 220 }}
            >
              Built around how<br />elite players improve.
            </p>
          </div>
        </motion.div>

        {/* ── Steps ── */}
        <div>
          {STEPS.map((step, i) => (
            <StepRow
              key={step.label}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* ── Footer metadata bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {[
            ["STATUS", "OPERATIONAL"],
            ["REVIEW WINDOW", "24H"],
            ["SATISFACTION", "100% GUARANTEE"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <div className="w-[4px] h-[4px] rounded-full" style={{ background: "rgba(160,30,46,0.4)" }} />
              <span className="text-[8px] font-semibold tracking-[0.16em]"
                style={{ color: "rgba(255,255,255,0.12)" }}>
                <span style={{ color: "rgba(255,255,255,0.22)" }}>{k}</span>
                <span style={{ color: "rgba(255,255,255,0.07)", margin: "0 5px" }}>·</span>
                {v}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessSection;
