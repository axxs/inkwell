// GSAP-powered scroll layer: Lenis smooth scroll (integrated with the GSAP
// ticker + ScrollTrigger), staggered scroll-reveals, a scroll-progress bar, and
// a header-on-scroll state. Only loaded when motion is allowed (see controller).
export async function initScroll() {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scroll (pointer-fine only), wired into GSAP's ticker so ScrollTrigger
  // stays in sync. Lenis is the source of truth for scroll position.
  if (window.matchMedia("(pointer: fine)").matches) {
    const { default: Lenis } = await import("lenis");
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Staggered fade-up reveal as elements enter the viewport.
  gsap.set("[data-animate]", { opacity: 0, y: 16 });
  ScrollTrigger.batch("[data-animate]", {
    start: "top 92%",
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      }),
  });

  // Red scroll-progress bar across the top of the page.
  const bar = document.querySelector("[data-scroll-progress]");
  if (bar) {
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  }

  // Header gains a subtle elevation once scrolled away from the top.
  ScrollTrigger.create({
    start: 10,
    end: "max",
    toggleClass: { targets: ".site-header", className: "is-scrolled" },
  });

  // Recalculate once images/fonts have settled.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
