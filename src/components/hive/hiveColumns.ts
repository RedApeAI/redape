import newReleases from "../../assets/icons/new-releases.svg";
import messageSquareDot from "../../assets/icons/message-square-dot.svg";
import accountRecovery from "../../assets/icons/account-recovery.svg";
// The shared promotion icon is dark-stroked for use on white; tags need the light cut.
import promotion from "../../assets/icons/promotion-light.svg";
import aiChat from "../../assets/icons/ai-chat-01.svg";
import userMultiple from "../../assets/icons/user-multiple-02.svg";
import chartUp from "../../assets/icons/chart-up.svg";
import chart from "../../assets/icons/chart.svg";
import instagram from "../../assets/icons/instagram.svg";
import inLove from "../../assets/icons/in-love.svg";
import folder from "../../assets/icons/folder-03.svg";
import security from "../../assets/icons/security.svg";
import chartRadar from "../../assets/icons/chart-radar.svg";
import aiCoEditing from "../../assets/icons/ai-co-editing.svg";
import conference from "../../assets/icons/conference.svg";
import speech from "../../assets/icons/speech.svg";
import directions from "../../assets/icons/directions-01.svg";

import c1a from "../../assets/graphics/hive-c1-a.svg";
import c1b from "../../assets/graphics/hive-c1-b.svg";
import c1c from "../../assets/graphics/hive-c1-c.svg";
import c1d from "../../assets/graphics/hive-c1-d.svg";
import c1e from "../../assets/graphics/hive-c1-e.svg";
import c2a from "../../assets/graphics/hive-c2-a.svg";
import c2b from "../../assets/graphics/hive-c2-b.svg";
import c2c from "../../assets/graphics/hive-c2-c.svg";
import c2d from "../../assets/graphics/hive-c2-d.svg";
import c2e from "../../assets/graphics/hive-c2-e.svg";
import c3a from "../../assets/graphics/hive-c3-a.svg";
import c3b from "../../assets/graphics/hive-c3-b.svg";
import c3c from "../../assets/graphics/hive-c3-c.svg";
import c3d from "../../assets/graphics/hive-c3-d.svg";
import c3e from "../../assets/graphics/hive-c3-e.svg";
import c3f from "../../assets/graphics/hive-c3-f.svg";
import c3g from "../../assets/graphics/hive-c3-g.svg";

export interface HiveTagSpec {
  icon: string;
  label: string;
  left: number;
  top: number;
}

/**
 * An elbow leader between the orb and a tag. `inset` is Figma's own
 * expansion of the artwork past its layout box, so the 3px stroke is not
 * cropped — carried through verbatim rather than re-derived.
 */
export interface HiveLinkSpec {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  inset: string;
}

export interface HiveColumnSpec {
  week: string;
  title: string;
  /** Canvas width the coordinates below were authored against. */
  width: number;
  /** How the orb is pinned inside that canvas. */
  orb: { left: string; top: string; centered: boolean };
  tags: HiveTagSpec[];
  links: HiveLinkSpec[];
  /** Loose "knowledge" pixels scattered behind the map; column 1 has none. */
  motes: [number, number][];
}

/** Every column is drawn on a canvas this tall (node 3144:10471, minus its footer). */
export const HIVE_STAGE_HEIGHT = 378;

