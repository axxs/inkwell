import "../css/index.css";
import { initThemeToggle } from "./theme.js";
import { startMotion } from "./motion/controller.js";

// Theme toggle wires up immediately so it responds on first click.
initThemeToggle();

// Motion is deferred until idle so it never blocks first paint / reading.
const boot = () => startMotion();
if ("requestIdleCallback" in window) {
  requestIdleCallback(boot, { timeout: 1200 });
} else {
  window.addEventListener("load", boot);
}
