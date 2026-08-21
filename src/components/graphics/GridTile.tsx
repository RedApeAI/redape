import hatchMask from "../../assets/backgrounds/grid-hatch-mask.png";

/**
 * The 554x907 blueprint tile the design repeats behind several sections
 * (Figma nodes 3144:9636, 3144:9805 and friends — all the same component).
 *
 * Its rules, stars and dots are drawn as one inline SVG rather than the
 * eight rotated <img> slices Figma emits: same geometry and colours,
 * resolution-independent, and no negative-inset rotation hacks. Only the
 * hatched cell keeps its original PNG, used as an alpha mask as designed.
 *
 * The tile is always anchored to an edge of its positioned parent and
 * pulled up by 231px, matching how every band in the file places it.
 *
 * It is drawn inside a *gutter* rather than free on the page: the leftover
 * space once the centred text column (--grid-clear) is taken out of the
 * band. Two 554px tiles only leave a clean centre above ~2018px viewports,
 * so below that the tile's full-width horizontal rule used to run straight
 * through the headline. The gutter keeps it off the type at every width,
 * and its inner edge is feathered so the pattern reads as running off the
 * page instead of stopping at a hard cut.
 */

const RULE = "#d9d9d9";
const DOT = "#e6e6e6";

/** Width of the centred column the tiles must stay out of, unless a band overrides it. */
const DEFAULT_CLEAR = "1000px";

/** How much of the gutter's inner edge is faded out rather than clipped. */
const FEATHER = "72px";

/** 4-point star that marks a grid intersection (Figma "Subtract", 14.16x14). */
const STAR =
  "M7.35547 0C7.66573 3.60356 10.5246 6.49405 14.1621 6.93848V7.06055C10.5246 7.50493 7.66573 10.3964 7.35547 14H7.29492C6.97089 10.2366 3.8672 7.24933 0 7.01562V6.9834C3.86718 6.74967 6.97089 3.76341 7.29492 0H7.35547Z";

const DOT_COLUMNS = [382, 400, 417, 435];
const DOT_ROWS = [414.6, 431.6];

const FADE = `linear-gradient(to right, transparent 0, #000 ${FEATHER})`;

export function GridTile({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div
      className={`absolute top-[-231px] h-[907px] overflow-hidden ${
        mirrored ? "left-0 -scale-x-100" : "right-0"
      }`}
      style={{
        /* The mirrored copy is flipped here rather than on the tile, so the
           feather always runs from the wrapper's local left — which is the
           inner edge on both sides once the flip is applied. */
        width: `min(554px, max(0px, (100% - var(--grid-clear, ${DEFAULT_CLEAR})) / 2))`,
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
    >
      <div className="absolute right-0 top-0 h-[907px] w-[554px]">
        <svg width="554" height="907" viewBox="0 0 554 907" fill="none" className="block">
          {/* full-length rules */}
          <line x1="471" y1="0" x2="471" y2="907" stroke={RULE} />
          <line x1="0" y1="364.5" x2="554" y2="364.5" stroke={RULE} />

          {/* rules bounding the two detail cells */}
          <line x1="342" y1="365" x2="342" y2="619" stroke={RULE} />
          <line x1="213" y1="365" x2="213" y2="492" stroke={RULE} />
          <line x1="213.5" y1="492.6" x2="471.5" y2="492.6" stroke={RULE} />
          <line x1="342.5" y1="619.6" x2="471.5" y2="619.6" stroke={RULE} />

          {/* stars sitting on two of the intersections */}
          <path d={STAR} fill={RULE} transform="translate(336.34 484.12)" />
          <path d={STAR} fill={RULE} transform="translate(465.23 356.6)" />

          {/* 4x2 dot cluster */}
          {DOT_ROWS.map((cy) =>
            DOT_COLUMNS.map((cx) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill={DOT} />
            )),
          )}
        </svg>

        {/* diagonally hatched cell */}
        <div
          className="absolute left-[345.5px] top-[491.12px] h-[124px] w-[125px] bg-[#d9d9d9]"
          style={{
            maskImage: `url(${hatchMask})`,
            maskSize: "125px 124px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url(${hatchMask})`,
            WebkitMaskSize: "125px 124px",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
