import { motion } from "framer-motion";
import { cx } from "../../lib/cx";
import type { NavMenu } from "./navConfig";
import chevronDown from "../../assets/icons/chevron-down.svg";

interface NavMenuPanelProps {
  menu: NavMenu;
  dark: boolean;
}

/**
 * The hover panel that drops out of a navbar item. Two columns: an icon
 * list on the left where each row highlights and reveals a chevron, and a
 * plainer secondary list on the right.
 */
export function NavMenuPanel({ menu, dark }: NavMenuPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        "absolute left-0 top-full z-10 mt-3 w-[680px] max-w-[calc(100vw-2rem)] origin-top overflow-hidden rounded-panel border shadow-[0_32px_80px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        dark ? "border-white/10 bg-nav-dark" : "border-black/[0.07] bg-paper",
      )}
    >
      <div className="grid gap-2 p-3 sm:grid-cols-[1.15fr_1fr] sm:p-4">
        <div className="flex flex-col">
          {menu.lead.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cx(
                "group/row flex items-center gap-3 rounded-card px-3 py-3 transition-colors duration-150",
                dark ? "hover:bg-white/[0.07]" : "hover:bg-surface-3",
              )}
            >
              {item.icon && (
                <span
                  className={cx(
                    "flex size-9 shrink-0 items-center justify-center rounded-card transition-colors duration-150",
                    dark ? "bg-white/10" : "bg-surface-3 group-hover/row:bg-white",
                  )}
                >
                  <img src={item.icon} alt="" className={cx("size-[18px]", dark && "invert")} />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span
                  className={cx(
                    "block font-sans text-nav font-medium",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
                {item.description && (
                  <span
                    className={cx(
                      "mt-0.5 block font-sans text-micro",
                      dark ? "text-white/55" : "text-muted",
                    )}
                  >
                    {item.description}
                  </span>
                )}
              </span>
              <img
                src={chevronDown}
                alt=""
                className={cx(
                  "size-4 shrink-0 -rotate-90 opacity-0 transition-all duration-150 group-hover/row:translate-x-0.5 group-hover/row:opacity-60",
                  dark && "invert",
                )}
              />
            </a>
          ))}
        </div>

        {menu.aside && (
          <div
            className={cx(
              "flex flex-col gap-1 rounded-card p-3 sm:border-l sm:pl-5",
              dark ? "border-white/10 bg-white/[0.03]" : "border-line-soft bg-surface-2/60",
            )}
          >
            <p
              className={cx(
                "px-1 pb-1 font-sans text-eyebrow font-semibold uppercase",
                dark ? "text-white/40" : "text-muted/70",
              )}
            >
              {menu.aside.heading}
            </p>
            {menu.aside.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cx(
                  "rounded-card px-1 py-2 transition-colors duration-150",
                  dark ? "hover:bg-white/[0.07]" : "hover:bg-white",
                )}
              >
                <span
                  className={cx(
                    "block font-sans text-nav font-medium",
                    dark ? "text-white" : "text-ink",
                  )}
                >
                  {item.label}
                </span>
                {item.description && (
                  <span
                    className={cx(
                      "mt-0.5 block font-sans text-micro",
                      dark ? "text-white/55" : "text-muted",
                    )}
                  >
                    {item.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