export const hiveColumns: HiveColumnSpec[] = [
  {
    week: "Week 1",
    title: "Learning your business",
    width: 351.667,
    orb: { left: "calc(50% - 5.96px)", top: "calc(50% + 8.09px)", centered: true },
    tags: [
      { icon: newReleases, label: "Leads", left: 183.63, top: 53.92 },
      { icon: messageSquareDot, label: "Replies", left: 244.19, top: 137.13 },
      { icon: accountRecovery, label: "Out reach", left: 37.78, top: 109.92 },
      { icon: promotion, label: "Campaigns", left: 33.78, top: 276.92 },
      { icon: aiChat, label: "Follow-ups", left: 170.14, top: 312.09 },
    ],
    links: [
      { src: c1a, left: 169.12, top: 245.38, width: 46.376, height: 66.719, inset: "0 -3.23%" },
      { src: c1b, left: 216.49, top: 150.63, width: 27.695, height: 47.375, inset: "-3.17% 0" },
      { src: c1c, left: 169.12, top: 67.41, width: 14.511, height: 83.212, inset: "-1.8% 0 0 -10.34%" },
      { src: c1d, left: 80.13, top: 136.91, width: 41.609, height: 61.096, inset: "0 0 -2.46% -3.61%" },
      { src: c1e, left: 126.48, top: 245.38, width: 42.631, height: 45.038, inset: "0 -3.52% -3.33% 0" },
    ],
    motes: [],
  },
  {
    week: "Week 3",
    title: "Connecting the dots",
    width: 368.17,
    orb: { left: "134.33px", top: "calc(50% - 4.91px)", centered: false },
    tags: [
      { icon: userMultiple, label: "Lead Behavior", left: 75.94, top: 38.29 },
      { icon: chartUp, label: "Outcomes", left: 59.78, top: 318.28 },
      { icon: chart, label: "Engagements", left: 221.22, top: 257.41 },
      { icon: instagram, label: "Channels", left: 25.83, top: 171.25 },
      { icon: inLove, label: "Timings", left: 263.1, top: 96.29 },
    ],
    links: [
      { src: c2a, left: 181.73, top: 231.74, width: 39.482, height: 39.165, inset: "0 0 -3.83% -3.8%" },
      { src: c2b, left: 103.63, top: 231.74, width: 78.102, height: 86.539, inset: "0 -1.92%" },
      { src: c2c, left: 108.53, top: 184.37, width: 25.828, height: 0.375, inset: "-400% 0" },
      { src: c2d, left: 129.29, top: 65.27, width: 52.444, height: 71.721, inset: "0 -2.86%" },
      { src: c2e, left: 229.11, top: 109.78, width: 33.992, height: 74.587, inset: "-2.01% 0" },
    ],
    motes: [
      [28.66, 151.35], [256.91, 241.07], [277.45, 79.2], [44.63, 327.8], [108.6, 17.84],
      [17.87, 198.23], [246.11, 287.96], [266.65, 126.09], [71.7, 352.2], [90.77, 73.78],
      [63.4, 211.27], [291.64, 300.99], [312.18, 139.12], [137, 350.3], [143.34, 77.77],
      [92.56, 159.31], [320.8, 249.03], [341.34, 87.16], [147.55, 304.98], [172.5, 25.8],
    ],
  },
  {
    week: "Week 5",
    title: "Building your sales intelligence",
    width: 368.17,
    orb: { left: "127.17px", top: "calc(50% + 2.09px)", centered: false },
    tags: [
      { icon: folder, label: "Content", left: 243.88, top: 216.32 },
      { icon: security, label: "Controls", left: 39.61, top: 245 },
      { icon: chartRadar, label: "Leads Scoring", left: 121.05, top: 34.33 },
      { icon: aiCoEditing, label: "Audience", left: 232.53, top: 94.32 },
      { icon: conference, label: "Optimizations", left: 25.54, top: 122.58 },
      { icon: speech, label: "Conversions", left: 59.09, top: 307.49 },
      { icon: directions, label: "Forecasting", left: 202.74, top: 305.89 },
    ],
    links: [
      { src: c3a, left: 174.17, top: 61.21, width: 0, height: 83, inset: "0 -1.5px" },
      { src: c3b, left: 174.17, top: 108.21, width: 58, height: 36, inset: "-4.17% 0 0 -2.59%" },
      { src: c3c, left: 222.03, top: 191.41, width: 21.852, height: 38.411, inset: "-3.91% 0" },
      { src: c3d, left: 174.66, top: 238.78, width: 28.084, height: 80.606, inset: "0 0 -1.86% -5.34%" },
      { src: c3e, left: 156.79, top: 238.78, width: 17.867, height: 82.203, inset: "0 -8.4% -1.82% 0" },
      { src: c3f, left: 118.31, top: 238.78, width: 56.343, height: 19.704, inset: "0 -2.66% -7.61% 0" },
      { src: c3g, left: 77.89, top: 149.56, width: 49.388, height: 41.845, inset: "0 0 -3.58% -3.04%" },
    ],
    motes: [
      [72.86, 103.45], [43.16, 225.84], [36.12, 159.93], [46.7, 279.88], [128.69, 341.51],
      [99.98, 351.63], [41.16, 327.89], [71, 339.69], [132.66, 292.5], [28.97, 107.42],
      [23.55, 252.38], [99.81, 155.95], [77.89, 285.75], [121, 107.42], [99.98, 229.82],
      [95.84, 36.13], [121.25, 18.96], [109.82, 61.31], [208.27, 69.27], [238.05, 41.99],
      [210.9, 18.41], [170.42, 22.39], [146.17, 70.14], [228.12, 128.41], [235.26, 247.95],
      [221.09, 339.69], [271.88, 132.09], [279.02, 251.63], [244.45, 347.65], [312.26, 128.11],
      [319.4, 247.64], [275.86, 339.69], [335.66, 217.41], [304.62, 323.65], [323.38, 94.71],
      [311.76, 196.77], [269.59, 292.5], [270.41, 79.94], [245.49, 284.54], [298.64, 74.12],
      [265.61, 197.12], [213.13, 289.38],
    ],
  },
];
