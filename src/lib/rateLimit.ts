import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

function makeRatelimit(requests: number, windowSeconds: number): Ratelimit | null {
  if (!redis) return null;
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, `${windowSeconds} s`),
    analytics: false,
  });
}

export const rateLimiters = {
  contact: makeRatelimit(1, 600),   // 1 email / 10 min — /api/send
  rating: makeRatelimit(1, 86400),  // 1 vot / 24h — /api/performance/.../rate
  general: makeRatelimit(30, 60),   // 30 req / min — fallback
};

export type RateLimiterKey = keyof typeof rateLimiters;

export async function checkRateLimit(
  req: NextRequest,
  limiterKey: RateLimiterKey,
  identifier?: string
): Promise<{ allowed: boolean }> {
  const limiter = rateLimiters[limiterKey];
  if (!limiter) return { allowed: true }; // graceful degradation fără Upstash

  const ip = identifier ?? getIp(req);
  const { success } = await limiter.limit(ip);
  return { allowed: success };
}

// Pe AWS/CloudFront clientul poate injecta IP-uri false la începutul header-ului.
// CloudFront adaugă IP-ul real la FINAL, deci luăm ultimul IP din lanț.
export function getIp(req: NextRequest | Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((s) => s.trim()).filter(Boolean);
    return ips.at(-1) ?? "unknown";
  }
  return "unknown";
}

export function requireAdminSecret(req: NextRequest | Request): boolean {
  return req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}
