import orbFace from "../../assets/images/orb-face.png";
import orbNoise from "../../assets/images/orb-noise.png";
import orbMark from "../../assets/images/orb-mark.svg";
import orbGlow from "../../assets/images/orb-glow.svg";

/** The noise tile was exported at 1024px and cropped to 256; keep the grain the same size. */
const NOISE_TILE = 50.53;

/**
 * node 3150:20955 — the RedApe orb every mind-map radiates from. The red
 * comes from a plain red fill blended over the gradient plate rather than
 * being baked into the artwork, which is how the file builds it.
 */
export function HiveOrb({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute flex size-[94.75px] items-center rounded-full border-[0.79px] border-white/60 bg-gradient-to-b from-[rgba(220,220,220,0.64)] to-[rgba(220,220,220,0.32)] p-[7.896px] ${className ?? ""}`}
      style={style}
    >
      <div className="relative flex size-[78.958px] shrink-0 items-center justify-center rounded-full p-[21.056px] shadow-[0_0_7.343px_0_rgba(255,255,255,0.5),0_13.423px_7.896px_0_rgba(80,124,165,0.13),0_5.527px_5.527px_0_rgba(80,124,165,0.21),0_1.579px_3.158px_0_rgba(80,124,165,0.25)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <img src={orbFace} alt="" className="absolute size-full max-w-none object-bottom" />
          <div className="absolute inset-0 bg-[red] mix-blend-overlay" />
          <div
            className="absolute inset-0 opacity-40 mix-blend-plus-lighter"
            style={{ backgroundImage: `url(${orbNoise})`, backgroundSize: `${NOISE_TILE}px ${NOISE_TILE}px` }}
          />
        </div>

        <div className="relative h-[31.126px] w-[35.737px]">
          <img
            src={orbMark}
            alt=""
            className="absolute left-[-5.58px] top-[-9.35px] h-[49.834px] w-[46.397px] max-w-none"
          />
        </div>

        <div
          aria-hidden
          className="absolute left-[calc(50%+1.52px)] top-[calc(50%+0.92px)] h-[19.625px] w-[17.99px] -translate-x-1/2 -translate-y-1/2 mix-blend-color-dodge"
        >
          <img src={orbGlow} alt="" className="absolute inset-[-208.33%_-227.27%] max-w-none" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0.658px_11.844px_0_#f2d9ff,inset_0_0.658px_2.632px_0_#f2d9ff]"
        />
      </div>
    </div>
  );
}
