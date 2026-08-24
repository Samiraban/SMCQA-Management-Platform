/**
 * Global scroll-reveal: finds every element with class "reveal-onscroll"
 * (or "reveal-group") currently in the DOM and fades/slides it in the first
 * time it enters the viewport. Call initScrollReveal() once after each
 * route change (App.jsx already does this) — it's safe to call repeatedly,
 * already-animated elements are skipped automatically via the "in" class.
 */
export function initScrollReveal() {
  const nodes = document.querySelectorAll(".reveal-onscroll:not(.in), .reveal-group:not(.in)");
  if (!nodes.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  nodes.forEach((node) => obs.observe(node));
}