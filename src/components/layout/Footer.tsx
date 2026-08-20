import logoMark from "../../assets/icons/logo-mark.svg";

/**
 * The Figma draft ends with the closing CTA row inside the hive section —
 * there's no separate footer design yet. This is a minimal closing bar
 * (logo + year) so the page doesn't just stop after the button.
 */
export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-line px-6 py-10 text-center">
      <img src={logoMark} alt="" className="h-6 w-7 opacity-70" />
      <p className="font-sans text-micro text-muted">
        © {new Date().getFullYear()} RedApe. All rights reserved.
      </p>
    </footer>
  );
}
