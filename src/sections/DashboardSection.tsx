import { Reveal } from "../components/motion/Reveal";
import { SectionIntro } from "../components/ui/SectionIntro";
import { FitStage } from "../components/ui/FitStage";
import { GridTile } from "../components/graphics/GridTile";
import { StatCards } from "../components/dashboard/StatCards";
import { QuickActions } from "../components/dashboard/QuickActions";
import { CalendarCard } from "../components/dashboard/CalendarCard";
import { FunnelCard } from "../components/dashboard/FunnelCard";
import bandMosaic from "../assets/backgrounds/band-mosaic.png";
import hatchTile from "../assets/backgrounds/hatch-tile.png";

/** The canvas the four widgets are positioned on, straight from node 3144:10159. */
const STAGE = { width: 1385, height: 757 };

/** Where each widget sits on that canvas. */
const PLACES = {
  stats: { left: 348, top: 153.21 },
  actions: { left: 686.17, top: 158.04 },
  calendar: { left: 329, top: 362.92 },
  funnel: { left: 685.69, top: 362.92 },
};

/**
 * node 3144:10090 "Frame 2147263272" — "You're getting leads. So why
 * aren't they buying?"
 *
 * Same shape as the command section: blueprint band behind the heading,
 * then a blue panel inset 84px either side. Inside it the four dashboard
 * widgets sit at fixed offsets around a hatched plate, so the whole
 * composition is scaled as one rather than reflowed.
 */
export function DashboardSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* grid band behind the heading */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[551px] md:block">
        <GridTile variant={2} />
        <GridTile variant={2} mirrored />
      </div>

      <div className="relative mx-auto w-full max-w-[1728px] px-4 sm:px-[84px]">
        <SectionIntro
          headline={<>You&rsquo;re getting leads. So why aren&rsquo;t they buying?</>}
          body={
            <>
              RedApe doesn&rsquo;t just find leads — it tracks every reply, every meeting, and every
              stalled deal, so you always know exactly where the funnel is leaking.
            </>
          }
          className="pb-[30px] pt-16 lg:pt-[100px]"
        />

        <Reveal y={56} delay={0.1}>
          <div
            data-nav-theme="dark"
            className="relative overflow-hidden bg-brand-blue px-4 py-[47px] sm:px-10"
          >
            <img
              src={bandMosaic}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 size-full object-bottom"
            />

            <FitStage {...STAGE} minScale={0.5} className="relative">
              {/* hatched plate the widgets overlap */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[312.56px] w-[557.211px] -translate-x-1/2 -translate-y-1/2 border border-[rgba(51,13,221,0.5)] bg-[linear-gradient(to_top,#f3f3f3_96.882%,#053583_96.882%)]"
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: `url(${hatchTile})`, backgroundSize: "11.2px 11.2px" }}
                />
              </div>

              <div className="absolute" style={PLACES.stats}>
                <StatCards />
              </div>
              <div className="absolute" style={PLACES.actions}>
                <QuickActions />
              </div>
              <div className="absolute" style={PLACES.calendar}>
                <CalendarCard />
              </div>
              <div className="absolute" style={PLACES.funnel}>
                <FunnelCard />
              </div>
            </FitStage>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
