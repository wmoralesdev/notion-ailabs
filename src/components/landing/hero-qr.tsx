import QRCode from "react-qr-code"

import { useResolvedDark } from "@/components/theme-provider"
import { useLocale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/links"

const QR_LIGHT = {
  bg: "#f6f5f1",
  fg: "#2a2836",
} as const

const QR_DARK = {
  bg: "#2e2c38",
  fg: "#f3f2ef",
} as const

export function HeroQr() {
  const { t } = useLocale()
  const isDark = useResolvedDark()
  const colors = isDark ? QR_DARK : QR_LIGHT

  return (
    <figure
      data-motion="hero-qr"
      className="m-0 w-[11.5rem] shrink-0 md:w-[13rem] lg:w-[15.5rem]"
      aria-label={t.hero.qr.alt}
    >
      <QRCode
        value={SITE_URL}
        size={256}
        bgColor={colors.bg}
        fgColor={colors.fg}
        level="M"
        aria-hidden="true"
        className="h-auto w-full"
      />
    </figure>
  )
}
