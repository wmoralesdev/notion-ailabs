import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/i18n"
import { AILABS_SITE } from "@/lib/links"

export function WhoWeAre() {
  const { t } = useLocale()
  const { whoWeAre } = t

  return (
    <section
      id="quienes-somos"
      aria-labelledby="who-headline"
      className="relative flex h-svh flex-col overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-7 px-6 md:gap-8 md:px-10 lg:px-16">
        <Reveal as="header" className="max-w-[68ch]">
          <p className="eyebrow-label mb-4 text-primary">{whoWeAre.eyebrow}</p>
          <h2
            id="who-headline"
            className="text-heading-section text-foreground"
          >
            {whoWeAre.headline}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-12">
          <Reveal as="div" delay={80} className="lg:col-span-7">
            <figure className="m-0">
              <div className="relative aspect-[4/3] max-h-[min(34svh,300px)] overflow-hidden border border-border bg-muted lg:max-h-[min(38svh,340px)]">
                <img
                  src="/who-we-are.jpg"
                  alt={whoWeAre.imageAlt}
                  width={1920}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover object-center"
                />
              </div>
            </figure>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-5 lg:col-start-8">
            <div className="space-y-4 text-body-lead text-muted-foreground">
              {whoWeAre.paragraphs.map((para, i) => (
                <p key={i} className="max-w-[52ch]">
                  {para}
                </p>
              ))}
            </div>

            <a
              href={AILABS_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-[6px] decoration-primary/40 hover:underline focus-visible:outline-none focus-visible:underline"
            >
              {whoWeAre.cta}
              <ArrowUpRight className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <CredibilityRow metrics={whoWeAre.metrics} />
        </Reveal>
      </div>
    </section>
  )
}

function CredibilityRow({
  metrics,
}: {
  metrics: Array<{ value: string; label: string }>
}) {
  return (
    <dl className="grid grid-cols-1 gap-y-4 border-y border-border/70 py-5 md:grid-cols-3 md:gap-x-10 md:gap-y-0 md:divide-x md:divide-border/70">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`flex items-baseline gap-4 ${i > 0 ? "md:pl-10" : ""}`}
        >
          <span className="font-display text-3xl font-semibold tracking-tight text-primary tabular-nums md:text-4xl">
            {m.value}
          </span>
          <span className="text-sm leading-snug text-muted-foreground">
            {m.label}
          </span>
        </div>
      ))}
    </dl>
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
