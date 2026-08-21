import { GridTile } from "./GridTile";

interface HeroGridProps {
  /**
   * Distance from the hero section's top back up to the page top. The grid
   * is laid out in the Figma hero's own 1728x1081 coordinate space, which
   * starts behind the sticky navbar rather than at the section boundary.
   */
  topOffset?: number;
  className?: string;
}

/**
 * The blueprint grid behind the hero (Figma node 3144:9634).
 *
 * Figma builds this from one 554x907 tile placed four times: a top band
 * (3144:9696) and a bottom band (3144:9635) that is the top band mirrored
 * vertically, each holding a right-hand tile plus a horizontally mirrored
 * copy on the left. GridTile keeps each one inside its gutter so the centre
 * column stays clean for the headline at any width.
 */
export function HeroGrid({ topOffset = 0, className = "" }: HeroGridProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      /* the hero headline is wider than a section headline, so it needs a wider clear column */
      style={{ "--grid-clear": "1200px" } as React.CSSProperties}
    >
      {/*
        The tiles hug the left and right edges rather than a fixed 1728px
        canvas, so the decoration stays on-screen at any width.
      */}
      <div className="absolute inset-x-0 h-[1081px]" style={{ top: -topOffset }}>
        {/* top band */}
        <div className="absolute inset-x-0 top-0 h-[676px]">
          <GridTile />
          <GridTile mirrored />
        </div>

        {/* bottom band — the top band flipped vertically */}
        <div className="absolute inset-x-0 bottom-[20.88px] h-[676px] -scale-y-100">
          <GridTile />
          <GridTile mirrored />
        </div>
      </div>
    </div>
  );
}
