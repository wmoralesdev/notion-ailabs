import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react"
import type { ReactNode } from "react"

export type Locale = "es" | "en"

const STORAGE_KEY = "notion-ailabs-locale"
const LOCALE_CHANGE_EVENT = "notion-ailabs-locale-change"
const DEFAULT_LOCALE: Locale = "es"

type Dict = {
  pageTitle: string
  nav: {
    booking: string
    skipToContent: string
    toggleTheme: string
    toggleLocale: string
  }
  hero: {
    eyebrow: string
    headlinePre: string
    headlineEmphasis: string
    sub: string
    primaryCta: string
    secondaryCta: string
    eligibility: string
    claimSteps: [string, string, string]
    qr: {
      alt: string
    }
  }
  whyNotion: {
    eyebrow: string
    headline: string
    rows: Array<{ label: string; body: string }>
  }
  offer: {
    eyebrow: string
    headline: string
    body: string
    cta: string
    blockedLabel: string
    disclosure: string
  }
  whoWeAre: {
    eyebrow: string
    headline: string
    paragraphs: [string, string]
    metrics: Array<{ value: string; label: string }>
    cta: string
    imageAlt: string
  }
  closer: {
    eyebrow: string
    headline: string
    body: string
    primaryCta: string
  }
  footer: {
    tagline: string
    siteLink: string
    disclosure: string
  }
}

