import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 4000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto w-full min-w-0 max-w-full px-0 antialiased font-sans md:max-w-3xl md:px-4">
      <div className="relative grid min-w-0 grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">

        {/* ── Image stack ── */}
        <div>
          <div className="relative h-56 w-full min-w-0 sm:h-72 md:h-80">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  {/* Card shell — matches coach card aesthetic */}
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{ borderRadius: 16 }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-[25vh] md:h-[30vh] w-full object-cover object-center"
                      style={{ borderRadius: 16 }}
                    />
                    {/* Bottom fade to bg — same pattern as coach cards */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderRadius: 16,
                        background:
                          "linear-gradient(to bottom, transparent 40%, rgba(8,12,16,0.55) 75%, rgba(8,12,16,0.92) 100%)",
                      }}
                    />
                    {/* Noise texture — matches hero/card grain */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.055]"
                      style={{
                        borderRadius: 16,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: "300px",
                      }}
                    />
                    {/* Designation badge — bottom-left, Radiant badge pattern */}
                    {isActive(index) && (
                      <div
                        className="absolute bottom-[10px] left-[10px] flex items-center gap-[5px] rounded-full px-[9px] py-[4px]"
                        style={{
                          background: "rgba(160,30,46,0.18)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(160,30,46,0.38)",
                        }}
                      >
                        <span className="block h-[4px] w-[4px] rounded-full bg-[#FF4060] shrink-0" />
                        <span className="font-syne text-[9px] font-bold text-[#FF6B7A] uppercase tracking-[0.14em]">
                          {testimonial.designation}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Quote + controls ── */}
        <div className="flex justify-between flex-col py-2">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Opening mark */}
            <div
              className="font-syne font-black text-[#A01E2E] leading-none mb-3 select-none"
              style={{ fontSize: 48, lineHeight: 0.8 }}
              aria-hidden="true"
            >
              "
            </div>

            <h3 className="font-syne text-[15px] font-bold uppercase tracking-[0.04em] text-white mb-1">
              {testimonials[active].name}
            </h3>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A01E2E] mb-4">
              {testimonials[active].designation}
            </p>

            <motion.p className="text-[13.5px] leading-[1.85] text-[#7A8FA0]">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Arrows + dot indicators */}
          <div className="flex items-center justify-between pt-12 md:pt-0">
            <div className="flex gap-[5px]">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="transition-all duration-200"
                  style={{
                    height: 4,
                    width: isActive(i) ? 18 : 4,
                    borderRadius: 999,
                    background: isActive(i)
                      ? "#A01E2E"
                      : "rgba(255,255,255,0.10)",
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/30 transition-all duration-150 hover:border-[#A01E2E]/40 hover:bg-[#A01E2E]/10 hover:text-[#FF6B7A] group/button"
              >
                <IconArrowLeft className="h-4 w-4 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/30 transition-all duration-150 hover:border-[#A01E2E]/40 hover:bg-[#A01E2E]/10 hover:text-[#FF6B7A] group/button"
              >
                <IconArrowRight className="h-4 w-4 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};