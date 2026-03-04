import React, { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../lib/axios";
import { playerStore, coachStore } from "../store/authStore";
import ReviewCard from "../components/ReviewCard";

/* ─────────────────────────────────────────────────────────────
   Reviews page
   
   For PLAYERS:
   - Fetches GET /review/player  → existing review docs
   - Fetches player.payed_coach  → all coaches they've paid
   
   Then merges: if a paid coach has no review doc yet, we show them
   with a synthetic "no_review" state (shouldn't happen since webhook
   auto-creates them, but acts as a fallback).
   
   For COACHES:
   - Fetches GET /review/coach → their player submissions
───────────────────────────────────────────────────────────── */

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.024]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat", backgroundSize: "160px",
    }}
  />
);

const LoadingScreen = () => (
  <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
    <Grain />
    <div className="text-center">
      <p className="mb-5 text-[10px] tracking-[0.18em] uppercase text-[#A01E2E] animate-pulse">Loading Reviews</p>
      <div className="relative w-[200px] h-[2px] bg-white/[0.07] rounded-full mx-auto overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-[45%] rounded-full"
          style={{ background: "linear-gradient(90deg,transparent,#A01E2E,transparent)", animation: "scanSweep 1.6s linear infinite" }} />
      </div>
      <style>{`@keyframes scanSweep{0%{transform:translateX(-100%)}100%{transform:translateX(320%)}}`}</style>
    </div>
  </div>
);

const SectionHeader = ({ label, count, color = "text-white/25" }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className={`text-[9.5px] font-semibold uppercase tracking-[0.17em] ${color}`}>{label}</span>
    <span className="text-[9px] text-white/15 tabular-nums">{count}</span>
    <div className="flex-1 h-px bg-white/[0.04]" />
  </div>
);

