import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useChatStore } from "../store/useChatStore";
import RatingStars from "./RatingStars";

const SKILL_LABELS = [
  { key: "aim", label: "Aim" },
  { key: "positioning", label: "Positioning" },
  { key: "decisionMaking", label: "Decision Making" },
  { key: "utilityUsage", label: "Utility Usage" },
  { key: "communication", label: "Communication" },
];

const NOTE_SECTIONS = [
  {
    key: "strengths",
    label: "Strengths",
    icon: "↑",
    cls: "border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-400/75",
  },
  {
    key: "improvements",
    label: "Improvements",
    icon: "→",
    cls: "border-amber-400/20   bg-amber-400/[0.04]   text-amber-400/75",
  },
  {
    key: "drills",
    label: "Drills",
    icon: "◎",
    cls: "border-blue-500/20    bg-blue-500/[0.04]    text-blue-400/75",
  },
];

const EyebrowLabel = ({ children }) => (
  <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/25 mb-3">
    {children}
  </p>
);
const SectionDivider = () => <div className="h-px bg-white/[0.05]" />;

/* ── Player view: read-only feedback ── */
const PlayerFeedbackView = ({ review, onClose }) => {
  const { setSelectedUser } = useChatStore();
  const { coachNotes = {}, skillRatings = {}, coach, vods = [] } = review;

  return (
    <>
      <div className="px-6 py-5">
        <EyebrowLabel>Skill Ratings</EyebrowLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SKILL_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
              <span className="text-[12px] font-medium text-white/45">
                {label}
              </span>
              <RatingStars value={skillRatings[key] || 0} size="sm" showValue />
            </div>
          ))}
        </div>
      </div>
      <SectionDivider />
      <div className="px-6 py-5 flex flex-col gap-3">
        <EyebrowLabel>Coach Notes</EyebrowLabel>
        {NOTE_SECTIONS.map(({ key, label, icon, cls }) =>
          coachNotes[key] ? (
            <div key={key} className={`rounded-xl border px-4 py-3.5 ${cls}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold">{icon}</span>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] opacity-55">
                  {label}
                </p>
              </div>
              <p className="text-[12.5px] leading-relaxed opacity-80">
                {coachNotes[key]}
              </p>
            </div>
          ) : null,
        )}
      </div>
      {review.vods.length > 0 && (
        <>
          <SectionDivider />
          <div className="px-6 py-5">
            <EyebrowLabel>Your Submitted Clips ({review.vods.length})</EyebrowLabel>
            <div className="flex flex-col gap-1.5">
              {review.vods.map((vod, i) => {
                const url = vod?.url ?? vod;
                return (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-white/[0.07] bg-black">
                    <video
                      src={url}
                      controls
                      className="w-full max-h-[240px] object-contain"
                      preload="metadata"
                    />
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-[10px] text-white/30 font-medium">
                        Clip {i + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <SectionDivider />
      <div className="px-6 py-5 flex gap-2.5">
        <Link
          to="/messages"
          onClick={() => {
            setSelectedUser(coach);
            onClose();
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13] hover:bg-white/[0.04] text-white/45 hover:text-white/75 text-[12px] font-semibold transition-all duration-150">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Message Coach
        </Link>
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-white/[0.06] bg-transparent text-[12px] font-semibold text-white/30 hover:text-white/55 hover:border-white/[0.11] transition-all duration-150">
          Close
        </button>
      </div>
    </>
  );
};

/* ── Coach view: feedback form or read-only ── */
const CoachFeedbackView = ({ review, onUpdate, onClose }) => {
  const isCompleted = review.status === "completed";
  const [ratings, setRatings] = useState(
    review.skillRatings || {
      aim: 0,
      positioning: 0,
      decisionMaking: 0,
      utilityUsage: 0,
      communication: 0,
    },
  );
  const [strengths, setStrengths] = useState(
    review.coachNotes?.strengths || "",
  );
  const [improvements, setImprovements] = useState(
    review.coachNotes?.improvements || "",
  );
  const [drills, setDrills] = useState(review.coachNotes?.drills || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const setRating = (key, val) => setRatings((p) => ({ ...p, [key]: val }));
  const isValid =
    strengths.trim() &&
    improvements.trim() &&
    drills.trim() &&
    Object.values(ratings).every((r) => r > 0);

  const handleSubmit = async () => {
    if (!isValid) {
      setError("Rate all 5 skills and fill every note field.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await axiosInstance.put("/reviews/complete", {
        reviewId: review._id,
        coachNotes: { strengths, improvements, drills },
        skillRatings: ratings,
      });
      onUpdate({
        coachNotes: res.data.review?.coachNotes || {
          strengths,
          improvements,
          drills,
        },
        skillRatings: res.data.review?.skillRatings || ratings,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Submission failed — try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const textFields = [
    {
      label: "Strengths",
      value: strengths,
      set: setStrengths,
      ph: "What did the player do well?",
      focusCls: "focus:border-emerald-500/30",
    },
    {
      label: "Improvements",
      value: improvements,
      set: setImprovements,
      ph: "Key areas to work on…",
      focusCls: "focus:border-amber-400/30",
    },
    {
      label: "Drills",
      value: drills,
      set: setDrills,
      ph: "Specific drills to practise…",
      focusCls: "focus:border-blue-500/30",
    },
  ];

  return (
    <>
      {review.vods?.length > 0 && (
        <>
          <div className="px-6 py-5">
            <EyebrowLabel>Player Clips ({review.vods.length})</EyebrowLabel>
            <div className="flex flex-col gap-2">
              {review.vods.map((vod, i) => {
                const url = vod?.url ?? vod;
                return (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-white/[0.07] bg-black">
                    <video
                      src={url}
                      controls
                      className="w-full max-h-[240px] object-contain"
                      preload="metadata"
                    />
                    <div className="px-3 py-2 flex items-center justify-between">
                      <span className="text-[10px] text-white/30 font-medium">
                        Clip {i + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <SectionDivider />
        </>
      )}

      <div className="px-6 py-5">
        <EyebrowLabel>Skill Ratings</EyebrowLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SKILL_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
              <span className="text-[12px] font-medium text-white/42">
                {label}
              </span>
              <RatingStars
                value={ratings[key] || 0}
                onChange={isCompleted ? undefined : (v) => setRating(key, v)}
                size="sm"
                showValue={isCompleted}
              />
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      <div className="px-6 py-5 flex flex-col gap-4">
        <EyebrowLabel>Coach Notes</EyebrowLabel>
        {isCompleted
          ? NOTE_SECTIONS.map(({ key, label, icon, cls }) =>
              review.coachNotes?.[key] ? (
                <div
                  key={key}
                  className={`rounded-xl border px-4 py-3.5 ${cls}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold">{icon}</span>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] opacity-55">
                      {label}
                    </p>
                  </div>
                  <p className="text-[12.5px] leading-relaxed opacity-80">
                    {review.coachNotes[key]}
                  </p>
                </div>
              ) : null,
            )
          : textFields.map(({ label, value, set, ph, focusCls }) => (
              <div key={label}>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-white/22 mb-2">
                  {label}
                </p>
                <textarea
                  rows={3}
                  placeholder={ph}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className={`w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-3.5 py-3 text-[12.5px] text-white/70 placeholder-white/[0.16] outline-none resize-none leading-relaxed font-['DM_Sans',sans-serif] transition-all duration-150 ${focusCls}`}
                />
              </div>
            ))}
      </div>

      {error && (
        <div className="mx-6 mb-2 flex items-center gap-2 rounded-lg border border-red-500/[0.12] bg-red-500/[0.04] px-4 py-2.5">
          <p className="text-[11px] text-red-400/60">{error}</p>
        </div>
      )}

      <SectionDivider />
      <div className="px-6 py-5 flex gap-2.5">
        {!isCompleted && (
          <button
            onClick={handleSubmit}
            disabled={submitting || !isValid}
            className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#A01E2E] hover:bg-[#8E1C2A] disabled:opacity-35 disabled:cursor-not-allowed text-white text-[12.5px] font-semibold tracking-[0.02em] transition-all duration-150 hover:-translate-y-0.5">
            {submitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Submit Feedback
              </>
            )}
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-xl border border-white/[0.06] bg-transparent text-[12px] font-semibold text-white/30 hover:text-white/55 hover:border-white/[0.11] transition-all duration-150">
          {isCompleted ? "Close" : "Cancel"}
        </button>
      </div>
    </>
  );
};

