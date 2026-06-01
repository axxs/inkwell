// Dark/light theme toggle. Initial theme is set by a tiny inline script in
// <head> (no flash); this handles the toggle button + persistence.
// Uses event delegation on document so it's immune to button-binding timing.
export function initThemeToggle() {
  // Guard against double-binding (the click handler would otherwise be registered
  // twice and the two toggles would cancel each other out).
  if (window.__asfThemeBound) return;
  window.__asfThemeBound = true;

  const currentTheme = () =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

  const sync = () => {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    const isLight = currentTheme() === "light";
    btn.setAttribute("aria-pressed", String(isLight));
    btn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  };

  sync();

  document.addEventListener("click", (e) => {
    const btn = e.target.closest && e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const next = currentTheme() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("asf-theme", next); } catch (err) { /* ignore */ }
    sync();
  });
}
