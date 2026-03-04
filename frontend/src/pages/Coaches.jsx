import React, { useEffect, useState } from "react";
import CoachCard from "../components/CoachCard";
import { axiosInstance } from "../lib/axios";

const RANK_FILTERS = ["All", "Radiant", "Immortal", "Diamond", "Platinum"];
const ROLE_FILTERS = ["All Roles", "Duelist", "Controller", "Sentinel", "Initiator"];

const Loader = () => (
  <div className="flex justify-center py-24">
    <div className="text-center">
      <div className="mb-6 text-[10px] tracking-[0.18em] uppercase text-[#A01E2E]">
        Loading Coaches
      </div>
      <div className="relative w-[200px] h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-[#A01E2E] animate-pulse" />
      </div>
    </div>
  </div>
);

const Pill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.1em] border transition-all duration-150 cursor-pointer whitespace-nowrap
      ${active
        ? "bg-[#A01E2E] border-[#A01E2E] text-white"
        : "bg-transparent border-white/[0.055] text-white/40 hover:text-white hover:bg-white/5"
      }`}
  >
    {label}
  </button>
);

const Coaches = () => {
  const [coaches,     setCoaches]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [rankFilter,  setRankFilter]  = useState("All");
  const [roleFilter,  setRoleFilter]  = useState("All Roles");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/coach/coaches");
        setCoaches(res.data);
      } catch (err) {
        console.error("Error fetching coaches:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredCoaches = coaches.filter((c) => {
    const matchRank   = rankFilter === "All"       || c.rank?.toLowerCase().includes(rankFilter.toLowerCase());
    const matchRole   = roleFilter === "All Roles" || c.role?.toLowerCase().includes(roleFilter.toLowerCase());
    const matchSearch = !searchQuery
      || c.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
      || c.about?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRank && matchRole && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#07090D] font-['DM_Sans',system-ui,sans-serif] antialiased text-white relative">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.024]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "160px",
        }}
      />

      <section className="relative flex flex-col justify-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10">

        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/5c/77/b4/5c77b498d943184c08da0b6d9dc174aa.jpg')",
            filter: "blur(20px) brightness(0.055) saturate(0.12) grayscale(0.55)",
          }}
        />
        <div className="absolute inset-0 bg-[#07090D]/96" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 36% 58%, rgba(255,255,255,0.038) 0%, transparent 68%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[140px] sm:h-[180px] bg-gradient-to-b from-transparent via-[#07090D]/80 to-[#07090D]" />

        {/* Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 w-full">

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-5 sm:mb-7 animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.08s_forwards] opacity-0">
            <span className="block w-5 h-px bg-[#A01E2E]" />
            <span className="text-[10px] font-semibold uppercase text-[#A01E2E] tracking-[0.18em]">
              Coaching Roster
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-['Syne',sans-serif] font-extrabold leading-[0.97] tracking-tight mb-4 sm:mb-5 animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.20s_forwards] opacity-0">
            <span className="block text-[clamp(30px,7vw,58px)] text-white/80">Find your</span>
            <span className="block text-[clamp(38px,8.5vw,70px)] text-white">Radiant</span>
            <span className="block text-[clamp(38px,8.5vw,70px)] text-[#A01E2E]">coach.</span>
          </h1>

          {/* Sub */}
          <p className="text-[#5A6680] text-[13px] sm:text-[14px] leading-[1.74] max-w-[390px] mb-0 font-normal animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.32s_forwards] opacity-0">
            Every coach holds Radiant or high Immortal rank.
            Structured sessions, agent-specific feedback, measurable progress.
          </p>

        </div>
      </section>

      <section className="pt-8 sm:pt-12 pb-20 sm:pb-24">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12">

          {/* Section label */}
          <div className="mb-4 sm:mb-5">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="block w-5 h-px bg-[#A01E2E]" />
              <span className="text-[10px] font-semibold uppercase text-[#A01E2E] tracking-[0.18em]">
                Coach Roster
              </span>
            </div>
            <p className="text-[12px] text-[#2A3448] tracking-[0.02em] m-0">
              Verified Radiant and Immortal talent.
            </p>
          </div>

          <div className="relative rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-4 sm:p-5 flex flex-col gap-3 mb-5 sm:mb-6">

            {/* Accent top line */}
            <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/40 to-transparent" />

            {/* Row 1 — Rank pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="text-[9.5px] font-semibold uppercase text-[#252E3A] tracking-[0.16em] mr-1 shrink-0">Rank</span>
              {RANK_FILTERS.map((r) => (
                <Pill key={r} label={r} active={rankFilter === r} onClick={() => setRankFilter(r)} />
              ))}
            </div>

            {/* Row 2 — Role pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="text-[9.5px] font-semibold uppercase text-[#252E3A] tracking-[0.16em] mr-1 shrink-0">Role</span>
              {ROLE_FILTERS.map((r) => (
                <Pill key={r} label={r === "All Roles" ? "All" : r} active={roleFilter === r} onClick={() => setRoleFilter(r)} />
              ))}
            </div>

            {/* Row 3 — Search + count */}
            <div className="flex items-center gap-3 pt-1 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 bg-white/[0.025] border border-white/[0.055] rounded-lg px-3 py-[7px] focus-within:border-white/[0.12] transition-colors duration-200 flex-1 min-w-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2A3848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  className="bg-transparent border-none outline-none text-[#8A96A6] text-[12px] w-full min-w-0 placeholder:text-[#252E3A] font-['DM_Sans',sans-serif]"
                  placeholder="Search coaches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="text-[10px] text-[#252E3A] uppercase tracking-[0.12em] whitespace-nowrap shrink-0">
                {filteredCoaches.length} coach{filteredCoaches.length !== 1 ? "es" : ""}
              </span>
            </div>
          </div>

          {/* ── Coach Grid or Loader ── */}
          {loading ? (
            <Loader />
          ) : filteredCoaches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-5">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#1E2830] animate-pulse text-center">
                No coaches match your filters
              </span>
              <button
                className="bg-white/[0.016] border border-white/[0.07] text-[#485160] px-[22px] py-[9px] rounded-[6px] text-[12.5px] font-medium cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.13] hover:text-[#7A8694]"
                onClick={() => { setRankFilter("All"); setRoleFilter("All Roles"); setSearchQuery(""); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            /* 1 col on mobile → 2 col at sm → auto-fill ≥340px on lg+ */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-3.5 sm:gap-[18px]">
              {filteredCoaches.map((coach, i) => (
                <div
                  key={coach._id}
                  className="opacity-0 translate-y-3 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{ animationDelay: `${Math.min(i * 40, 320)}ms` }}
                >
                  <CoachCard
                    link={`/coach-profile/${coach._id}`}
                    about={coach.about}
                    fullname={coach.fullname}
                    coachBanner={coach.coachBanner}
                    rate={coach.rate}
                    rank={coach.rank}
                    role={coach.role}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-white/[0.045]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex justify-between items-center gap-4 flex-wrap">
          <span className="font-['Syne',sans-serif] font-extrabold text-[12px] text-white tracking-[0.14em]">
            ELEVATE
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#1E2830] tracking-[0.04em]">
            © {new Date().getFullYear()} Elevate · Not affiliated with Riot Games
          </span>
        </div>
      </div>

    </div>
  );
};

export default Coaches;