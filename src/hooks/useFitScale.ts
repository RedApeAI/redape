import { useLayoutEffect, useRef, useState } from "react";

/**
 * Uniformly scales a fixed-size composition down to whatever width its
 * container ends up with.
 *
 * The product mocks in the file are laid out as absolute pixel positions on
 * a fixed canvas (1385x757 for the dashboard, ~352x380 per hive column).
 * Re-expressing those as percentages would shear the elbow connectors and
 * the funnel plot, so instead the canvas keeps its native geometry and the
 * whole thing is scaled — one transform, no distortion.
 *
 * `min` stops the scale bottoming out on phones; below it the caller lets
 * the stage overflow and scroll rather than shrinking the mock to a stamp.
 */
export function useFitScale(naturalWidth: number, min = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const width = el.getBoundingClientRect().width;
      if (width) setScale(Math.max(min, Math.min(1, width / naturalWidth)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [naturalWidth, min]);

  return { ref, scale };
}
