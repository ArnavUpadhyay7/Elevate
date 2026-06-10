import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    id: "A-01",
    title: "ANALYZE",
    desc: "Upload your VOD. We surface positioning errors, economy gaps, and missed utility before review begins.",
    status: "READY",
    statusColor: "text-teal-400",
    dotClass: "bg-teal-400",
    dotGlow: false,
    image: "https://i.pinimg.com/1200x/af/14/a0/af14a0368589db40ae1726ab81851503.jpg",
  },
  {
    id: "A-02",
    title: "REVIEW",
    desc: "Matched with a Radiant specialist in your role. Structured notes, timestamped.",
    status: "ACTIVE",
    statusColor: "text-[#FF3B5C]",
    dotClass: "bg-[#FF3B5C]",
    dotGlow: true,
    image: "https://i.pinimg.com/736x/a0/cc/5a/a0cc5aca8d858d29744b863c64da0d9c.jpg",
  },
  {
    id: "A-03",
    title: "EXECUTE",
    desc: "A 30-day roadmap with drills, map priorities, and measurable targets.",
    status: "PENDING",
    statusColor: "text-white/40",
    dotClass: "bg-white/20",
    dotGlow: false,
    image: "https://i.pinimg.com/736x/1c/d2/80/1cd280e522c332dc031019ac53069523.jpg",
  },
  {
    id: "A-04",
    title: "ASCEND",
    desc: "Track progress across sessions. Structured feedback converts to rank gains.",
    status: "PENDING",
    statusColor: "text-white/40",
    dotClass: "bg-white/20",
    dotGlow: false,
    image: "https://i.pinimg.com/736x/99/18/d4/9918d421e928cd2c78930cf8a8e4c402.jpg",
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ step }) => (
  <div className="flex items-center gap-[7px]">
    <div
      className={`w-[5px] h-[5px] rounded-full shrink-0 ${step.dotClass}`}
      style={step.dotGlow ? { boxShadow: "0 0 7px rgba(255,59,92,0.9)" } : {}}
    />
    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${step.statusColor}`}>
      {step.status}
    </span>
  </div>
);

// ─── Shared hover styles (uniform across all cards) ──────────────────────────
// Border: 1px solid rgba(255,255,255,0.08) at rest → red glow on hover
// Box shadow: same red bloom on every card

// ─── Hero Card ────────────────────────────────────────────────────────────────

const HeroCard = ({ step }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full overflow-hidden rounded-2xl cursor-default"
      style={{ minHeight: 480, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Border turns red on hover via a positioned overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{ boxShadow: "inset 0 0 0 1px rgba(160,30,46,0.5)" }}
      />

      {/* Background image — single layer, filter transitions on hover */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ backgroundImage: `url(${step.image})` }}
      />

      {/* Scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080C10] via-[#080C10]/60 to-[#080C10]/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080C10]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-10 lg:p-14" style={{ minHeight: 480 }}>
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="font-syne text-[10px] font-black tracking-[0.26em] uppercase text-[#A01E2E]/90">
            {step.id}
          </span>
          <StatusBadge step={step} />
        </div>

        {/* Bottom — centered */}
        <div className="flex flex-col items-center text-center">
          <h3
            className="font-syne font-extrabold uppercase leading-none mb-0 text-white/50 group-hover:text-white group-hover:mb-5 transition-all duration-400"
            style={{
              fontSize: "clamp(48px, 6.5vw, 86px)",
              letterSpacing: "-0.025em",
              textShadow: "0 2px 32px rgba(0,0,0,1)",
            }}
          >
            {step.title}
          </h3>

          <div className="overflow-hidden max-h-0 group-hover:max-h-28 transition-all duration-500 w-full">
            <p className="text-slate-200 text-[14px] leading-relaxed max-w-[440px] mx-auto pt-1 pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
              {step.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Small Card ───────────────────────────────────────────────────────────────
// All 3 start equally dim. The hovered one gets full brightness + red border.
// Siblings stay dim because they're not hovered.

const SmallCard = ({ step, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl cursor-default"
      style={{ minHeight: 380, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Border turns red on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{ boxShadow: "inset 0 0 0 1px rgba(160,30,46,0.5)" }}
      />

      {/* Single image — dim at rest, less dim on hover via scrim lifting */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        style={{ backgroundImage: `url(${step.image})`, filter: "brightness(0.55) saturate(0.35)" }}
      />
      {/* Hover scrim lifts — this is what "brightens" it, no second image needed */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500" />

      {/* Base gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080C10] via-[#080C10]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-8" style={{ minHeight: 380 }}>
        {/* Top */}
        <div className="flex items-center justify-between">
          <span className="font-syne text-[10px] font-black tracking-[0.22em] uppercase text-[#A01E2E]/80">
            {step.id}
          </span>
          <StatusBadge step={step} />
        </div>

        {/* Bottom */}
        <div>
          <h3
            className="font-syne font-extrabold uppercase leading-none mb-0 group-hover:mb-3 transition-all duration-400 text-white/50 group-hover:text-white"
            style={{
              fontSize: "clamp(24px, 2.6vw, 38px)",
              letterSpacing: "-0.015em",
              textShadow: "0 2px 24px rgba(0,0,0,1)",
              wordBreak: "keep-all",
            }}
          >
            {step.title}
          </h3>

          <div className="overflow-hidden max-h-0 group-hover:max-h-28 transition-all duration-500">
            <p className="text-[13px] leading-[1.75] text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
              {step.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

export const ProcessSection = ({ processRef }) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-30px" });

  const [heroStep, ...bottomSteps] = STEPS;

  return (
    <section
      ref={processRef}
      className="relative py-24 lg:py-32 px-6 lg:px-12"
      style={{ background: "var(--elv-bg)" }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-[10px] mb-5">
              <span className="w-[5px] h-px bg-[#A01E2E]" />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.26em] text-[#A01E2E]">
                Process
              </span>
            </div>
            <h2
              className="font-syne font-extrabold uppercase text-white leading-none"
              style={{ fontSize: "clamp(32px, 4.5vw, 60px)", letterSpacing: "-0.02em" }}
            >
              Here's the<br />Gameplan.
            </h2>
          </div>
          <p className="text-slate-500 text-[13px] leading-relaxed lg:text-right max-w-[200px]">
            Built around how elite players actually improve.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="flex flex-col gap-3">
          <HeroCard step={heroStep} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {bottomSteps.map((step, i) => (
              <SmallCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* CTA — below grid, centered */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-8"
        >
          <Link to="/coaches">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-3 px-9 py-4 rounded-xl font-syne font-bold uppercase tracking-[0.13em] text-[13px] text-white overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #A01E2E 0%, #C42535 50%, #A01E2E 100%)",
                boxShadow: "0 4px 28px rgba(160,30,46,0.35), inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              <span className="relative z-10">Browse All Coaches</span>
              <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessSection;