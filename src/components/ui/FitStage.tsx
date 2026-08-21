import { useLayoutEffect, type PropsWithChildren } from "react";
import { useFitScale } from "../../hooks/useFitScale";
import { cx } from "../../lib/cx";

interface FitStageProps {
  /** Canvas size the children are positioned against, straight from Figma. */
  width: number;
  height: number;
  /** Floor for the scale; under it the stage overflows and scrolls sideways. */
  minScale?: number;
  className?: string;
}

/**
 * Hosts a fixed-size absolute composition and shrinks it to fit the column
 * it lands in. The outer box reserves the *scaled* size so the stage takes
 * up the room it actually occupies rather than its native footprint.
 *
 * Once the scale hits its floor the stage is wider than the column and
 * scrolls; it starts centred, so a phone lands on the middle of the mock
 * and can swipe to either end rather than opening on a blank left margin.
 */
export function FitStage({
  width,
  height,
  minScale = 0,
  className,
  children,
}: PropsWithChildren<FitStageProps>) {
  const { ref, scale } = useFitScale(width, minScale);
  const scrollable = minScale > 0;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !scrollable) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, [ref, scrollable, scale]);

  return (
    <div ref={ref} className={cx("w-full", scrollable && "overflow-x-auto", className)}>
      <div className="mx-auto" style={{ width: width * scale, height: height * scale }}>
        <div
          className="relative"
          style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
