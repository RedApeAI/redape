import type { PropsWithChildren } from "react";
import { cx } from "../../lib/cx";

/** Small uppercase label used above section headlines ("ONE AI WORKFORCE"). */
export function Eyebrow({
  children,
  className,
  tone = "red",
}: PropsWithChildren<{ className?: string; tone?: "red" | "ink" }>) {
  return (
    <span
      className={cx(
        "font-sans text-eyebrow font-semibold uppercase",
        tone === "red" ? "text-brand-red" : "text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
