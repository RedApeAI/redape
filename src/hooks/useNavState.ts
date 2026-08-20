import { useEffect, useState } from "react";

export type NavTheme = "light" | "dark";

interface NavState {
  /** True once the page has moved far enough for the bar to collapse. */
  scrolled: boolean;
  /** Theme of whatever section is currently passing under the bar. */
  theme: NavTheme;
}

/**
 * Drives both halves of the navbar's scroll behaviour from a single
 * listener: how far down the page we are, and which section sits under the
 * bar right now.
 *
 * Sections opt into the dark treatment by tagging themselves
 * `data-nav-theme="dark"` — the hook probes the point `probeY` pixels below
 * the viewport top and takes the last tagged element covering it, so a dark
 * band nested inside a light section wins over its parent.
 */
export function useNavState(probeY = 44): NavState {
  const [state, setState] = useState<NavState>({ scrolled: false, theme: "light" });

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const zones = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let theme: NavTheme = "light";
      zones.forEach((zone) => {
        const { top, bottom } = zone.getBoundingClientRect();
        if (top <= probeY && bottom > probeY) {
          theme = zone.dataset.navTheme === "dark" ? "dark" : "light";
        }
      });

      setState((prev) => {
        const scrolled = window.scrollY > 24;
        return prev.scrolled === scrolled && prev.theme === theme ? prev : { scrolled, theme };
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [probeY]);

  return state;
}
