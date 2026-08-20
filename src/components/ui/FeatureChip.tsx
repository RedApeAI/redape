import { cx } from "../../lib/cx";

interface FeatureChipProps {
  label: string;
  dotColor: string;
  className?: string;
}

/** Dark rounded tag with a colored dot — the marquee items in the command section. */
export function FeatureChip({ label, dotColor, className }: FeatureChipProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2.5 whitespace-nowrap rounded-[10px] bg-chip-dark px-3.5 py-3 font-mono-ui text-nav font-medium text-white",
        className,
      )}
    >
      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
      {label}
    </span>
  );
}
