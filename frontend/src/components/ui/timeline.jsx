import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

const GUTTER = "3.5rem";

const TimelineSectionContext = createContext({ isActive: false, index: 0 });

export const useTimelineSection = () => useContext(TimelineSectionContext);

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const dotRefs = useRef([]);
  const dotCentersRef = useRef([]);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  const measureDotCenters = useCallback(() => {
    const root = ref.current;
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    dotCentersRef.current = dotRefs.current.map((dot) => {
      if (!dot) return 0;
      const r = dot.getBoundingClientRect();
      return r.top - rootRect.top + r.height / 2;
    });
  }, []);

  const updateActiveFromBeam = useCallback((progress) => {
    if (!height) return;
    const beamTip = progress * height;
    let next = -1;
    dotCentersRef.current.forEach((center, i) => {
      if (beamTip >= center) next = i;
    });
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, [height]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateLayout = () => {
      setHeight(el.getBoundingClientRect().height);
      requestAnimationFrame(measureDotCenters);
    };
    updateLayout();

    const ro = new ResizeObserver(updateLayout);
    ro.observe(el);
    window.addEventListener("resize", updateLayout);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [data, measureDotCenters]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    measureDotCenters();
    updateActiveFromBeam(progress);
  });

  useEffect(() => {
    const onScroll = () => {
      measureDotCenters();
      updateActiveFromBeam(scrollYProgress.get());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [height, measureDotCenters, updateActiveFromBeam, scrollYProgress]);

  const Dot = ({ isActive }) => (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[var(--elv-bg-elevated)] transition-all duration-300",
        isActive
          ? "border-[#A01E2E]/50 shadow-[0_0_0_4px_rgba(160,30,46,0.15),0_0_20px_rgba(160,30,46,0.2)]"
          : "border-white/[0.08] shadow-[0_0_0_4px_rgba(8,10,14,0.9)]"
      )}
    >
      <div
        className={cn(
          "rounded-full bg-[#A01E2E] transition-all duration-300",
          isActive ? "h-2.5 w-2.5 shadow-[0_0_10px_rgba(160,30,46,0.9)]" : "h-2 w-2 shadow-[0_0_8px_rgba(160,30,46,0.5)]"
        )}
      />
    </div>
  );

  const Title = ({ title, titleLines, isActive, className }) => {
    const lines = titleLines ?? [title];

    return (
      <h3
        className={cn(
          "font-teko font-extrabold uppercase tracking-tight transition-colors duration-700 ease-out",
          isActive ? "text-white" : "text-white/20",
          className
        )}
      >
        {lines.map((line, i) => (
          <span
            key={line}
            className={cn("block", i > 0 && "mt-2 leading-[0.82]")}
            style={{ lineHeight: i === 0 ? 0.88 : 0.82 }}
          >
            {line}
          </span>
        ))}
      </h3>
    );
  };

  return (
    <div ref={containerRef} className="w-full min-w-0 font-teko">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 md:px-8 md:pb-16 md:pt-14 lg:px-10">
        <div className="mb-3 h-px w-6 bg-[#A01E2E]" />
        <h2 className="mb-3 font-teko text-[clamp(28px,4.5vw,52px)] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
          How it works
        </h2>
        <p className="max-w-sm text-[15px] leading-relaxed text-white/40">
          Follow these expert-crafted steps to take your gameplay to the next
          level. Unlock your true potential and dominate every match.
        </p>
      </div>

      {/* Timeline items */}
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
        {data.map((item, index) => {
          const isActive = activeIndex === index;
          const isFirst = index === 0;
          const isLast = index === data.length - 1;

          return (
            <div
              key={index}
              className={cn(
                "grid grid-cols-[var(--tl-gutter)_minmax(0,1fr)] gap-x-4 md:grid-cols-[var(--tl-gutter)_minmax(0,42%)_minmax(0,1fr)] md:gap-x-6",
                isFirst ? "pt-2 md:pt-10" : "pt-10 md:pt-20 lg:pt-24",
                isLast && "pb-2"
              )}
              style={{ "--tl-gutter": GUTTER }}
            >
              {/* Gutter */}
              <div
                ref={(el) => { dotRefs.current[index] = el; }}
                className="flex justify-center self-start pt-1 md:pt-2"
              >
                <Dot isActive={isActive} />
              </div>

              {/* Sticky title — desktop */}
              <div className="sticky top-28 z-40 hidden min-w-0 self-start md:block">
                <Title
                  title={item.title}
                  titleLines={item.titleLines}
                  isActive={isActive}
                  className="text-[clamp(1.65rem,2.6vw,2.65rem)] lg:text-[clamp(1.85rem,3vw,3rem)]"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 md:col-start-3">
                <TimelineSectionContext.Provider value={{ isActive, index }}>
                  <div className="mb-4 md:hidden">
                    <Title
                      title={item.title}
                      titleLines={item.titleLines}
                      isActive={isActive}
                      className="text-[clamp(1.35rem,5vw,1.75rem)]"
                    />
                  </div>
                  <div className="min-w-0 max-w-full">{item.content}</div>
                </TimelineSectionContext.Provider>
              </div>
            </div>
          );
        })}

        {/* Track + beam */}
        <div
          className="pointer-events-none absolute top-0 left-[2.75rem] w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] sm:left-[3.25rem] md:left-[3.75rem] lg:left-[4.25rem]"
          style={{ height: height ? `${height}px` : "100%" }}
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-transparent from-[0%] via-[#A01E2E] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
