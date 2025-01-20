import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['cs', 'en', 'de'];
const defaultLocale = 'cs';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip paths like `/api` or `/_next`
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Extract the locale from the URL
  const pathnameLocale = pathname.split('/')[1];

  // If the locale is supported, proceed
  if (supportedLocales.includes(pathnameLocale)) {
    return NextResponse.next();
  }

  // Otherwise, redirect to the default locale
  const localePathname = `/${defaultLocale}${pathname}`;
  const url = new URL(localePathname, request.url);

  return NextResponse.redirect(url);
}
