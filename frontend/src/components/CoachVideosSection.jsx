import React, { useState, useRef, useEffect, useCallback } from "react";
import { coachStore } from "../store/authStore";
import { uploadGameplayVideo, deleteGameplayVideo } from "../api/coachVideoApi";
import { toast } from "react-hot-toast";

/* ─────────────────────────────────────────────────────────────
   Icons
───────────────────────────────────────────────────────────── */
const UploadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
);
const PlayIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="none">
    <polygon points="6 3 20 12 6 21 6 3"/>
  </svg>
);
const PauseIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" stroke="none">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ExpandIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
  </svg>
);
const VolumeIcon = ({ muted }) => muted ? (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
) : (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const useVideoPlayer = (videoRef) => {
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted,    setMuted]    = useState(false);
  const [duration, setDuration] = useState(0);
  const [current,  setCurrent]  = useState(0);

  const toggle = useCallback(() => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else         { videoRef.current.play();  setPlaying(true);  }
  }, [playing, videoRef]);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    setProgress(pct);
    setCurrent(v.currentTime);
  }, [videoRef]);

  const onLoadedMetadata = useCallback(() => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  }, [videoRef]);

  const onEnded = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    setCurrent(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
  }, [videoRef]);

  const seek = useCallback((pct) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = (pct / 100) * v.duration;
    setProgress(pct);
  }, [videoRef]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(m => !m);
  }, [muted, videoRef]);

  const reset = useCallback(() => {
    setPlaying(false);
    setProgress(0);
    setCurrent(0);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [videoRef]);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return { playing, progress, muted, duration, current, toggle, onTimeUpdate, onLoadedMetadata, onEnded, seek, toggleMute, reset, fmt };
};

