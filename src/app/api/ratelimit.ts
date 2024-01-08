import { type NextRequest } from 'next/server'
import { LRUCache } from 'lru-cache'

type RouteFn = (req: NextRequest) => Promise<Response>

interface RateLimitOptions {
  limit: number
  per: number
}

const rl = (callback: RouteFn, options?: RateLimitOptions): RouteFn => {
  const cache = new LRUCache<string, number[]>({
    max: 500,
    ttl: (options?.per ?? 60) * 1000,
  })
  const limit = options?.limit ?? 10

  return async (req: NextRequest) => {
    // for some reason, ip could be `undefined`, but the docs doesn't
    // mention in what cases it can be undefined. It's undefined when
    // locally ran, so I assume that's the only case. But just in-case,
    // I'm setting a default `global` value.
    const token = req.ip ?? 'global'

    const requestCount = cache.get(token) ?? [0]
    if (requestCount[0] === 0) {
      cache.set(token, requestCount)
    }
    requestCount[0] += 1

    const currentUsage = requestCount[0]
    const isRateLimited = currentUsage >= limit

    const resp = isRateLimited
      ? Response.json(
          {
            message: "You're being rate limited, try again later.",
          },
          { status: 429 },
        )
      : await callback(req)

    resp.headers.set('X-RateLimit-Limit', limit.toString())
    resp.headers.set(
      'X-RateLimit-Remaining',
      (isRateLimited ? 0 : limit - currentUsage).toString(),
    )

    return resp
  }
}

export default rl
