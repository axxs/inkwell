export const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
