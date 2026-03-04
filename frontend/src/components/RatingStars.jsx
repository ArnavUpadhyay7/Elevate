import React, { useState } from "react";

const RatingStars = ({ value = 0, onChange, size = "md", showValue = false }) => {
  const [hovered, setHovered] = useState(0);
  const interactive = typeof onChange === "function";
  const display     = interactive ? (hovered || value) : value;

  const sizeMap = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  const starCls = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={[
            "transition-all duration-150 focus:outline-none",
            interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
          ].join(" ")}
        >
          <svg
            className={[
              starCls,
              "transition-colors duration-150",
              star <= display ? "text-[#A01E2E]" : "text-white/[0.10]",
            ].join(" ")}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      {showValue && (
        <span className="ml-1.5 text-[10px] font-semibold text-white/30 tabular-nums">
          {value > 0 ? `${value}.0` : "—"}
        </span>
      )}
    </div>
  );
};

export default RatingStars;