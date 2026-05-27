import { createFileRoute } from "@tanstack/react-router"

import { Closer } from "@/components/landing/closer"
import { Hero } from "@/components/landing/hero"
import { OfferBlock } from "@/components/landing/offer-block"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { WhoWeAre } from "@/components/landing/who-we-are"
import { WhyNotion } from "@/components/landing/why-notion"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="flex-1 pt-16 md:pt-20">
        <Hero />
        <WhyNotion />
        <OfferBlock />
        <WhoWeAre />
        <Closer />
      </main>
      <SiteFooter />
    </div>
  )
}
