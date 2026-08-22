import { Reveal } from "../components/motion/Reveal";
import { SectionIntro } from "../components/ui/SectionIntro";
import { GridTile } from "../components/graphics/GridTile";
import { HiveColumn } from "../components/hive/HiveColumn";
import { hiveColumns } from "../components/hive/hiveColumns";
import bandMosaic from "../assets/backgrounds/band-mosaic.png";

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
          <div className="relative overflow-hidden bg-brand-green px-4 py-26 sm:px-10">
            <img
              src={bandMosaic}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 size-full object-cover object-bottom"
            />

            <div className="relative z-10 mx-auto flex max-w-[82%] flex-col border border-black/10 bg-surface lg:flex-row">
              {hiveColumns.map((column, i) => (
                <HiveColumn
                  key={column.week}
                  column={column}
                  /* Week 1 is the narrow column in the file; the other two split the rest. */
                  className={i === 0 ? "lg:w-[32.32%]" : "lg:flex-1"}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
