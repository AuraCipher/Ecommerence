import Medusa from "@medusajs/js-sdk"

export const backendUrl = __BACKEND_URL__ ?? "/"

console.log("Backend URL:", backendUrl)

export const sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: "session",
  },
  // Add publishable API key if available
  ...(typeof __PUBLISHABLE_API_KEY__ !== "undefined" && __PUBLISHABLE_API_KEY__ ? {
    publishableKey: __PUBLISHABLE_API_KEY__
  } : {})
})

// Add error interceptor to catch fetch errors
if (typeof window !== "undefined") {
  ;(window as any).__sdk = sdk
  
  // Log all fetch errors
  const originalFetch = window.fetch
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args)
      if (!response.ok) {
        console.error("Fetch error:", {
          url: args[0],
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        })
      }
      return response
    } catch (error) {
      console.error("Fetch failed:", {
        url: args[0],
        error: error.message
      })
      throw error
    }
  }
}
