/** node 3144:10486 and friends — a labelled chip hanging off the orb. */
export function HiveTag({
  icon,
  label,
  left,
  top,
}: {
  icon: string;
  label: string;
  left: number;
  top: number;
}) {
  return (
    <div
      className="absolute flex items-center gap-[4.26px] overflow-hidden rounded-[8.521px] border-[1.607px] border-white bg-chip py-[3.55px] pl-[3.55px] pr-[8.012px] shadow-[0_0_13.656px_2px_rgba(0,0,0,0.1)]"
      style={{ left, top }}
    >
      <span className="relative flex items-center overflow-hidden rounded-[6.391px] bg-gradient-to-b from-[#292929] to-[#111] p-[3.55px] shadow-[inset_0_1.42px_2.627px_0_rgba(255,255,255,0.2),inset_0_2.84px_5.681px_0_rgba(0,0,0,0.3),inset_0_1.42px_1.42px_0_rgba(0,0,0,0.5)]">
        <img src={icon} alt="" className="size-[12.781px]" />
      </span>
      <span className="whitespace-nowrap font-mono-ui text-[11.361px] font-medium leading-[1.5] tracking-[-0.5681px] text-[#3d3d3d]">
        {label}
      </span>
    </div>
  );
}
