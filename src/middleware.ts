import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins = ["https://alexandru-roventa.ro"];

const corsOptions = {
  "Cache-Control": "s-maxage=86700",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "same-origin",
  "Content-Security-Policy":
    "default-src * data: blob: 'unsafe-inline' 'unsafe-eval';frame-ancestors 'self';block-all-mixed-content;upgrade-insecure-requests ",
  "Strict-Transport-Security": "max-age=31536000",
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, res: NextResponse) {
  const requestHeaders = new Headers(request.headers);

  // const { ip, nextUrl } = request;
  const ip = request.ip || "";
  requestHeaders.set("x-forwarded-for", ip);
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
export const config = {
  matcher: "/:path*",
};
