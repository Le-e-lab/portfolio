"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Harare",
  hour: "2-digit",
  minute: "2-digit",
});

/** Local time in Harare. Renders "--:--" on the server so hydration matches. */
export function HarareClock({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    // Minutes are all it shows, so a slow tick is enough.
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {now ?? "--:--"}
    </time>
  );
}
