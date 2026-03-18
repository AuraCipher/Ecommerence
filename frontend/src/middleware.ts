import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (!BACKEND_URL || !PUBLISHABLE_API_KEY) {
    // Return empty map if backend URL or API key is not configured
    return new Map<string, HttpTypes.StoreRegion>()
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    try {
      // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
      const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY,
        },
        next: {
          revalidate: 3600,
          tags: [`regions-${cacheId}`],
        },
        cache: "force-cache",
      }).then(async (response) => {
        const json = await response.json()

        if (!response.ok) {
          throw new Error(json.message)
        }

        return json
      })

      if (!regions?.length) {
        // Return empty map if no regions found
        return new Map<string, HttpTypes.StoreRegion>()
      }

      // Create a map of country codes to regions.
      regions.forEach((region: HttpTypes.StoreRegion) => {
        region.countries?.forEach((c) => {
          regionMapCache.regionMap.set(c.iso_2 ?? "", region)
        })
      })

      regionMapCache.regionMapUpdated = Date.now()
    } catch (error) {
      // If fetch fails, return empty map to allow the app to continue
      console.error("Failed to fetch regions from backend:", error)
      return new Map<string, HttpTypes.StoreRegion>()
    }
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    // Return undefined if region map is empty
    if (regionMap.size === 0) {
      return undefined
    }

    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
    return undefined
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  // If backend URL is not configured, allow all requests to proceed
  if (!BACKEND_URL || !PUBLISHABLE_API_KEY) {
    return NextResponse.next()
  }

  let redirectUrl = request.nextUrl.href

  let response = NextResponse.redirect(redirectUrl, 307)

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")

  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  try {
    const regionMap = await getRegionMap(cacheId)

    // If region map is empty (backend not available), allow the request to proceed
    if (regionMap.size === 0) {
      return NextResponse.next()
    }

    const countryCode = regionMap && (await getCountryCode(request, regionMap))

    const urlHasCountryCode =
      countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

    // if one of the country codes is in the url and the cache id is set, return next
    if (urlHasCountryCode && cacheIdCookie) {
      return NextResponse.next()
    }

    // If the URL already contains a valid country code but the cache cookie is
    // missing, set the cookie and continue (do NOT redirect). Redirecting back
    // to the same URL creates an infinite loop for fetch-based clients that do
    // not persist cookies across redirects (e.g. TestSprite probes).
    if (urlHasCountryCode && !cacheIdCookie) {
      const res = NextResponse.next()
      res.cookies.set("_medusa_cache_id", cacheId, {
        maxAge: 60 * 60 * 24,
      })
      return res
    }

    // check if the url is a static asset
    if (request.nextUrl.pathname.includes(".")) {
      return NextResponse.next()
    }

    const redirectPath =
      request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

    const queryString = request.nextUrl.search ? request.nextUrl.search : ""

    // If no country code is set, we redirect to the relevant region.
    if (!urlHasCountryCode && countryCode) {
      redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
      response = NextResponse.redirect(`${redirectUrl}`, 307)
    } else if (!urlHasCountryCode && !countryCode) {
      // Handle case where no valid country code exists (empty regions)
      // Allow the request to proceed without region redirection
      return NextResponse.next()
    }

    return response
  } catch (error) {
    // If any error occurs in region processing, allow the request to proceed
    console.error("Middleware error:", error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