/* ── Modal shell ── */
const ReviewModal = ({ review, role, onClose, onUpdate }) => {
  const isPlayer = role === "player";
  const person = isPlayer ? review.coach : review.player;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      style={{
        background: "rgba(3,5,8,0.90)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div 
        data-lenis-prevent
        className="relative w-full sm:max-w-[640px] max-h-[92vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-2xl border border-white/[0.07] bg-[#090C12] flex flex-col"
        style={{ scrollbarWidth: "none" }}>
        <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/40 to-transparent pointer-events-none" />
        <div
          className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(160,30,46,0.065) 0%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between px-6 pt-6 pb-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-3.5">
            <img
              src={
                person?.profilePic ||
                "https://cdn-icons-png.flaticon.com/128/149/149071.png"
              }
              alt={person?.fullname}
              className="w-10 h-10 rounded-full object-cover border border-white/[0.09] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3.5 h-px bg-[#A01E2E]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">
                  {isPlayer
                    ? "Coach Feedback"
                    : review.status === "completed"
                      ? "Submitted Feedback"
                      : "Submit Feedback"}
                </span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-extrabold text-[16px] text-white tracking-tight leading-none">
                {person?.fullname || "—"}
              </h2>
              {person?.rank && (
                <p className="text-[10px] text-white/25 mt-0.5 font-medium">
                  {person.rank}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/28 hover:text-white/70 hover:bg-white/[0.07] transition-all duration-150 shrink-0 mt-0.5">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {isPlayer ? (
          <PlayerFeedbackView review={review} onClose={onClose} />
        ) : (
          <CoachFeedbackView
            review={review}
            onUpdate={onUpdate}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewModal;