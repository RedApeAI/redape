import briefcase from "../../assets/icons/briefcase-business.svg";
import sent from "../../assets/icons/sent-02.svg";
import packageDelivered from "../../assets/icons/package-delivered-01.svg";
import arrowUpRightLight from "../../assets/icons/arrow-up-right-light.svg";

const stats = [
  { icon: briefcase, value: "1,482", label: "New Opportunities" },
  { icon: sent, value: "11,703", label: "Proposals Sent" },
  { icon: sent, value: "103", label: "New Opportunities" },
  { icon: packageDelivered, value: "112", label: "Ready to close", trend: true },
];

/** node 3144:10283 — the 2x2 block of counters above the calendar. */
export function StatCards() {
  return (
    <div className="flex w-[295px] flex-wrap justify-end gap-[6.569px] drop-shadow-[0_18px_24.5px_rgba(0,0,0,0.12)]">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex w-[143.609px] flex-col gap-[7.664px] overflow-hidden rounded-[6.569px] bg-white p-[10.949px]"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center p-[3.285px]">
              <img src={stat.icon} alt="" className="size-[13.138px]" />
            </span>
            {stat.trend && (
              <span className="flex items-center rounded-full bg-[#ff0033] p-[3.285px]">
                <img src={arrowUpRightLight} alt="" className="size-[13.138px]" />
              </span>
            )}
          </div>
          <div className="flex flex-col gap-[3.285px] px-[3.285px] leading-[1.5]">
            <p className="font-display text-[15.328px] font-semibold text-black">{stat.value}</p>
            <p className="font-mono-ui text-[8.759px] text-ink-soft">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
