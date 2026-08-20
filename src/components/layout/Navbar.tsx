import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "../../lib/cx";
import { useNavState } from "../../hooks/useNavState";
import { navItems } from "./navConfig";
import { NavMenuPanel } from "./NavMenuPanel";
import { MobileNav } from "./MobileNav";
import { Button } from "../ui/Button";
import logoMark from "../../assets/icons/logo-mark.svg";
import chevronDown from "../../assets/icons/chevron-down.svg";

/**
 * The bar starts full-width and transparent over the hero, then collapses
 * into a centred pill once the page moves — the wordmark folds away and the
 * chrome tightens. Colour follows whichever section is passing underneath
 * (see `useNavState`), so it inverts over the dark bands and back again.
 *
 * The collapse is a plain CSS width transition between two measured pixel
 * widths: the gutter-to-gutter width of the row, and the bar's own
 * `max-content` width with the wordmark folded away. Intrinsic sizing can't
 * do this on its own — a `fit-content` bar with a shrinkable spacer never
 * reaches full width, because a shrinkable item drags the container's
 * max-content size back down to its own. Measuring keeps both ends exact,
 * so the width, padding, radius and colour all land together.
 */
export function Navbar() {
  const { scrolled, theme } = useNavState();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  /** [collapsed width, gutter-to-gutter width] in px, remeasured on resize. */
  const [widths, setWidths] = useState<[number, number] | null>(null);

  const dark = theme === "dark";
  /**
   * Scroll position alone decides this. Collapsing on hover as well would slide
   * the trigger out from under a stationary cursor mid-transition, and the
   * pointer would land on a different item and switch menus underneath you.
   */
  const compact = scrolled;
  const activeMenu = navItems.find((item) => item.label === openMenu)?.menu;

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  /** Grace period so a diagonal mouse path from trigger to panel does not close it. */
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  useEffect(() => cancelClose, []);

  /**
   * `max-content` on the bar gives its natural width, because the spacer is
   * `flex-1` on a zero basis and so contributes nothing. The wordmark is the
   * one part still in flow whose width varies, so its current footprint comes
   * back off — read live rather than assumed, which keeps the result the same
   * whether it is open, shut, or halfway through folding.
   */
  const measure = useCallback(() => {
    const row = rowRef.current;
    const bar = barRef.current;
    const wordmark = wordmarkRef.current;
    if (!row || !bar || !wordmark) return;

    // Suspend transitions across the probe. Without this, writing a width and
    // reading it back retargets a collapse that is already in flight, and the
    // bar snaps to its end width instead of easing there.
    const transition = bar.style.transition;
    const previous = bar.style.width;
    bar.style.transition = "none";
    bar.style.width = "max-content";
    const natural = bar.offsetWidth;
    bar.style.width = previous;
    bar.offsetWidth; // flush the restore before transitions come back
    bar.style.transition = transition;

    const wordmarkStyle = getComputedStyle(wordmark);
    const footprint =
      parseFloat(wordmarkStyle.marginLeft) + wordmark.getBoundingClientRect().width;

    // clientWidth still includes the row's gutter padding; the bar only gets
    // the content box.
    const gutters = getComputedStyle(row);
    const full =
      row.clientWidth - parseFloat(gutters.paddingLeft) - parseFloat(gutters.paddingRight);

    setWidths([Math.round(natural - footprint), Math.round(full)]);
  }, []);

  useLayoutEffect(() => {
    measure();

    // Width is the only thing worth reacting to. A ResizeObserver reports
    // height too, and the row's height tracks the bar's — so observing it
    // unfiltered would re-measure on every frame of a collapse.
    let lastWidth = rowRef.current?.clientWidth;
    const observer = new ResizeObserver(() => {
      const width = rowRef.current?.clientWidth;
      if (width === lastWidth) return;
      lastWidth = width;
      measure();
    });
    if (rowRef.current) observer.observe(rowRef.current);
    // Web fonts land after first paint and change every label's width.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Horizontal padding stays put in both states so the measurement holds; the
  // page gutter lives on the row outside the bar instead.
  const width = widths && Math.min(compact ? widths[0] : widths[1], widths[1]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div ref={rowRef} className="mx-auto w-full max-w-[1728px] px-3 sm:px-6 md:px-[88px]">
        <motion.div
          ref={barRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={scheduleClose}
          style={width ? { width } : undefined}
          className={cx(
            "pointer-events-auto relative mx-auto flex items-center gap-2 border px-2.5 transition-[width,padding,margin,border-radius,background-color,border-color,box-shadow] duration-500 ease-nav",
            compact
              ? "mt-3 rounded-pill py-2 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:py-2.5"
              : "mt-0 rounded-none border-transparent bg-transparent py-5 shadow-none md:py-7",
            compact && (dark ? "border-white/10 bg-nav-dark/95" : "border-black/[0.06] bg-paper/93"),
          )}
        >
          {/* Logo — the wordmark folds away once the bar collapses. */}
          <a
            href="#top"
            className="flex shrink-0 items-center rounded-control px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
          >
            <img
              src={logoMark}
              alt="RedApe"
              className={cx("h-8 w-auto shrink-0 transition-[filter] duration-500 ease-nav", dark && "invert")}
            />
            <span
              ref={wordmarkRef}
              aria-hidden
              className={cx(
                "overflow-hidden whitespace-nowrap font-sans text-wordmark font-bold transition-[max-width,opacity,margin] duration-500 ease-nav",
                dark ? "text-white" : "text-ink",
                compact ? "ml-0 max-w-0 opacity-0" : "ml-1.5 max-w-[8rem] opacity-100",
              )}
            >
              RedApe
            </span>
          </a>

          {/* Desktop links */}
          <nav className="relative hidden shrink-0 items-center lg:flex">
            {navItems.map((item) => {
              const isOpen = openMenu === item.label;
              const triggerClass = cx(
                "flex items-center gap-1 whitespace-nowrap rounded-control px-3 py-2 font-sans text-nav font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2",
                dark
                  ? "text-white/85 hover:bg-white/10 hover:text-white focus-visible:ring-white/40"
                  : "text-ink/85 hover:bg-ink/[0.06] hover:text-ink focus-visible:ring-ink/30",
                isOpen && (dark ? "bg-white/10 text-white" : "bg-ink/[0.06] text-ink"),
              );

              if (!item.menu) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={triggerClass}
                    onMouseEnter={scheduleClose}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  onFocus={() => setOpenMenu(item.label)}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.label);
                  }}
                  className={triggerClass}
                >
                  {item.label}
                  <img
                    src={chevronDown}
                    alt=""
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180",
                      dark && "invert",
                    )}
                  />
                </button>
              );
            })}

            {/*
              One panel for all three menus, hung off the nav's left edge rather
              than off each trigger — it stays inside the viewport at every
              desktop width, and switching menus cross-fades in place.
            */}
            <AnimatePresence mode="wait">
              {activeMenu && (
                <NavMenuPanel key={openMenu} menu={activeMenu} dark={dark} />
              )}
            </AnimatePresence>
          </nav>

          {/*
            Absorbs whatever slack the measured width leaves over. On a zero
            basis it adds nothing to the bar's `max-content` width, which is
            what makes that measurement the collapsed width.
          */}
          <span aria-hidden className="min-w-2 flex-1 basis-0" />

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden sm:inline-flex">
              <Button variant="outline" tone={dark ? "dark" : "light"} size="sm">
                Sign In
              </Button>
            </span>
            <Button variant="primary" tone={dark ? "dark" : "light"} size="sm">
              Start Now
            </Button>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className={cx(
                "flex size-9 flex-col items-center justify-center gap-[5px] rounded-control transition-colors lg:hidden",
                dark ? "hover:bg-white/10" : "hover:bg-ink/[0.06]",
              )}
            >
              <span
                className={cx(
                  "block h-0.5 w-4 origin-center rounded-full transition-transform duration-300 ease-nav",
                  dark ? "bg-white" : "bg-ink",
                  mobileOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cx(
                  "block h-0.5 w-4 origin-center rounded-full transition-transform duration-300 ease-nav",
                  dark ? "bg-white" : "bg-ink",
                  mobileOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && <MobileNav dark={dark} onNavigate={() => setMobileOpen(false)} />}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
