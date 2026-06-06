import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { uploadGameplayVideo, deleteGameplayVideo } from "../api/coachVideoApi";
import { coachStore } from "../store/authStore";

const MAX_CLIPS = 3;

const UploadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const progressClass = (value) => {
  if (value >= 100) return "w-full";
  if (value >= 90) return "w-[90%]";
  if (value >= 80) return "w-4/5";
  if (value >= 70) return "w-[70%]";
  if (value >= 60) return "w-3/5";
  if (value >= 50) return "w-1/2";
  if (value >= 40) return "w-2/5";
  if (value >= 30) return "w-[30%]";
  if (value >= 20) return "w-1/5";
  if (value >= 10) return "w-[10%]";
  return "w-[2%]";
};

const UploadZone = ({ uploading, onUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [pct, setPct] = useState(0);
  const inputRef = useRef(null);

  const submitFile = (file) => {
    if (file) onUpload(file, setPct);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    submitFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={`cursor-pointer rounded-[10px] border-2 border-dashed transition-colors duration-200 ${dragging ? "border-[#A01E2E]/45 bg-[#A01E2E]/[0.04]" : "border-white/[0.07] bg-white/[0.01]"} ${uploading ? "pointer-events-none cursor-default opacity-70" : ""}`}
      onClick={() => !uploading && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={(e) => submitFile(e.target.files[0])}
        disabled={uploading}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center gap-3 px-4 py-7 text-center">
        <div className={`flex h-10 w-10 items-center justify-center rounded-[10px] border transition-colors duration-200 ${dragging ? "border-[#A01E2E]/40 bg-[#A01E2E]/[0.08] text-[#A01E2E]" : "border-white/[0.07] bg-white/[0.025] text-white/25"}`}>
          {uploading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/15 border-t-[#A01E2E]" /> : <UploadIcon />}
        </div>

        {uploading ? (
          <div className="flex flex-col items-center gap-1.5">
            <p className="m-0 text-[12.5px] font-semibold text-white/45">Uploading...</p>
            <div className="h-0.5 w-[120px] overflow-hidden rounded-sm bg-white/[0.06]">
              <div className={`h-full rounded-sm bg-[#A01E2E] transition-all duration-300 ${progressClass(pct)}`} />
            </div>
            <p className="m-0 text-[10px] text-white/20">{pct}%</p>
          </div>
        ) : (
          <div>
            <p className="mb-1 text-[12.5px] font-semibold text-white/45">
              {dragging ? "Drop it here" : "Drop video or click to browse"}
            </p>
            <p className="text-[10.5px] text-white/20">MP4, MOV, WebM - Max 200MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoStage = ({ video, index, total, onDelete }) => (
  <div className="overflow-hidden rounded-[10px] bg-[#050709]">
    <div className="relative bg-[var(--elv-bg)]">
      <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#A01E2E]/40 to-transparent" />
      <video
        src={video.url}
        controls
        preload="metadata"
        className="aspect-video w-full bg-black object-cover"
      />
    </div>
    <div className="flex items-center justify-between gap-3 bg-[#050709] px-3.5 py-3">
      <div className="min-w-0">
        <p className="truncate text-[10.5px] tracking-[0.02em] text-white/30">
          {index + 1}/{total}
        </p>
        <p className="truncate text-[12px] font-medium text-white/55">
          {video.originalName || `gameplay_clip_${index + 1}.mp4`}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(video._id)}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.04] px-2.5 py-1.5 text-[10.5px] font-semibold text-white/35 transition-colors duration-150 hover:border-red-400/20 hover:text-red-400"
      >
        <TrashIcon /> Delete
      </button>
    </div>
  </div>
);

const Thumb = ({ video, index, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border bg-[var(--elv-bg)] transition-colors duration-200 ${active ? "border-[#A01E2E]/60" : "border-white/[0.07] hover:border-white/15"}`}
  >
    <video src={video.url} preload="metadata" className="h-full w-full object-cover opacity-60" />
    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] text-white/45">
      {index + 1}
    </span>
  </button>
);

const CoachVideosSection = () => {
  const coach = coachStore((state) => state.coach);
  const setGameplayVideos = coachStore((state) => state.setGameplayVideos);
  const [uploading, setUploading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const videos = coach?.gameplayVideos || [];
  const active = videos[activeIndex] || null;

  useEffect(() => {
    if (activeIndex >= videos.length && videos.length > 0) setActiveIndex(videos.length - 1);
  }, [activeIndex, videos.length]);

  const handleUpload = async (file, onProgress) => {
    if (!file) return;
    if (videos.length >= MAX_CLIPS) {
      toast.error("Maximum 3 videos allowed");
      return;
    }

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

  const handleDelete = useCallback(async (videoId) => {
    try {
      const data = await deleteGameplayVideo(videoId);
      setGameplayVideos(data.videos);
      toast.success("Video deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  }, [setGameplayVideos]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 pb-5">
      <div className="absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#A01E2E]/30 to-transparent" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 h-px w-5 bg-[#A01E2E]" />
          <h2 className="mb-1 text-[15px] font-semibold tracking-[0] text-white">Gameplay Clips</h2>
          <p className="text-xs text-white/30">Showcase your skill level to potential students.</p>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5">
          {Array.from({ length: MAX_CLIPS }).map((_, i) => (
            <span key={i} className={`h-[7px] w-[7px] rounded-full transition-colors duration-300 ${i < videos.length ? "bg-[#A01E2E]" : "bg-white/[0.08]"}`} />
          ))}
          <span className="ml-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/25">
            {videos.length}/{MAX_CLIPS}
          </span>
        </div>
      </div>

      {active && (
        <div className={videos.length < MAX_CLIPS ? "mb-4" : ""}>
          <VideoStage video={active} index={activeIndex} total={videos.length} onDelete={handleDelete} />

          {videos.length > 1 && (
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9.5px] uppercase tracking-[0.16em] text-white/20">All clips</span>
              </div>
              <div className="elv-hide-scrollbar flex gap-2 overflow-x-auto pb-1">
                {videos.map((video, i) => (
                  <Thumb
                    key={video._id}
                    video={video}
                    index={i}
                    active={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {videos.length < MAX_CLIPS && <UploadZone uploading={uploading} onUpload={handleUpload} />}

      {videos.length >= MAX_CLIPS && (
        <div className="mt-3.5 flex items-center gap-2 text-[11px] text-white/20">
          <span className="h-[5px] w-[5px] rounded-full bg-white/[0.12]" />
          All 3 slots used. Delete a clip to upload a new one.
        </div>
      )}
    </div>
  );
};

export default CoachVideosSection;
