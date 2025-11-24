import { fuzzyRedirect } from "fuzzy-router";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routes } from "./routes";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const match = fuzzyRedirect(pathname, routes, { threshold: 0.3 });

  if (match && match !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = match;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
