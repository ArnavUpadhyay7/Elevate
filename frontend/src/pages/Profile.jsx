import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { playerStore } from "../store/authStore";
import { axiosInstance } from "../lib/axios";

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const rankColor = (rank = "") => {
  const r = rank.toLowerCase();
  if (r.includes("radiant"))  return "#A01E2E";
  if (r.includes("immortal")) return "#7B6FA0";
  if (r.includes("diamond"))  return "#4F8CC9";
  if (r.includes("platinum")) return "#3FA89A";
  if (r.includes("gold"))     return "#C4943A";
  if (r.includes("silver"))   return "#8A9BAE";
  return "#4A5568";
};

/* ─────────────────────────────────────────────────────────────
   Profile
───────────────────────────────────────────────────────────── */
const Profile = () => {
  const player = playerStore((state) => state.player);
  const [coaches,   setCoaches]   = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/coach/coaches");
        const radiant = res.data.filter((c) => c.rank === "Radiant");
        console.log(player._id)
        setCoaches(radiant.slice(0, 3));
      } catch (err) {
        console.error("Error fetching coaches:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  const rc = rankColor(player?.rank || "");

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

      {/* ══════════════════════════════════════
          HERO — player identity block
      ══════════════════════════════════════ */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 overflow-hidden">

        {/* Blurred player banner as ambient background */}
        {player?.playerBanner && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url('${player.playerBanner}')`,
              filter: "blur(28px) brightness(0.08) saturate(0.3)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-[#07090D]/92" />

        {/* Rank-tinted ambient glow — unique per player rank */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at 70% 60%, ${rc}18 0%, transparent 70%)`,
          }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-b from-transparent to-[#07090D]" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-start">

            {/* ── LEFT ── */}
            <div className="flex-1 min-w-0">

              {/* Eyebrow */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-6 h-px bg-[#A01E2E]" />
                <span className="text-[10px] font-semibold uppercase text-[#A01E2E] tracking-[0.18em]">
                  Player Profile
                </span>
              </div>

              {/* Avatar + name */}
              <div className="flex items-center gap-4 sm:gap-5 mb-6">
                <div className="relative shrink-0">
                  <img
                    src={player?.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
                    alt={player?.fullname}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-white/10"
                  />
                  {/* Rank ring glow */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: `0 0 0 2px ${rc}55` }}
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h1 className="font-['Syne',sans-serif] font-extrabold text-[clamp(22px,5vw,40px)] tracking-tight text-white leading-none">
                      {player?.fullname}
                    </h1>
                    <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#A01E2E]/15 text-[#A01E2E] shrink-0">
                      <CheckIcon />
                    </span>
                  </div>
                  {/* Rank pill */}
                  <div className="inline-flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: rc }}
                    />
                    <span
                      className="text-[10.5px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: rc }}
                    >
                      {player?.rank || "Unranked"}
                    </span>
                    {player?.role && (
                      <>
                        <span className="text-white/20 mx-0.5">·</span>
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/30">
                          {player.role}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ── PLAYER STATS ── */}
              <div className="grid grid-cols-3 divide-x divide-white/[0.05] rounded-lg border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl mb-7">
                {[
                  { num: player?.gamesPlayed || "—", label: "Games Played" },
                  { num: player?.winRate     || "—", label: "Win Rate"     },
                  { num: player?.rank        || "—", label: "Current Rank" },
                ].map(({ num, label }) => (
                  <div key={label} className="flex flex-col gap-1.5 px-4 sm:px-6 py-4">
                    <span className="font-['Syne',sans-serif] font-extrabold text-base sm:text-lg text-white tracking-tight leading-none truncate">
                      {num}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 leading-none">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── ABOUT ── */}
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8 mb-6">
                <div className="w-5 h-px bg-[#A01E2E] mb-3" />
                <h2 className="text-base font-semibold text-white mb-3 tracking-tight">About Me</h2>
                <p className="text-sm text-white/50 leading-relaxed">
                  {player?.about || "Add a bio to let coaches know about your playstyle and goals."}
                </p>
              </div>

              {/* ── Hired coaches — mobile only ── */}
              <div className="lg:hidden mb-6">
                <SidePanel player={player} rc={rc} coaches={coaches} isLoading={isLoading} />
              </div>

              {/* ── TOP RADIANT COACHES ── */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-5 h-px bg-[#A01E2E]" />
                  <h2 className="text-base font-semibold text-white tracking-tight">Top Radiant Coaches</h2>
                </div>

                {isLoading ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-[68px] rounded-lg border border-white/[0.04] bg-white/[0.01] animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {coaches.map((coach, i) => (
                      <Link
                        key={coach._id}
                        to={`/coach-profile/${coach._id}`}
                        className="group flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.015] px-4 sm:px-5 py-3.5 transition-all duration-200 hover:border-[#A01E2E]/30 hover:bg-white/[0.03]"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Rank index */}
                          <span className="font-['Syne',sans-serif] font-extrabold text-[11px] text-white/15 w-4 shrink-0 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <img
                            src={coach.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
                            alt={coach.fullname}
                            className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors truncate">
                              {coach.fullname}
                            </p>
                            {coach.role && (
                              <p className="text-[10px] uppercase tracking-[0.12em] text-white/25 mt-0.5">
                                {coach.role}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#A01E2E]">
                            {coach.rank}
                          </span>
                          <span className="text-white/20 group-hover:text-[#A01E2E] transition-colors">
                            <ArrowIcon />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  to="/coaches"
                  className="mt-4 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/25 hover:text-[#A01E2E] transition-colors duration-200"
                >
                  Browse all coaches <ArrowIcon />
                </Link>
              </div>

            </div>

            {/* ── RIGHT — desktop sidebar ── */}
            <div className="hidden lg:block w-[300px] xl:w-[320px] shrink-0">
              <div className="sticky top-28">
                <SidePanel player={player} rc={rc} coaches={coaches} isLoading={isLoading} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/[0.04] mt-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex justify-between items-center gap-4 flex-wrap">
          <span className="font-['Syne',sans-serif] font-extrabold text-[12px] text-white tracking-[0.14em]">ELEVATE</span>
          <span className="text-[10px] sm:text-[11px] text-[#1E2830] tracking-[0.04em]">
            © {new Date().getFullYear()} Elevate · Not affiliated with Riot Games
          </span>
        </div>
      </div>

    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SidePanel — player card + hired coaches
───────────────────────────────────────────────────────────── */
const SidePanel = ({ player, rc, coaches, isLoading }) => (
  <div className="flex flex-col gap-4">

    {/* Player card */}
    <div className="relative rounded-xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-6 overflow-hidden">

      {/* Rank accent top line */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${rc}55, transparent)` }}
      />

      {/* Player banner thumbnail */}
      {player?.playerBanner && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: `url('${player.playerBanner}')` }}
        />
      )}

      <div className="relative">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: rc }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: rc }}>
            {player?.rank || "Unranked"}
          </span>
        </div>

        {/* Avatar */}
        <div className="relative w-14 h-14 mb-4">
          <img
            src={player?.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
            alt={player?.fullname}
            className="w-14 h-14 rounded-full object-cover border border-white/10"
          />
          <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 0 2px ${rc}44` }} />
        </div>

        {/* Name */}
        <p className="font-['Syne',sans-serif] font-extrabold text-xl text-white tracking-tight mb-1 leading-tight">
          {player?.fullname}
        </p>
        {player?.role && (
          <p className="text-[10.5px] text-white/30 uppercase tracking-[0.14em] mb-5">{player.role}</p>
        )}

        <div className="w-full h-px bg-white/[0.05] mb-5" />

        {/* Mini stats */}
        <div className="flex flex-col gap-3">
          {[
            { label: "Current Rank", value: player?.rank || "—" },
            { label: "Sessions Booked", value: player?.payed_coach?.length || "0" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-[10.5px] text-white/30 uppercase tracking-[0.12em]">{label}</span>
              <span className="text-[12px] font-semibold text-white/70">{value}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-white/[0.05] my-5" />

        {/* CTA — browse coaches */}
        <Link
          to="/coaches"
          className="block w-full text-center bg-[#A01E2E] hover:bg-[#8E1C2A] text-white text-[12.5px] font-semibold py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 tracking-[0.02em]"
        >
          Find a Coach
        </Link>
      </div>
    </div>

    {/* Hired coaches mini-list */}
    {player?.payed_coach?.length > 0 && (
      <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-5">
        <div className="w-5 h-px bg-[#A01E2E] mb-3" />
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40 mb-4">
          Your Coaches
        </h3>
        <div className="flex flex-col gap-2">
          {coaches.slice(0, 2).map((coach) => (
            <Link
              key={coach._id}
              to={`/coach-profile/${coach._id}`}
              className="flex items-center gap-3 group"
            >
              <img
                src={coach.profilePic}
                alt={coach.fullname}
                className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-white/60 group-hover:text-white transition-colors truncate">
                  {coach.fullname}
                </p>
                <p className="text-[9.5px] uppercase tracking-[0.12em] text-[#A01E2E]">{coach.rank}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}

  </div>
);

export default Profile;