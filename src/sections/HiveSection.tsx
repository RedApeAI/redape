import { Reveal } from "../components/motion/Reveal";
import { SectionIntro } from "../components/ui/SectionIntro";
import { Button } from "../components/ui/Button";
import { GridTile } from "../components/graphics/GridTile";
import { HiveColumn } from "../components/hive/HiveColumn";
import { hiveColumns } from "../components/hive/hiveColumns";
import bandMosaic from "../assets/backgrounds/band-mosaic.png";

/** The gradient the panel is matted in (node 3144:10470). */
const PANEL_GRADIENT =
  "linear-gradient(97.22deg, #ff2f2f 4.65%, #ef7b16 39.21%, #8a43e1 71.1%, #d511fd 99.84%)";

/**
 * node 3144:10401 "Frame 2147263274" — "Collective Hive Knowledge that
 * Improves for weeks".
 *
 * Three weeks of the same mind-map, each one denser than the last: week 1
 * is five tags around the orb, week 3 adds scattered signal, week 5 is
 * seven tags in a field of it. Below them the reassurance line and the CTA
 * sit directly on the gradient matte.
 */
export function HiveSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* grid band behind the heading */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[551px] md:block">
        <GridTile variant={2} />
        <GridTile variant={2} mirrored />
      </div>

      <div className="relative mx-auto w-full max-w-[1728px] px-4 sm:px-[84px]">
        <SectionIntro
          headline="Collective Hive Knowledge that Improves for weeks"
          body={
            <>
              RedApe learns from what works, adapts your outreach, and gets better at turning
              conversations into customers every week.
            </>
          }
          className="pb-[43px] pt-16 lg:pt-[60px]"
        />

        <Reveal y={56} delay={0.1}>
          <div className="relative overflow-hidden bg-brand-green px-4 py-10 sm:px-10">
            <img
              src={bandMosaic}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 size-full object-bottom"
            />

            <div
              className="relative mx-auto flex max-w-[1110px] flex-col gap-2.5 p-2.5"
              style={{ backgroundImage: PANEL_GRADIENT }}
            >
              <div className="flex flex-col border border-black/10 bg-surface lg:flex-row">
                {hiveColumns.map((column, i) => (
                  <HiveColumn
                    key={column.week}
                    column={column}
                    /* Week 1 is the narrow column in the file; the other two split the rest. */
                    className={i === 0 ? "lg:w-[32.32%]" : "lg:flex-1"}
                  />
                ))}
              </div>

              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <p className="max-w-[756px] font-sans text-[19px] font-medium leading-[1.33] tracking-[-0.38px] text-white">
                  Your data stays yours. RedApe uses secure, encrypted connections and never reads
                  your personal messages.
                </p>
                <Button withArrow className="shrink-0">
                  Start Free trail now
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
