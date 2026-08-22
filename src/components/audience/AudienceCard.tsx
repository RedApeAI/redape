import type { CSSProperties } from "react";
import { cx } from "../../lib/cx";
import type { AudienceCardSpec } from "./audienceCards";

/**
 * node 3197:21642 "Card 2" is the file's own hover state: bg lifts to the
 * page's white, the artwork shrinks into the corner, and the body line
 * appears under the label. Both states share one flex-col layout with the
 * label pinned to the bottom, so the artwork shrinking is what pushes the
 * label upward — no separate "move up" animation needed.
 */
export function AudienceCard({ card, style, className }: { card: AudienceCardSpec; style?: CSSProperties; className?: string }) {
  return (
    <div
      style={style}
      className={cx(
        "group flex h-full flex-col justify-between border border-[#e2e1dc] bg-[#f5f4f0] p-6 transition-colors duration-300 hover:bg-paper sm:p-8",
        className,
      )}
    >
      <div className="aspect-[1404/1120] w-full overflow-hidden transition-[width,height] duration-300 ease-out group-hover:aspect-auto group-hover:h-[112px] group-hover:w-[140px]">
        <img src={card.image} alt="" aria-hidden className="size-full object-contain" />
      </div>

      <div className="flex flex-col items-start">
        <p className="font-mono-ui text-[19px] font-semibold tracking-[-0.4px] text-ink">{card.label}</p>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-3 font-mono-ui text-[13px] leading-[1.45] tracking-[-0.26px] text-muted-2">
              {card.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