const FullscreenOverlay = ({ video, index, total, onClose, onPrev, onNext, onDelete }) => {
  const videoRef = useRef(null);
  const { playing, progress, muted, current, duration, toggle, onTimeUpdate, onLoadedMetadata, onEnded, seek, toggleMute, fmt } = useVideoPlayer(videoRef);
  const [confirm, setConfirm] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef(null);

  // Auto-play when overlay opens
  useEffect(() => {
    const t = setTimeout(() => {
      if (videoRef.current) { videoRef.current.play().catch(() => {}); }
    }, 80);
    return () => clearTimeout(t);
  }, [video._id]);

  // Close on Escape, navigate with arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  onNext();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === " ")           { e.preventDefault(); toggle(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev, toggle]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Hide controls after inactivity
  const nudgeControls = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2800);
  };

  const handleSeekClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(3,4,6,0.96)", backdropFilter: "blur(32px) saturate(160%)", WebkitBackdropFilter: "blur(32px) saturate(160%)" }}
      onMouseMove={nudgeControls}
    >
      {/* ── Ambient light — bleeds color from the video ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(160,30,46,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Top bar ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 px-6 py-5 flex items-center justify-between"
        style={{
          background: "linear-gradient(to bottom, rgba(3,4,6,0.85) 0%, transparent 100%)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{
            fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em",
            color: "#A01E2E", background: "rgba(160,30,46,0.12)", border: "1px solid rgba(160,30,46,0.2)",
            borderRadius: 4, padding: "3px 8px",
          }}>
            Clip {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif" }}>
            {video.originalName || `gameplay_clip_${index + 1}.mp4`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Delete with confirm */}
          {confirm ? (
            <div className="flex items-center gap-3">
              <button onClick={() => { onDelete(video._id); onClose(); setConfirm(false); }}
                style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", fontFamily: "DM Sans, sans-serif",
                  background: "none", border: "none", cursor: "pointer" }}>
                Confirm delete
              </button>
              <button onClick={() => setConfirm(false)}
                style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "DM Sans, sans-serif",
                  background: "none", border: "none", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirm(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6, fontSize: 11,
                color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif",
                background: "none", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 6, padding: "5px 10px", cursor: "pointer",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              <TrashIcon /> Delete
            </button>
          )}

          {/* Close */}
          <button onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)", cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* ── Video ── */}
      <div
        style={{ position: "relative", width: "min(88vw, 1080px)", cursor: "pointer" }}
        onClick={toggle}
      >
        <video
          ref={videoRef}
          src={video.url}
          style={{
            width: "100%",
            maxHeight: "72vh",
            objectFit: "contain",
            display: "block",
            borderRadius: 10,
          }}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
        />

        {/* Centered play/pause — shows on pause or hover */}
        <div
          style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            opacity: playing ? 0 : 1,
            transition: "opacity 0.2s ease",
            pointerEvents: playing ? "none" : "auto",
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <PlayIcon size={22} />
          </div>
        </div>
      </div>

      {/* ── Bottom controls ── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 32px 28px",
          background: "linear-gradient(to top, rgba(3,4,6,0.92) 0%, transparent 100%)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Seekbar */}
        <div
          style={{
            width: "100%", height: 3, background: "rgba(255,255,255,0.08)",
            borderRadius: 4, cursor: "pointer", marginBottom: 16,
            position: "relative", overflow: "visible",
          }}
          onClick={handleSeekClick}
        >
          {/* Filled track */}
          <div style={{
            position: "absolute", inset: "0 auto 0 0",
            width: `${progress}%`,
            background: "#A01E2E",
            borderRadius: 4,
            transition: "width 0.1s linear",
          }} />
          {/* Thumb */}
          <div style={{
            position: "absolute", top: "50%", left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: 10, height: 10, borderRadius: "50%",
            background: "white",
            boxShadow: "0 0 0 2px rgba(160,30,46,0.4)",
          }} />
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Left: prev/play/next + time */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Prev */}
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
              style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)", cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              <ChevronLeft />
            </button>

            {/* Play/Pause */}
            <button onClick={(e) => { e.stopPropagation(); toggle(); }}
              style={{
                width: 40, height: 40, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "#A01E2E", border: "none",
                color: "white", cursor: "pointer",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              {playing ? <PauseIcon size={15} /> : <PlayIcon size={14} />}
            </button>

            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); onNext(); }}
              style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)", cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              <ChevronRight />
            </button>

            {/* Time */}
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.02em" }}>
              {fmt(current)} / {fmt(duration)}
            </span>
          </div>

          {/* Right: mute + clip counter */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              style={{
                width: 30, height: 30, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.4)", cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              <VolumeIcon muted={muted} />
            </button>

            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "DM Sans, sans-serif" }}>
              {index + 1} / {total}
            </span>
          </div>
        </div>
      </div>

      {/* ── Edge nav areas (large click targets) ── */}
      <button
        onClick={onPrev}
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "12%",
          background: "transparent", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "flex-start",
          paddingLeft: 20, opacity: 0,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "0"; }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white",
        }}>
          <ChevronLeft />
        </div>
      </button>
      <button
        onClick={onNext}
        style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "12%",
          background: "transparent", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          paddingRight: 20, opacity: 0,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "0"; }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white",
        }}>
          <ChevronRight />
        </div>
      </button>
    </div>
  );
};

