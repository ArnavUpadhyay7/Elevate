import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatedModalDemo } from "../components/AnimatedModalDemo";
import { axiosInstance } from "../lib/axios";
import { playerStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";
import CoachClipsViewer from "../components/CoachClipsViewer";
import toast from "react-hot-toast";

/* ─────────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#A01E2E" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Mock reviews — swap for real API data when ready
───────────────────────────────────────────────────────────── */
const MOCK_REVIEWS = [
  {
    id: 1,
    author: "xBlazeKR",
    rating: 5,
    text: "Best coaching session I've had. Identified my positioning issues in the first 10 minutes. Went up two divisions in a week.",
  },
  {
    id: 2,
    author: "NightOwlGG",
    rating: 5,
    text: "No filler, just actionable feedback. The custom training plan was exactly what I needed to stop losing clutches.",
  },
  {
    id: 3,
    author: "vviridia",
    rating: 4,
    text: "Great at explaining rotations and map control. Clear and patient communication. Would book again.",
  },
];

/* ─────────────────────────────────────────────────────────────
   CoachProfile
───────────────────────────────────────────────────────────── */
const CoachProfile = () => {
  const { setSelectedUser } = useChatStore();
  const player = playerStore((state) => state.player);
  const { id } = useParams();

  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived reactively from store — updates immediately after payment without refresh
  const isCoachHired =
    player?.payed_coach?.some(
      (c) => c === id || c?._id === id || c?.toString() === id,
    ) ?? false;

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const res = await axiosInstance.get(`/coach/${id}`);
        setCoach(res.data);
      } catch (err) {
        console.error("Error fetching coach:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
  }, [id, player]);

  /* ── Loader ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-5 text-[10px] tracking-[0.18em] uppercase text-[#A01E2E]">
            Loading Profile
          </div>
          <div className="relative w-[180px] h-[2px] bg-white/10 overflow-hidden rounded-full mx-auto">
            <div className="absolute inset-0 bg-[#A01E2E] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="min-h-screen bg-[#07090D] flex items-center justify-center">
        <p className="text-white/30 text-sm tracking-widest uppercase">
          Coach not found
        </p>
      </div>
    );
  }

  const SERVICES = [
    "45-minute personalized coaching session",
    "Detailed VOD review to identify your weaknesses",
    "Comprehensive training plan tailored to your goals",
    "Actionable insights to improve decision-making under pressure",
  ];

  /* ── Booking card — extracted so we can render it in both
        desktop (sticky sidebar) and mobile (inline) ── */
  const BookingCard = () => (
    <div className="relative rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-6">
      {/* Accent top line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/35 to-transparent" />

      {/* Rank · Role */}
      {(coach.rank || coach.role) && (
        <div className="inline-flex items-center gap-2 mb-5">
          {coach.rank && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A01E2E] shrink-0" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A01E2E]">
                {coach.rank}
              </span>
            </>
          )}
          {coach.rank && coach.role && <span className="text-white/20">·</span>}
          {coach.role && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {coach.role}
            </span>
          )}
        </div>
      )}

      {/* Price */}
      <div className="mb-1">
        <span className="font-['Syne',sans-serif] font-extrabold text-3xl text-white tracking-tight">
          {coach.rate || "$45"}
        </span>
        <span className="text-[11px] text-white/30 ml-2">/ session</span>
      </div>
      <p className="text-[10.5px] text-white/25 uppercase tracking-[0.12em] mb-6">
        45-minute session
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.05] mb-5" />

      {/* Included */}
      <ul className="space-y-2.5 mb-7">
        {[
          "VOD review included",
          "Custom training plan",
          "Post-session notes",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-[11.5px] text-white/40">
            <span className="text-[#A01E2E]">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTAs — real hire/chat logic preserved */}
      {player ? (
        isCoachHired ? (
          <Link
            to="/messages"
            onClick={() => setSelectedUser(coach)}
            className="block w-full text-center bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-[12.5px] font-semibold py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 tracking-[0.02em]">
            Chat Now
          </Link>
        ) : (
          /* w-full + [&>*]:w-full forces AnimatedModalDemo's inner
             trigger button to stretch to the card width */
          <AnimatedModalDemo coach={coach} player={player} />
        )
      ) : (
        <button
          onClick={() => toast.error("Sign up to book a session")}
          className="w-full bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-[12.5px] font-semibold py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 tracking-[0.02em]">
          Book a Session
        </button>
      )}

      {/* Trust note */}
      <p className="text-center text-[10px] text-white/20 mt-4 tracking-wide">
        Verified Radiant · Secure booking
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#07090D] text-white font-['DM_Sans',system-ui,sans-serif] antialiased relative">
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.024]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-black/50 via-[#07090D]/60 to-transparent pointer-events-none" />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 lg:items-start">
            {/* ── LEFT column ── */}
            <div className="flex-1 min-w-0">
              {/* Accent line */}
              <div className="w-6 h-px bg-[#A01E2E] mb-5" />

              {/* Avatar + name */}
              <div className="flex items-center gap-4 sm:gap-5 mb-6">
                <img
                  src={
                    coach.profilePic ||
                    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  }
                  alt={coach.fullname}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-white/10 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h1 className="font-['Syne',sans-serif] font-extrabold text-[clamp(24px,5vw,40px)] tracking-tight text-white leading-none">
                      {coach.fullname}
                    </h1>
                    {/* Verified badge — same shape, on-brand color */}
                    <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#A01E2E]/15 text-[#A01E2E] shrink-0">
                      <CheckIcon />
                    </span>
                  </div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    {[coach.role, coach.rank].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>

              {/* ── STATS ROW ── */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.05] rounded-lg border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl mb-7">
                {[
                  { num: "2,000+", label: "Hours Played" },
                  { num: "4.9", label: "Avg Rating" },
                  { num: "12K+", label: "Sessions" },
                ].map(({ num, label }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1.5 px-4 sm:px-6 py-4">
                    <span className="font-['Syne',sans-serif] font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
                      {num}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 leading-none">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── ABOUT + SERVICES card ── */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8 mb-6">
                {/* About */}
                <div className="mb-8">
                  <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                  <h2 className="text-base font-semibold text-white mb-3 tracking-tight">
                    About {coach.fullname}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {coach.about}
                  </p>
                </div>

                {/* Services */}
                <div>
                  <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                  <h2 className="text-base font-semibold text-white mb-4 tracking-tight">
                    Services Provided
                  </h2>
                  <ul className="space-y-3 text-sm text-white/55">
                    {SERVICES.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#A01E2E] shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── GAMEPLAY CLIPS ── */}
              {coach.gameplayVideos?.length > 0 && (
                <div className="mb-6">
                  <CoachClipsViewer
                    videos={coach.gameplayVideos}
                    coachName={coach.fullname}
                  />
                </div>
              )}

              {/* ── Booking card — mobile only (shows below content) ── */}
              <div className="lg:hidden mb-6">
                <BookingCard />
              </div>

              {/* ── REVIEWS ── */}
              <div>
                <div className="mb-5">
                  <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Player Reviews
                  </h2>
                </div>
                <div className="flex flex-col gap-3">
                  {MOCK_REVIEWS.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-5 sm:p-6">
                      <div className="flex items-center justify-between mb-3 gap-3">
                        <span className="text-[11px] font-semibold text-white/55 tracking-wide">
                          {r.author}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <StarIcon key={i} />
                          ))}
                          <span className="text-[10px] text-white/25 ml-1">
                            {r.rating}.0
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {r.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT column — sticky booking card, desktop only ── */}
            <div className="hidden lg:block w-[340px] xl:w-[360px] shrink-0 min-w-0">
              <div className="sticky top-28">
                <BookingCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section className="pt-14 pb-24 sm:pt-16 sm:pb-28">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent mb-14" />
          <div className="text-center">
            <div className="w-5 h-px bg-[#A01E2E] mx-auto mb-5" />
            <h2 className="font-['Syne',sans-serif] font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-3">
              Ready to improve?
            </h2>
            <p className="text-sm text-white/35 mb-8 max-w-xs mx-auto leading-relaxed">
              One session with a Radiant coach can change how you see the game.
            </p>
            {player ? (
              isCoachHired ? (
                <Link
                  to="/messages"
                  onClick={() => setSelectedUser(coach)}
                  className="inline-block w-full max-w-xs text-center bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-[13px] font-semibold py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 tracking-[0.03em]">
                  Continue with {coach.fullname}
                </Link>
              ) : (
                <div className="max-w-xs mx-auto">
                  <AnimatedModalDemo coach={coach} player={player} />
                </div>
              )
            ) : (
              <button 
               onClick={() => toast.error("Sign up to book a session")}
               className="w-full max-w-xs mx-auto block bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-[13px] font-semibold py-3.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 tracking-[0.03em]">
                Book a Session with {coach.fullname}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex justify-between items-center gap-4 flex-wrap">
          <span className="font-['Syne',sans-serif] font-extrabold text-[12px] text-white tracking-[0.14em]">
            ELEVATE
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#1E2830] tracking-[0.04em]">
            © {new Date().getFullYear()} Elevate · Not affiliated with Riot
            Games
          </span>
        </div>
      </div>
    </div>
  );
};

export default CoachProfile;
