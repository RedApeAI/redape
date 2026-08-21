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
 * Two styles ship in the file, and they are the same artwork at different
 * heights — every rule, star, dot and hatch cell lines up once you account
 * for the offset, and the exported strokes are the same #d9d9d9/#e6e6e6.
 *
 *   1 (3144:9636) sits 231px above the band. Its long horizontal rule lands
 *     133.5px down, which is inside the headline on a 551px band.
 *   2 (3177:202)  sits 356.3px above it — 125.3px higher — putting that rule
 *     8px down, clear above the headline, and clips the tile to the band so
 *     the full-height vertical rule stops at its bottom edge.
 */

const RULE = "#d9d9d9";
const DOT = "#e6e6e6";

/** 4-point star that marks a grid intersection (Figma "Subtract", 14.16x14). */
const STAR =
  "M7.35547 0C7.66573 3.60356 10.5246 6.49405 14.1621 6.93848V7.06055C10.5246 7.50493 7.66573 10.3964 7.35547 14H7.29492C6.97089 10.2366 3.8672 7.24933 0 7.01562V6.9834C3.86718 6.74967 6.97089 3.76341 7.29492 0H7.35547Z";

const DOT_COLUMNS = [382, 400, 417, 435];
const DOT_ROWS = [414.6, 431.6];

interface GridTileProps {
  mirrored?: boolean;
  /** Which of the file's two grid styles to draw. See the note above. */
  variant?: 1 | 2;
}

export function GridTile({ mirrored = false, variant = 1 }: GridTileProps) {
  const edge = mirrored ? "left-0 -scale-x-100" : "right-0";

  const artwork = (
      <>
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
    </>
  );

  if (variant === 2) {
    return (
      <div className={`absolute inset-y-0 w-[554px] overflow-hidden ${edge}`}>
        <div className="absolute top-[-356.3px] h-[907px] w-[554px]">{artwork}</div>
      </div>
    );
  }

  return <div className={`absolute top-[-231px] h-[907px] w-[554px] ${edge}`}>{artwork}</div>;
}
