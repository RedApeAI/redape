import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../components/motion/Reveal";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import chevronDown from "../assets/icons/chevron-down.svg";

const faqs = [
  {
    question: "How does RedApe address the challenges in selling?",
    answer:
      "Most pipelines leak in the gaps between conversations — the reply nobody chased, the meeting nobody booked, the deal that quietly went cold. RedApe works those gaps: it reads every inbound reply, writes the follow-up, books the call, and tells you which deals moved and which stalled.",
  },
  {
    question: "What advantages does RedApe offer to companies?",
    answer:
      "One request in plain language becomes real work — campaigns built, emails and DMs sent, leads chased, meetings on the calendar. Your team stops running the outreach machinery and starts spending its hours on the conversations that are actually worth having.",
  },
  {
    question: "What sets RedApe apart from other sales platforms?",
    answer:
      "Sequencers blast the same message at everyone and stop learning on day one. RedApe compounds: it watches what earns replies across your whole funnel and adapts your outreach week over week, so month three works measurably better than month one.",
  },
];

/**
 * The FAQ block that closes the marketing content: the standfirst holds the
 * left column while the questions stack on the right, one open at a time.
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-paper">
      <div className="mx-auto grid w-full max-w-[1728px] gap-12 px-6 py-20 sm:px-[84px] lg:grid-cols-2 lg:gap-[120px] lg:py-[120px]">
        <Reveal>
          <div className="flex flex-col items-start gap-5">
            <Eyebrow>[ FAQ ]</Eyebrow>
            <h2 className="font-display text-h2 text-balance text-black lg:max-w-[13ch]">
              Frequently asked questions
            </h2>
            <p className="max-w-[46ch] font-sans text-lead font-medium text-muted">
              Everything you need to know about RedApe and how we&rsquo;re changing the way sales
              teams work.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-end gap-6">
            <ul className="w-full divide-y divide-line-soft border border-line-soft">
              {faqs.map((faq, i) => {
                const isOpen = open === i;

                return (
                  <li key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors duration-200 hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/30 sm:px-7"
                    >
                      <span className="font-sans text-lead font-semibold text-ink">
                        {faq.question}
                      </span>
                      <img
                        src={chevronDown}
                        alt=""
                        aria-hidden
                        className={`size-5 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] px-6 pb-6 font-sans text-body text-muted sm:px-7">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <Button size="sm" withArrow>
              Read More
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
