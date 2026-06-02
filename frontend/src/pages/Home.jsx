import React, { useState, useRef } from "react";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { testimonials } from "../lib/testimonials";
import { TimelineDemo } from "../components/TimelineDemo";
import { IconMessageCircle } from "@tabler/icons-react";
import ChatBot from "./ChatBot";
// Home page helper functions ->
import {
  useScrollReveal,
  AnimatedStat,
  RANK_HISTORY,
  RankBar,
  AbstractMesh,
  HOW_STEPS,
  useAdaptiveDepth,
  useScrollEnvironment,
} from "./HomePageHelper";
import { Link } from "react-router-dom";

const Home = () => {
  const [userType, setUserType] = useState(true);
  const [showChatBot, setShowChatBot] = useState(false);
  const heroRef = useRef(null);
  const processRef = useRef(null);

  useScrollReveal();

  const { lightRef, headlineRef, accentRef, barsRef, meshRef } =
    useAdaptiveDepth();

  useScrollEnvironment(processRef);

  const toggle = () => setUserType((p) => !p);

  return (
    <div className="elv-root elv-grain elv-bg-drift min-h-screen bg-[#080C10] text-white">

      <span className="fixed left-6 top-8 z-50 font-syne text-[12px] font-black tracking-[0.14em] text-white md:left-24">
        ELEVATE
      </span>

      <button
        onClick={() => setShowChatBot(true)}
        className="btn-primary fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#A01E2E] text-white"
        aria-label="Open chat">
        <IconMessageCircle size={17} />
      </button>

      {showChatBot && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-end z-[60]">
          <ChatBot onClose={() => setShowChatBot(false)} />
        </div>
      )}

      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center overflow-hidden">
        {/* Background */}
        <div
          className={`parallax-bg absolute inset-0 scale-[1.12] bg-cover bg-center blur-[16px] brightness-[0.06] saturate-[0.15] grayscale ${userType ? "bg-[url('https://i.pinimg.com/1200x/01/02/ea/0102ea2768a9c06ce53710dcb7064a27.jpg')]" : "bg-[url('https://i.pinimg.com/1200x/e9/3a/cc/e93accfca67cb616635147f584c2bff9.jpg')]"}`}
        />
        <div className="absolute inset-0 bg-[#07090D]/95" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07090D] via-transparent to-[#080C12]/60" />

        {/* Adaptive depth — red counter-glow */}
        <div
          ref={lightRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_50%,rgba(160,30,46,0.16)_0%,transparent_78%)] will-change-[background]"
          aria-hidden
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1120px] mx-auto px-8 lg:px-12 py-28 flex items-center gap-16 lg:gap-20">
          {/* LEFT */}
          <div className="flex-1 max-w-[500px]">
            {/* Eyebrow */}
            <div className="fade-up-1 inline-flex items-center gap-[10px] mb-9">
              <span className="elv-accent-env-bg w-[5px] h-[1px]" />
              <span className="elv-accent-env text-[10px] font-semibold uppercase tracking-[0.18em]">
                {userType ? "Performance Coaching" : "Coach Platform"}
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="mb-7 font-syne font-extrabold leading-[0.98] tracking-[0] will-change-transform">
              {userType ? (
                <>
                  <span
                    className="word-reveal word-reveal-1 text-[clamp(40px,4.4vw,60px)] text-white opacity-[0.88]">
                    Rank up.
                  </span>
                  <span
                    className="word-reveal word-reveal-2 text-[clamp(44px,5vw,68px)] text-white">
                    Coached by
                  </span>
                  <span
                    ref={accentRef}
                    className="word-reveal word-reveal-3 text-[clamp(44px,5vw,68px)] text-[#A01E2E] will-change-[color]">
                    Radiants.
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="word-reveal word-reveal-1 text-[clamp(40px,4.4vw,60px)] text-white opacity-[0.88]">
                    Coach.
                  </span>
                  <span
                    className="word-reveal word-reveal-2 text-[clamp(44px,5vw,68px)] text-white">
                    Earn on your
                  </span>
                  <span
                    ref={accentRef}
                    className="word-reveal word-reveal-3 text-[clamp(44px,5vw,68px)] text-[#A01E2E] will-change-[color]">
                    own terms.
                  </span>
                </>
              )}
            </h1>

            {/* Sub */}
            <p className="fade-up-2 mb-9 max-w-[340px] text-[13.5px] font-normal leading-[1.74] text-[#4A5568]">
              {userType
                ? "VOD reviews from Radiant coaches. Agent-specific feedback. Measurable rank progress."
                : "Set your rate. Own your schedule. The platform serious coaches use to build and grow."}
            </p>

            {/* CTAs */}
            <div className="fade-up-3 flex items-center gap-[10px] mb-10">
              <Link
                to={userType ? "/coaches" : "coach-signup"}
                className="btn-primary cursor-pointer rounded-[6px] bg-[#A01E2E] px-[22px] py-[9px] text-[12.5px] font-semibold text-white">
                {userType ? "Find a Coach" : "Apply as Coach"}
              </Link>
              <button
                onClick={toggle}
                className="btn-ghost cursor-pointer rounded-[6px] border border-white/[0.07] bg-white/[0.016] px-[22px] py-[9px] text-[12.5px] font-medium text-[#485160] hover:border-white/[0.13] hover:text-[#7A8694]">
                {userType ? "Become a Coach" : "Find a Coach"} →
              </button>
            </div>

            {/* Stats */}
            <div className="fade-up-4 stats-glass overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
                <AnimatedStat
                  value={500}
                  suffix="+"
                  label="Active Coaches"
                  delay={720}
                />
                <AnimatedStat
                  value={12000}
                  suffix="+"
                  label="Sessions"
                  delay={870}
                />
                <AnimatedStat
                  value={49}
                  suffix="★"
                  label="Avg Rating"
                  delay={1020}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <AbstractMesh meshRef={meshRef} />
        </div>

        {/* Rank bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-[1120px] mx-auto px-8 lg:px-12 pb-8">
            <div
              ref={barsRef}
              className="rank-bars-trigger fade-up-5 rounded-lg border border-white/[0.048] bg-[#07090D]/80 px-5 pb-3 pt-3.5 backdrop-blur-xl will-change-transform">
              <div className="flex justify-between items-center mb-[10px]">
                <span className="text-[9.5px] font-medium uppercase tracking-[0.15em] text-[#252E3A]">
                  Avg. player rank progression · last 6 months
                </span>
                <span className="font-syne text-[10.5px] font-black tracking-[0] text-[#A01E2E]">
                  +4 ranks
                </span>
              </div>
              <div className="flex items-end gap-[3px] h-[30px]">
                {RANK_HISTORY.map((h, i) => (
                  <RankBar key={i} h={h} i={i} total={RANK_HISTORY.length} />
                ))}
              </div>
              <div className="flex justify-between mt-[9px]">
                {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                  <span
                    key={m}
                    className="text-[8.5px] tracking-[0.07em] text-[#1A222C]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-rule max-w-[1120px] mx-auto" />

      <section
        ref={processRef}
        className="py-28 px-8 lg:px-12 max-w-[1120px] mx-auto scroll-reveal">
        <div className="mb-16">
          <div className="inline-flex items-center gap-[10px] mb-5">
            <span className="w-[5px] h-[1px] bg-[#A01E2E]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">
              Process
            </span>
          </div>
          <h2 className="mb-4 max-w-[280px] font-syne text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.06] tracking-[0] text-white">
            Structured improvement,
            <br />
            not guesswork
          </h2>
          <p className="max-w-[300px] text-[13px] leading-[1.72] text-[#3E4A58]">
            Built around how elite players actually develop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          {HOW_STEPS.map(({ num, title, desc, icon }, i) => (
            <div
              key={num}
              className={`step-card rounded-[8px] border border-white/[0.05] bg-[#0B1017] p-7 hover:-translate-y-[3px] ${i === 1 ? "delay-[35ms]" : i === 2 ? "delay-[70ms]" : ""}`}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-syne text-[9.5px] font-black tracking-[0.2em] text-[#18222C]">
                  {num}
                </span>
                <span className="text-[#283040] transition-colors duration-300 hover:text-[#A01E2E]">
                  {icon}
                </span>
              </div>
              <h3 className="mb-3 font-syne text-[14.5px] font-bold leading-[1.3] tracking-[0] text-white">
                {title}
              </h3>
              <p className="text-[13px] leading-[1.74] text-[#2A3848]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-rule" />

      <section className="scroll-reveal">
        <TimelineDemo />
      </section>

      <div className="section-rule" />

      <section className="py-28 px-8 lg:px-12 max-w-[1120px] mx-auto scroll-reveal">
        <div className="mb-14">
          <div className="inline-flex items-center gap-[10px] mb-5">
            <span className="w-[5px] h-[1px] bg-[#A01E2E]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">
              Results
            </span>
          </div>
          <h2 className="mb-3 font-syne text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.06] tracking-[0] text-white">
            From players who climbed.
          </h2>
          <p className="max-w-[280px] text-[13px] leading-[1.72] text-[#3E4A58]">
            Real results from players who committed to the process.
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />
      </section>

      <div className="section-rule" />

      <section className="py-24 px-8 lg:px-12 max-w-[1120px] mx-auto scroll-reveal">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="inline-flex items-center gap-[10px] mb-5">
              <span className="w-[5px] h-[1px] bg-[#A01E2E]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">
                Get started
              </span>
            </div>
            <h2 className="mb-3 max-w-[320px] font-syne text-[clamp(24px,2.8vw,42px)] font-extrabold leading-[1.06] tracking-[0] text-white">
              Stop guessing.
              <br />
              Start improving.
            </h2>
            <p className="max-w-[280px] text-[13px] leading-[1.72] text-[#3E4A58]">
              First session backed by a 100% satisfaction guarantee.
            </p>
          </div>
          <div className="flex items-center gap-[10px] flex-shrink-0">
            <Link
              to="/coaches"
              className="btn-primary cursor-pointer rounded-[6px] bg-[#A01E2E] px-[22px] py-[9px] text-[12.5px] font-semibold text-white">
              Browse Coaches
            </Link>
            <Link
              to="/"
              className="btn-ghost cursor-pointer rounded-[6px] border border-white/[0.07] bg-white/[0.016] px-[22px] py-[9px] text-[12.5px] font-medium text-[#485160] hover:border-white/[0.13]">
              Learn more
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-syne text-[12px] font-black tracking-[0.14em] text-white">
            ELEVATE
          </span>
          <span className="text-[11px] tracking-wide text-[#1E2830]">
            © {new Date().getFullYear()} Elevate · Not affiliated with Riot
            Games
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;