const CarouselThumb = ({ video, index, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        border: isActive
          ? "1px solid #A01E2E"
          : "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
        width: 120,
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        transform: isActive ? "translateY(-2px)" : hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: isActive ? "0 4px 20px rgba(160,30,46,0.25)" : "none",
      }}
    >
      {/* Top accent line — only on active */}
      {isActive && (
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(160,30,46,0.7), transparent)",
          zIndex: 3,
        }} />
      )}

      {/* Thumbnail — 16:9 */}
      <div style={{ position: "relative", paddingBottom: "56.25%", background: "#080C10" }}>
        <video
          src={video.url}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover",
            filter: isActive ? "saturate(0.95) brightness(0.9)" : "saturate(0.7) brightness(0.55)",
            transition: "filter 0.25s ease",
          }}
          muted preload="metadata"
        />

        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: isActive ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.52)",
          transition: "background 0.25s ease",
        }} />

        {/* Clip badge */}
        <div style={{
          position: "absolute", top: 5, left: 5, zIndex: 2,
          fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em",
          color: isActive ? "#A01E2E" : "rgba(255,255,255,0.35)",
          background: "rgba(0,0,0,0.65)", borderRadius: 3, padding: "2px 5px",
          fontFamily: "DM Sans, sans-serif",
          transition: "color 0.2s ease",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Play icon — center */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          opacity: isActive ? 1 : hovered ? 0.7 : 0.35,
          transition: "opacity 0.2s ease",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: isActive ? "rgba(160,30,46,0.25)" : "rgba(255,255,255,0.08)",
            border: `1px solid ${isActive ? "rgba(160,30,46,0.4)" : "rgba(255,255,255,0.15)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
          }}>
            <PlayIcon size={10} />
          </div>
        </div>
      </div>

      {/* Filename strip */}
      <div style={{
        padding: "5px 7px",
        background: isActive ? "rgba(160,30,46,0.08)" : "rgba(8,12,16,0.9)",
        transition: "background 0.2s ease",
      }}>
        <p style={{
          fontSize: 9, color: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)",
          margin: 0, fontFamily: "DM Sans, sans-serif",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          transition: "color 0.2s ease",
        }}>
          {video.originalName || `clip_${index + 1}.mp4`}
        </p>
      </div>
    </div>
  );
};

const MainVideoStage = ({ video, index, total, onExpand, onDelete }) => {
  const videoRef = useRef(null);
  const { playing, progress, muted, current, duration, toggle, onTimeUpdate, onLoadedMetadata, onEnded, seek, toggleMute, fmt } = useVideoPlayer(videoRef);
  const [confirm, setConfirm] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef(null);

  const nudge = () => {
    setControlsVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setControlsVisible(false);
    }, 2500);
  };

  // Reset on clip change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [video._id]);

  const handleSeekClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div
      style={{ position: "relative", borderRadius: 10, overflow: "hidden", background: "#050709" }}
      onMouseMove={nudge}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(160,30,46,0.4), transparent)",
        zIndex: 5, pointerEvents: "none",
      }} />

      {/* Video */}
      <div style={{ position: "relative", paddingBottom: "56.25%", cursor: "pointer" }} onClick={toggle}>
        <video
          ref={videoRef}
          src={video.url}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
        />

        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.7) 100%)",
        }} />

        {/* Big play button — shows when paused */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.22s ease",
          pointerEvents: playing ? "none" : "auto",
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.16)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <PlayIcon size={22} />
          </div>
        </div>

        {/* Clip label — top left */}
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 4,
          fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em",
          color: "#A01E2E", background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(160,30,46,0.25)",
          borderRadius: 4, padding: "3px 8px",
          fontFamily: "DM Sans, sans-serif",
        }}>
          Clip {String(index + 1).padStart(2, "0")}
        </div>

        {/* Expand + counter — top right */}
        <div style={{
          position: "absolute", top: 10, right: 10, zIndex: 4,
          display: "flex", alignItems: "center", gap: 8,
          opacity: controlsVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}>
          <span style={{
            fontSize: 9.5, color: "rgba(255,255,255,0.3)",
            fontFamily: "DM Sans, sans-serif", letterSpacing: "0.1em",
          }}>
            {index + 1} / {total}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onExpand(); }}
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.45)", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            <ExpandIcon />
          </button>
        </div>
      </div>

      {/* ── Controls bar (bottom) ── */}
      <div style={{
        padding: "10px 14px 12px",
        background: "#050709",
        opacity: controlsVisible ? 1 : 0.7,
        transition: "opacity 0.25s ease",
      }}>
        {/* Seek bar */}
        <div
          style={{
            height: 3, background: "rgba(255,255,255,0.07)",
            borderRadius: 4, cursor: "pointer", marginBottom: 10,
            position: "relative",
          }}
          onClick={handleSeekClick}
        >
          <div style={{
            position: "absolute", inset: "0 auto 0 0",
            width: `${progress}%`,
            background: "#A01E2E", borderRadius: 4,
            transition: "width 0.1s linear",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: 9, height: 9, borderRadius: "50%",
            background: "white", boxShadow: "0 0 0 2px rgba(160,30,46,0.35)",
          }} />
        </div>

        {/* Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Play/Pause */}
            <button
              onClick={(e) => { e.stopPropagation(); toggle(); }}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "#A01E2E", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {playing ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
            </button>

            {/* Mute */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleMute(); }}
              style={{
                width: 26, height: 26, borderRadius: "50%",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.35)", cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              <VolumeIcon muted={muted} />
            </button>

            {/* Time */}
            <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.28)", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.02em" }}>
              {fmt(current)} / {fmt(duration)}
            </span>
          </div>

          {/* Right: filename + delete */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "DM Sans, sans-serif", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {video.originalName || `gameplay_clip_${index + 1}.mp4`}
            </span>
            {confirm ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => { onDelete(video._id); setConfirm(false); }}
                  style={{ fontSize: 10.5, fontWeight: 600, color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                  Confirm
                </button>
                <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
                <button onClick={() => setConfirm(false)}
                  style={{ fontSize: 10.5, color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirm(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 5, fontSize: 10.5,
                  color: "rgba(255,255,255,0.18)", background: "none", border: "none",
                  cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.18)"}
              >
                <TrashIcon /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadZone = ({ uploading, onUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [pct, setPct] = useState(0);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file, setPct);
  };

  return (
    <div
      style={{
        borderRadius: 10, border: `2px dashed ${dragging ? "rgba(160,30,46,0.45)" : "rgba(255,255,255,0.07)"}`,
        background: dragging ? "rgba(160,30,46,0.04)" : "rgba(255,255,255,0.01)",
        cursor: uploading ? "default" : "pointer",
        transition: "border-color 0.2s ease, background 0.2s ease",
      }}
      onClick={() => !uploading && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" accept="video/*"
        onChange={e => onUpload(e.target.files[0], setPct)}
        disabled={uploading} style={{ display: "none" }} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 16px", gap: 12, textAlign: "center" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          border: `1px solid ${dragging ? "rgba(160,30,46,0.4)" : "rgba(255,255,255,0.07)"}`,
          background: dragging ? "rgba(160,30,46,0.08)" : "rgba(255,255,255,0.025)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: dragging ? "#A01E2E" : "rgba(255,255,255,0.22)",
          transition: "all 0.2s ease",
        }}>
          {uploading
            ? <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.15)", borderTopColor: "#A01E2E", animation: "elvSpin 0.9s linear infinite" }} />
            : <UploadIcon />}
        </div>

        {uploading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <p style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.45)", margin: 0, fontFamily: "DM Sans, sans-serif" }}>Uploading…</p>
            <div style={{ width: 120, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#A01E2E", borderRadius: 2, transition: "width 0.3s ease" }} />
            </div>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", margin: 0, fontFamily: "DM Sans, sans-serif" }}>{pct}%</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.45)", margin: "0 0 3px", fontFamily: "DM Sans, sans-serif" }}>
              {dragging ? "Drop it here" : "Drop video or click to browse"}
            </p>
            <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.2)", margin: 0, fontFamily: "DM Sans, sans-serif" }}>
              MP4, MOV, WebM · Max 200MB
            </p>
          </div>
        )}
      </div>
      <style>{`@keyframes elvSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const CoachVideosSection = () => {
  const coach             = coachStore((state) => state.coach);
  const setGameplayVideos = coachStore((state) => state.setGameplayVideos);
  const [uploading,    setUploading]    = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [overlayOpen,  setOverlayOpen]  = useState(false);

  const videos = coach?.gameplayVideos || [];
  const MAX    = 3;
  const active = videos[activeIndex] || null;

  // Keep activeIndex in bounds when videos change
  useEffect(() => {
    if (activeIndex >= videos.length && videos.length > 0) {
      setActiveIndex(videos.length - 1);
    }
  }, [videos.length, activeIndex]);

  const goNext = useCallback(() => setActiveIndex(i => (i + 1) % videos.length), [videos.length]);
  const goPrev = useCallback(() => setActiveIndex(i => (i - 1 + videos.length) % videos.length), [videos.length]);

  const handleUpload = async (file, onProgress) => {
    if (!file) return;
    if (videos.length >= MAX) { toast.error("Maximum 3 videos allowed"); return; }
    try {
      setUploading(true);
      const data = await uploadGameplayVideo(file, onProgress);
      setGameplayVideos(data.videos);
      toast.success("Video uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      const data = await deleteGameplayVideo(videoId);
      setGameplayVideos(data.videos);
      toast.success("Video deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      {/* ── Fullscreen overlay ── */}
      {overlayOpen && active && (
        <FullscreenOverlay
          video={active}
          index={activeIndex}
          total={videos.length}
          onClose={() => setOverlayOpen(false)}
          onNext={goNext}
          onPrev={goPrev}
          onDelete={handleDelete}
        />
      )}

      {/* ── Section panel ── */}
      <div style={{
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.015)",
        padding: "24px 24px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle top accent */}
        <div style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(160,30,46,0.3), transparent)",
        }} />

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ width: 20, height: 1, background: "#A01E2E", marginBottom: 12 }} />
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "white", margin: "0 0 4px", letterSpacing: "-0.01em", fontFamily: "DM Sans, sans-serif" }}>
              Gameplay Clips
            </h2>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0, fontFamily: "DM Sans, sans-serif" }}>
              Showcase your skill level to potential students.
            </p>
          </div>

          {/* Slot indicator dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            {Array.from({ length: MAX }).map((_, i) => (
              <div key={i} style={{
                width: 7, height: 7, borderRadius: "50%",
                background: i < videos.length ? "#A01E2E" : "rgba(255,255,255,0.08)",
                transition: "background 0.3s ease",
              }} />
            ))}
            <span style={{ marginLeft: 6, fontSize: 9.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.22)", fontFamily: "DM Sans, sans-serif" }}>
              {videos.length}/{MAX}
            </span>
          </div>
        </div>

        {/* ── Main stage + carousel ── */}
        {videos.length > 0 && active && (
          <div style={{ marginBottom: videos.length < MAX ? 16 : 0 }}>

            {/* Main featured player */}
            <MainVideoStage
              key={active._id}
              video={active}
              index={activeIndex}
              total={videos.length}
              onExpand={() => setOverlayOpen(true)}
              onDelete={(id) => {
                handleDelete(id);
                setOverlayOpen(false);
              }}
            />

            {/* Carousel strip — only if more than 1 video */}
            {videos.length > 1 && (
              <div style={{ marginTop: 12 }}>
                {/* Nav row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif" }}>
                    All clips
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={goPrev}
                      style={{
                        width: 26, height: 26, borderRadius: 6,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.35)", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                    >
                      <ChevronLeft />
                    </button>
                    <button onClick={goNext}
                      style={{
                        width: 26, height: 26, borderRadius: 6,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.35)", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>

                {/* Thumbnail strip */}
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
                  {videos.map((v, i) => (
                    <CarouselThumb
                      key={v._id}
                      video={v}
                      index={i}
                      isActive={i === activeIndex}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>

                {/* Pip indicator */}
                <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 10 }}>
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      style={{
                        width: i === activeIndex ? 18 : 5,
                        height: 3, borderRadius: 3,
                        background: i === activeIndex ? "#A01E2E" : "rgba(255,255,255,0.12)",
                        border: "none", cursor: "pointer", padding: 0,
                        transition: "width 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Upload zone ── */}
        {videos.length < MAX && (
          <UploadZone uploading={uploading} onUpload={handleUpload} />
        )}

        {/* ── All slots filled ── */}
        {videos.length >= MAX && (
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: "DM Sans, sans-serif" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
            All 3 slots used. Delete a clip to upload a new one.
          </div>
        )}
      </div>
    </>
  );
};

export default CoachVideosSection;