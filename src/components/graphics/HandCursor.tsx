/**
 * The pointing hand used by the scripted product demo. Drawn as a single
 * closed silhouette so the white fill and dark outline stay clean at any
 * size — no internal seams from overlapping shapes.
 */
export function HandCursor({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 32"
      className={className}
      fill="none"
      aria-hidden
      style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.28))" }}
    >
      <path
        d="M9 4a2 2 0 0 1 4 0v9.5a1.7 1.7 0 0 1 3.4 0v1a1.7 1.7 0 0 1 3.4 0v1a1.7 1.7 0 0 1 3.4 0V21a8.5 8.5 0 0 1-8.5 8.5h-1.8a7 7 0 0 1-5.1-2.2l-4.3-4.7a2.1 2.1 0 0 1 3.1-2.8L8 22.3z"
        fill="#ffffff"
        stroke="#141414"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
