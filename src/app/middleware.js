import { NextResponse } from "next/server";

export function middleware(req) {
  const login = req.cookies.get("admin_login")?.value;
  const { pathname } = req.nextUrl;

  // login page
  if (!login && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  if (login && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
