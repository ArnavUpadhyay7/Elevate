import { useEffect } from "react";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { setLenis } from "./lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenis);
    window.__lenis = lenis;

    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenis(null);
      window.__lenis = null;
    };
  }, []);

  return children;
}