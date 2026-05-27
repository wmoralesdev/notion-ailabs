import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import appCss from "../styles.css?url"
import { MotionRoot } from "@/components/motion-root"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/lib/i18n"

const SITE_TITLE = "Ai /abs × Notion · 3 meses gratis de Notion Business + AI"
const SITE_DESCRIPTION =
  "Reclamá 3 meses de Notion Business + AI para tu equipo. Programa de afiliados, cortesía de Ai /abs: servicios de IA para equipos en El Salvador."
const SITE_URL = "https://notion.ailabs.sv"

const PREFERENCES_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("notion-ailabs-theme");var l=localStorage.getItem("notion-ailabs-locale");var r=document.documentElement;r.classList.add(t==="dark"?"dark":"light");r.lang=(l==="en"||l==="es")?l:"es";}catch(e){document.documentElement.classList.add("light");document.documentElement.lang="es";}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "theme-color", content: "#8b7bc7" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:locale", content: "es_SV" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: PREFERENCES_BOOT_SCRIPT }}
        />
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="notion-ailabs-theme">
          <LocaleProvider>
            <MotionRoot>{children}</MotionRoot>
          </LocaleProvider>
        </ThemeProvider>
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{
              position: "bottom-right",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}
