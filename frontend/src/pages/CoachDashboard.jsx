import React from "react";
import { coachStore } from "../store/authStore";
import CoachVideosSection from "../components/CoachVideosSection";

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const SERVICES = [
  "45-minute personalised coaching session",
  "Detailed VOD review to identify your weaknesses",
  "Comprehensive training plan tailored to your goals",
  "Actionable insights for decision-making under pressure",
];

const CoachDashboard = () => {
  const coach = coachStore((state) => state.coach);

  return (
    <div className="min-h-screen bg-[#07090D] text-white font-['DM_Sans',system-ui,sans-serif] antialiased relative">

      {/* Grain */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.024]"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"160px" }}
      />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-black/50 via-[#07090D]/60 to-transparent pointer-events-none" />

      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-14">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">

            {/* ══════════════════════════
                LEFT COLUMN
            ══════════════════════════ */}
            <div className="flex-1 min-w-0 flex flex-col gap-6">

              {/* ── Identity ── */}
              <div>
                <div className="w-6 h-px bg-[#A01E2E] mb-5" />
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[10px] font-semibold uppercase text-[#A01E2E] tracking-[0.18em]">
                    Your Profile
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-5 mb-6">
                  <img
                    src={coach?.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
                    alt={coach?.fullname}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h1 className="font-['Syne',sans-serif] font-extrabold text-[clamp(22px,4.5vw,38px)] tracking-tight text-white leading-none">
                        {coach?.fullname}
                      </h1>
                      <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#A01E2E]/15 text-[#A01E2E] shrink-0">
                        <CheckIcon />
                      </span>
                    </div>
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/35 mt-1">
                      {[coach?.role, coach?.rank].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 divide-x divide-white/[0.05] rounded-lg border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl">
                  {[
                    { num: "2,000+", label: "Hours Played" },
                    { num: "4.9",    label: "Avg Rating"   },
                    { num: "12K+",   label: "Sessions"     },
                  ].map(({ num, label }) => (
                    <div key={label} className="flex flex-col gap-1.5 px-4 sm:px-6 py-4">
                      <span className="font-['Syne',sans-serif] font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">{num}</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 leading-none">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── About + Services ── */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8">
                <div className="mb-8">
                  <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                  <h2 className="text-base font-semibold text-white mb-3 tracking-tight">About You</h2>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {coach?.about || "Your bio will appear here. Update your profile to add a description."}
                  </p>
                </div>
                <div>
                  <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                  <h2 className="text-base font-semibold text-white mb-4 tracking-tight">Services Provided</h2>
                  <ul className="space-y-3 text-sm text-white/55">
                    {SERVICES.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#A01E2E] shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Gameplay clips ── */}
              <CoachVideosSection />

              {/* ── Listing note ── */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-5 sm:p-6">
                <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                <h2 className="text-base font-semibold text-white mb-2 tracking-tight">Your Listing</h2>
                <p className="text-sm text-white/40 leading-relaxed mb-4">
                  This is how players see your profile when browsing coaches.
                  Keep your bio and rate up to date to maximise bookings.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-white/30 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A01E2E]" />
                    Verified coach
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/30 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    Publicly listed
                  </div>
                </div>
              </div>

              {/* Profile preview card — mobile only */}
              <div className="lg:hidden">
                <ProfilePreviewCard coach={coach} />
              </div>
            </div>

            {/* ══════════════════════════
                RIGHT COLUMN — desktop only
            ══════════════════════════ */}
            <div className="hidden lg:block w-[320px] xl:w-[350px] shrink-0">
              <div className="sticky top-28">
                <ProfilePreviewCard coach={coach} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex justify-between items-center gap-4 flex-wrap">
          <span className="font-['Syne',sans-serif] font-extrabold text-[12px] text-white tracking-[0.14em]">ELEVATE</span>
          <span className="text-[10px] text-[#1E2830] tracking-[0.04em]">
            © {new Date().getFullYear()} Elevate · Not affiliated with Riot Games
          </span>
        </div>
      </div>
    </div>
  );
};

const ProfilePreviewCard = ({ coach }) => (
  <div className="relative rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-6">
    <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/35 to-transparent" />

    <div className="flex items-center gap-2 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#A01E2E]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">Listing Preview</span>
    </div>

    {(coach?.rank || coach?.role) && (
      <div className="inline-flex items-center gap-2 mb-5">
        {coach.rank && <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{coach.rank}</span>}
        {coach?.rank && coach?.role && <span className="text-white/15">·</span>}
        {coach?.role && <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">{coach.role}</span>}
      </div>
    )}

    <div className="mb-1">
      <span className="font-['Syne',sans-serif] font-extrabold text-3xl text-white tracking-tight">
        {coach?.rate ? `₹${coach.rate}` : "₹499"}
      </span>
      <span className="text-[11px] text-white/30 ml-2">/ session</span>
    </div>
    <p className="text-[10.5px] text-white/25 uppercase tracking-[0.12em] mb-6">45-minute session</p>

    <div className="w-full h-px bg-white/[0.05] mb-5" />

    <ul className="space-y-2.5 mb-7">
      {["VOD review included", "Custom training plan", "Post-session notes"].map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-[11.5px] text-white/40">
          <span className="text-[#A01E2E]"><CheckIcon /></span>
          {item}
        </li>
      ))}
    </ul>

    <div className="w-full bg-[#A01E2E]/25 border border-[#A01E2E]/15 text-white/30 text-[12.5px] font-semibold py-3 rounded-lg text-center tracking-[0.02em] select-none cursor-default">
      Book a Session
    </div>

    <p className="text-center text-[10px] text-white/15 mt-4 tracking-wide">
      This is how your card appears to players
    </p>
  </div>
);

export default CoachDashboard;