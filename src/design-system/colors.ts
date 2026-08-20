/**
 * Color reference mirroring the CSS custom properties in tokens.css.
 * Kept in sync manually — tokens.css is the source of truth for Tailwind,
 * this file is for places that need a raw JS value (e.g. canvas/gradients).
 */
export const colors = {
  ink: "#202020",
  inkSoft: "#303030",
  muted: "#606060",
  muted2: "#666666",
  line: "#d9d9d9",
  lineSoft: "#dcdcdc",
  paper: "#fefefe",
  surface: "#f6f5f3",
  surface2: "#f6f3f3",
  surface3: "#f1f0ee",
  surface4: "#f2f2f2",
  chip: "#eaeaea",
  chipDark: "#1e1e1e",

  brand: {
    red: "#ff0022",
    blue: "#0062ff",
    green: "#1beb00",
  },

  accent: {
    green: "#5dc983",
    red: "#ff2f2f",
    indigo: "#5e6ad2",
    yellow: "#f2be00",
    violet: "#8a43e1",
    magenta: "#d511fd",
  },
} as const;

export type BrandSection = keyof typeof colors.brand;
