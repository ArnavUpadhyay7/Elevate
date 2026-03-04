import React, { useState } from "react";
import { Link } from "react-router-dom";

const rankToken = (rank = "") => {
  const r = rank.toLowerCase();
  if (r.includes("radiant"))  return { color: "#A01E2E", dot: true  };
  if (r.includes("immortal")) return { color: "#4A5A6C", dot: false };
  if (r.includes("diamond"))  return { color: "#3E5062", dot: false };
  if (r.includes("platinum")) return { color: "#364858", dot: false };
  return                             { color: "#2E3A48", dot: false };
};

let _injected = false;
const injectStyles = () => {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const el = document.createElement("style");
  el.textContent = `
    /* ── Shell ── */
    .elv-card {
      display: block;
      text-decoration: none;
      background: #0B1017;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      transition:
        transform    0.32s cubic-bezier(0.16,1,0.3,1),
        box-shadow   0.32s cubic-bezier(0.16,1,0.3,1),
        background   0.32s cubic-bezier(0.16,1,0.3,1),
        border-color 0.32s cubic-bezier(0.16,1,0.3,1);
      will-change: transform;
    }
    .elv-card:hover {
      transform: translateY(-3px);
      background: linear-gradient(160deg, #0F151F 0%, #0C1118 100%);
      border-color: rgba(255,255,255,0.09);
      box-shadow: 0 14px 44px rgba(0,0,0,0.52), 0 1px 0 rgba(255,255,255,0.04);
    }
    /* Top accent line — reveals on hover */
    .elv-card::before {
      content: '';
      position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(160,30,46,0.38), transparent);
      opacity: 0; transform: scaleX(0.3); transform-origin: center;
      transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1);
    }
    .elv-card:hover::before { opacity: 1; transform: scaleX(1); }

    /* ── Image block ── */
    .elv-card-img-wrap {
      position: relative;
      height: 178px;
      overflow: hidden;
    }
    .elv-card-img {
      width: 100%; height: 100%;
      object-fit: cover; display: block;
      filter: saturate(0.82) brightness(0.94);
      transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), filter 0.45s ease;
    }
    .elv-card:hover .elv-card-img {
      transform: scale(1.03);
      filter: saturate(0.88) brightness(0.9);
    }
    /* Image → card body dissolve */
    .elv-card-img-fade {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(to bottom, transparent 44%, rgba(11,16,23,0.94) 100%);
    }

    /* ── Rank badge ── */
    .elv-rank-badge {
      position: absolute; top: 10px; left: 10px;
      display: flex; align-items: center; gap: 5px;
      background: rgba(7,9,13,0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 9px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.18em;
      line-height: 1;
    }
    .elv-rank-dot {
      display: block; width: 5px; height: 5px; border-radius: 50%;
      background: #A01E2E; flex-shrink: 0;
    }

    /* ── Role badge ── */
    .elv-role-badge {
      position: absolute; top: 10px; right: 10px;
      background: rgba(7,9,13,0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.055);
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 9px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.14em;
      color: #364858; line-height: 1;
    }

    /* ── Card body ── */
    .elv-card-body {
      padding: 15px 17px 17px;
    }

    /* ── Name row ── */
    .elv-name-row {
      display: flex; justify-content: space-between;
      align-items: flex-start; gap: 10px;
      margin-bottom: 7px;
    }
    .elv-name-left {
      display: flex; align-items: center; gap: 7px;
      min-width: 0;
    }
    .elv-coach-name {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 16px; color: white;
      letter-spacing: -0.018em; line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    /* Verified tick — muted, not neon */
    .elv-verified {
      display: flex; align-items: center; justify-content: center;
      width: 16px; height: 16px; border-radius: 50%;
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.28);
      flex-shrink: 0;
      transition: background 0.22s ease, color 0.22s ease;
    }
    .elv-card:hover .elv-verified {
      background: rgba(160,30,46,0.18); color: #A01E2E;
    }

    /* ── Rate ── */
    .elv-rate {
      display: flex; align-items: baseline; gap: 2px;
      flex-shrink: 0;
    }
    .elv-rate-num {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 14px; color: white; letter-spacing: -0.02em;
    }
    .elv-rate-unit {
      font-size: 10px; color: #2E3848; font-weight: 400;
    }

    /* ── Meta tags ── */
    .elv-meta-row {
      display: flex; align-items: center; gap: 6px;
      margin-bottom: 11px;
    }
    .elv-meta-tag {
      font-size: 9.5px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.15em;
      line-height: 1;
    }
    .elv-meta-sep { color: #1E2830; font-size: 10px; }

    /* ── Bio ── */
    .elv-bio {
      font-size: 12.5px; color: #364858;
      line-height: 1.7; margin: 0 0 14px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* ── Footer CTA ── */
    .elv-card-footer {
      display: flex; align-items: center; gap: 6px;
      padding-top: 13px;
      border-top: 1px solid rgba(255,255,255,0.04);
    }
    .elv-view-label {
      font-size: 10.5px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.14em;
      color: #28323E;
      transition: color 0.22s ease;
    }
    .elv-view-arrow {
      display: flex; align-items: center;
      color: #28323E;
      transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), color 0.22s ease;
    }
    .elv-card:hover .elv-view-label { color: #A01E2E; }
    .elv-card:hover .elv-view-arrow { transform: translateX(4px); color: #A01E2E; }
  `;
  document.head.appendChild(el);
};

const CoachCard = ({ link, fullname, coachBanner, about, rate, rank, role }) => {
  injectStyles();
  const rk = rankToken(rank);

  return (
    <Link to={link} className="elv-card">

      {/* ── IMAGE ── */}
      <div className="elv-card-img-wrap">
        <img
          className="elv-card-img"
          src={coachBanner || "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"}
          alt={fullname ? `${fullname} banner` : "Coach banner"}
        />
        <div className="elv-card-img-fade" />

        {/* Rank badge — top left */}
        {rank && (
          <div className="elv-rank-badge" style={{ color: rk.color }}>
            {rk.dot && <span className="elv-rank-dot" />}
            {rank}
          </div>
        )}

        {/* Role badge — top right */}
        {role && (
          <div className="elv-role-badge">{role}</div>
        )}
      </div>

      {/* ── BODY ── */}
      <div className="elv-card-body">

        {/* Name + rate */}
        <div className="elv-name-row">
          <div className="elv-name-left">
            <span className="elv-coach-name">{fullname}</span>
            <span className="elv-verified" title="Verified coach">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </div>
          <div className="elv-rate">
            <span className="elv-rate-num">{rate}</span>
            <span className="elv-rate-unit">/session</span>
          </div>
        </div>

        {/* Rank · Role meta */}
        <div className="elv-meta-row">
          {rank && <span className="elv-meta-tag" style={{ color: rk.color }}>{rank}</span>}
          {rank && role && <span className="elv-meta-sep">·</span>}
          {role && <span className="elv-meta-tag" style={{ color: "#36485A" }}>{role}</span>}
        </div>

        {/* Bio */}
        {about && <p className="elv-bio">{about}</p>}

        {/* CTA footer */}
        <div className="elv-card-footer">
          <span className="elv-view-label">View profile</span>
          <span className="elv-view-arrow">
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