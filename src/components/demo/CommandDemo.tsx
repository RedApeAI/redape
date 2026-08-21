import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { HandCursor } from "../graphics/HandCursor";
import cardGlow from "../../assets/backgrounds/card-glow.png";
import apePeek from "../../assets/images/ape-peek.png";
import plusSign from "../../assets/icons/plus-sign.svg";
import sendIcon from "../../assets/icons/send.svg";
import mailIcon from "../../assets/icons/mail.svg";
import whatsappIcon from "../../assets/icons/whatsapp.svg";
import promotionIcon from "../../assets/icons/promotion.svg";

const OPTIONS = [
  { icon: mailIcon, text: "Summarize my unread emails will /label" },
  { icon: whatsappIcon, text: "Create a WhatsApp campaign for the new properties" },
  { icon: promotionIcon, text: "Create a festive discount sales email and WhatsApp outreach templates" },
];

/** Where the hand is pointing: nowhere, the input, or one of the options. */
type Spot = "away" | "input" | 0 | 1 | 2;

interface Beat {
  /** ms to hold before advancing to the next beat. */
  hold: number;
  spot: Spot;
  open: boolean;
  hover: number | null;
  press: boolean;
  busy: boolean;
  toast: boolean;
  /** Whether the field shows the picked prompt instead of its placeholder. */
  choice: boolean;
}

/**
 * The loop, written out beat by beat: the hand arrives, opens the list,
 * walks down it, picks the last one, the field works on it, and the toast
 * confirms. Then it starts over.
 *
 * The final beat still carries `choice` so the field keeps the picked text
 * while the toast is fading out, rather than snapping back underneath it.
 */
const SCRIPT: Beat[] = [
  { hold: 550, spot: "away", open: false, hover: null, press: false, busy: false, toast: false, choice: false },
  { hold: 700, spot: "input", open: false, hover: null, press: false, busy: false, toast: false, choice: false },
  { hold: 160, spot: "input", open: false, hover: null, press: true, busy: false, toast: false, choice: false },
  { hold: 480, spot: "input", open: true, hover: null, press: false, busy: false, toast: false, choice: false },
  { hold: 400, spot: 0, open: true, hover: 0, press: false, busy: false, toast: false, choice: false },
  { hold: 400, spot: 1, open: true, hover: 1, press: false, busy: false, toast: false, choice: false },
  { hold: 480, spot: 2, open: true, hover: 2, press: false, busy: false, toast: false, choice: false },
  { hold: 260, spot: 2, open: true, hover: 2, press: true, busy: false, toast: false, choice: false },
  { hold: 1550, spot: "away", open: false, hover: null, press: false, busy: true, toast: false, choice: true },
  { hold: 1700, spot: "away", open: false, hover: null, press: false, busy: false, toast: true, choice: true },
  { hold: 650, spot: "away", open: false, hover: null, press: false, busy: false, toast: false, choice: true },
];

/** The state the demo rests in when motion is switched off. */
const STATIC_BEAT: Beat = {
  hold: 0, spot: "away", open: true, hover: 2, press: false, busy: false, toast: false, choice: false,
};

