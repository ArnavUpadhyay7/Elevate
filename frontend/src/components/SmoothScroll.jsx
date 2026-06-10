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
      autoRaf: true,
    });

    setLenis(lenis);
    window.__lenis = lenis;

    const onScroll = () => window.dispatchEvent(new Event("scroll"));
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
      window.__lenis = null;
    };
  }, []);

  return children;
}