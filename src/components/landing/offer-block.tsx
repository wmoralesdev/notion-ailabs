import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/i18n"
import { AFFILIATE_LINK, BLOCKED_FREE_DOMAINS } from "@/lib/links"
import { gsap } from "@/lib/motion/gsap-setup"

export function OfferBlock() {
  const { t } = useLocale()
  const { offer } = t
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-motion='offer-backdrop']",
          { yPercent: -8 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="oferta"
      aria-labelledby="offer-headline"
      className="offer-purple-block relative overflow-hidden"
    >
      <BackdropMark />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-y-10 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-x-10 lg:px-16 lg:py-40">
        <Reveal as="header" className="lg:col-span-7">
          <p className="eyebrow-label mb-8 text-[color:var(--foreground)]">
            {offer.eyebrow}
          </p>
          <h2
            id="offer-headline"
            className="text-display-section text-[color:var(--foreground)]"
          >
            {offer.headline}
          </h2>
          <p className="text-body-lead mt-8 max-w-[52ch] text-[color:var(--foreground)]">
            {offer.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-[oklch(0.985_0.005_96)] px-7 py-4 text-sm font-semibold text-[var(--brand-violet-strong)] shadow-[0_1px_0_color-mix(in_oklch,black_18%,transparent)] transition-all duration-300 hover:bg-white hover:shadow-[0_18px_44px_color-mix(in_oklch,black_22%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.985_0.005_96)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-violet-strong)]"
            >
              {offer.cta}
              <ArrowUpRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal
          as="article"
          delay={120}
          className="lg:col-span-4 lg:col-start-9 lg:pt-2"
        >
          <DomainsList label={offer.blockedLabel} />
          <p className="mt-6 max-w-[42ch] text-xs leading-relaxed text-[color:var(--foreground)]">
            {offer.disclosure}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function DomainsList({ label }: { label: string }) {
  return (
    <div className="border border-[color:var(--foreground)]/35">
      <p className="border-b border-[color:var(--foreground)]/35 px-4 py-2.5 font-mono text-xs font-medium tracking-wide text-[color:var(--foreground)]">
        {label}
      </p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-4 py-4 font-mono text-xs text-[color:var(--foreground)]">
        {BLOCKED_FREE_DOMAINS.map((domain) => (
          <li key={domain} className="flex items-baseline gap-2">
            <span aria-hidden="true" className="text-[color:var(--foreground)]/70">
              ×
            </span>
            <span>{domain}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BackdropMark() {
  return (
    <div
      data-motion="offer-backdrop"
      aria-hidden="true"
      className="pointer-events-none absolute -right-12 -bottom-24 hidden will-change-transform select-none font-display text-[26rem] leading-none font-bold tracking-tighter text-[color:var(--foreground)]/[0.08] lg:block"
    >
      /3
    </div>
  )
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}
