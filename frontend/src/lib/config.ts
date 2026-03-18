import Medusa from "@medusajs/js-sdk"

// Medusa JS SDK may touch `localStorage` even during SSR. Next's server
// environment doesn't provide a real localStorage, which can crash rendering.
// Provide a minimal no-op implementation on the server so SSR can proceed.
if (typeof window === "undefined") {
  const ls = (globalThis as any).localStorage

  if (!ls || typeof ls.getItem !== "function") {
    ;(globalThis as any).localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    }
  }
}

// Defaults to standard port for Medusa server
const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

// Initialize SDK without localStorage/session storage access
const sdkOptions = {
  baseUrl: MEDUSA_BACKEND_URL,
  debug: false,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
}

export const sdk = new Medusa(sdkOptions)
