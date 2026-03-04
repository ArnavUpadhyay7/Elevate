import React, { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

/* ─────────────────────────────────────────────────────────────
   UploadModal
   
   Upload flow (mirrors your existing uploadGameplayVideo pattern):
   
   For each file:
     1. POST /reviews/upload-video   (multipart, field: "video")
        → { url: "https://res.cloudinary.com/..." }
   
   Then once all files are uploaded:
     2. POST /reviews/upload
        → { reviewId, vods: [url1, url2, ...] }
   
   Props:
     review   — full review object (._id, .coach)
     onClose  — () => void
     onSuccess — (updatedReview) => void
───────────────────────────────────────────────────────────── */

const MAX_CLIPS = 3;

const formatBytes = (b) =>
  b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

/* Generate a video thumbnail + duration from a File object */
const useVideoMeta = (file) => {
  const [thumb,    setThumb]    = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const vid  = document.createElement("video");
    vid.preload = "metadata";
    vid.muted   = true;
    vid.src     = url;

    vid.onloadedmetadata = () => {
      const secs = vid.duration;
      if (!isNaN(secs)) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        setDuration(`${m}:${String(s).padStart(2, "0")}`);
      }
      vid.currentTime = 0.5;
    };

    vid.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width  = 320;
      canvas.height = 180;
      canvas.getContext("2d").drawImage(vid, 0, 0, 320, 180);
      setThumb(canvas.toDataURL("image/jpeg", 0.75));
      URL.revokeObjectURL(url);
    };

    vid.onerror = () => URL.revokeObjectURL(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return { thumb, duration };
};

