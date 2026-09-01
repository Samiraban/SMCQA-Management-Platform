import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Builds a Gmail web-compose URL pre-filled with a recipient, so
 * clicking "Email us" opens Gmail directly in a new tab with
 * "To: info@smcqa.com" already set — instead of relying on a
 * mailto: link, which only works if the visitor's device/browser
 * has a default email app configured.
 */
export function buildGmailComposeUrl(address, subject = "") {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: address,
  });

  if (subject) {
    params.set("su", subject);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
}

/**
 * Gives an "Email us" link Gmail-direct behavior plus a graceful
 * fallback. `href` points straight to Gmail's compose screen with
 * the recipient already filled in (opened in a new tab), so it
 * works the same for every visitor regardless of what mail app —
 * if any — is set as their system default.
 *
 * `handleClick` also copies the address to the clipboard and
 * `copied` flips true briefly, so you can show a "Copied!" label —
 * useful as a backup if a visitor's browser blocks the new tab.
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

  return {
    handleClick,
    copied,
    href: buildGmailComposeUrl(address),
  };
}