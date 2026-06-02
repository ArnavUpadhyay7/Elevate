import React, { useRef } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);

  return (
    <div
      className="w-full font-['DM_Sans',system-ui,sans-serif]"
      ref={containerRef}
    >
      {/* Header */}
      <div className="max-w-[1240px] mx-auto py-16 px-5 sm:px-8 lg:px-12">
        <div className="w-6 h-px bg-[#A01E2E] mb-4" />
        <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(28px,4.5vw,52px)] tracking-tight leading-[1.0] text-white mb-4">
          Elevate your game.
        </h2>
        <p className="text-[13.5px] text-white/40 max-w-sm leading-relaxed">
          Follow these expert-crafted steps to take your gameplay to the next
          level. Unlock your true potential and dominate every match.
        </p>
      </div>

      {/* Timeline items */}
      <div ref={ref} className="relative max-w-[1240px] mx-auto pb-20 px-5 sm:px-8 lg:px-12">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-16 md:pt-24 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-9 w-9 absolute left-0 rounded-full bg-[#0B1017] border border-white/[0.07] flex items-center justify-center shrink-0">
                <div className="h-2 w-2 rounded-full bg-[#A01E2E]" />
              </div>
              <h3 className="hidden md:block font-['Syne',sans-serif] font-extrabold md:pl-16 text-2xl md:text-3xl lg:text-4xl tracking-tight text-white/20 leading-tight">
                {item.title}
              </h3>
            </div>
            <div className="relative pl-14 pr-0 md:pl-4 w-full min-w-0">
              <h3 className="md:hidden block font-['Syne',sans-serif] font-extrabold text-2xl mb-4 text-left tracking-tight text-white/25 leading-tight">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Background track */}
        <div
          className="absolute bottom-0 left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <div className="absolute inset-x-0 top-0 h-full w-[2px] rounded-full bg-gradient-to-t from-transparent from-[0%] via-[#A01E2E] via-[10%] to-transparent opacity-80" />
        </div>
      </div>
    </div>
  );
};
