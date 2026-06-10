import React from "react";
import { Timeline, useTimelineSection } from "./ui/timeline";
import { cn } from "../lib/utils";

const SectionText = ({ children, className }) => {
  const { isActive } = useTimelineSection();
  return (
    <p
      className={cn(
        "transition-colors duration-700 ease-out",
        isActive ? "text-white/65" : "text-white/30",
        className
      )}
    >
      {children}
    </p>
  );
};

const BulletList = ({ items, compact }) => {
  const { isActive } = useTimelineSection();

  return (
    <ul className={compact ? "mb-4 space-y-2" : "mb-5 space-y-2.5"}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-3 text-[13px] leading-snug transition-colors duration-700 ease-out md:text-[14px]",
            isActive ? "text-white/55" : "text-white/28"
          )}
        >
          <span
            className={cn(
              "mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-700",
              isActive ? "bg-[#A01E2E]" : "bg-[#A01E2E]/35"
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
};

const TimelineImage = ({ src, alt, compact, mobile }) => {
  const { isActive } = useTimelineSection();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-white/[0.02] transition-all duration-700 ease-out",
        isActive
          ? "border-white/[0.08] hover:border-[#A01E2E]/35"
          : "border-white/[0.04]"
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-full object-cover transition-all duration-700 ease-out",
          mobile
            ? "h-48 sm:h-52"
            : compact
              ? "h-40 sm:h-48 md:h-56 lg:h-64"
              : "h-44 sm:h-52 md:h-64 lg:h-72",
          isActive
            ? "scale-100 blur-0 brightness-100 saturate-100 group-hover:scale-[1.03]"
            : "scale-[1.02] blur-[6px] brightness-[0.5] saturate-[0.45]"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080a0e]/50 via-transparent to-transparent transition-opacity duration-700",
          isActive ? "opacity-35 group-hover:opacity-20" : "opacity-75"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 ring-1 ring-inset transition-all duration-700",
          isActive ? "ring-white/[0.06] group-hover:ring-[#A01E2E]/20" : "ring-white/[0.03]"
        )}
      />
    </div>
  );
};

const ImagePair = ({ images, compact }) => (
  <>
    {/* Mobile — single full-width image */}
    <div className="md:hidden">
      <TimelineImage
        src={images[0].src}
        alt={images[0].alt}
        compact={compact}
        mobile
      />
    </div>
    {/* Desktop — two-up grid */}
    <div className={cn("hidden min-w-0 md:grid md:grid-cols-2", compact ? "gap-3" : "gap-4")}>
      {images.map(({ src, alt }) => (
        <TimelineImage key={src} src={src} alt={alt} compact={compact} />
      ))}
    </div>
  </>
);

export function TimelineDemo() {
  const data = [
    {
      title: "Connect with the Best Coaches",
      titleLines: ["Connect with the", "Best Coaches"],
      content: (
        <div>
          <SectionText className="mb-4 max-w-lg text-[14px] leading-relaxed md:mb-5 md:text-[15px]">
            Browse a curated roster of verified Radiant coaches and find the
            perfect match for your playstyle and goals.
          </SectionText>
          <BulletList
            items={[
              "Verified Radiant coaches across every role and rank",
              "Filter by agent pool, playstyle, and availability",
              "Read reviews and session stats before you book",
            ]}
          />
          <ImagePair
            images={[
              { src: "https://i.pinimg.com/736x/78/85/0f/78850fe7d863e016e9f0103c57ec48a8.jpg", alt: "Coaches roster" },
              { src: "https://i.pinimg.com/736x/ca/e2/6e/cae26e773b6e457afc43f0fc9566a8d4.jpg", alt: "Coach profile" },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Personalized Coaching Sessions",
      titleLines: ["Personalized", "Coaching Sessions"],
      content: (
        <div>
          <SectionText className="mb-4 max-w-lg text-[14px] leading-relaxed md:mb-5 md:text-[15px]">
            Engage in tailored 45-minute sessions designed to address your
            weaknesses, refine your strategies, and sharpen your decision-making.
          </SectionText>
          <BulletList
            items={[
              "Structured 45-minute sessions built around your VOD",
              "Timestamped notes on positioning, utility, and economy",
              "Actionable drills assigned after every review",
            ]}
          />
          <ImagePair
            images={[
              { src: "https://i.pinimg.com/736x/66/28/4c/66284cf0a0b7f39aa0283ebe5340f077.jpg", alt: "Coaching session" },
              { src: "https://i.pinimg.com/736x/f0/11/a8/f011a8418e9bd4743f0bc43070f31233.jpg", alt: "VOD review" },
            ]}
          />
        </div>
      ),
    },
    {
      title: "Achieve Your Goals",
      titleLines: ["Achieve Your Goals"],
      content: (
        <div>
          <SectionText className="mb-4 max-w-lg text-[14px] leading-relaxed md:mb-4 md:text-[15px]">
            Implement expert guidance, track measurable progress, and climb the
            ranks faster than ever before.
          </SectionText>
          <BulletList
            compact
            items={[
              "Access to top-tier Valorant coaches worldwide",
              "Personalized strategies to fix your weakest areas",
              "Live VOD review and real-time feedback",
            ]}
          />
          <ImagePair
            compact
            images={[
              { src: "https://i.pinimg.com/736x/22/74/3a/22743a02be0452723fa8e7a37c977726.jpg", alt: "Rank progression" },
              { src: "https://i.pinimg.com/736x/a1/51/a8/a151a8b0f5c938686b3b4de41c18a973.jpg", alt: "Tournament success" },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full pb-12 md:pb-16">
      <Timeline data={data} />
    </div>
  );
};
