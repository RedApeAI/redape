import { cx } from "../../lib/cx";

/**
 * Draws an SVG file as a shape rather than as artwork: the file supplies the
 * silhouette through a CSS mask and the colour comes from `currentColor`.
 *
 * The icon set ships in two cuts — most files are stroked white, a few
 * (mail, whatsapp, promotion) are stroked #141B34 — so tinting them with
 * `invert` can only ever be right for one cut on a given background. Masking
 * ignores the exported colour entirely, so every icon is legible on any
 * surface and a newly added file can't land in the wrong cut.
 *
 * The url() is quoted deliberately: Vite inlines sub-4KB SVGs as data URIs
 * whose markup carries single quotes, and an unquoted url() token cannot
 * hold those — Chrome drops the whole declaration and the mask silently
 * becomes `none`, painting the icon box as a solid block of currentColor.
 */
export function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cx("inline-block bg-current", className)}
      style={{
        maskImage: `url("${src}")`,
        maskSize: "contain",
        maskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskImage: `url("${src}")`,
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}
