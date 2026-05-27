import { useLocale } from "@/lib/i18n"
import { AILABS_SITE } from "@/lib/links"

export function SiteFooter() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:gap-6 md:px-10 md:py-10 lg:px-16">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-semibold text-foreground">
            Ai /abs
          </span>
          <span aria-hidden="true" className="text-foreground/30">
            ·
          </span>
          <span>{t.footer.tagline}</span>
          <span aria-hidden="true" className="text-foreground/30">
            ·
          </span>
          <a
            href={AILABS_SITE}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            {t.footer.siteLink}
          </a>
        </div>
        <p className="max-w-md text-[0.6875rem] leading-relaxed text-muted-foreground/80 md:text-right">
          © {year} Ai /abs. {t.footer.disclosure}
        </p>
      </div>
    </footer>
  )
}