export function CommandDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const reduced = useReducedMotion() ?? false;
  const inView = useInView(cardRef, { amount: 0.4 });
  const [beatIndex, setBeatIndex] = useState(0);
  const [hand, setHand] = useState({ x: 0, y: 0 });

  const beat = reduced ? STATIC_BEAT : SCRIPT[beatIndex];

  // Advance one beat at a time, and only while the card is on screen.
  useEffect(() => {
    if (reduced || !inView) return;
    const id = setTimeout(() => setBeatIndex((i) => (i + 1) % SCRIPT.length), beat.hold);
    return () => clearTimeout(id);
  }, [beatIndex, beat.hold, inView, reduced]);

  // Restart cleanly whenever the card comes back into view.
  useEffect(() => {
    if (!inView) setBeatIndex(0);
  }, [inView]);

  // Point the hand at whatever the current beat names, measured from the
  // real elements so the script never carries hard-coded coordinates.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const target =
      beat.spot === "input"
        ? inputRef.current
        : typeof beat.spot === "number"
          ? optionRefs.current[beat.spot]
          : null;

    const stageBox = stage.getBoundingClientRect();
    if (!target) {
      setHand({ x: stageBox.width * 0.78, y: stageBox.height + 70 });
      return;
    }
    const box = target.getBoundingClientRect();
    setHand({
      x: box.left - stageBox.left + box.width * 0.34,
      y: box.top - stageBox.top + box.height * 0.62,
    });
  }, [beat.spot, beat.open]);

  const chosen = OPTIONS[2].text;
  const showsChoice = beat.choice;

  return (
    <div
      ref={cardRef}
      className="relative flex h-[462px] w-full items-center justify-center overflow-hidden border border-black/10 bg-surface"
    >
      <img
        src={cardGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      <div ref={stageRef} className="relative w-[684px] max-w-full px-4 sm:px-0">
        {/* the ape peeking over the field */}
        <img
          src={apePeek}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-[544px] top-[-30px] hidden h-[36px] w-[54px] object-contain sm:block"
        />

        {/* command field */}
        <div ref={inputRef} className="relative">
          {beat.busy && (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-[2px] overflow-hidden rounded-[14px]"
            >
              <span className="absolute left-1/2 top-1/2 aspect-square w-[170%] -translate-x-1/2 -translate-y-1/2 animate-[spin_1.15s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_170deg,rgba(255,0,34,0.18)_250deg,#ff5470_318deg,#ff0022_350deg,transparent_360deg)]" />
              <span className="absolute inset-[2px] rounded-[12px] bg-white" />
            </span>
          )}

          <div className="relative flex items-center justify-between gap-4 overflow-hidden rounded-[12px] bg-white p-4">
            <div className="flex min-w-0 items-center gap-[18px]">
              <img src={plusSign} alt="" className="size-9 shrink-0" />
              <p
                className={`truncate font-display text-body sm:text-[19px] ${
                  showsChoice ? "text-black" : "text-black/30"
                }`}
              >
                {showsChoice ? chosen : "What would you like to do today?"}
              </p>
            </div>
            <span className="flex shrink-0 items-center justify-center rounded-md bg-ink p-2.5">
              <img src={sendIcon} alt="" className="size-4" />
            </span>
          </div>
        </div>

        {/*
          The list's height is reserved whether or not it is showing, so the
          field never jumps when it opens and the card never has to clip it.
        */}
        <div className="relative mt-[22px] h-[180px]">
          <AnimatePresence initial={false}>
            {beat.open && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: -10, scaleY: 0.94 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
                className="absolute inset-x-0 top-0 z-10 flex flex-col gap-2 overflow-hidden rounded-[12px] bg-white p-4 shadow-[0_18px_49px_-17px_rgba(0,0,0,0.25)]"
              >
                {OPTIONS.map((option, i) => (
                  <div
                    key={option.text}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    className={`flex items-center gap-1.5 rounded-[10px] transition-colors duration-200 ${
                      beat.hover === i ? "bg-surface-4" : "bg-transparent"
                    }`}
                  >
                    <span className="flex shrink-0 items-center justify-center rounded-md p-2.5">
                      <img src={option.icon} alt="" className="size-6" />
                    </span>
                    <p className="truncate font-display text-body text-black sm:text-[17px]">
                      {option.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* the toast lands in the space the list leaves behind */}
          <AnimatePresence>
            {beat.toast && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 z-20 flex max-w-full -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full bg-[#1e1e1e] px-5 py-3 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] sm:whitespace-nowrap"
              >
                <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden>
                  <circle cx="10" cy="10" r="10" fill="#31c56a" />
                  <path
                    d="M5.8 10.3l2.7 2.7 5.7-5.7"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-sans text-body font-medium text-white">
                  RedApe AI has successfully completed the task
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* the hand doing the clicking */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-30"
            animate={{ x: hand.x, y: hand.y, opacity: beat.spot === "away" ? 0 : 1 }}
            transition={{
              x: { type: "spring", stiffness: 120, damping: 18, mass: 0.7 },
              y: { type: "spring", stiffness: 120, damping: 18, mass: 0.7 },
              opacity: { duration: 0.3 },
            }}
          >
            <motion.div animate={{ scale: beat.press ? 0.82 : 1 }} transition={{ duration: 0.14 }}>
              <HandCursor className="h-8 w-7" />
            </motion.div>
            <AnimatePresence>
              {beat.press && (
                <motion.span
                  key="ripple"
                  initial={{ opacity: 0.55, scale: 0.3 }}
                  animate={{ opacity: 0, scale: 1.6 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute left-0 top-1 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
