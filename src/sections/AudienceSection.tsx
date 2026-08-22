import { useRef } from "react";
import { cubicBezier, motion, useMotionTemplate, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import { AudienceCard } from "../components/audience/AudienceCard";
import { audienceCards } from "../components/audience/audienceCards";
import { useMediaQuery } from "../hooks/useMediaQuery";
import logoMark from "../assets/icons/logo-mark.svg";
import handsGlow from "../assets/backgrounds/hands-glow-mosaic.webp";
import metaIcon from "../assets/logos/meta-mark.png";
import whatsappIcon from "../assets/logos/whatsapp-mark.png";
import teamsIcon from "../assets/logos/teams-mark.png";
import instagramIcon from "../assets/logos/instagram-mark.png";
import linkedinIcon from "../assets/logos/linkedin-mark.png";
import salesforceIcon from "../assets/logos/salesforce-mark.png";
import gmailIcon from "../assets/logos/gmail-mark.png";
import hubspotIcon from "../assets/logos/hubspot-mark.png";

/**
 * node 3200:21761 "RedApe AI. In your hands." becoming node 3200:21826
 * "expert-partnership-section".
 *
 * The second design is not a section that follows the first — it is the
 * first design's top-right panel, grown to fill the viewport. So the two
 * are built as one pinned scene with three scroll-driven moves:
 *
 *   1. the headline rises and leaves, at a constant size
 *   2. the glow card slides out to the left
 *   3. the panel expands to 100vw/100vh, its heading growing as it goes,
 *      then the subtext, button and audience cards arrive inside it
 *
 * Because the panel's top and right edges already sit flush with the frame
 * in the first design, "expand to fullscreen" is just `left` and `bottom`
 * travelling to zero — the other two edges never move.
 *
 * Pinning only pays off with room to scrub, so (as in IntegrationsSection)
 * it is desktop-only and yields to reduced motion; both fall back to the
 * same content as two ordinary stacked sections.
 */

/** Total scroll track in viewport heights; minus the 100vh pin, this is how much scrolling the scene takes. */
const PIN_VH = 280;

/**
 * Scene beats, as fractions of the pinned scroll. The exit overlaps the
 * panel's growth on purpose — the panel is already opening while the
 * headline and card are still clearing out, which is what stops the
 * sequence reading as three separate animations played back to back.
 */
const BEAT = {
  /* Both exits travel far enough to leave the frame on their own, and hold
     their opacity most of the way out. Fading them early left a beat where
     the headline and card were gone but the panel had barely opened, and the
     scene read as an empty white screen rather than as a transition. */
  headlineOut: [0, 0.46],
  headlineFade: [0.3, 0.46],
  cardOut: [0.04, 0.55],
  cardFade: [0.34, 0.52],
  expand: [0.18, 0.62],
  headingGrow: [0.26, 0.64],
  subtextIn: [0.6, 0.74],
  buttonIn: [0.64, 0.78],
  cards: [0.72, 0.98],
} as const;

/** Geometry read off node 3200:21761 (1732.85 x 1046.99), as viewport units. */
const FRAME = {
  /** node 3200:21823 — the panel that becomes the whole next section. */
  panel: { left: 65.01, bottom: 49.91 },
  /** node 3200:21825 — the panel's heading, measured from the panel's own top-left. */
  asideHeading: { left: 1.675, top: 34.17 },
  /** node 3200:21824 — "RedApe AI. In your hands." */
  headline: { left: 3.33, top: 23.31 },
  /** node 3200:21762 — the glow card. It bleeds past the bottom edge in the file, so the pin clips it. */
  card: { top: 50.09, width: 65.02, height: 53.29 },
} as const;

/** Geometry read off node 3200:21826 (1726 x 1047) — where the panel's content lands. */
const TARGET = { padLeft: 4.54, padTop: 8.99, headingMax: 53.5, cardsHeight: 54.5 } as const;

const ease = cubicBezier(0.4, 0, 0.2, 1);
/**
 * Exits ease *in* — they hold position, then accelerate away. The standard
 * curve above is front-loaded, which threw the headline and card off screen
 * within the first few percent of their beat and left a blank frame before
 * the panel had opened far enough to cover the gap.
 */
const easeExit = cubicBezier(0.6, 0, 0.9, 0.3);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** Re-maps progress onto an eased [0,1] across one beat — the building block every transform below uses. */
const beat = (p: number, [a, b]: readonly [number, number], curve = ease) =>
  curve(clamp01((p - a) / (b - a)));
const mix = (from: number, to: number, t: number) => from + (to - from) * t;

/**
 * Left column, top-to-bottom: Meta, WhatsApp, Teams, Instagram.
 * Right column: LinkedIn, Salesforce, Gmail, HubSpot. Positions are
 * percentages of the glow card so the field scales with it; `speed` is how
 * much faster than the card each tile leaves, which is the parallax.
 */
const FLOATING_ICONS = [
  { src: metaIcon, label: "Meta", left: 15.2, top: 9.57, speed: 1 },
  { src: whatsappIcon, label: "WhatsApp", left: 9.63, top: 29.81, speed: 1.35 },
  { src: teamsIcon, label: "Microsoft Teams", left: 15.2, top: 50.05, speed: 0.85 },
  { src: instagramIcon, label: "Instagram", left: 9.63, top: 70.24, speed: 1.55 },
  { src: linkedinIcon, label: "LinkedIn", left: 71.88, top: 9.57, speed: 1.15 },
  { src: salesforceIcon, label: "Salesforce", left: 77.44, top: 29.81, speed: 1.6 },
  { src: gmailIcon, label: "Gmail", left: 71.88, top: 50.09, speed: 0.95 },
  { src: hubspotIcon, label: "HubSpot", left: 77.44, top: 70.37, speed: 1.4 },
] as const;

const CARD_WINDOW = 0.12;
const cardBeat = (p: number, i: number) => {
  const [start, end] = BEAT.cards;
  const from = start + i * ((end - start - CARD_WINDOW) / (audienceCards.length - 1));
  return beat(p, [from, from + CARD_WINDOW]);
};

function GlowCardContents() {
  return (
    <>
      <img src={handsGlow} alt="" aria-hidden className="pointer-events-none absolute inset-0 size-full object-cover" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[1.09vw]">
        <img src={logoMark} alt="" aria-hidden className="w-[clamp(28px,5.43vw,94px)]" />
        <span className="font-sans font-bold tracking-[-0.02em] text-ink text-[clamp(24px,4.68vw,81px)]">
          RedApe
        </span>
      </div>
    </>
  );
}

function FloatingIcon({ progress, icon }: { progress: MotionValue<number>; icon: (typeof FLOATING_ICONS)[number] }) {
  const drift = useTransform(progress, (p) => -icon.speed * 30 * beat(p, BEAT.cardOut, easeExit));
  const x = useMotionTemplate`${drift}%`;
  const opacity = useTransform(progress, (p) => 1 - beat(p, BEAT.cardFade));
  return (
    <motion.div
      aria-hidden
      className="absolute flex items-center justify-center rounded-[2px] border-[2.6px] border-white bg-[#f4f4f4] p-[0.6%] shadow-sm"
      style={{ left: `${icon.left}%`, top: `${icon.top}%`, width: "5.6%", aspectRatio: "1 / 1", x, opacity }}
    >
      <img src={icon.src} alt="" className="size-full object-contain" />
    </motion.div>
  );
}

export function AudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const pinned = isDesktop && !reduced;

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // 1 — the headline rises and clears, at a constant size.
  const headlineY = useMotionTemplate`${useTransform(p, (v) => -55 * beat(v, BEAT.headlineOut, easeExit))}vh`;
  const headlineOpacity = useTransform(p, (v) => 1 - beat(v, BEAT.headlineFade));

  // 2 — the glow card slides out to the left.
  const cardX = useMotionTemplate`${useTransform(p, (v) => -75 * beat(v, BEAT.cardOut, easeExit))}vw`;
  const cardOpacity = useTransform(p, (v) => 1 - beat(v, BEAT.cardFade));

  // 3 — the panel expands to fill the viewport, its content growing into place.
  const panelLeft = useMotionTemplate`${useTransform(p, (v) => mix(FRAME.panel.left, 0, beat(v, BEAT.expand)))}vw`;
  const panelBottom = useMotionTemplate`${useTransform(p, (v) => mix(FRAME.panel.bottom, 0, beat(v, BEAT.expand)))}vh`;
  const panelEdge = useTransform(p, (v) => `rgba(32,32,32,${0.2 * (1 - beat(v, BEAT.expand))})`);

  const padLeft = useMotionTemplate`${useTransform(p, (v) => mix(FRAME.asideHeading.left, TARGET.padLeft, beat(v, BEAT.expand)))}vw`;
  const padTop = useMotionTemplate`${useTransform(p, (v) => mix(FRAME.asideHeading.top, TARGET.padTop, beat(v, BEAT.expand)))}vh`;

  // Sized in vw so the heading keeps the file's text-to-column ratio and
  // stays on one line at the end at any desktop width; clamped so it never
  // outgrows the site's own h2 ceiling on very wide screens.
  const headingSize = useMotionTemplate`clamp(26px, ${useTransform(p, (v) => mix(2.0, 2.954, beat(v, BEAT.headingGrow)))}vw, 56px)`;
  const headingMax = useMotionTemplate`${useTransform(p, (v) => mix(31.6, TARGET.headingMax, beat(v, BEAT.expand)))}vw`;

  const subtextOpacity = useTransform(p, (v) => beat(v, BEAT.subtextIn));
  const subtextY = useMotionTemplate`${useTransform(p, (v) => 14 * (1 - beat(v, BEAT.subtextIn)))}px`;
  const buttonOpacity = useTransform(p, (v) => beat(v, BEAT.buttonIn));

  if (!pinned) {
    return (
      <section ref={sectionRef} className="relative bg-paper">
        <div className="flex flex-col gap-10 border-b border-line-soft bg-paper px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-20">
          <Reveal className="flex-1">
            <h2 className="font-display text-display text-balance text-black">
              RedApe AI.
              <br />
              In your hands.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="relative aspect-[1126/558] flex-1 overflow-hidden bg-surface-2">
            <GlowCardContents />
            {FLOATING_ICONS.map((icon) => (
              <div
                key={icon.label}
                aria-hidden
                className="absolute flex items-center justify-center rounded-[10px] border-[2.6px] border-white bg-[#f4f4f4] p-[0.6%] shadow-sm"
                style={{ left: `${icon.left}%`, top: `${icon.top}%`, width: "5.6%", aspectRatio: "1 / 1" }}
              >
                <img src={icon.src} alt="" className="size-full object-contain" />
              </div>
            ))}
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 bg-[#faf9f6] px-6 py-16 sm:px-10 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal className="flex flex-col gap-3">
              <h2 className="font-display text-h2 text-balance text-black">Are you the one, who need RedApe AI?</h2>
              <p className="max-w-[60ch] font-mono-ui text-lead text-muted-2">
                Work with world-class AI scientists to enable transformation that drives impact.
              </p>
            </Reveal>
            <Button size="sm" withArrow className="shrink-0">
              Get Started
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.06}>
                <AudienceCard card={card} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-paper" style={{ height: `${PIN_VH}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-paper">
        {/* 1 — headline */}
        <motion.h2
          style={{
            y: headlineY,
            opacity: headlineOpacity,
            left: `${FRAME.headline.left}vw`,
            top: `${FRAME.headline.top}vh`,
          }}
          className="absolute font-display font-medium leading-[1.115] tracking-[-0.01em] text-black text-[clamp(44px,6.2vw,108px)]"
        >
          RedApe AI.
          <br />
          In your hands.
        </motion.h2>

        {/* 2 — glow card */}
        <motion.div
          style={{
            x: cardX,
            opacity: cardOpacity,
            top: `${FRAME.card.top}vh`,
            width: `${FRAME.card.width}vw`,
            height: `${FRAME.card.height}vh`,
          }}
          className="absolute left-0 overflow-hidden border-r border-t border-[rgba(32,32,32,0.2)] bg-surface-2"
        >
          <GlowCardContents />
          {FLOATING_ICONS.map((icon) => (
            <FloatingIcon key={icon.label} progress={p} icon={icon} />
          ))}
        </motion.div>

        {/* 3 — the panel, expanding to fullscreen and becoming the next section */}
        <motion.div
          style={{ left: panelLeft, bottom: panelBottom, borderColor: panelEdge }}
          className="absolute right-0 top-0 overflow-hidden border-b border-l bg-[#faf9f6]"
        >
          <motion.div style={{ paddingLeft: padLeft, paddingTop: padTop, paddingRight: padLeft }} className="flex h-full flex-col">
            {/* The button is taken out of flow: while the panel is still narrow it would
                otherwise steal width from the heading and change how it wraps. */}
            <div className="relative">
              <div className="flex flex-col">
                <motion.h2
                  style={{ fontSize: headingSize, maxWidth: headingMax }}
                  className="font-display font-medium leading-[1.154] tracking-[-0.038em] text-[#111]"
                >
                  Are you the one, who need RedApe AI?
                </motion.h2>
                <motion.p
                  style={{ opacity: subtextOpacity, y: subtextY }}
                  className="mt-[1.4vh] max-w-[53.5vw] font-mono-ui tracking-[-0.028em] text-[#555] text-[clamp(14px,1.022vw,18px)]"
                >
                  Work with world-class AI scientists to enable transformation that drives impact.
                </motion.p>
              </div>
              <motion.div style={{ opacity: buttonOpacity }} className="absolute bottom-0 right-0">
                <Button size="sm" withArrow>
                  Get Started
                </Button>
              </motion.div>
            </div>

            <div className="mt-[5.5vh] grid grid-cols-4" style={{ height: `${TARGET.cardsHeight}vh` }}>
              {audienceCards.map((card, i) => (
                <CardInLayer key={card.label} card={card} progress={p} index={i} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CardInLayer({
  card,
  progress,
  index,
}: {
  card: (typeof audienceCards)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const y = useTransform(progress, (v) => 28 * (1 - cardBeat(v, index)));
  const opacity = useTransform(progress, (v) => cardBeat(v, index));
  return (
    <motion.div style={{ y, opacity }} className="h-full">
      <AudienceCard card={card} className="h-full" />
    </motion.div>
  );
}
