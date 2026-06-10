import { useEffect } from "react";
import "lenis/dist/lenis.css";
import Lenis from "lenis";
import { setLenis, refreshLenis } from "./lenis";

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

    const onLayoutChange = () => refreshLenis();
    window.addEventListener("load", onLayoutChange);
    document.fonts?.ready?.then(onLayoutChange);

    const resizeObs = new ResizeObserver(() => refreshLenis());
    resizeObs.observe(document.body);

    return () => {
      resizeObs.disconnect();
      window.removeEventListener("load", onLayoutChange);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
      window.__lenis = null;
      document.body.style.overflow = "";
    };
  }, []);

  return children;
}