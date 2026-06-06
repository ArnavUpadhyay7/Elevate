import React from "react";
import { Link } from "react-router-dom";

const rankToken = (rank = "") => {
  const r = rank.toLowerCase();
  if (r.includes("radiant")) return { color: "text-[#A01E2E]", dot: true };
  if (r.includes("immortal")) return { color: "text-[#4A5A6C]", dot: false };
  if (r.includes("diamond")) return { color: "text-[#3E5062]", dot: false };
  if (r.includes("platinum")) return { color: "text-[#364858]", dot: false };
  return { color: "text-[#2E3A48]", dot: false };
};

const CoachCard = ({ link, fullname, coachBanner, about, rate, rank, role }) => {
  const rk = rankToken(rank);

  return (
    <Link
      to={link}
      className="group relative block overflow-hidden rounded-[10px] border border-white/[0.05] bg-[var(--elv-bg-elevated)] font-sans antialiased no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform before:absolute before:left-[8%] before:right-[8%] before:top-0 before:h-px before:origin-center before:scale-x-[0.3] before:bg-gradient-to-r before:from-transparent before:via-[#A01E2E]/40 before:to-transparent before:opacity-0 before:transition-all before:duration-300 hover:-translate-y-[3px] hover:border-white/[0.09] hover:bg-[linear-gradient(160deg,#0F151F_0%,#0C1118_100%)] hover:shadow-[0_14px_44px_rgba(0,0,0,0.52),0_1px_0_rgba(255,255,255,0.04)] hover:before:scale-x-100 hover:before:opacity-100"
    >
      <div className="relative h-[178px] overflow-hidden">
        <img
          className="block h-full w-full object-cover brightness-[0.94] saturate-[0.82] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:brightness-90 group-hover:saturate-[0.88]"
          src={coachBanner || "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"}
          alt={fullname ? `${fullname} banner` : "Coach banner"}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-[44%] to-[var(--elv-bg-elevated)]/95" />

        {rank && (
          <div className={`absolute left-2.5 top-2.5 flex items-center gap-[5px] rounded border border-white/[0.06] bg-[var(--elv-bg)]/75 px-2 py-[3px] text-[9px] font-bold uppercase leading-none tracking-[0.18em] backdrop-blur ${rk.color}`}>
            {rk.dot && <span className="block h-[5px] w-[5px] shrink-0 rounded-full bg-[#A01E2E]" />}
            {rank}
          </div>
        )}

        {role && (
          <div className="absolute right-2.5 top-2.5 rounded border border-white/[0.055] bg-[var(--elv-bg)]/75 px-2 py-[3px] text-[9px] font-semibold uppercase leading-none tracking-[0.14em] text-[#364858] backdrop-blur">
            {role}
          </div>
        )}
      </div>

      <div className="px-[17px] pb-[17px] pt-[15px]">
        <div className="mb-[7px] flex items-start justify-between gap-2.5">
          <div className="flex min-w-0 items-center gap-[7px]">
            <span className="truncate font-syne text-base font-bold leading-[1.2] tracking-[0] text-white">
              {fullname}
            </span>
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/30 transition-colors duration-200 group-hover:bg-[#A01E2E]/20 group-hover:text-[#A01E2E]"
              title="Verified coach"
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </div>
          <div className="flex shrink-0 items-baseline gap-0.5">
            <span className="font-syne text-sm font-extrabold tracking-[0] text-white">{rate}</span>
            <span className="text-[10px] font-normal text-[#2E3848]">/session</span>
          </div>
        </div>

        <div className="mb-[11px] flex items-center gap-1.5">
          {rank && <span className={`text-[9.5px] font-semibold uppercase leading-none tracking-[0.15em] ${rk.color}`}>{rank}</span>}
          {rank && role && <span className="text-[10px] text-[#1E2830]">·</span>}
          {role && <span className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.15em] text-[#36485A]">{role}</span>}
        </div>

        {about && (
          <p className="mb-3.5 line-clamp-3 overflow-hidden text-[12.5px] leading-[1.7] text-[#364858]">
            {about}
          </p>
        )}

        <div className="flex items-center gap-1.5 border-t border-white/[0.04] pt-[13px]">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#28323E] transition-colors duration-200 group-hover:text-[#A01E2E]">
            View profile
          </span>
          <span className="flex items-center text-[#28323E] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[#A01E2E]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CoachCard;
