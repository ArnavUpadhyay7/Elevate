import React, { useEffect, useState } from "react";

const Thumb = ({ video, index, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-md border bg-[#080C10] transition-colors duration-200 ${active ? "border-[#A01E2E]/60" : "border-white/[0.07] hover:border-white/15"}`}
  >
    <video src={video.url} preload="metadata" className="h-full w-full object-cover opacity-60" />
    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] text-white/45">
      {index + 1}
    </span>
  </button>
);

const VideoStage = ({ video, index, total }) => (
  <div className="overflow-hidden rounded-[10px] bg-[#050709]">
    <div className="relative bg-[#080C10]">
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
    </div>
  </div>
);

const CoachClipsViewer = ({ videos = [], coachName = "this coach" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = videos[activeIndex] || null;

  useEffect(() => {
    if (activeIndex >= videos.length && videos.length > 0) setActiveIndex(videos.length - 1);
  }, [activeIndex, videos.length]);

  if (!videos || videos.length === 0 || !active) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.015] p-6 pb-5">
      <div className="absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#A01E2E]/30 to-transparent" />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 h-px w-5 bg-[#A01E2E]" />
          <h2 className="mb-1 text-[15px] font-semibold tracking-[0] text-white">Gameplay Clips</h2>
          <p className="text-xs text-white/30">See {coachName} in action at the highest level.</p>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-[#A01E2E]" />
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/30">
            {videos.length} clip{videos.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <VideoStage video={active} index={activeIndex} total={videos.length} />

      {videos.length > 1 && (
        <div className="mt-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9.5px] uppercase tracking-[0.16em] text-white/20">All clips</span>
          </div>
          <div className="elv-hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {videos.map((video, i) => (
              <Thumb
                key={video._id || video.url}
                video={video}
                index={i}
                active={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          <div className="mt-2.5 flex justify-center gap-[5px]">
            {videos.map((video, i) => (
              <button
                key={video._id || video.url}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-[3px] rounded-full border-0 p-0 transition-all duration-200 ${i === activeIndex ? "w-[18px] bg-[#A01E2E]" : "w-[5px] bg-white/[0.12]"}`}
                aria-label={`Show clip ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachClipsViewer;
