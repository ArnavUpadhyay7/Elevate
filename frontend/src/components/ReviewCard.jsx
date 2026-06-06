import React, { useState } from "react";
import RatingStars from "./RatingStars";
import UploadModal from "./UploadModal";
import ReviewModal from "./ReviewModal";

const RANK_COLORS = {
  diamond: {
    card: "border-[#8c64ff]/40 shadow-[0_0_10px_rgba(140,100,255,0.09),inset_0_0_12px_rgba(140,100,255,0.09)]",
    text: "text-[#8c64ff]",
  },
  ascendant: {
    card: "border-[#3cc864]/40 shadow-[0_0_10px_rgba(60,200,100,0.08),inset_0_0_12px_rgba(60,200,100,0.08)]",
    text: "text-[#3cc864]",
  },
  immortal: {
    card: "border-[#c83c50]/40 shadow-[0_0_10px_rgba(200,60,80,0.09),inset_0_0_12px_rgba(200,60,80,0.09)]",
    text: "text-[#c83c50]",
  },
  "immortal 2": {
    card: "border-[#dc465a]/45 shadow-[0_0_10px_rgba(220,70,90,0.10),inset_0_0_12px_rgba(220,70,90,0.10)]",
    text: "text-[#dc465a]",
  },
  "immortal 3": {
    card: "border-[#f05064]/50 shadow-[0_0_10px_rgba(240,80,100,0.12),inset_0_0_12px_rgba(240,80,100,0.12)]",
    text: "text-[#f05064]",
  },
  radiant: {
    card: "border-[#ffdc50]/50 shadow-[0_0_10px_rgba(255,220,80,0.12),inset_0_0_12px_rgba(255,220,80,0.12)]",
    text: "text-[#ffdc50]",
  },
};

const getRank = (rank) =>
  rank ? RANK_COLORS[rank.toLowerCase().split(" ")[0]] || null : null;

const SKILL_LABELS = [
  { key: "aim", label: "Aim" },
  { key: "positioning", label: "Positioning" },
  { key: "decisionMaking", label: "Decision Making" },
  { key: "utilityUsage", label: "Utility Usage" },
  { key: "communication", label: "Communication" },
];

