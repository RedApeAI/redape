import { Reveal } from "../motion/Reveal";
// import { MaskIcon } from "../ui/MaskIcon";
import logoMark from "../../assets/icons/logo-mark.svg";
// import pixelApe from "../../assets/graphics/pixelape.svg";
import {
  MarkArcs,
  MarkAsterisk,
  MarkKnot,
  MarkSlash,
  MarkSparkle,
} from "./AssistantMarks";
import { FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

const assistants = [
  { label: "ChatGPT", mark: <MarkKnot /> },
  { label: "Claude", mark: <MarkAsterisk /> },
  { label: "Perplexity", mark: <MarkArcs /> },
  { label: "Gemini", mark: <MarkSparkle /> },
  { label: "Grok", mark: <MarkSlash /> },
];

const socials = [
  { label: "LinkedIn", mark: <FaLinkedin /> },
  { label: "X", mark: <FaXTwitter /> },
  { label: "YouTube", mark: <FaYoutube /> },
  { label: "Instagram", mark: <FaInstagram /> },
];

const groups = [
  {
    heading: "Product",
    links: ["Integrations", "Why RedApe", "Pricing", "Changelog"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Blog", "Community", "Help centre"],
  },
  {
    heading: "Company",
    links: ["About us", "Contact us", "Careers", "System status"],
  },
  {
    heading: "Connect",
    links: ["Twitter", "LinkedIn", "Instagram", "YouTube"],
  },
];

const linkClass =
  "font-sans text-body text-muted transition-colors duration-200 hover:text-ink";

/**
 * The page's closing slab: the assistants row, the link columns, the legal
 * line, and the mark blown up along the bottom edge — cropped by the page,
 * so it reads as a watermark the footer sits on rather than a logo.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F7F5F5]">
      <div className="mx-auto w-full max-w-[1728px] px-4 sm:px-[84px]">
        {/* ask-an-assistant row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4 py-10">
          <p className="font-sans text-body text-muted">Ask about RedApe on</p>
          <ul className="flex flex-wrap items-center gap-2">
            {assistants.map((assistant) => (
              <li key={assistant.label}>
                <a
                  href="#"
                  aria-label={`Ask about RedApe on ${assistant.label}`}
                  className="flex size-10 items-center justify-center rounded-[10px] bg-surface-3 text-muted-2 transition-colors duration-200 hover:bg-chip hover:text-ink"
                >
                  {assistant.mark}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto w-full max-w-[1728px] px-4 sm:px-[84px]">
          <Reveal y={24}>
            <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-10 lg:py-20">
              <div className="flex max-w-[42ch] flex-col items-start gap-5">
                <a href="#top" className="flex items-center gap-1.5">
                  <img src={logoMark} alt="" aria-hidden className="h-8 w-auto" />
                  <span className="font-sans text-wordmark font-bold text-ink">RedApe</span>
                </a>
                <p className="font-sans text-body text-muted">
                  The AI sales workforce that chases every lead, writes every follow-up, and
                  keeps the pipeline honest.
                </p>
                <p className="font-mono-ui text-micro text-muted-2">
                  Made with <span aria-hidden>🐒</span> in India &amp; worldwide
                </p>
                <ul className="flex items-center gap-4">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href="#"
                        aria-label={social.label}
                        className="flex text-[18px] text-muted-2 transition-colors duration-200 hover:text-ink"
                      >
                        {social.mark}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {groups.map((group) => (
                <nav key={group.heading} aria-label={group.heading} className="flex flex-col gap-4">
                  <h2 className="font-mono-ui text-micro font-semibold uppercase tracking-[0.1em] text-ink">
                    {group.heading}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a href="#" className={linkClass}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/*
        The oversized mark is the bottom band's background. It is pushed
        below the baseline so only its top half shows, and the social row
        plus legal row are laid over it rather than pushed down by it.
      */}
      <div className="relative border-t border-line-soft">
        {/*
          Pixel-traced version of the mark (vs. the plain silhouette used
          above) so the watermark actually carries a face. `MaskIcon` draws
          it as a flat-tinted shape; the eye slit is a solid patch of that
          tint, so a small paper-coloured dot slid across it reads as the
          eye glancing side to side rather than a redraw of the artwork.
        */}
        {/* <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-40px] left-1/2 aspect-[116/120] h-[240px] -translate-x-1/2 sm:h-[320px]"
        >
          <MaskIcon src={pixelApe} className="absolute inset-0 size-full text-ink " />
          <span
            aria-hidden
            className="animate-eye-shift absolute rounded-full bg-[#F7F5F5]"
            style={{ width: "2.2%", height: "2.2%", top: "40.6%", left: "63%" }}
          />
        </div> */}

        <div className="relative mx-auto w-full max-w-[1728px] px-4 sm:px-[84px]" style={{"height": "10px", "paddingBottom": "240px"}}>
          <div className="flex flex-col gap-3 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <img src={logoMark} alt="" aria-hidden className="h-4 w-auto opacity-70" />
              <p className="font-sans text-micro text-muted-2">
                RedApe © {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="font-sans text-micro text-muted-2 hover:text-ink">
                Terms
              </a>
              <a href="#" className="font-sans text-micro text-muted-2 hover:text-ink">
                Privacy
              </a>
            </div>
          </div>

          {/* room for the mark to show through under the legal row */}
          <div aria-hidden className="h-[70px] sm:h-[240px]" />
        </div>
      </div>
    </footer>
  );
}
