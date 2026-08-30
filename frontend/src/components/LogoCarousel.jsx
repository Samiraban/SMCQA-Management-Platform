import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function LogoCarousel({
  clients = [],
  visibleCount = 5,
  intervalMs = 3000,
}) {
  const count = clients.length;

  const safeVisibleCount = Math.max(
    1,
    Math.min(Number(visibleCount) || 1, Math.max(count, 1))
  );

  const shouldSlide = count > safeVisibleCount;

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const resetTimeoutRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  /*
   * Duplicate the list only when sliding is actually needed.
   */
  const carouselItems = shouldSlide
    ? [...clients, ...clients]
    : clients;

  /*
   * Clean up timers whenever the component unmounts.
   */
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  /*
   * Reset carousel when the client list or visible count changes.
   */
  useEffect(() => {
    setIndex(0);
    setIsTransitioning(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    });
  }, [count, safeVisibleCount]);

  /*
   * Automatic carousel.
   */
  useEffect(() => {
    if (!shouldSlide || isPaused) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((current) => current + 1);
    }, Math.max(1000, intervalMs));

    return () => clearInterval(timer);
  }, [shouldSlide, intervalMs, isPaused]);

  /*
   * When the animated track reaches the duplicated set,
   * silently jump back to the beginning.
   */
  useEffect(() => {
    if (!shouldSlide || index < count) {
      return undefined;
    }

    resetTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }, 650);

    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [index, count, shouldSlide]);

  /*
   * Temporarily pause autoplay after manual navigation.
   * This prevents the carousel from immediately moving again
   * after the user clicks an arrow.
   */
  function pauseAfterInteraction() {
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, Math.max(1000, intervalMs));
  }

  /*
   * Previous button.
   */
  function goPrev() {
    if (!shouldSlide) {
      return;
    }

    pauseAfterInteraction();

    /*
     * At the beginning:
     *
     * A B C D E
     *
     * Jump silently to the duplicated set:
     *
     * A B C D E | A B C D E
     *             ^
     *
     * Then animate backwards.
     */
    if (index === 0) {
      setIsTransitioning(false);
      setIndex(count);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setIndex(count - 1);
        });
      });

      return;
    }

    setIsTransitioning(true);
    setIndex((current) => Math.max(0, current - 1));
  }

  /*
   * Next button.
   */
  function goNext() {
    if (!shouldSlide) {
      return;
    }

    pauseAfterInteraction();

    setIsTransitioning(true);
    setIndex((current) => current + 1);
  }

  /*
   * Keyboard navigation.
   */
  function handleKeyDown(event) {
    if (!shouldSlide) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  }

  /*
   * Nothing to display.
   *
   * This is intentionally AFTER all hooks.
   */
  if (count === 0) {
    return null;
  }

  return (
    <div
      className="valued-clients-carousel"
      tabIndex={shouldSlide ? 0 : -1}.gi
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      role={shouldSlide ? "region" : undefined}
      aria-label={shouldSlide ? "Client logos carousel" : undefined}
    >
      {/* LEFT ARROW */}
      {shouldSlide && (
        <button
          type="button"
          className="valued-clients-arrow valued-clients-prev"
          onClick={goPrev}
          aria-label="Previous clients"
        >
          <ChevronLeft
            size={22}
            strokeWidth={2.5}
          />
        </button>
      )}

      {/* LOGO VIEWPORT */}
      <div className="valued-clients-viewport">
        <div
          className="valued-clients-track"
          style={{
            "--clients-visible": safeVisibleCount,

            /*
             * The track's width is expressed as a percentage
             * of the viewport (not of itself), so each logo's
             * width can safely be a percentage of the track
             * without any circular sizing.
             */
            width: `${
              (carouselItems.length / safeVisibleCount) * 100
            }%`,

            transform: shouldSlide
              ? `translateX(-${
                  index * (100 / carouselItems.length)
                }%)`
              : "translateX(0)",

            transition: isTransitioning
              ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          }}
        >
          {carouselItems.map((client, i) => {
            const clientName =
              client?.name || "Client";

            const clientLogo =
              client?.logo ||
              client?.image ||
              "";

            const clientKey =
              client?.id ||
              clientName ||
              `client-${i}`;

            return (
              <div
                className="valued-client-item"
                key={`${clientKey}-${i}`}
                style={{
                  flex: `0 0 ${
                    100 / carouselItems.length
                  }%`,
                }}
              >
                <div className="valued-client-logo">
                  {clientLogo ? (
                    <img
                      src={clientLogo}
                      alt={clientName}
                      loading="lazy"
                      draggable="false"
                    />
                  ) : (
                    <span className="valued-client-name">
                      {clientName}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {shouldSlide && (
        <button
          type="button"
          className="valued-clients-arrow valued-clients-next"
          onClick={goNext}
          aria-label="Next clients"
        >
          <ChevronRight
            size={22}
            strokeWidth={2.5}
          />
        </button>
      )}
    </div>
  );
}

export default LogoCarousel;