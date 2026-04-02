import Medusa from "@medusajs/js-sdk"

// Medusa JS SDK may touch `localStorage` even during SSR. Next's server
// environment doesn't provide a real localStorage, which can crash rendering.
// Provide a minimal no-op implementation on the server so SSR can proceed.
if (typeof window === "undefined") {
  try {
    const ls = (globalThis as any).localStorage

    if (!ls || typeof ls.getItem !== "function") {
      const mockStorage = {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      }

      try {
        ;(globalThis as any).localStorage = mockStorage
      } catch (e) {
        // If direct assignment fails, try Object.defineProperty
        Object.defineProperty(globalThis, "localStorage", {
          value: mockStorage,
          writable: true,
          configurable: true,
        })
      }
    }
  } catch (err) {
    // Silently handle environment-specific issues with globalThis
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
