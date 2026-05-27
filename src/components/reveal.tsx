import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import type { HTMLAttributes } from "react"

import { gsap, motion } from "@/lib/motion/gsap-setup"
import { cn } from "@/lib/utils"

type Props = HTMLAttributes<HTMLElement> & {
  /** Delay (ms) before the element starts revealing once in view. */
  delay?: number
  /** Render as a different element. Defaults to `div`. */
  as?: "div" | "li" | "section" | "header" | "article"
}

/**
 * Wraps content with a one-shot GSAP ScrollTrigger reveal. Fades and lifts
 * the element into place the first time it enters view, then leaves the
 * tween in place so the content remains visible. Respects
 * `prefers-reduced-motion` by jumping straight to the final state.
 */
export function Reveal({
  className,
  children,
  delay = 0,
  as: Tag = "div",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as
            | { motion: boolean; reduced: boolean }
            | undefined

          if (!conditions?.motion) {
            gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "all" })
            return
          }

          gsap.set(el, { autoAlpha: 0, y: 22 })

          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: motion.duration.reveal,
            ease: motion.ease.out,
            delay: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          })
        },
      )

      return () => mm.revert()
    },
    { dependencies: [delay], revertOnUpdate: true },
  )

  return (
    <Tag ref={ref as never} className={cn(className)} {...rest}>
      {children}
    </Tag>
  )
}
