import { cx } from "../../lib/cx";
import checkMini from "../../assets/icons/check-mini.svg";
import starFour from "../../assets/icons/star-four.svg";
import arrowCta from "../../assets/icons/arrow-cta.svg";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  badge?: { icon: string; label: string };
  features: readonly string[];
  ctaLabel: string;
  footnote: string;
  highlighted?: boolean;
}

/**
 * One plan in the pricing row (Figma 3193:21 / 3193:91 / 3193:234). The
 * three cards share a border-box layout; only the recommended plan swaps
 * the border for red and gets the striped "Our Recommendation" ribbon,
 * absolutely positioned above the card so it doesn't affect the row's
 * height. The card is a grid item stretched to the row's tallest sibling,
 * and its feature list carries a `flex-1` spacer so the CTA lines up at
 * the same baseline on every card regardless of how many features it has.
 */
export function PricingCard({
  name,
  description,
  price,
  badge,
  features,
  ctaLabel,
  footnote,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={cx(
        "relative flex h-full flex-col overflow-visible bg-white transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)]",
        highlighted ? "border-2 border-brand-red" : "border border-black/10",
      )}
    >
      {highlighted && (
        <div className="absolute -inset-x-0.5 bottom-full flex items-center justify-center gap-1.5 overflow-hidden bg-brand-red py-2">
          <span
            aria-hidden
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, #fff 0px, #fff 1px, transparent 1px, transparent 9px)",
            }}
          />
          <span className="relative font-sans text-[13px] font-medium text-white">
            Our Recommendation
          </span>
          <img src={starFour} alt="" aria-hidden className="relative size-3.5" />
        </div>
      )}

      {/*
        Reserves the same space the file's plan icon occupies (Figma
        3193:23 / 3193:164 / 3193:236) — a Lottie placeholder that never
        rendered any artwork, but the layout below it depends on the gap.
      */}
      <div aria-hidden className="h-12 shrink-0" />

      <div className="flex flex-1 flex-col gap-6 px-5 pb-5">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-[19px] font-semibold leading-[1.15] tracking-[-0.02em] text-black">
            {name}
          </h3>
          <p className="font-sans text-[15px] font-medium text-[#4d4d4d]">{description}</p>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-display text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-black">
            {price}
          </p>
          {badge && (
            <span className="flex items-center gap-1.5 rounded-[7px] bg-[#1a1a1a] py-1 pl-1.5 pr-2 shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
              <img src={badge.icon} alt="" aria-hidden className="size-3.5" />
              <span className="font-sans text-[12px] font-medium text-white">{badge.label}</span>
            </span>
          )}
        </div>

        <div className="h-px w-full bg-line-soft" />

        <ul className="flex flex-1 flex-col gap-2.5">
          {features.map((feature, i) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="flex shrink-0 items-center justify-center rounded-[6px] bg-gradient-to-b from-[#333] to-[#1f1f1f] p-1">
                <img src={checkMini} alt="" aria-hidden className="size-[10px]" />
              </span>
              <span
                className={cx(
                  "flex-1 text-[15px] text-[#111]",
                  i === 0 ? "font-display font-semibold" : "font-sans font-medium",
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            className={cx(
              "flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-3 font-display text-[15px] font-semibold transition-colors duration-200",
              highlighted
                ? "bg-brand-red text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] hover:bg-[#e6001f]"
                : "bg-surface-3 text-[#111] hover:bg-[#e7e5e4]",
            )}
          >
            {ctaLabel}
            <img
              src={arrowCta}
              alt=""
              aria-hidden
              className={cx("size-3.5 rotate-90", !highlighted && "invert")}
            />
          </button>
          <p className="w-full text-center font-sans text-[13px] font-medium text-[#808080]">
            {footnote}
          </p>
        </div>
      </div>
    </div>
  );
}

export type { PricingCardProps };
