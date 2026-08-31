import { useEffect, useRef, useState } from "react";

/**
 * Animates a number counting up from 0 to `value` once it scrolls into
 * view. Pass value as a number and a suffix like "+" or "K+" separately,
 * e.g. <CountUp value={20} suffix="K+" /> renders "0K+" -> "20K+".
 */
function CountUp({ value, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    // Reset the "already animated" flag whenever `value` changes so
    // an admin-edited stat (fetched via polling) actually shows up,
    // even if this section is already in view on the page.
    started.current = false;

    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <strong ref={ref}>
      {display}
      {suffix}
    </strong>
  );
}

export default CountUp;