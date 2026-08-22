import { Reveal } from "../components/motion/Reveal";
import { Eyebrow } from "../components/ui/Eyebrow";
import { Button } from "../components/ui/Button";
import bandMosaic from "../assets/backgrounds/band-mosaic.png";

/**
 * The red slab that hands the page over to the footer: eyebrow and headline
 * on the left, the two calls to action sitting on the headline's last line.
 *
 * It reuses the mosaic the other colour bands carry, dialled back so it
 * reads as texture on the flat red rather than as a second pattern.
 */
export function RedCtaSection() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-brand-red">
      <img
        src={bandMosaic}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-50"
      />

      <div className="relative mx-auto w-full max-w-[1728px] px-6 py-20 sm:px-[84px] lg:py-[120px]">
        <Reveal>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow className="text-white/75">Own your own pipeline.</Eyebrow>
              <h2 className="max-w-[18ch] font-display text-h2 text-balance text-white">
                Build, launch and close on a pipeline that runs itself.
              </h2>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Button withArrow>Start free trial</Button>
              <Button withArrow tone="dark">
                Talk to sales
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