/* ── Single clip card ── */
const ClipCard = ({ clip, index, onRemove, onTitleChange, onDescChange, uploading }) => {
  const { thumb, duration } = useVideoMeta(clip.file);

  return (
    <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden transition-all duration-200 hover:border-white/[0.10]">
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/25 to-transparent pointer-events-none" />
      <div className="flex">
        {/* Thumbnail */}
        <div className="relative w-[130px] sm:w-[160px] shrink-0 aspect-video bg-black overflow-hidden">
          {thumb ? (
            <img src={thumb} alt="" className="w-full h-full object-cover opacity-75" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/10 border-t-white/35 rounded-full animate-spin" />
            </div>
          )}
          <div className="absolute top-1.5 left-1.5">
            <span className="text-[8.5px] font-bold uppercase tracking-widest text-white/55 bg-black/70 backdrop-blur-sm border border-white/[0.08] px-1.5 py-0.5 rounded">
              Clip {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          {duration && (
            <div className="absolute bottom-1.5 right-1.5">
              <span className="text-[8.5px] font-medium text-white/45 bg-black/70 px-1.5 py-0.5 rounded tabular-nums">
                {duration}
              </span>
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="flex-1 p-3.5 flex flex-col gap-2 min-w-0">
          <div className="flex items-start gap-2">
            <input
              type="text"
              placeholder="Clip title  e.g. 'Entry frag, B site'"
              value={clip.title}
              onChange={(e) => onTitleChange(index, e.target.value)}
              maxLength={60}
              disabled={uploading}
              className="flex-1 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2 text-[12px] text-white/75 placeholder-white/[0.17] outline-none focus:border-white/[0.20] transition-all duration-150 font-['DM_Sans',sans-serif] disabled:opacity-40 min-w-0"
            />
            <button
              onClick={() => !uploading && onRemove(index)}
              disabled={uploading}
              className="shrink-0 w-7 h-7 rounded-full border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/20 hover:text-red-400/65 hover:border-red-400/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <textarea
            rows={2}
            placeholder="What should your coach focus on? (optional)"
            value={clip.desc}
            onChange={(e) => onDescChange(index, e.target.value)}
            disabled={uploading}
            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg px-3 py-2 text-[11.5px] text-white/60 placeholder-white/[0.14] outline-none focus:border-white/[0.17] transition-all duration-150 resize-none font-['DM_Sans',sans-serif] disabled:opacity-40"
          />

          <div className="flex items-center gap-2">
            <span className="text-[9.5px] text-white/18 truncate font-medium max-w-[160px]">{clip.file.name}</span>
            <span className="text-[9px] text-white/12">·</span>
            <span className="text-[9.5px] text-white/15 tabular-nums shrink-0">{formatBytes(clip.file.size)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Drop zone ── */
const DropZone = ({ onFiles, disabled, remaining }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handle = (files) => {
    const valid = Array.from(files)
      .filter((f) => f.type.startsWith("video/"))
      .slice(0, remaining);
    if (valid.length) onFiles(valid);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); if (!disabled) handle(e.dataTransfer.files); }}
      onClick={() => !disabled && inputRef.current?.click()}
      className={[
        "relative rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 py-9 px-6 text-center select-none",
        disabled
          ? "border-white/[0.04] cursor-not-allowed opacity-35"
          : dragging
            ? "border-[#A01E2E]/50 bg-[#A01E2E]/[0.05] cursor-pointer scale-[1.005]"
            : "border-white/[0.07] bg-white/[0.01] hover:border-white/[0.13] hover:bg-white/[0.02] cursor-pointer",
      ].join(" ")}
    >
      <input ref={inputRef} type="file" accept="video/*" multiple className="hidden"
        onChange={(e) => handle(e.target.files)} />

      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 ${dragging ? "border-[#A01E2E]/40 bg-[#A01E2E]/[0.08]" : "border-white/[0.07] bg-white/[0.025]"}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={dragging ? "text-[#A01E2E]/70" : "text-white/22"}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>

      <div>
        <p className="text-[12.5px] font-semibold text-white/45 mb-0.5">
          {dragging ? "Drop to add" : "Drop video files here"}
        </p>
        <p className="text-[10.5px] text-white/20">
          or click to browse · MP4, MOV, AVI · up to {remaining} more clip{remaining !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

/* ── Main modal ── */
const UploadModal = ({ review, onClose, onSuccess }) => {
  const [clips,       setClips]       = useState([]);   // { file, title, desc }
  const [uploading,   setUploading]   = useState(false);
  const [uploadStep,  setUploadStep]  = useState("");   // status label
  const [progress,    setProgress]    = useState(0);    // 0–100 overall
  const [error,       setError]       = useState("");

  /* Lock scroll + Escape key */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape" && !uploading) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, uploading]);

  const addFiles   = (files) => setClips((prev) => [...prev, ...files.slice(0, MAX_CLIPS - prev.length).map((f) => ({ file: f, title: "", desc: "" }))]);
  const removeClip = (i)    => setClips((prev) => prev.filter((_, idx) => idx !== i));
  const setTitle   = (i, v) => setClips((prev) => prev.map((c, idx) => idx === i ? { ...c, title: v } : c));
  const setDesc    = (i, v) => setClips((prev) => prev.map((c, idx) => idx === i ? { ...c, desc:  v } : c));

  const canSubmit = clips.length >= 1 && clips.every((c) => c.title.trim());

  /* ────────────────────────────────────────────────────────────
     Upload flow — identical to your uploadGameplayVideo pattern:
     
     Per clip:
       POST /reviews/upload-video   (multipart/form-data, field: "video")
       Backend: memoryStorage → streamifier → cloudinary.upload_stream
       Response: { url: "https://res.cloudinary.com/..." }
     
     Then:
       POST /reviews/upload
       Body: { reviewId, vods: [url1, url2, ...] }
  ──────────────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    if (!canSubmit) { setError("Give each clip a title before submitting."); return; }
    if (String(review._id).startsWith("stub_")) {
      setError("Review session not initialised yet — refresh the page and try again.");
      return;
    }
    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const urls = [];

      for (let i = 0; i < clips.length; i++) {
        const clip = clips[i];
        setUploadStep(`Uploading clip ${i + 1} of ${clips.length}…`);

        /* Build FormData — multer expects field name "video" */
        const formData = new FormData();
        formData.append("video", clip.file);
        // Optional: include title/desc as extra fields if you want
        // formData.append("title", clip.title);

        const res = await axiosInstance.post("/reviews/upload-video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            if (e.total) {
              /* Overall progress: (clips done + current clip fraction) / total clips */
              const overall = Math.round(((i + e.loaded / e.total) / clips.length) * 100);
              setProgress(overall);
            }
          },
        });

        urls.push(res.data.url);
      }

      /* All files uploaded → register with the review */
      setUploadStep("Saving review…");
      setProgress(98);

      const registerRes = await axiosInstance.post("/reviews/upload", {
        reviewId: review._id,
        vods:     urls,
      });

      setProgress(100);
      onSuccess(registerRes.data.review);

    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed — please try again.");
    } finally {
      setUploading(false);
      setUploadStep("");
    }
  };

  const remaining = MAX_CLIPS - clips.length;
  const coach     = review?.coach;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(3,5,8,0.88)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
      onClick={(e) => { if (e.target === e.currentTarget && !uploading) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-[680px] max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border border-white/[0.07] bg-[#090C12] flex flex-col"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#A01E2E]/45 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[110px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(160,30,46,0.07) 0%, transparent 70%)" }} />

        {/* ── Header ── */}
        <div className="relative flex items-start justify-between px-6 pt-6 pb-5 border-b border-white/[0.05]">
          <div className="flex items-center gap-3.5">
            <img
              src={coach?.profilePic || "https://cdn-icons-png.flaticon.com/128/149/149071.png"}
              alt={coach?.fullname}
              className="w-11 h-11 rounded-full object-cover border border-white/[0.10] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-px bg-[#A01E2E]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A01E2E]">Submit VODs</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-extrabold text-[17px] text-white tracking-tight leading-none">
                {coach?.fullname || "Your Coach"}
              </h2>
              {coach?.rank && (
                <p className="text-[10px] font-medium text-white/25 mt-0.5">{coach.rank}</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={uploading}
            className="w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/28 hover:text-white/70 hover:bg-white/[0.07] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150 shrink-0 mt-0.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col gap-4 px-6 py-5 flex-1">

          {/* Info */}
          <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01] px-4 py-3">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/22 mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[11.5px] text-white/25 leading-relaxed">
              Upload up to <strong className="text-white/42 font-semibold">3 gameplay clips</strong>. Add a title to each — your coach will use it to navigate your footage.
            </p>
          </div>

          {/* Progress bar for slots */}
          {clips.length > 0 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: MAX_CLIPS }).map((_, i) => (
                <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i < clips.length ? "bg-[#A01E2E]" : "bg-white/[0.06]"}`} />
              ))}
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/20 shrink-0">
                {clips.length}/{MAX_CLIPS}
              </span>
            </div>
          )}

          {/* Clip cards */}
          {clips.length > 0 && (
            <div className="flex flex-col gap-3">
              {clips.map((clip, i) => (
                <ClipCard
                  key={i}
                  clip={clip}
                  index={i}
                  onRemove={removeClip}
                  onTitleChange={setTitle}
                  onDescChange={setDesc}
                  uploading={uploading}
                />
              ))}
            </div>
          )}

          {/* Drop zone */}
          {remaining > 0 && (
            <DropZone onFiles={addFiles} disabled={uploading} remaining={remaining} />
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/[0.12] bg-red-500/[0.04] px-4 py-3">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400/60 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
              <p className="text-[11.5px] text-red-400/60">{error}</p>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 px-6 py-4 border-t border-white/[0.05] bg-[#090C12] flex flex-col gap-3">

          {/* Upload progress */}
          {uploading && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-[#A01E2E] transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[9.5px] text-white/25 tabular-nums shrink-0 font-medium">{progress}%</span>
              {uploadStep && <span className="text-[9.5px] text-white/20 shrink-0 hidden sm:block">{uploadStep}</span>}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={uploading}
              className="flex-1 py-2.5 rounded-xl border border-white/[0.07] bg-transparent text-[12.5px] font-semibold text-white/30 hover:text-white/55 hover:border-white/[0.12] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploading || !canSubmit}
              className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#A01E2E] hover:bg-[#8E1C2A] disabled:opacity-35 disabled:cursor-not-allowed text-white text-[12.5px] font-semibold tracking-[0.02em] transition-all duration-150 hover:-translate-y-0.5"
            >
              {uploading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  {uploadStep || "Uploading…"}
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Submit {clips.length > 0 ? `${clips.length} Clip${clips.length !== 1 ? "s" : ""}` : "Clips"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;