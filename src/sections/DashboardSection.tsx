import { Reveal } from "../components/motion/Reveal";
import { SectionIntro } from "../components/ui/SectionIntro";
import chartIcon from "../assets/icons/chart.svg";
import chartUpIcon from "../assets/icons/chart-up.svg";
import conferenceIcon from "../assets/icons/conference.svg";
import speechIcon from "../assets/icons/speech.svg";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
const monthDays = Array.from({ length: 30 }, (_, i) => i + 1);
const today = 17;

const events = [
  { icon: conferenceIcon, title: "Pipeline review call", time: "10:00 AM – 10:30 AM" },
  { icon: speechIcon, title: "Follow-up: Meridian Corp", time: "2:15 PM – 2:45 PM" },
];

const funnel = [
  { label: "New Leads", value: "652", pct: 100 },
  { label: "AI Contacted", pct: 72 },
  { label: "Proposal send", pct: 49 },
  { label: "Meet schedules", pct: 17 },
  { label: "Deal Closed", pct: 10 },
];

const stats = [
  { value: "1,482", label: "New Opportunities" },
  { value: "11,703", label: "Proposals Sent" },
  { value: "112", label: "Ready to close" },
];

const quickActions = [
  "Summarize list of most asked questions.",
  "Exports the data in an excel for last week",
  "Prepare reminder AI calls tables with trackers",
];

/** node 3139:11198 "Frame 2147263272" — the blue dashboard showcase. */
export function DashboardSection() {
  return (
    <section className="bg-paper py-24">
      <SectionIntro
        headline={<>You&rsquo;re getting leads. So why aren&rsquo;t they buying?</>}
        body={
          <>
            RedApe doesn&rsquo;t just find leads — it tracks every reply, every meeting, and every
            stalled deal, so you always know exactly where the funnel is leaking.
          </>
        }
        className="mb-14"
      />

      <Reveal y={56} delay={0.1}>
        <div data-nav-theme="dark" className="bg-brand-blue px-4 py-16 sm:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-[1fr_1.1fr]">
            {/* Calendar widget */}
            <div className="flex flex-col gap-5 rounded-[20px] bg-white p-6 shadow-[0_30px_70px_-25px_rgba(3,20,60,0.5)] sm:p-7">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-sans text-micro font-medium uppercase tracking-wide text-muted">
                    Tuesday
                  </p>
                  <p className="font-display text-h3 font-bold text-ink">March 17</p>
                </div>
                <span className="rounded-full bg-surface-4 px-3 py-1 font-mono-ui text-micro font-medium text-muted">
                  Today
                </span>
              </div>

              <div className="grid grid-cols-7 gap-y-2 text-center">
                {weekdays.map((d, i) => (
                  <span key={`h-${i}`} className="font-mono-ui text-micro font-medium text-muted">
                    {d}
                  </span>
                ))}
                {monthDays.map((day) => (
                  <span
                    key={day}
                    className={`mx-auto flex size-7 items-center justify-center rounded-full font-mono-ui text-micro ${
                      day === today ? "bg-ink text-white" : "text-ink/70"
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-line-soft pt-4">
                {events.map((event) => (
                  <div
                    key={event.title}
                    className="flex items-center gap-3 rounded-xl bg-surface-4 px-3 py-2.5"
                  >
                    <img src={event.icon} alt="" className="size-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate font-sans text-body font-medium text-ink">{event.title}</p>
                      <p className="font-mono-ui text-micro text-muted">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel + stats widget */}
            <div className="flex flex-col gap-5 rounded-[20px] bg-white p-6 shadow-[0_30px_70px_-25px_rgba(3,20,60,0.5)] sm:p-7">
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-surface-4 p-3">
                    <p className="font-display text-h3 font-bold text-ink">{stat.value}</p>
                    <p className="font-mono-ui text-micro text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <img src={chartIcon} alt="" className="size-5" />
                <p className="font-sans text-body font-semibold text-ink">AI Sales Assistance funnel</p>
              </div>

              <div className="flex flex-col gap-2">
                {funnel.map((tier) => (
                  <div key={tier.label} className="flex items-center gap-3">
                    <span className="w-[92px] shrink-0 font-mono-ui text-micro text-muted">
                      {tier.label}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-4">
                      <div
                        className="h-full rounded-full bg-brand-blue"
                        style={{ width: `${tier.pct}%` }}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right font-mono-ui text-micro font-medium text-ink">
                      {tier.value ?? `${tier.pct}%`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-line-soft pt-4">
                {quickActions.map((action) => (
                  <div key={action} className="flex items-center gap-2">
                    <img src={chartUpIcon} alt="" className="size-4 shrink-0 opacity-60" />
                    <p className="font-mono-ui text-micro text-muted">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
