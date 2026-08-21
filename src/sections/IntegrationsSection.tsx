import { useRef } from "react";
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import { Eyebrow } from "../components/ui/Eyebrow";
import { GridTile } from "../components/graphics/GridTile";
import { useMediaQuery } from "../hooks/useMediaQuery";
import background from "../assets/backgrounds/integrations-bg.webp";
import doodleArrow from "../assets/icons/doodle-arrow.svg";
import whatsapp from "../assets/logos/whatsapp.png";
import linkedin from "../assets/logos/linkedin.png";
import gmail from "../assets/logos/gmail.png";
import slack from "../assets/logos/slack.png";
import xLogo from "../assets/logos/x.png";
import gcalendar from "../assets/logos/gcalendar.png";
import gsheets from "../assets/logos/gsheets.png";
import salesforce from "../assets/logos/salesforce.png";

/**
 * node 3144:9803 — "Connect your leads from".
 *
 * The section pins to the viewport and the single logo slot beside the
 * headline cycles through every connected platform: the outgoing logo
 * lifts away and fades while the next rises into its place. Once the last
 * one lands the pin releases and the page carries on.
 *
 * The sequence is scroll-linked rather than time-based, so it scrubs both
 * ways and never runs ahead of the reader.
 */

/**
 * The order platforms take the slot. Add or remove an entry and the scroll
 * length, timing and slot spacing all follow from the array length.
 *
 * Instagram belongs between LinkedIn and Gmail, but no Instagram tile
 * exists in the supplied assets — drop one into ../assets/logos and add it
 * back here.
 */
const LOGOS = [
  { src: whatsapp, label: "WhatsApp" },
  { src: linkedin, label: "LinkedIn" },
  { src: gmail, label: "Gmail" },
  { src: gcalendar, label: "Google Calendar" },
  { src: salesforce, label: "Salesforce" },
  { src: xLogo, label: "X" },
  { src: gsheets, label: "Google Sheets" },
  { src: slack, label: "Slack" },
];

/** Scroll distance, in viewport heights, spent on each swap. */
const STEP_VH = 50;
/** Share of a logo's turn spent moving; the remainder is a hold. */
const TRANSITION = 0.45;
/** How far a logo travels in and out of the slot, in px. */
const TRAVEL = 110;

/** Settles with a light overshoot — the gentle bounce. */
const settle = cubicBezier(0.34, 1.28, 0.64, 1);
/** Symmetric ease-in-ease-out for fades and departures. */
const smooth = cubicBezier(0.4, 0, 0.6, 1);

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

interface SlotLogoProps {
  progress: MotionValue<number>;
  index: number;
  count: number;
  src: string;
  label: string;
}

/**
 * One logo's turn in the slot.
 *
 * Each property is derived arithmetically from the scroll rather than from
 * a keyframe input range: framer-motion hands `useTransform` input ranges
 * to the Web Animations API as keyframe offsets, which rejects anything
 * outside [0,1] — and this needs the first logo to begin already arrived
 * and the last one to never depart.
 */
function SlotLogo({ progress, index, count, src, label }: SlotLogoProps) {
  const segment = 1 / count;
  const half = TRANSITION / 2;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  /** 0 when this logo's turn begins, 1 when the next one's does. */
  const phase = (p: number) => p / segment - index;
  /** 0 = still below the slot, 1 = fully arrived. The first logo starts arrived. */
  const arrival = (p: number) => (isFirst ? 1 : clamp01((phase(p) + half) / (2 * half)));
  /** 0 = still in the slot, 1 = fully lifted away. The last logo never leaves. */
  const departure = (p: number) => (isLast ? 0 : clamp01((phase(p) - 1 + half) / (2 * half)));

  const y = useTransform(
    progress,
    (p) => TRAVEL * (1 - settle(arrival(p))) - TRAVEL * smooth(departure(p)),
  );
  const opacity = useTransform(progress, (p) => smooth(arrival(p)) * (1 - smooth(departure(p))));
  const scale = useTransform(
    progress,
    (p) => (0.86 + 0.14 * settle(arrival(p))) * (1 - 0.1 * smooth(departure(p))),
  );
  const blurPx = useTransform(
    progress,
    (p) => 6 * (1 - smooth(arrival(p))) + 6 * smooth(departure(p)),
  );
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.img
      src={src}
      alt={label}
      className="absolute inset-0 size-full object-contain"
      style={{ y, opacity, scale, filter }}
    />
  );
}

export function IntegrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  // Pinning swallows a lot of scroll, so it is desktop-only and always
  // yields to a reduced-motion preference.
  const pinned = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={pinned ? { height: `${100 + (LOGOS.length - 1) * STEP_VH}vh` } : undefined}
    >
      <div
        className={`overflow-hidden border-y border-line bg-surface-2 ${
          pinned ? "sticky top-0 flex h-screen items-center" : "relative py-24"
        }`}
      >
        <img
          src={background}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[676px] md:block">
          <GridTile mirrored />
        </div>

        <div className="relative mx-auto w-full max-w-[1728px] pt-6 px-5 lg:px-[248px] lg:pt-[210px]">
          <div className="relative">
            {/* eyebrow + its hand-drawn arrow */}
            <Reveal className="lg:absolute lg:left-[450px] lg:top-[-81px]">
              <Eyebrow>ONE AI WORKFORCE</Eyebrow>
            </Reveal>
            <motion.img
              src={doodleArrow}
              alt=""
              aria-hidden
              className="hidden h-[123px] w-[155px] lg:absolute lg:left-[586px] lg:top-[-75px] lg:block"
              animate={reduced ? undefined : { x: [0, 5, 0], y: [0, -3, 0], rotate: [0, -1.5, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* headline sits beside the slot, exactly as the file lays it out */}
            <div className="mt-10 flex flex-col items-start gap-4 lg:mt-0 lg:flex-row lg:items-center lg:gap-[40px]">
              <Reveal>
                <h2 className="font-display text-h2 text-balance text-black lg:whitespace-nowrap lg:text-[70px] lg:leading-normal lg:tracking-[-1.4px]">
                  Connect your leads from
                </h2>
              </Reveal>

              {pinned && (
                <div className="relative size-[125px] shrink-0">
                  {LOGOS.map((logo, i) => (
                    <SlotLogo
                      key={logo.label}
                      progress={scrollYProgress}
                      index={i}
                      count={LOGOS.length}
                      src={logo.src}
                      label={logo.label}
                    />
                  ))}
                </div>
              )}
            </div>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[729px] font-sans text-lead font-medium text-muted lg:mt-[51px]">
                No more jumping between tabs, inboxes, and spreadsheets. RedApe brings your outreach
                together and keeps every lead moving.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 lg:mt-[55px]">
                <Button withArrow>Start Free trail now</Button>
              </div>
            </Reveal>

            {/* Without the pin there is no sequence to drive, so show the full set at once. */}
            {!pinned && (
              <Reveal delay={0.24}>
                <ul className="mt-12 flex list-none flex-wrap gap-4 p-0">
                  {LOGOS.map((logo) => (
                    <li key={logo.label}>
                      <img
                        src={logo.src}
                        alt={logo.label}
                        className="size-[68px] object-contain sm:size-[84px]"
                      />
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
