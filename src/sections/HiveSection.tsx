import { Reveal } from "../components/motion/Reveal";
import { RevealGroup, revealItem } from "../components/motion/RevealGroup";
import { motion } from "framer-motion";
import { SectionIntro } from "../components/ui/SectionIntro";
import { Button } from "../components/ui/Button";
import groupAvatar from "../assets/icons/group-avatar.svg";
import userMultiple from "../assets/icons/user-multiple-02.svg";
import messageSquareDot from "../assets/icons/message-square-dot.svg";
import accountRecovery from "../assets/icons/account-recovery.svg";
import promotion from "../assets/icons/promotion.svg";
import aiChat from "../assets/icons/ai-chat-01.svg";

const orbitTags = [
  { icon: userMultiple, label: "Leads", position: "left-[6%] top-[14%]" },
  { icon: messageSquareDot, label: "Replies", position: "right-[10%] top-[8%]" },
  { icon: accountRecovery, label: "Out reach", position: "left-[2%] top-[62%]" },
  { icon: promotion, label: "Campaigns", position: "right-[4%] top-[58%]" },
  { icon: aiChat, label: "Follow-ups", position: "left-[38%] top-[86%]" },
];

const weeks = [
  { label: "Week 1", title: "Learning your business" },
  { label: "Week 3", title: "Connecting the dots" },
  { label: "Week 5", title: "Building your sales intelligence" },
];

/** node 3139:11509 "Frame 2147263274" — the closing "Collective Hive Knowledge" section. */
export function HiveSection() {
  return (
    <section className="bg-paper py-24">
      <SectionIntro
        headline="Collective Hive Knowledge that Improves for weeks"
        body={
          <>
            RedApe learns from what works, adapts your outreach, and gets better at turning
            conversations into customers every week.
          </>
        }
        className="mb-14"
      />

      <Reveal y={56} delay={0.1}>
        <div className="bg-brand-green px-4 py-16 sm:px-10 md:py-24">
          <div
            className="mx-auto max-w-[1110px] rounded-[24px] p-[2px]"
            style={{
              backgroundImage:
                "linear-gradient(97deg, #ff2f2f 5%, #ef7b16 39%, #8a43e1 71%, #d511fd 100%)",
            }}
          >
            <div className="grid gap-6 rounded-[22px] bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
              {/* Hive orb visual */}
              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[18px] bg-white/70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),transparent_65%)]" />
                <div className="relative flex size-[150px] items-center justify-center rounded-full border border-white bg-gradient-to-b from-white/80 to-white/40 shadow-[0_0_40px_rgba(255,255,255,0.8)]">
                  <img src={groupAvatar} alt="" className="size-16 rounded-full object-cover" />
                </div>

                {orbitTags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`absolute flex items-center gap-1.5 rounded-full border-2 border-white bg-chip px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] ${tag.position}`}
                  >
                    <span className="flex size-5 items-center justify-center rounded bg-gradient-to-b from-[#292929] to-[#111]">
                      <img src={tag.icon} alt="" className="size-3" />
                    </span>
                    <span className="font-mono-ui text-micro font-medium text-ink-soft">
                      {tag.label}
                    </span>
                  </span>
                ))}
              </div>

              {/* Week timeline */}
              <RevealGroup className="flex flex-col justify-center gap-4">
                {weeks.map((week) => (
                  <motion.div
                    key={week.label}
                    variants={revealItem}
                    className="flex flex-col gap-1.5 rounded-xl border border-line-soft bg-white px-6 py-5"
                  >
                    <p className="font-display text-h3 font-bold text-ink">
                      {week.label}
                    </p>
                    <p className="font-sans text-body font-medium text-muted-2">{week.title}</p>
                  </motion.div>
                ))}
              </RevealGroup>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-[1110px] flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="max-w-[52ch] text-center font-sans text-lead font-medium leading-snug text-white sm:text-left">
              Your data stays yours. RedApe uses secure, encrypted connections and never reads
              your personal messages.
            </p>
            <Button withArrow className="shrink-0">
              Start Free trail now
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
