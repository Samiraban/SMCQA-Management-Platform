/**
 * Global scroll-reveal: finds every element with class "reveal-onscroll"
 * (or "reveal-group") currently in the DOM and fades/slides it in the first
 * time it enters the viewport. Call initScrollReveal() once after each
 * route change (App.jsx already does this) — it's safe to call repeatedly,
 * already-animated elements are skipped automatically via the "in" class.
 *
 * A MutationObserver also watches the page for elements added *later*
 * (e.g. team/services/clients cards that only render once their data
 * finishes loading from the API). Without this, anything that mounts
 * after the initial scan would stay at opacity: 0 forever, since it would
 * never get observed and never receive the "in" class.
 */

let intersectionObserver = null;
let mutationObserverStarted = false;

function getObserver() {
  if (intersectionObserver) return intersectionObserver;

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          intersectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  return intersectionObserver;
}

function scanAndObserve() {
  const obs = getObserver();
  const nodes = document.querySelectorAll(".reveal-onscroll:not(.in), .reveal-group:not(.in)");
  nodes.forEach((node) => obs.observe(node));
}

export function initScrollReveal() {
  scanAndObserve();

  if (!mutationObserverStarted && typeof MutationObserver !== "undefined") {
    mutationObserverStarted = true;

    const mo = new MutationObserver(() => scanAndObserve());
    mo.observe(document.body, { childList: true, subtree: true });
  }
}