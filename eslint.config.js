//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config"

export default [
  {
    ignores: [
      ".output/**",
      ".nitro/**",
      ".tanstack/**",
      ".vinxi/**",
      ".vercel/**",
      "dist/**",
      "src/routeTree.gen.ts",
    ],
  },
  ...tanstackConfig,
]
