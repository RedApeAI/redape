import pipeline from "../../assets/icons/pipeline.svg";
import arrowUpRightDark from "../../assets/icons/arrow-up-right-dark.svg";
import layer1 from "../../assets/graphics/funnel-layer-1.svg";
import layer2 from "../../assets/graphics/funnel-layer-2.svg";
import layer3 from "../../assets/graphics/funnel-layer-3.svg";

/**
 * The three plot bands, back to front. The two behind are the same curve
 * drawn taller and at 20% fill, which is what gives the plot its soft edge.
 */
const layers = [
  { src: layer1, left: -15.61, top: 2.64, height: 169.155 },
  { src: layer2, left: -15.06, top: 8.66, height: 158.207 },
  { src: layer3, left: -15.06, top: 17.42, height: 140.689 },
];

/** Stage bands. The second is tinted to read as the hovered column. */
const bands = [
  { left: 0, width: 79.377 },
  { left: 79.38, width: 78.83, lit: true },
  { left: 158.2, width: 79.925 },
  { left: 238.13, width: 78.83 },
  { left: 316.96, width: 79.377 },
];

const ticks = [
  { left: 15.32, width: 48.721, pct: "100%", label: "New Leads", fill: false },
  { left: 94.16, width: 48.721, pct: "72%", label: "AI Contacted", fill: false },
  { left: 171.34, width: 58.575, pct: "49%", label: "Proposal send", fill: true },
  { left: 245.25, width: 64.597, pct: "17%", label: "Meet schedules", fill: true },
  { left: 331.2, width: 51.458, pct: "10%", label: "Deal Closed", fill: false },
];

/** node 3144:10329 — "AI Sales Assistance funnel". */
export function FunnelCard() {
  return (
    <div className="flex h-[250.175px] w-[443.964px] flex-col gap-[7.664px] overflow-hidden rounded-[6.569px] bg-white p-[10.949px] shadow-[0_18px_49px_-17px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-[5.474px]">
        <div className="flex flex-1 items-center gap-[5.474px] p-[3.285px]">
          <img src={pipeline} alt="" className="size-[13.138px]" />
          <p className="font-mono-ui text-[8.759px] font-semibold leading-[1.5] text-[#111]">
            AI Sales Assistance funnel
          </p>
        </div>
        <span className="flex items-center rounded-full bg-surface-3 p-[3.285px]">
          <img src={arrowUpRightDark} alt="" className="size-[13.138px]" />
        </span>
      </div>

      <p className="px-[3.285px] font-display text-[15.328px] font-semibold leading-[1.5] text-black">
        652
      </p>

      <div className="relative flex-1 overflow-hidden rounded-[5.474px] bg-surface-3">
        {bands.map((band) => (
          <div
            key={band.left}
            className={`absolute top-0 h-[168.608px] ${band.lit ? "bg-white/40" : ""}`}
            style={{ left: band.left, width: band.width }}
          />
        ))}

        {layers.map((layer) => (
          <img
            key={layer.src}
            src={layer.src}
            alt=""
            className="absolute w-[423.71px] max-w-none"
            style={{ left: layer.left, top: layer.top, height: layer.height }}
          />
        ))}

        {ticks.map((tick) => (
          <div
            key={tick.label}
            className="absolute top-[81.02px] flex flex-col items-center gap-[52.553px]"
            style={{ left: tick.left, width: tick.width }}
          >
            <span className="flex items-center justify-center whitespace-nowrap rounded-[4.379px] bg-ink-soft p-[3.285px] font-mono-ui text-[6.569px] font-medium tracking-[-0.3285px] text-paper">
              {tick.pct}
            </span>
            <span
              className={`flex items-center justify-center whitespace-nowrap rounded-[4.379px] bg-white p-[5.474px] font-mono-ui text-[7.664px] font-medium tracking-[-0.3832px] text-ink ${
                tick.fill ? "w-full" : ""
              }`}
            >
              {tick.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
