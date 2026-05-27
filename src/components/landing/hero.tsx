import { useRef } from "react"
import { useGSAP } from "@gsap/react"

import { HeroQr } from "@/components/landing/hero-qr"
import { NotionLogo } from "@/components/notion-logo"
import { useLocale } from "@/lib/i18n"
import { AFFILIATE_LINK } from "@/lib/links"
import { gsap, motion } from "@/lib/motion/gsap-setup"

export function Hero() {
  const { t, locale } = useLocale()
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = gsap.matchMedia()

      reduced.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as
            | { motion: boolean; reduced: boolean }
            | undefined
          const targets = [
            "[data-motion='hero-eyebrow']",
            "[data-motion='hero-headline-pre']",
            "[data-motion='hero-headline-em']",
            "[data-motion='hero-sub']",
            "[data-motion='hero-cta'] > *",
            "[data-motion='hero-qr']",
          ]
          const decor = "[data-motion='hero-decor']"

          if (!conditions?.motion) {
            gsap.set([...targets, decor], { clearProps: "all" })
            return
          }

          gsap.set(targets, { autoAlpha: 0, y: 14 })
          gsap.set(decor, { scaleX: 0, transformOrigin: "left center" })

          const tl = gsap.timeline({
            defaults: { ease: motion.ease.out, duration: motion.duration.hero },
            delay: 0.05,
          })

          tl.to("[data-motion='hero-eyebrow']", {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
          })
            .to(
              "[data-motion='hero-headline-pre']",
              { autoAlpha: 1, y: 0 },
              "-=0.35",
            )
            .to(
              "[data-motion='hero-headline-em']",
              { autoAlpha: 1, y: 0 },
              "-=0.7",
            )
            .to(
              "[data-motion='hero-sub']",
              { autoAlpha: 1, y: 0, duration: 0.7 },
              "-=0.55",
            )
            .to(
              "[data-motion='hero-cta'] > *",
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: motion.stagger.tight,
              },
              "-=0.5",
            )
            .to(
              "[data-motion='hero-qr']",
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
              },
              "-=0.55",
            )
            .to(
              decor,
              {
                scaleX: 1,
                duration: motion.duration.decor,
                ease: motion.ease.inOut,
              },
              "-=0.45",
            )
        },
      )

      return () => reduced.revert()
    },
    {
      scope: sectionRef,
      dependencies: [locale],
      revertOnUpdate: true,
    },
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-headline"
      className="relative flex h-[calc(100svh-4rem)] flex-col overflow-hidden md:h-[calc(100svh-5rem)]"
    >
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-y-5 px-6 md:gap-y-6 md:px-10 lg:grid-cols-12 lg:gap-x-12 lg:px-16">
        <div className="lg:col-span-7 lg:py-2">
          <p
            data-motion="hero-eyebrow"
            className="eyebrow-label mb-4 inline-flex items-center gap-2.5 text-muted-foreground"
          >
            <span>{t.hero.eyebrow}</span>
            <NotionLogo
              decorative
              size={14}
              className="text-foreground/70"
            />
          </p>

          <h1
            id="hero-headline"
            className="text-display-hero text-[clamp(2rem,4.4vw,3.75rem)] text-foreground"
          >
            <span data-motion="hero-headline-pre" className="inline-block">
              {t.hero.headlinePre}
            </span>{" "}
            <span
              data-motion="hero-headline-em"
              className="inline-block text-primary"
            >
              {t.hero.headlineEmphasis}
            </span>
          </h1>

          <p
            data-motion="hero-sub"
            className="text-body-lead mt-3 max-w-[42ch] text-muted-foreground"
          >
            {t.hero.sub}
          </p>

          <div className="mt-6 lg:hidden">
            <HeroQr />
          </div>

          <div
            data-motion="hero-cta"
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_18%,transparent)] transition-all duration-300 hover:bg-[var(--brand-violet-strong)] hover:shadow-[0_18px_44px_color-mix(in_oklch,var(--primary)_28%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.hero.primaryCta}
              <ArrowUpRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
            <a
              href="#por-que"
              className="group/sec inline-flex items-center gap-2 text-sm font-medium text-foreground/80 underline-offset-[6px] decoration-foreground/30 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:underline focus-visible:text-foreground"
            >
              {t.hero.secondaryCta}
              <ArrowDown className="transition-transform duration-300 group-hover/sec:translate-y-0.5" />
            </a>
          </div>
        </div>

        <aside className="hidden lg:col-span-5 lg:col-start-8 lg:block lg:justify-self-end lg:pt-7">
          <HeroQr />
        </aside>
      </div>

      <DecorRule className="absolute inset-x-0 bottom-0" />
    </section>
  )
}

function DecorRule({ className }: { className?: string }) {
  return (
    <div
      data-motion="hero-decor"
      aria-hidden="true"
      className={`mx-auto h-px max-w-[1400px] bg-gradient-to-r from-transparent via-border to-transparent ${className ?? ""}`}
    />
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )
}
