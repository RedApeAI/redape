import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import logoMark from "../assets/icons/logo-mark.svg";
import closingGlow from "../assets/images/closing-glow.webp";

/**
 * node 3144:10739 "Frame 2147263279" — the closing CTA that ends the page.
 *
 * A 1730x373 band: the logo on a white plate at the left, the headline and
 * its button at the right, and a soft colour bloom behind the type. The
 * plate's registration rules overhang it by different amounts on each side
 * (30px left, 168px right, 28px above, 57px below), which is what makes them
 * read as crop marks rather than a drawn box — so they are placed off the
 * plate's own edges rather than as a border.
 */

/** The plate, in the file's pixels. Every crop mark is measured off this box. */
const PLATE = { width: 284, height: 155 };

/** Rules hang off the plate by these amounts (Figma 3144:10751-10754). */
const MARK = { up: 27.92, down: 56.92, left: 30.37, right: 168.44 };

const markLine = "absolute bg-black/15";

export function ClosingSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f5f5]">
      {/*
        The bloom is a tall soft blur, so the file fits it by height and lets
        it sit centred rather than stretching it across the band.
      */}
      <img
        src={closingGlow}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-contain"
      />

      <div className="relative mx-auto flex w-full max-w-[1728px] flex-col gap-12 px-4 py-16 sm:px-[84px] xl:flex-row xl:items-start xl:gap-[140px] xl:pb-[53px] xl:pt-[65px] 2xl:gap-[227px]">
        <Reveal>
          <div
            className="relative shrink-0 bg-[#eee] xl:mt-[17px]"
            style={{ width: PLATE.width, height: PLATE.height }}
          >
            <div className="absolute inset-0 flex items-center justify-center gap-[6.26px] rounded-[27px] bg-white">
              <img src={logoMark} alt="" aria-hidden className="w-[38.81px]" />
              <span className="font-sans text-[32.55px] font-bold tracking-[-0.651px] text-ink">
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
              The file sets this at 73.89px; that read too heavy next to the
              plate, so it steps down to 60. Leading and tracking are kept as
              the design's ratios (1.22 / -0.02em) rather than its pixel
              values, so they stay correct if the size is dialled again.
            */}
            <h2 className="font-display text-h2 text-balance text-black xl:max-w-[600px] xl:text-[60px] xl:leading-[1.22] xl:tracking-[-0.02em]">
              Intelligent Choice for <span className="font-semibold">Intelligent People</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button withArrow className="sm:px-6 sm:py-3.5 sm:text-[18px]">
              Get Started with 14 days free trail
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