const dictionaries: Record<Locale, Dict> = {
  es: {
    pageTitle: "Ai /abs × Notion · 3 meses gratis de Notion Business + AI",
    nav: {
      booking: "Reservar llamada",
      skipToContent: "Ir al contenido",
      toggleTheme: "Cambiar tema",
      toggleLocale: "Switch to English",
    },
    hero: {
      eyebrow: "Ai /abs × Notion",
      headlinePre: "3 meses de Notion Business + AI,",
      headlineEmphasis: "gratis para tu equipo.",
      sub: "Donde nosotros corremos training, casos y la comunidad de 700+ builders. Si tu equipo trabaja con email corporativo, llévatelo.",
      primaryCta: "Reclamar 3 meses",
      secondaryCta: "Ver por qué",
      eligibility:
        "Requiere email con dominio propio en el signup (no gmail, outlook, yahoo, icloud, hotmail ni proton).",
      claimSteps: [
        "Abrí el link de Notion con tu email corporativo (@tuempresa.com).",
        "Completá el signup en Notion Business + AI.",
        "Notion aplica el crédito de 3 meses según las reglas de su programa de afiliados.",
      ],
      qr: {
        alt: "Código QR que abre notion.ailabs.sv",
      },
    },
    whyNotion: {
      eyebrow: "Por qué",
      headline: "Corremos Ai /abs en Notion.",
      rows: [
        {
          label: "Docs",
          body: "Una sola fuente para training, propuestas y casos. Lo que escribimos una vez vive donde el equipo lo encuentra.",
        },
        {
          label: "Proyectos",
          body: "Sprints de cliente arman bases relacionadas sin overhead. Cambiamos el shape sin migrar nada.",
        },
        {
          label: "IA",
          body: "Notion AI redacta entregables y resume notas de proyecto en español. Es el primer lugar donde probamos un workflow.",
        },
        {
          label: "Equipo",
          body: "El switch a Business desbloquea permisos por workspace. Clientes y aliados entran sin desordenar lo nuestro.",
        },
      ],
    },
    offer: {
      eyebrow: "La oferta",
      headline: "Notion Business + AI · 3 meses.",
      body: "Gestión por workspace, permisos finos, IA integrada. Suficiente para que un equipo de hasta 50 personas pruebe la diferencia sin presupuesto previo.",
      cta: "Reclamar la oferta",
      blockedLabel: "No funciona con",
      disclosure:
        "Requiere email con dominio corporativo propio (@tuempresa.com) en el signup. No funciona con gmail, outlook, yahoo, icloud, hotmail ni proton. Crédito otorgado por Notion vía su programa de afiliados.",
    },
    whoWeAre: {
      eyebrow: "Quiénes somos",
      headline: "Ai /abs · Servicios de IA para equipos.",
      paragraphs: [
        "Somos un proveedor de servicios de IA en El Salvador. Training, automatizaciones y adopción de IA para equipos técnicos, producto y operaciones, con criterio sobre cuándo la IA ayuda y cuándo no.",
        "Construimos encima de la comunidad de builders más activa del país. Eso es prueba y pipeline: ahí afilamos la práctica y ahí los clientes conocen al talento.",
      ],
      metrics: [
        { value: "700+", label: "Builders en la comunidad" },
        { value: "30+", label: "Eventos IRL al año" },
        { value: "4", label: "Ecosistemas socios" },
      ],
      cta: "Conocé Ai /abs",
      imageAlt:
        "Builders de Ai /abs reunidos en un evento en San Salvador, una persona toma una selfie con palo y los demás sonríen frente a la cámara.",
    },
    closer: {
      eyebrow: "Después de los 3 meses",
      headline: "El crédito es de Notion. La práctica es nuestra.",
      body: "Si tu equipo lo prueba y le hace clic, hablemos. Te ayudamos a sacarle el cuero: workflows, training, integraciones con lo que ya usás.",
      primaryCta: "Reservar llamada de 20 min",
    },
    footer: {
      tagline: "Hecho en San Salvador",
      siteLink: "ailabs.sv",
      disclosure:
        "Programa de afiliados de Notion. Notion es marca registrada de Notion Labs, Inc.",
    },
  },
  en: {
    pageTitle: "Ai /abs × Notion · 3 months free Notion Business + AI",
    nav: {
      booking: "Book a call",
      skipToContent: "Skip to content",
      toggleTheme: "Toggle theme",
      toggleLocale: "Cambiar a español",
    },
    hero: {
      eyebrow: "Ai /abs × Notion",
      headlinePre: "3 months of Notion Business + AI,",
      headlineEmphasis: "free for your team.",
      sub: "Where we run training, client work, and a 700+ builder community. If your team works on a company email, take it.",
      primaryCta: "Claim 3 months",
      secondaryCta: "See why",
      eligibility:
        "Requires a company-domain email at signup (no gmail, outlook, yahoo, icloud, hotmail, or proton).",
      claimSteps: [
        "Open the Notion link with your company email (@yourcompany.com).",
        "Finish signup for Notion Business + AI.",
        "Notion applies the 3-month credit under its affiliate program rules.",
      ],
      qr: {
        alt: "QR code that opens notion.ailabs.sv",
      },
    },
    whyNotion: {
      eyebrow: "Why",
      headline: "We run Ai /abs on Notion.",
      rows: [
        {
          label: "Docs",
          body: "One source for training, proposals, and case studies. What we write once lives where the team can find it.",
        },
        {
          label: "Projects",
          body: "Client sprints stand up relational bases without overhead. We reshape work without migrating it.",
        },
        {
          label: "AI",
          body: "Notion AI drafts deliverables and summarizes project notes in the team's working language. It's the first place we test a workflow.",
        },
        {
          label: "Team",
          body: "The Business tier unlocks per-workspace permissions. Clients and partners come in without muddling our space.",
        },
      ],
    },
    offer: {
      eyebrow: "The offer",
      headline: "Notion Business + AI · 3 months.",
      body: "Workspace management, fine-grained permissions, AI built in. Enough for a team of up to 50 to feel the difference without a budget conversation.",
      cta: "Claim the offer",
      blockedLabel: "Doesn't work with",
      disclosure:
        "Requires a company-domain email (@yourcompany.com) at signup. Doesn't work with gmail, outlook, yahoo, icloud, hotmail, or proton. Credit issued by Notion through their affiliate program.",
    },
    whoWeAre: {
      eyebrow: "Who we are",
      headline: "Ai /abs · AI services for teams.",
      paragraphs: [
        "We're an AI services firm in El Salvador. Training, automations, and AI adoption for engineering, product, and operations teams, with judgment about when AI helps and when it doesn't.",
        "We sit on top of the most active builder community in the country. That's both proof and pipeline: where we sharpen the practice and where our clients meet talent.",
      ],
      metrics: [
        { value: "700+", label: "Community builders" },
        { value: "30+", label: "IRL events per year" },
        { value: "4", label: "Partner ecosystems" },
      ],
      cta: "Visit Ai /abs",
      imageAlt:
        "Ai /abs builders gathered at an event in San Salvador. One holds out a selfie stick; the rest lean into the frame, smiling.",
    },
    closer: {
      eyebrow: "After the 3 months",
      headline: "The credit is Notion's. The practice is ours.",
      body: "If your team tries it and it clicks, let's talk. We'll help you push it: workflows, training, integrations with whatever you already use.",
      primaryCta: "Book a 20-min call",
    },
    footer: {
      tagline: "Made in San Salvador",
      siteLink: "ailabs.sv",
      disclosure:
        "Notion affiliate program. Notion is a trademark of Notion Labs, Inc.",
    },
  },
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  t: Dict
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "es" || stored === "en") return stored
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_LOCALE
}

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange)
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange)
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    readStoredLocale,
    () => DEFAULT_LOCALE,
  )

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = dictionaries[locale].pageTitle
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage unavailable
    }
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT))
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error("useLocale must be used inside a LocaleProvider")
  }
  return ctx
}
