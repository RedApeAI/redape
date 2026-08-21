import shrub from "../../assets/icons/shrub.svg";
import aiSheets from "../../assets/icons/ai-sheets.svg";
import callSpark from "../../assets/icons/call-spark-02.svg";

const actions = [
  { icon: shrub, text: "Summarize list of most asked questions." },
  { icon: aiSheets, text: "Exports the data in an excel for last week", active: true },
  { icon: callSpark, text: "Prepare reminder AI calls tables with trackers" },
];

/** node 3144:10377 — the suggestion list, with the middle row shown hovered. */
export function QuickActions() {
  return (
    <div className="flex w-[506px] flex-col gap-2 overflow-hidden rounded-[12px] bg-white p-4 shadow-[0_18px_49px_-17px_rgba(0,0,0,0.25)]">
      {actions.map((action) => (
        <div
          key={action.text}
          className={`flex items-center gap-1.5 rounded-[10px] ${
            action.active ? "bg-surface-4" : ""
          }`}
        >
          <span className="flex items-center rounded-md p-2.5">
            <img src={action.icon} alt="" className="size-6" />
          </span>
          <p className="whitespace-nowrap font-display text-[17px] leading-[normal] text-black">{action.text}</p>
        </div>
      ))}
    </div>
  );
}
