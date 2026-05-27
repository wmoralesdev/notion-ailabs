import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let registered = false

/**
 * Registers GSAP plugins exactly once on the client. Safe to call from any
 * component; the server-side path is a no-op.
 */
export function ensureGsapRegistered() {
  if (registered) return
  if (typeof window === "undefined") return
  gsap.registerPlugin(useGSAP, ScrollTrigger)
  registered = true
}

/** Shared motion vocabulary. Keep durations and easing consistent site-wide. */
export const motion = {
  ease: {
    out: "power4.out",
    inOut: "power3.inOut",
  },
  duration: {
    reveal: 0.75,
    hero: 0.9,
    decor: 0.7,
  },
  stagger: {
    tight: 0.06,
    loose: 0.09,
  },
} as const

export { gsap, ScrollTrigger }
