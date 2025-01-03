import { cn } from "../../lib/utils";
import React, { useRef } from "react";

export const CardContainer = ({ children }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10;
    const y = (e.clientY - top - height / 2) / 10;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  return (
    <div className="flex items-center justify-center">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          containerRef.current.style.transform = "none";
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div className={cn("bg-white rounded-xl p-6", className)}>
      {children}
    </div>
  );
};

export const CardItem = ({ as: Tag = "div", children, className, ...rest }) => {
  return (
    <Tag className={cn("", className)} {...rest}>
      {children}
    </Tag>
  );
};