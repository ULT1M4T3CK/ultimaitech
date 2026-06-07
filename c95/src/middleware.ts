import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { absoluteUrl } from "@/lib/base-path";

const teacherPaths = ["/teacher"];

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  // Home: `app/page.tsx` uses `auth()` for routing.
  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  const protectedPrefixes = ["/dashboard", "/topics", "/courses", "/surveys", "/teacher"];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  if (isProtected && !session?.user) {
    const login = new URL(absoluteUrl("/login", req.url));
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  const role = session?.user?.role;

  // Role-based routing: if role is missing, do not bounce between /teacher and /dashboard.
  if (teacherPaths.some((p) => pathname.startsWith(p)) && session?.user && role) {
    if (role !== "TEACHER" && role !== "ADMIN") {
      return NextResponse.redirect(absoluteUrl("/dashboard", req.url));
    }
  }

  if (
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/topics") ||
      pathname.startsWith("/courses") ||
      pathname.startsWith("/surveys")) &&
    session?.user &&
    role
  ) {
    if (role !== "STUDENT") {
      return NextResponse.redirect(absoluteUrl("/teacher", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api/auth|api/upload|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
