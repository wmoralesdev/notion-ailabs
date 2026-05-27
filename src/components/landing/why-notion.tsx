import { Reveal } from "@/components/reveal"
import { useLocale } from "@/lib/i18n"

export function WhyNotion() {
  const { t } = useLocale()
  const { whyNotion } = t

  return (
    <section
      id="por-que"
      aria-labelledby="why-headline"
      className="section-spacing border-y border-border/60 bg-secondary/40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-x-10 lg:px-16">
        <header className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow-label mb-6 text-primary">{whyNotion.eyebrow}</p>
          <h2
            id="why-headline"
            className="text-display-section text-foreground"
          >
            {whyNotion.headline}
          </h2>
        </header>

        <ul className="lg:col-span-7 lg:col-start-6">
          {whyNotion.rows.map((row, i) => (
            <Reveal
              key={row.label}
              as="li"
              delay={i * 60}
              className="border-t border-border/60 py-7 last:border-b md:py-9"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {row.label}
              </h3>
              <p className="text-body-lead mt-2 max-w-[58ch] text-muted-foreground">
                {row.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
