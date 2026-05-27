import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/i18n"
import { BOOKING_LINK } from "@/lib/links"

export function Closer() {
  const { t } = useLocale()
  const { closer } = t

  return (
    <section
      aria-labelledby="closer-headline"
      className="border-t border-border/70 bg-secondary/40"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow-label mb-6 text-muted-foreground">
              {closer.eyebrow}
            </p>
            <h2
              id="closer-headline"
              className="text-display-section text-foreground"
            >
              {closer.headline}
            </h2>
            <p className="text-body-lead mt-8 max-w-[58ch] text-muted-foreground">
              {closer.body}
            </p>
          </Reveal>

          <Reveal
            delay={140}
            className="flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-9 lg:items-end lg:justify-end lg:pb-2"
          >
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_18%,transparent)] transition-all duration-300 hover:bg-foreground/85 hover:shadow-[0_18px_44px_color-mix(in_oklch,var(--foreground)_22%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {closer.primaryCta}
              <ArrowUpRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
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
