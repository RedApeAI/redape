import videoOff from "../../assets/icons/video-off.svg";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

/** Five rows of seven, with the blanks the month starts and ends on. */
const weeks = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, null, null, null],
];

const SELECTED = 7;
/** Days carrying a booking, drawn bold rather than filled. */
const MARKED = [14, 21, 28];

const event = { title: "Monica begum / Office Meetings", time: "08:00 - 09:00 PM" };

const today = ["#ff0033", "#8a43e1"];
const tomorrow = ["#29c735", "#0062ff"];

function EventCard({ color }: { color: string }) {
  return (
    <div
      className="flex w-full items-center gap-[10.053px] rounded-[11.728px] px-[13.404px] py-[10.053px]"
      style={{ backgroundColor: color }}
    >
      <span className="flex size-[20.105px] shrink-0 items-center justify-center">
        <img src={videoOff} alt="" className="size-[15.079px]" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[1.675px] leading-[normal]">
        <p className="truncate font-mono-ui text-[10.89px] font-semibold text-white">
          {event.title}
        </p>
        <p className="font-mono-ui text-[9.215px] font-medium text-white/70">{event.time}</p>
      </div>
    </div>
  );
}

/**
 * node 3144:10161 — the calendar widget. Its 306px height deliberately
 * clips the last booking, exactly as the frame does in the file.
 */
export function CalendarCard() {
  return (
    <div className="flex h-[306px] w-[314px] flex-col gap-[16.755px] overflow-hidden rounded-[10.053px] bg-white p-[20.105px] shadow-[0_18px_49px_-17px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between">
        <div className="flex w-[105.822px] flex-col gap-[1.628px] font-mono-ui leading-[normal]">
          <p className="text-[10.582px] font-bold uppercase text-accent-violet">Monday</p>
          <p className="text-[14.652px] font-semibold text-[#111827]">September</p>
          <p className="text-[55.353px] font-bold text-[#111827]">07</p>
        </div>

        <div className="flex w-[169.221px] flex-col gap-[4.306px] font-mono-ui leading-[normal]">
          <div className="flex justify-between text-center text-[7.894px] font-semibold">
            {weekdays.map((day, i) => (
              <span
                key={i}
                className={`w-[17.223px] ${i === 0 ? "text-[#9ca3af]" : "text-[#4b5563]"}`}
              >
                {day}
              </span>
            ))}
          </div>

          {weeks.map((week, w) => (
            <div key={w} className="flex justify-between">
              {week.map((day, i) => (
                <span
                  key={i}
                  className={`flex size-[17.223px] items-center justify-center rounded-full text-center text-[8.612px] ${
                    day === SELECTED
                      ? "bg-accent-violet font-bold text-white"
                      : day && MARKED.includes(day)
                        ? "font-bold text-[#111827]"
                        : i === 0
                          ? "font-medium text-[#9ca3af]"
                          : "font-medium text-[#4b5563]"
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[8.377px]">
        {today.map((color) => (
          <EventCard key={color} color={color} />
        ))}
      </div>

      <div className="flex flex-col gap-[8.377px]">
        <p className="pb-[1.675px] pt-[3.351px] font-mono-ui text-[9.215px] font-bold uppercase leading-[normal] text-[#111827]">
          Tomorrow
        </p>
        {tomorrow.map((color) => (
          <EventCard key={color} color={color} />
        ))}
      </div>
    </div>
  );
}
