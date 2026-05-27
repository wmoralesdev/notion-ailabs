import { useEffect, useState } from "react"

import { LocaleToggle } from "@/components/locale-toggle"
import { NotionLogo } from "@/components/notion-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLocale } from "@/lib/i18n"
import { BOOKING_LINK } from "@/lib/links"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { t } = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="eyebrow-label sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:rounded-full focus:border focus:border-ring focus:bg-background focus:px-3 focus:py-1.5 focus:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {t.nav.skipToContent}
      </a>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-6 md:h-20 md:px-10 lg:px-16">
        <a
          href="/"
          className="group/logo inline-flex items-center gap-2.5 text-foreground"
          aria-label="Ai /abs × Notion"
        >
          <img
            src="/ailabs.svg"
            alt=""
            width="28"
            height="28"
            className="size-7 transition-transform duration-500 group-hover/logo:rotate-12 dark:invert"
          />
          <span className="font-display text-[1.05rem] font-semibold tracking-tight whitespace-nowrap">
            Ai /abs
          </span>
          <span
            aria-hidden="true"
            className="hidden items-center gap-2.5 text-muted-foreground sm:inline-flex"
          >
            <span className="text-foreground/35">×</span>
            <NotionLogo
              decorative
              size={18}
              className="text-foreground transition-transform duration-500 group-hover/logo:-rotate-6"
            />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">
              Notion
            </span>
          </span>
        </a>

        <nav className="flex items-center gap-2 md:gap-3" aria-label="Utilities">
          <LocaleToggle />
          <ThemeToggle />
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow-label hidden h-8 items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-3 whitespace-nowrap text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-none md:inline-flex"
          >
            {t.nav.booking}
            <ArrowUpRight />
          </a>
        </nav>
      </div>
    </header>
  )
}

function ArrowUpRight() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}