const Reviews = () => {
  const player = playerStore((state) => state.player);
  const coach  = coachStore ((state) => state.coach);
  const role   = player ? "player" : coach ? "coach" : null;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  const fetchReviews = useCallback(async () => {
    if (!role) { setLoading(false); return; }
    setLoading(true);
    setError("");

    try {
      if (role === "player") {
        /* ── Player: fetch review docs + full payed_coach list ── */
        const [reviewsRes, playerRes] = await Promise.all([
          axiosInstance.get("/reviews/player"),
          axiosInstance.get("/player/check-auth"),
        ]);

        const reviewDocs  = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
        // check-auth returns { player: req.player }, payed_coach is populated by middleware
        const paidCoaches = playerRes.data?.player?.payed_coach || [];

        /* Build a set of coachIds that already have a review doc */
        const reviewedCoachIds = new Set(
          reviewDocs.map((r) => r.coach?._id?.toString() ?? r.coach?.toString())
        );

        /*
          For coaches that have NO review doc yet (webhook hasn't fired / edge case),
          create a synthetic stub so the player can still see them.
          In practice your webhook creates the doc at payment time, so this
          array is usually empty — but it prevents a blank page during testing.
        */
        const stubs = paidCoaches
          .filter((c) => {
            const id = c._id?.toString() ?? c.toString();
            return !reviewedCoachIds.has(id);
          })
          .map((c) => ({
            _id:    `stub_${c._id ?? c}`,
            coach:  c,           // populated object or just an id
            status: "awaiting_upload",
            vods:   [],
            __stub: true,        // flag so we know not to call API for this
          }));

        setReviews([...reviewDocs, ...stubs]);

      } else {
        /* ── Coach: just fetch their assigned reviews ── */
        const res = await axiosInstance.get("/reviews/coach");
        setReviews(Array.isArray(res.data) ? res.data : []);
      }

    } catch {
      setError("Failed to load reviews — please try again.");
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  /* Optimistic update from child cards */
  const handleUpdate = useCallback((id, newStatus, patch = {}) => {
    setReviews((prev) =>
      prev.map((r) => r._id === id ? { ...r, status: newStatus, ...patch } : r)
    );
  }, []);

  /* ── Loading / not signed in ── */
  if (loading) return <LoadingScreen />;

  if (!role) {
    return (
      <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
        <Grain />
        <div className="text-center max-w-xs">
          <div className="w-5 h-px bg-[#A01E2E] mx-auto mb-5" />
          <p className="font-['Syne',sans-serif] font-extrabold text-xl text-white mb-2 tracking-tight">Not signed in</p>
          <p className="text-sm text-white/25 leading-relaxed">Sign in to view your reviews.</p>
        </div>
      </div>
    );
  }

  /* ── Status groups ── */
  const groups = {
    awaiting_upload: reviews.filter((r) => r.status === "awaiting_upload"),
    under_review:    reviews.filter((r) => r.status === "under_review"),
    completed:       reviews.filter((r) => r.status === "completed"),
  };

  const GROUP_CONFIG = {
    awaiting_upload: {
      label: role === "player" ? "Upload Required" : "Waiting for Player",
      color: "text-white/25",
    },
    under_review: { label: "Under Review",  color: "text-amber-400/55"   },
    completed:    { label: "Completed",     color: "text-emerald-400/55" },
  };

  const totalActive = groups.awaiting_upload.length + groups.under_review.length;

  return (
    <div className="min-h-screen bg-[#07090D] text-white font-['DM_Sans',system-ui,sans-serif] antialiased relative">
      <Grain />
      <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-black/50 via-[#07090D]/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[360px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 32% at 50% 0%, rgba(160,30,46,0.055) 0%, transparent 70%)" }} />

      <section className="relative pt-20 sm:pt-24 pb-28">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 lg:px-6">

          {/* ── Page header ── */}
          <div className="mb-10">
            <div className="w-6 h-px bg-[#A01E2E] mb-5" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E] block mb-3">
              {role === "player" ? "My Reviews" : "Coaching Reviews"}
            </span>
            <h1 className="font-['Syne',sans-serif] font-extrabold text-[clamp(26px,5vw,40px)] text-white tracking-tight leading-[1.05] mb-2.5">
              {role === "player" ? "Your VOD Reviews." : "Player Submissions."}
            </h1>
            <p className="text-[13.5px] text-white/30 max-w-md leading-relaxed">
              {role === "player"
                ? "Upload your gameplay clips to each coach and receive structured feedback."
                : "Review submitted footage and deliver actionable feedback to your players."}
            </p>

            {/* Status chips */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-5">
                {[
                  { key: "awaiting_upload", label: "Awaiting",  cls: "text-white/28 bg-white/[0.03] border-white/[0.06]"                   },
                  { key: "under_review",    label: "In Review", cls: "text-amber-400/60 bg-amber-500/[0.06] border-amber-500/[0.12]"        },
                  { key: "completed",       label: "Completed", cls: "text-emerald-400/60 bg-emerald-500/[0.06] border-emerald-500/[0.12]"  },
                ].map(({ key, label, cls }) =>
                  groups[key].length ? (
                    <div key={key} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold ${cls}`}>
                      <span className="tabular-nums">{groups[key].length}</span>
                      <span>{label}</span>
                    </div>
                  ) : null
                )}
              </div>
            )}

            <div className="mt-7 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/[0.14] bg-red-500/[0.04] px-5 py-4">
              <p className="text-[12.5px] text-red-400/65 font-medium flex-1">{error}</p>
              <button onClick={fetchReviews}
                className="text-[11px] font-semibold text-red-400/50 hover:text-red-400 transition-colors underline underline-offset-2 shrink-0">
                Retry
              </button>
            </div>
          )}

          {/* ── Empty state — only shown if no paid coaches AND no reviews ── */}
          {!error && reviews.length === 0 && (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-14 h-14 rounded-2xl border border-white/[0.06] bg-white/[0.015] flex items-center justify-center mb-5">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/15">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <div className="w-5 h-px bg-[#A01E2E] mx-auto mb-4" />
              <p className="font-['Syne',sans-serif] font-extrabold text-[17px] text-white tracking-tight mb-2">
                No coaches yet
              </p>
              <p className="text-[12.5px] text-white/22 max-w-[220px] leading-relaxed">
                {role === "player"
                  ? "Book a coaching session to unlock VOD reviews."
                  : "Completed bookings with players will appear here."}
              </p>
            </div>
          )}

          {/* ── Grouped cards ── */}
          {reviews.length > 0 && (
            <div className="flex flex-col gap-8">
              {["awaiting_upload", "under_review", "completed"].map((status) => {
                const group = groups[status];
                if (!group.length) return null;
                const cfg = GROUP_CONFIG[status];
                return (
                  <div key={status}>
                    <SectionHeader label={cfg.label} count={group.length} color={cfg.color} />
                    <div className="flex flex-col gap-2.5">
                      {group.map((review) => (
                        <ReviewCard
                          key={review._id}
                          review={review}
                          role={role}
                          onUpdate={handleUpdate}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-[820px] mx-auto px-5 sm:px-8 lg:px-6 py-5 flex justify-between items-center gap-4 flex-wrap">
          <span className="font-['Syne',sans-serif] font-extrabold text-[12px] text-white tracking-[0.14em]">ELEVATE</span>
          <span className="text-[10px] text-[#1E2830]">© {new Date().getFullYear()} Elevate · Not affiliated with Riot Games</span>
        </div>
      </div>
    </div>
  );
};

export default Reviews;