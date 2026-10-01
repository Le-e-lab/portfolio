"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Copy-to-clipboard with an explicit confirmation state.
 * "Copy my email" needs a small "Email copied" confirmation.
 */
export function useCopy(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // Clipboard API is unavailable over plain http or in some browsers.
        // Fall back to a hidden textarea + execCommand before giving up.
        const el = document.createElement("textarea");
        el.value = value;
        el.setAttribute("readonly", "");
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        try {
          document.execCommand("copy");
        } catch {
          document.body.removeChild(el);
          return false;
        }
        document.body.removeChild(el);
      }

      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfterMs);
      return true;
    },
    [resetAfterMs],
  );

  return { copied, copy };
}