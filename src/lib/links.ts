/**
 * Single source of truth for outbound URLs on notion.ailabs.sv.
 *
 * Mirrors the ailabs-web links policy so swapping any URL is a one-line
 * change. Booking and WhatsApp values intentionally match ailabs-web; the
 * Notion affiliate link is exclusive to this microsite.
 */

export const SITE_URL = "https://notion.ailabs.sv" as const

export const AFFILIATE_LINK =
  "https://affiliate.notion.so/ofeyqdmkp0tr" as const

export const BOOKING_LINK =
  "https://calendar.app.google/jFZqJV1fTuX2ku5C8" as const

export const WHATSAPP_LINK =
  "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj" as const

export const AILABS_SITE = "https://ailabs.sv" as const

export const CONTACT_EMAIL = "hello@ailabs.sv" as const

/** Free-mail domains the Notion partner program rejects at signup. */
export const BLOCKED_FREE_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
] as const
