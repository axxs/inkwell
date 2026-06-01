import { prefersReducedMotion } from "../lib/dom.js";

// Single gate for all motion. Under reduced-motion this returns immediately and
// no scroll JS runs — content is already fully visible via CSS (nothing is
// pre-hidden), so it stays usable with motion off or JS disabled.
export async function startMotion() {
  if (prefersReducedMotion()) return;
  const { initScroll } = await import("./scroll.js");
  initScroll();
}
