import type { ReactNode } from "react";
import { Reveal } from "../motion/Reveal";

interface SectionIntroProps {
  eyebrow?: ReactNode;
  headline: ReactNode;
  body: ReactNode;
  className?: string;
}

/**
 * The headline + body pairing repeated at the top of every content
 * section ("Say it. RedApe does it.", "You're getting leads...",
 * "Collective Hive Knowledge...") — same 70px/83px display type each time.
 */
export function SectionIntro({ eyebrow, headline, body, className = "" }: SectionIntroProps) {
  return (
    <div className={`mx-auto flex w-full max-w-[910px] flex-col items-center gap-5 px-6 text-center sm:gap-7 ${className}`}>
      {eyebrow && <Reveal>{eyebrow}</Reveal>}
      <Reveal delay={0.05}>
        <h2 className="font-display text-h2 text-balance text-black">
          {headline}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-[62ch] font-sans text-lead font-medium text-muted">{body}</p>
      </Reveal>
    </div>
  );
}
