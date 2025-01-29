import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLocales = ["cs", "en", "de"];
const defaultLocale = "cs";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split("/")[1];

  if (supportedLocales.includes(pathnameLocale)) {
    return NextResponse.next();
  }

  const localePathname = `/${defaultLocale}${pathname}`;
  const url = new URL(localePathname, request.url);

  return NextResponse.redirect(url);
}
