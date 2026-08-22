import { useState } from "react";
import { Reveal } from "../components/motion/Reveal";
import { Button } from "../components/ui/Button";
import { PricingCard } from "../components/pricing/PricingCard";
import pricingPlansBg from "../assets/backgrounds/pricing-plans-bg.webp";
import pricingCtaGrid from "../assets/backgrounds/pricing-cta-grid.png";
import pricingCtaGlow from "../assets/backgrounds/pricing-cta-glow.webp";
import userMini from "../assets/icons/user-mini.svg";
import usersMini from "../assets/icons/users-mini.svg";

const plans = [
  {
    name: "Basic Plan",
    description: "14 days free Trail",
    price: "Free",
    badge: { icon: userMini, label: "Per User" },
    features: ["Task Management", "AI Summary", "Progress Tracking", "Smart Labels"],
    ctaLabel: "Get Started",
    footnote: "Renews automatically. Cancel anytime.",
  },
  {
    name: "Pro Plan",
    description: "Ideal for growing teams and projects.",
    price: "$49",
    priceYearly: "$39",
    badge: { icon: usersMini, label: "20 Users" },
    features: [
      "Everything in Basic Plan +",
      "Team Collaboration",
      "Bulk Actions",
      "2-way Translation",
      "Advanced Reporting",
      "Customizable Dashboards",
    ],
    ctaLabel: "Get Started",
    footnote: "Renews automatically. Cancel anytime.",
    highlighted: true,
  },
  {
    name: "Enterprise Plan",
    description: "Built for large organizations needs.",
    price: "Custom",
    features: [
      "Everything in Pro Plan +",
      "SAML sso",
      "Dedicated Account Manager",
      "Enterprise Integrations",
      "Data Analytics",
      "Security Enhancements",
      "Priority Support",
    ],
    ctaLabel: "Contact Sales",
    footnote: "Contact sales to further information.",
  },
] as const;

/**
 * node 3193:739 "Frame 2147263288" — the pricing table, plus the "See
 * RedApe AI in action" strip that closes it out (Figma 3193:6 / 3193:318).
 */
export function PricingSection() {
  const [billedYearly, setBilledYearly] = useState(false);

  return (
    <section className="relative overflow-hidden bg-surface-3">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={pricingPlansBg} alt="" className="size-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-col gap-14 px-6 py-16 sm:px-[84px] lg:py-14">
        <Reveal>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col items-start gap-4">
              <span className="rounded-full bg-white px-3 py-1.5 font-sans text-nav font-medium text-ink shadow-[0_1px_0.5px_rgba(0,0,0,0.15)]">
                Pricing &amp; Plans
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-[36px] font-normal leading-[1.15] tracking-[-0.02em] text-balance text-black sm:text-[42px]">
                  Affordable Pricing Plans
                </h2>
                <p className="max-w-[46ch] font-sans text-body font-medium text-ink-soft">
                  Flexible, transparent pricing to support your team&rsquo;s productivity and
                  growth at every stage.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="font-sans text-nav font-medium text-ink">Billed Monthly</span>
              <button
                type="button"
                role="switch"
                aria-checked={billedYearly}
                aria-label="Toggle yearly billing"
                onClick={() => setBilledYearly((v) => !v)}
                className="flex w-[38px] items-center rounded-full bg-brand-red p-1 transition-colors duration-200"
              >
                <span
                  className={`size-3.5 rounded-full bg-white shadow-[0_2px_2px_rgba(0,0,0,0.3)] transition-transform duration-200 ${
                    billedYearly ? "translate-x-[16px]" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="font-sans text-nav font-medium text-muted">Billed yearly</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="-mx-6 flex snap-x snap-proximity items-stretch justify-[safe_center] gap-4 overflow-x-auto px-6 pb-2 pt-10 sm:-mx-[84px] sm:px-[84px] lg:mx-0 lg:grid lg:grid-cols-3 lg:justify-normal lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="w-[82vw] max-w-[320px] shrink-0 snap-center lg:w-auto lg:max-w-none lg:shrink lg:snap-align-none"
              >
                <PricingCard
                  {...plan}
                  price={billedYearly && "priceYearly" in plan ? plan.priceYearly : plan.price}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative h-auto w-full bg-white py-7 sm:h-[176px] sm:py-0">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={pricingCtaGrid} alt="" className="size-full object-cover opacity-60" />
        </div>

        <div className="relative mx-auto flex w-full items-center px-6 sm:h-full sm:max-w-[67vw] sm:px-0 sm:py-7">
          <Reveal className="w-full">
            <div className="relative flex w-full flex-col items-start gap-7 overflow-hidden border border-black px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-[50px] sm:px-[57px] sm:py-9">
              <img
                src={pricingCtaGlow}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full object-cover"
              />
              <h3 className="relative font-display text-[29px] tracking-[-0.02em] text-ink sm:text-[45px]">
                See RedApe AI in action
              </h3>
              <Button withArrow size="sm" className="relative shrink-0">
                Get Demo
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
