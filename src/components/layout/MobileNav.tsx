import { useState } from "react";
import { motion } from "framer-motion";
import { cx } from "../../lib/cx";
import { navItems } from "./navConfig";
import { Button } from "../ui/Button";
import chevronDown from "../../assets/icons/chevron-down.svg";

interface MobileNavProps {
  dark: boolean;
  onNavigate: () => void;
}

/**
 * The sheet behind the hamburger below `lg`. Same items as the desktop bar,
 * with each hover menu turned into an accordion so nothing is unreachable
 * on a phone.
 */
export function MobileNav({ dark, onNavigate }: MobileNavProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <motion.div
      // x stays in the transform alongside y so motion doesn't clobber the centring.
      initial={{ opacity: 0, y: -10, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -10, x: "-50%" }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        // The bar itself is only as wide as its contents, so the sheet sizes to the viewport instead.
        "absolute left-1/2 top-full z-10 mt-3 max-h-[calc(100dvh-8rem)] w-[min(92vw,24rem)] overflow-y-auto rounded-panel border p-3 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.35)] lg:hidden",
        dark ? "border-white/10 bg-nav-dark" : "border-black/[0.07] bg-paper",
      )}
    >
      {navItems.map((item) => {
        const expanded = open === item.label;

        if (!item.menu) {
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cx(
                "block rounded-card px-3 py-3 font-sans text-nav font-medium transition-colors",
                dark ? "text-white hover:bg-white/[0.07]" : "text-ink hover:bg-surface-3",
              )}
            >
              {item.label}
            </a>
          );
        }

        return (
          <div key={item.label}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : item.label)}
              className={cx(
                "flex w-full items-center justify-between rounded-card px-3 py-3 font-sans text-nav font-medium transition-colors",
                dark ? "text-white hover:bg-white/[0.07]" : "text-ink hover:bg-surface-3",
              )}
            >
              {item.label}
              <img
                src={chevronDown}
                alt=""
                className={cx(
                  "size-4 transition-transform duration-200",
                  expanded && "rotate-180",
                  dark && "invert",
                )}
              />
            </button>

            {expanded && (
              <div className="flex flex-col gap-0.5 pb-2 pl-3">
                {[...item.menu.lead, ...(item.menu.aside?.items ?? [])].map((leaf) => (
                  <a
                    key={leaf.label}
                    href={leaf.href}
                    onClick={onNavigate}
                    className={cx(
                      "rounded-card px-3 py-2 font-sans text-body transition-colors",
                      dark ? "text-white/70 hover:bg-white/[0.07]" : "text-muted hover:bg-surface-3",
                    )}
                  >
                    {leaf.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-2 flex flex-col gap-2 border-t pt-3 sm:hidden" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "var(--color-line-soft)" }}>
        <Button variant="outline" tone={dark ? "dark" : "light"} size="sm" onClick={onNavigate}>
          Sign In
        </Button>
      </div>
    </motion.div>
  );
}
