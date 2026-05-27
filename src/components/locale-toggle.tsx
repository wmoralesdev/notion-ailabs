import { useLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()
  const next = locale === "es" ? "en" : "es"

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={t.nav.toggleLocale}
      title={t.nav.toggleLocale}
      className={cn(
        "eyebrow-label inline-flex h-8 items-center gap-1 rounded-full border border-border/70 bg-background/60 px-2.5 text-foreground/70 transition-colors hover:border-primary/50 hover:text-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <span aria-hidden="true" className={locale === "es" ? "text-foreground" : ""}>
        ES
      </span>
      <span aria-hidden="true" className="opacity-40">
        /
      </span>
      <span aria-hidden="true" className={locale === "en" ? "text-foreground" : ""}>
        EN
      </span>
    </button>
  )
}
