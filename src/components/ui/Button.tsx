import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import arrowCta from "../../assets/icons/arrow-cta.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  /** Lightness of the surface behind the button, not of the button itself. */
  tone?: "light" | "dark";
  size?: "sm" | "md";
  withArrow?: boolean;
}

const base =
  "group/btn inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-control font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-0";

const sizes = {
  sm: "px-4 py-2 text-nav",
  md: "px-6 py-3.5 text-nav sm:px-7 sm:py-4",
} as const;

/** The dark "Start Free trial now" / outlined "Sign In" button used everywhere on the page. */
export function Button({
  variant = "primary",
  tone = "light",
  size = "md",
  withArrow = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const dark = tone === "dark";

  return (
    <button
      className={cx(
        base,
        sizes[size],
        dark ? "focus-visible:ring-white/70 focus-visible:ring-offset-nav-dark" : "focus-visible:ring-ink/40 focus-visible:ring-offset-paper",
        variant === "primary" &&
          (dark
            ? "bg-paper text-ink hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]"
            : "bg-ink font-display text-paper hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_26px_-12px_rgba(0,0,0,0.65)]"),
        variant === "outline" &&
          (dark
            ? "border border-white/30 text-white hover:border-white/70 hover:bg-white/10"
            : "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.05]"),
        className,
      )}
      {...rest}
    >
      {children}
      {withArrow && (
        <img
          src={arrowCta}
          alt=""
          className={cx(
            "size-5 rotate-90 transition-transform duration-200 group-hover/btn:translate-x-1",
            dark && "invert",
          )}
        />
      )}
    </button>
  );
}
