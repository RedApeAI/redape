import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Full loop duration in seconds — kept slow to match the page's unhurried pace. */
  duration?: number;
  className?: string;
}

/**
 * Infinite horizontal ticker (Figma's masked "Section: List" component,
 * node 3139:11072) — the track is duplicated and animated by exactly its
 * own width so the loop seams invisibly.
 */
export function Marquee({ children, duration = 32, className = "" }: MarqueeProps) {
  return (
    <div className={`group relative w-full overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 gap-3">{children}</div>
        <div className="flex shrink-0 gap-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
