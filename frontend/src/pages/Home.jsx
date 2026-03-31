import React, { useState, useRef } from "react";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { testimonials } from "../lib/testimonials";
import { TimelineDemo } from "../components/TimelineDemo";
import { IconQuestionMark, IconMessageCircle } from "@tabler/icons-react";
import ChatBot from "./ChatBot";
import { coachStore, playerStore } from "../store/authStore";
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
  const player = playerStore((state) => state.player);
  const coach = coachStore((state) => state.coach);
  const [userType, setUserType] = useState(true);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const heroRef = useRef(null);
  const processRef = useRef(null);

  useScrollReveal();

  const { lightRef, headlineRef, accentRef, barsRef, meshRef } =
    useAdaptiveDepth();

  useScrollEnvironment(processRef);

  const toggle = () => setUserType((p) => !p);

  return (
    <div
      className="elv-root elv-grain elv-bg-drift min-h-screen text-white"
      style={{ background: "#080C10" }}>

      <span
        className="fixed top-8 md:left-24 left-6 z-50 text-[12px] font-black text-white"
        style={{ fontFamily: "Syne, sans-serif", letterSpacing: "0.14em" }}>
        ELEVATE
      </span>

      <button
        onClick={() => setShowChatBot(true)}
        className="btn-primary fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white cursor-pointer"
        style={{ background: "#A01E2E" }}
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
          className="parallax-bg absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: userType
              ? 'url("https://i.pinimg.com/1200x/01/02/ea/0102ea2768a9c06ce53710dcb7064a27.jpg")'
              : 'url("https://i.pinimg.com/1200x/e9/3a/cc/e93accfca67cb616635147f584c2bff9.jpg")',
            filter: "blur(16px) brightness(0.06) saturate(0.15) grayscale(0.5)",
            transform: "scale(1.12)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(7,9,13,0.96)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07090D] via-transparent to-[#080C12]/60" />

        {/* Adaptive depth — red counter-glow */}
        <div
          ref={lightRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 50% 50%, rgba(160,30,46,0.16) 0%, transparent 78%)",
            willChange: "background",
          }}
          aria-hidden
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1120px] mx-auto px-8 lg:px-12 py-28 flex items-center gap-16 lg:gap-20">
          {/* LEFT */}
          <div className="flex-1 max-w-[500px]">
            {/* Eyebrow */}
            <div className="fade-up-1 inline-flex items-center gap-[10px] mb-9">
              <span className="elv-accent-env-bg w-[5px] h-[1px]" />
              <span
                className="elv-accent-env text-[10px] font-semibold uppercase"
                style={{ letterSpacing: "0.18em" }}>
                {userType ? "Performance Coaching" : "Coach Platform"}
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="mb-7"
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.034em",
                lineHeight: 0.98,
                willChange: "transform",
              }}>
              {userType ? (
                <>
                  <span
                    className="word-reveal word-reveal-1 text-white"
                    style={{
                      fontSize: "clamp(40px, 4.4vw, 60px)",
                      opacity: 0.88,
                    }}>
                    Rank up.
                  </span>
                  <span
                    className="word-reveal word-reveal-2 text-white"
                    style={{ fontSize: "clamp(44px, 5.0vw, 68px)" }}>
                    Coached by
                  </span>
                  <span
                    ref={accentRef}
                    className="word-reveal word-reveal-3"
                    style={{
                      fontSize: "clamp(44px, 5.0vw, 68px)",
                      color: "#A01E2E",
                      willChange: "color",
                    }}>
                    Radiants.
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="word-reveal word-reveal-1 text-white"
                    style={{
                      fontSize: "clamp(40px, 4.4vw, 60px)",
                      opacity: 0.88,
                    }}>
                    Coach.
                  </span>
                  <span
                    className="word-reveal word-reveal-2 text-white"
                    style={{ fontSize: "clamp(44px, 5.0vw, 68px)" }}>
                    Earn on your
                  </span>
                  <span
                    ref={accentRef}
                    className="word-reveal word-reveal-3"
                    style={{
                      fontSize: "clamp(44px, 5.0vw, 68px)",
                      color: "#A01E2E",
                      willChange: "color",
                    }}>
                    own terms.
                  </span>
                </>
              )}
            </h1>

            {/* Sub */}
            <p
              className="fade-up-2 mb-9 max-w-[340px]"
              style={{
                color: "#4A5568",
                fontSize: "13.5px",
                lineHeight: "1.74",
                fontWeight: 400,
              }}>
              {userType
                ? "VOD reviews from Radiant coaches. Agent-specific feedback. Measurable rank progress."
                : "Set your rate. Own your schedule. The platform serious coaches use to build and grow."}
            </p>

            {/* CTAs */}
            <div className="fade-up-3 flex items-center gap-[10px] mb-10">
              <Link
                to={userType ? "/coaches" : "coach-signup"}
                className="btn-primary px-[22px] py-[9px] rounded-[6px] text-[12.5px] font-semibold text-white cursor-pointer"
                style={{ background: "#A01E2E" }}>
                {userType ? "Find a Coach" : "Apply as Coach"}
              </Link>
              <button
                onClick={toggle}
                className="btn-ghost px-[22px] py-[9px] rounded-[6px] text-[12.5px] font-medium cursor-pointer border border-white/[0.07] hover:border-white/[0.13] hover:text-[#7A8694]"
                style={{
                  background: "rgba(255,255,255,0.016)",
                  color: "#485160",
                }}>
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
              className="rank-bars-trigger fade-up-5"
              style={{
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.048)",
                padding: "14px 20px 12px",
                background: "rgba(7,9,13,0.82)",
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                willChange: "transform",
              }}>
              <div className="flex justify-between items-center mb-[10px]">
                <span
                  className="text-[9.5px] font-medium uppercase"
                  style={{ color: "#252E3A", letterSpacing: "0.15em" }}>
                  Avg. player rank progression · last 6 months
                </span>
                <span
                  className="text-[10.5px] font-black"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    color: "#A01E2E",
                    letterSpacing: "-0.01em",
                  }}>
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
                    className="text-[8.5px]"
                    style={{ color: "#1A222C", letterSpacing: "0.07em" }}>
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
            <span
              className="text-[10px] font-semibold uppercase"
              style={{ color: "#A01E2E", letterSpacing: "0.18em" }}>
              Process
            </span>
          </div>
          <h2
            className="text-white mb-4 max-w-[280px]"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(24px, 2.8vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
            }}>
            Structured improvement,
            <br />
            not guesswork
          </h2>
          <p
            className="max-w-[300px]"
            style={{ color: "#3E4A58", fontSize: "13px", lineHeight: "1.72" }}>
            Built around how elite players actually develop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
          {HOW_STEPS.map(({ num, title, desc, icon }, i) => (
            <div
              key={num}
              className="step-card rounded-[8px] border border-white/[0.05] p-7 hover:-translate-y-[3px]"
              style={{ background: "#0B1017", transitionDelay: `${i * 35}ms` }}>
              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-[9.5px] font-black tracking-[0.2em]"
                  style={{ fontFamily: "Syne, sans-serif", color: "#18222C" }}>
                  {num}
                </span>
                <span
                  className="transition-colors duration-300"
                  style={{ color: "#283040" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#A01E2E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#283040")
                  }>
                  {icon}
                </span>
              </div>
              <h3
                className="text-white mb-3"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  letterSpacing: "-0.014em",
                  lineHeight: 1.3,
                }}>
                {title}
              </h3>
              <p
                style={{
                  color: "#2A3848",
                  fontSize: "13px",
                  lineHeight: "1.74",
                }}>
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
            <span
              className="text-[10px] font-semibold uppercase"
              style={{ color: "#A01E2E", letterSpacing: "0.18em" }}>
              Results
            </span>
          </div>
          <h2
            className="text-white mb-3"
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(24px, 2.8vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
            }}>
            From players who climbed.
          </h2>
          <p
            style={{
              color: "#3E4A58",
              fontSize: "13px",
              lineHeight: "1.72",
              maxWidth: 280,
            }}>
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
              <span
                className="text-[10px] font-semibold uppercase"
                style={{ color: "#A01E2E", letterSpacing: "0.18em" }}>
                Get started
              </span>
            </div>
            <h2
              className="text-white mb-3 max-w-[320px]"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(24px, 2.8vw, 42px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.06,
              }}>
              Stop guessing.
              <br />
              Start improving.
            </h2>
            <p
              style={{
                color: "#3E4A58",
                fontSize: "13px",
                lineHeight: "1.72",
                maxWidth: 280,
              }}>
              First session backed by a 100% satisfaction guarantee.
            </p>
          </div>
          <div className="flex items-center gap-[10px] flex-shrink-0">
            <Link
              to="/coaches"
              className="btn-primary px-[22px] py-[9px] rounded-[6px] text-[12.5px] font-semibold text-white cursor-pointer"
              style={{ background: "#A01E2E" }}>
              Browse Coaches
            </Link>
            <Link
              to="/"
              className="btn-ghost px-[22px] py-[9px] rounded-[6px] text-[12.5px] font-medium border border-white/[0.07] hover:border-white/[0.13] cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.016)",
                color: "#485160",
              }}>
              Learn more
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span
            className="text-[12px] font-black text-white"
            style={{ fontFamily: "Syne, sans-serif", letterSpacing: "0.14em" }}>
            ELEVATE
          </span>
          <span
            className="text-[11px] tracking-wide"
            style={{ color: "#1E2830" }}>
            © {new Date().getFullYear()} Elevate · Not affiliated with Riot
            Games
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;
