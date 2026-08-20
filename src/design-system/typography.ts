/**
 * JS mirror of the fluid type scale in tokens.css, for the few places that
 * need a raw value instead of a Tailwind `text-*` utility. tokens.css is the
 * source of truth — every size interpolates between a phone value and the
 * Figma desktop value, so no size is re-declared per breakpoint.
 */
export const typography = {
  fontDisplay: "'Google Sans Flex', 'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  fontSans: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  fontUi: "'Inter', ui-sans-serif, system-ui, sans-serif",

  /** Hero headline — 40px -> 68px. */
  display: {
    fontSize: "clamp(2.5rem, 1.56rem + 4vw, 4.25rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.028em",
  },
  /** Section headline — 32px -> 56px. */
  h2: {
    fontSize: "clamp(2rem, 1.3rem + 3vw, 3.5rem)",
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
  },
  /** Card/widget headline — 20px -> 24px. */
  h3: {
    fontSize: "clamp(1.25rem, 1.13rem + 0.5vw, 1.5rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  /** Section standfirst — 16px -> 19px. */
  lead: {
    fontSize: "clamp(1rem, 0.93rem + 0.3vw, 1.1875rem)",
    lineHeight: 1.55,
  },
  /** Default copy — 15px -> 17px. */
  body: {
    fontSize: "clamp(0.9375rem, 0.9rem + 0.16vw, 1.0625rem)",
    lineHeight: 1.55,
  },
  /** Nav links, buttons, chips — 15px -> 16px. */
  nav: {
    fontSize: "clamp(0.9375rem, 0.91rem + 0.11vw, 1rem)",
    lineHeight: 1.2,
  },
  eyebrow: {
    fontSize: "clamp(0.8125rem, 0.78rem + 0.16vw, 0.9375rem)",
    letterSpacing: "0.12em",
  },
  micro: {
    fontSize: "clamp(0.75rem, 0.73rem + 0.1vw, 0.8125rem)",
    lineHeight: 1.4,
  },
} as const;
