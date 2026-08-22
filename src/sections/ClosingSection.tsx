import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import logoMark from "../assets/icons/logo-mark.svg";

/**
 * node 3193:661 "Frame 2147263287" — the closing CTA that ends the page.
 *
 * A 1730x344 band: the logo plate and the headline/body/button group sit
 * centred as a pair with a 50px gap, over a soft colour bloom. The plate's
 * registration rules overhang it by different amounts on each side
 * (26px left, 144px right, 24px above, 49px below), which is what makes them
 * read as crop marks rather than a drawn box — so they are placed off the
 * plate's own edges rather than as a border.
 */

/** The plate, in the file's pixels. Every crop mark is measured off this box. */
const PLATE = { width: 242, height: 132 };

/** Rules hang off the plate by these amounts (Figma 3193:675-678). */
const MARK = { up: 23.8, down: 48.51, left: 25.88, right: 143.56 };

const markLine = "absolute bg-black/15";

export function ClosingSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto flex w-full max-w-[1728px] flex-col items-start gap-12 px-6 py-16 sm:px-[100px] xl:flex-row xl:items-center xl:justify-center xl:gap-[11em] xl:py-[70px]">
        <Reveal>
          <div
            className="relative shrink-0 origin-top-left scale-[0.8] bg-[#eee] sm:scale-100"
            style={{ width: PLATE.width, height: PLATE.height }}
          >
            <div className="absolute inset-0 flex items-center justify-center gap-[5.34px] rounded-[23.01px] bg-white">
              <img src={logoMark} alt="" aria-hidden className="w-[33.08px]" />
              <span className="font-sans text-[27.74px] font-bold tracking-[-0.55px] text-ink">
                RedApe
              </span>
            </div>

            {/* crop marks, drawn over the plate as the file stacks them */}
            <span aria-hidden className={markLine} style={{ left: 0, top: -MARK.up, width: 1, height: PLATE.height + MARK.up + MARK.down }} />
            <span aria-hidden className={markLine} style={{ left: PLATE.width, top: -MARK.up, width: 1, height: PLATE.height + MARK.up + MARK.down }} />
            <span aria-hidden className={markLine} style={{ left: -MARK.left, top: 0, height: 1, width: PLATE.width + MARK.left + MARK.right }} />
            <span aria-hidden className={markLine} style={{ left: -MARK.left, top: PLATE.height, height: 1, width: PLATE.width + MARK.left + MARK.right }} />
          </div>
        </Reveal>

        <div className="flex flex-col items-start gap-5">
          <Reveal delay={0.05}>
            {/*
              Leading and tracking are kept as the design's ratios
              (1.22 / -0.02em) rather than its pixel values, so they stay
              correct if the size is dialled again.
            */}
            <h2 className="font-display text-balance text-[28px] leading-[1.22] tracking-[-0.02em] text-black sm:text-[32px] xl:whitespace-nowrap xl:text-[32px] 2xl:text-[36px]">
              Intelligent Choice for <span className="font-semibold">Intelligent People</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] font-sans text-body font-medium text-muted">
              Your data stays yours. RedApe uses secure, encrypted connections and never reads your
              personal messages.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button withArrow size="sm">
              Get Started with 14 days free trail
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