const StatusBadge = ({ status }) => {
  const cfg = {
    awaiting_upload: {
      label: "Awaiting VOD",
      dotCls: "bg-white/20",
      textCls: "text-white/28",
      borderCls: "border-white/[0.07]",
      bgCls: "bg-transparent",
    },
    under_review: {
      label: "Under Review",
      dotCls: "bg-amber-400 animate-pulse",
      textCls: "text-amber-400/70",
      borderCls: "border-amber-500/[0.15]",
      bgCls: "bg-amber-500/[0.05]",
    },
    completed: {
      label: "Completed",
      dotCls: "bg-emerald-400",
      textCls: "text-emerald-400/70",
      borderCls: "border-emerald-500/[0.15]",
      bgCls: "bg-emerald-500/[0.05]",
    },
  };
  const c = cfg[status] || cfg.awaiting_upload;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9.5px] font-semibold uppercase tracking-[0.13em] shrink-0 ${c.textCls} ${c.borderCls} ${c.bgCls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dotCls}`} />
      {c.label}
    </span>
  );
};

const ReviewCard = ({ review, role, onUpdate }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const isPlayer = role === "player";
  const person = isPlayer ? review.coach : review.player;
  const { status } = review;

  const rs = getRank(person?.rank);

  /* Which modal to open + whether card is clickable */
  const clickAction =
    isPlayer && status === "awaiting_upload"
      ? "upload"
      : isPlayer && status === "completed"
        ? "review"
        : !isPlayer && status === "under_review"
          ? "review"
          : !isPlayer && status === "completed"
            ? "review"
            : null;

  const handleClick = () => {
    if (!clickAction) return;
    if (clickAction === "upload") setUploadOpen(true);
    else setReviewOpen(true);
  };

  /* Contextual subtext */
  const subtext = {
    player: {
      awaiting_upload: {
        text: "Tap to upload your gameplay clips",
        cta: "Upload VODs",
        dim: false,
      },
      under_review: {
        text: "Your clips are with your coach — feedback coming soon",
        cta: null,
        dim: true,
      },
      completed: {
        text: "Coach feedback is ready to view",
        cta: "View Feedback",
        dim: false,
      },
    },
    coach: {
      awaiting_upload: {
        text: "Waiting for player to submit their clips",
        cta: null,
        dim: true,
      },
      under_review: {
        text: "Player's clips are ready — submit your feedback",
        cta: "Review Now",
        dim: false,
      },
      completed: {
        text: "Feedback submitted and delivered",
        cta: null,
        dim: true,
      },
    },
  }[role]?.[status];

  return (
    <>
      {uploadOpen && (
        <UploadModal
          review={review}
          onClose={() => setUploadOpen(false)}
          onSuccess={(updated) => {
            setUploadOpen(false);
            onUpdate(review._id, "under_review", { vods: updated?.vods || [] });
          }}
        />
      )}
      {reviewOpen && (
        <ReviewModal
          review={review}
          role={role}
          onClose={() => setReviewOpen(false)}
          onUpdate={(patch) => {
            setReviewOpen(false);
            onUpdate(review._id, "completed", patch);
          }}
        />
      )}

      <div
        onClick={handleClick}
        className={[
          "group relative rounded-2xl border overflow-hidden transition-all duration-200",
          rs?.card || "",
          clickAction
            ? "border-white/[0.05] bg-white/[0.012] hover:border-white/[0.10] hover:bg-white/[0.022] cursor-pointer hover:-translate-y-0.5"
            : "border-white/[0.04] bg-white/[0.008] cursor-default",
        ].join(" ")}>
        {/* Hover shimmer */}
        {clickAction && (
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/25 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        <div className="px-5 py-4 sm:px-6 sm:py-5">
          {/* Main row */}
          <div className="flex items-center gap-4">
            {/* Avatar + status dot */}
            <div className="relative shrink-0">
              <img
                src={
                  person?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                }
                alt={person?.fullname}
                className="w-11 h-11 rounded-full object-cover border border-white/[0.09]"
              />
              {status === "under_review" && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-[var(--elv-bg)] animate-pulse" />
              )}
              {status === "completed" && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--elv-bg)] flex items-center justify-center">
                  <svg
                    width="5"
                    height="5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              )}
            </div>

            {/* Name + subtext */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-['Syne',sans-serif] font-bold text-[14.5px] text-white truncate leading-tight">
                  {person?.fullname || "—"}
                </p>
                {person?.rank && (
                  <span className={`hidden shrink-0 text-[9px] font-semibold uppercase tracking-[0.11em] sm:block ${rs?.text || "text-white/20"}`}>
                    {person.rank}
                  </span>
                )}
              </div>
              <p
                className={`text-[11.5px] leading-snug truncate transition-colors duration-200 ${subtext?.dim ? "text-white/20" : "text-white/42 group-hover:text-white/58"}`}>
                {subtext?.text}
              </p>
            </div>

            {/* Badge + optional CTA label + chevron */}
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={status} />
              {subtext?.cta && (
                <span className={`hidden items-center gap-1 text-[10px] font-semibold tracking-wide transition-colors duration-200 sm:flex ${rs?.text || "text-[#A01E2E]/70 group-hover:text-[#A01E2E]"}`}>
                  {subtext.cta}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/* Completed inline rating preview */}
          {status === "completed" && review.skillRatings && (
            <div className="mt-4 pt-3.5 border-t border-white/[0.04] flex items-center gap-5 overflow-hidden">
              {SKILL_LABELS.slice(0, isPlayer ? 3 : 5).map(({ key, label }) => (
                <div key={key} className="flex flex-col gap-1 shrink-0">
                  <span className="text-[8.5px] uppercase tracking-[0.11em] text-white/18">
                    {label.split(" ")[0]}
                  </span>
                  <RatingStars
                    value={review.skillRatings[key] || 0}
                    size="sm"
                  />
                </div>
              ))}
              {isPlayer && (
                <span className="text-[9.5px] text-[#A01E2E]/55 group-hover:text-[#A01E2E]/80 transition-colors duration-200 ml-auto shrink-0 font-semibold">
                  View full feedback →
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
