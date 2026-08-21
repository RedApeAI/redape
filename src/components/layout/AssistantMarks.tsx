/**
 * Stand-in glyphs for the "ask about RedApe on" row.
 *
 * These are deliberately generic geometric marks, not the assistants' real
 * logos — those are trademarked artwork that should come in as supplied
 * brand assets rather than be redrawn from memory. Swap the `mark` of each
 * entry in `assistants` for the real file when it lands; the row's layout
 * does not change.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Six-spoke asterisk. */
export function MarkAsterisk() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <g {...stroke}>
        <path d="M12 4v16M5.1 8l13.8 8M18.9 8L5.1 16" />
      </g>
    </svg>
  );
}

/** Four-point sparkle. */
export function MarkSparkle() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <path
        d="M12 3c.5 4.6 4.4 8.5 9 9-4.6.5-8.5 4.4-9 9-.5-4.6-4.4-8.5-9-9 4.6-.5 8.5-4.4 9-9Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Broadcast arcs. */
export function MarkArcs() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <g {...stroke}>
        <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
        <path d="M8.1 8.1a5.5 5.5 0 0 0 0 7.8M15.9 15.9a5.5 5.5 0 0 0 0-7.8" />
        <path d="M5.2 5.2a9.6 9.6 0 0 0 0 13.6M18.8 18.8a9.6 9.6 0 0 0 0-13.6" />
      </g>
    </svg>
  );
}

/** Interlocking hex knot. */
export function MarkKnot() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <g {...stroke}>
        <path d="M12 3.5 19 7.5v9L12 20.5 5 16.5v-9L12 3.5Z" />
        <path d="M12 3.5v8.6M19 7.5l-7 4.6M5 16.5l7-4.6" />
      </g>
    </svg>
  );
}

/** Circle with a diagonal bar. */
export function MarkSlash() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <g {...stroke}>
        <circle cx="12" cy="12" r="8" />
        <path d="M17.7 6.3 6.3 17.7" />
      </g>
    </svg>
  );
}
