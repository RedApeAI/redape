import { Reveal } from "../components/motion/Reveal";
import { SectionIntro } from "../components/ui/SectionIntro";
import { Marquee } from "../components/ui/Marquee";
import { FeatureChip } from "../components/ui/FeatureChip";
import { GridTile } from "../components/graphics/GridTile";
import { CommandDemo } from "../components/demo/CommandDemo";
import { colors } from "../design-system/colors";
import bandMosaic from "../assets/backgrounds/band-mosaic.png";

const chips = [
  { label: "Resource Allocation", color: colors.accent.green },
  { label: "Advanced Analytics", color: colors.accent.red },
  { label: "Real-time Collaboration", color: colors.accent.indigo },
  { label: "Task Management", color: colors.accent.yellow },
  { label: "Security Measures", color: colors.accent.violet },
  { label: "Instant Follow-ups", color: colors.accent.magenta },
];

/**
 * node 3144:9857 — "Say it. RedApe does it."
 *
 * A blueprint band sits behind the heading, then the red panel — inset
 * 84px either side rather than full-bleed, as in the file — carries the
 * product card and the ticker of capabilities.
 */
export function CommandSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* grid band behind the heading */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[551px] md:block">
        <GridTile variant={2} />
        <GridTile variant={2} mirrored />
      </div>

      <div className="relative mx-auto w-full max-w-[1728px] px-4 sm:px-[84px]">
        <SectionIntro
          headline="Say it. RedApe does it."
          body={
            <>
              Write a request just like you&rsquo;d tell a teammate. RedApe turns it into real
              work—building campaigns, sending emails and DMs, following up with leads, and
              surfacing the conversations that matter.
            </>
          }
          className="pb-[30px] pt-16 lg:pt-[100px]"
        />

        <Reveal y={56} delay={0.1}>
          <div
            data-nav-theme="dark"
            className="relative overflow-hidden bg-brand-red px-4 py-10 sm:px-10 lg:py-[47px]"
          >
            <img
              src={bandMosaic}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 size-full object-cover object-bottom opacity-90"
            />

            <div className="relative mx-auto flex max-w-[1055px] flex-col items-center gap-10">
              <CommandDemo />

              <Marquee className="max-w-[1030px] [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
                {chips.map((chip) => (
                  <FeatureChip key={chip.label} label={chip.label} dotColor={chip.color} />
                ))}
              </Marquee>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
