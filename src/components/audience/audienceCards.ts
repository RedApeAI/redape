import founders from "../../assets/images/audience-founders.webp";
import salespeople from "../../assets/images/audience-salespeople.webp";
import freelancers from "../../assets/images/audience-freelancers.webp";
import ecommerce from "../../assets/images/audience-ecommerce.webp";

/**
 * node 3197:21637 "Feature Cards Grid". Figma only writes out body copy for
 * the "Salespeople" card (it's the one shown mid-hover in the file) — the
 * other three lines here are written to match its length and voice, not
 * pulled from the design.
 */
export interface AudienceCardSpec {
  label: string;
  body: string;
  image: string;
}

export const audienceCards: AudienceCardSpec[] = [
  {
    label: "Founders",
    body: "Solo builders wearing every hat, closing deals without losing a day to admin.",
    image: founders,
  },
  {
    label: "Salespeople",
    body: "A cross-functional team that takes initiatives from kickoff to production at scale.",
    image: salespeople,
  },
  {
    label: "Freelancers",
    body: "Independent operators chasing every lead solo, with no team to pick up the slack.",
    image: freelancers,
  },
  {
    label: "Ecommerce",
    body: "Store owners turning DMs and abandoned carts into repeat customers, automatically.",
    image: ecommerce,
  },
];
