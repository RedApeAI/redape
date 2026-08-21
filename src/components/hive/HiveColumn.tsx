import { FitStage } from "../ui/FitStage";
import { cx } from "../../lib/cx";
import { HiveOrb } from "./HiveOrb";
import { HiveTag } from "./HiveTag";
import { HIVE_STAGE_HEIGHT, type HiveColumnSpec } from "./hiveColumns";
import hatchTile from "../../assets/backgrounds/hatch-tile.png";

/**
 * One week of the hive: a mind-map plate over a footer caption. The map is
 * a fixed canvas so the elbow leaders keep meeting their tags exactly, and
 * scales with whatever width the column gets.
 */
export function HiveColumn({ column, className }: { column: HiveColumnSpec; className?: string }) {
  return (
    <div className={cx("flex flex-col overflow-hidden bg-line-soft", className)}>
      <div className="relative shrink-0 rounded-[12px] border-l border-t border-line-soft bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[12px] opacity-[0.08]"
          style={{ backgroundImage: `url(${hatchTile})`, backgroundSize: "15.54px 15.54px" }}
        />

        <FitStage width={column.width} height={HIVE_STAGE_HEIGHT} className="relative overflow-hidden">
          {column.motes.map(([left, top]) => (
            <span
              key={`${left}-${top}`}
              aria-hidden
              className="absolute size-[7.961px] bg-ink"
              style={{ left, top }}
            />
          ))}

          {column.links.map((link) => (
            <div
              key={link.src}
              aria-hidden
              className="absolute"
              style={{ left: link.left, top: link.top, width: link.width, height: link.height }}
            >
              <img src={link.src} alt="" className="absolute block max-w-none" style={{ inset: link.inset }} />
            </div>
          ))}

          <HiveOrb
            className={column.orb.centered ? "-translate-x-1/2 -translate-y-1/2" : "-translate-y-1/2"}
            style={{ left: column.orb.left, top: column.orb.top }}
          />

          {column.tags.map((tag) => (
            <HiveTag key={tag.label} {...tag} />
          ))}
        </FitStage>
      </div>

      <div className="flex flex-1 flex-col gap-2 rounded-[12px] border border-line-soft bg-white px-[26px] py-5 leading-[1.5]">
        <p className="font-display text-[20px] font-bold tracking-[-0.4px] text-ink">{column.week}</p>
        <p className="font-sans text-[16px] font-medium tracking-[-0.32px] text-muted-2">
          {column.title}
        </p>
      </div>
    </div>
  );
}
