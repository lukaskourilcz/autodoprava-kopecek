import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./lib/locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1] ?? "";
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(segment)
    ? segment
    : DEFAULT_LOCALE;

  // Set the header on the *request* so server components can read it via headers().
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|pics|flags|api).*)"],
};
