import { useEffect } from "react"
import type { ReactNode } from "react"

import { ensureGsapRegistered } from "@/lib/motion/gsap-setup"

/**
 * Registers GSAP plugins on the client before any landing section mounts.
 * Renders children straight through so it can wrap the route tree without
 * adding a layout node.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureGsapRegistered()
  }, [])

  return <>{children}</>
}
