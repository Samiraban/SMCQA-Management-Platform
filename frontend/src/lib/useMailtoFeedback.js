import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Gives a mailto: link a graceful fallback.
 *
 * A plain `<a href="mailto:...">` only does something if the visitor's
 * device/browser has a default email app configured (Outlook, Mail,
 * Gmail set as the browser's handler, etc). If none is set, clicking
 * the link silently does nothing and it looks "broken" — even though
 * the link itself is correct.
 *
 * This hook copies the address to the clipboard on click and returns
 * a `copied` flag you can use to show a brief confirmation (e.g. swap
 * the label to "Copied!" for a couple of seconds), so visitors always
 * get *some* visible result and can paste the address themselves.
 * It never calls preventDefault, so the normal mailto: attempt still
 * happens first — this is just a safety net for when that fails.
 */
export function useMailtoFeedback(address, timeout = 2500) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(address).catch(() => {});
    }

    setCopied(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, timeout);
  }, [address, timeout]);

  return { handleClick, copied };
}