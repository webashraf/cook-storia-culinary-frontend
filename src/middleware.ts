import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "./services/AuthService";

// Routes that do not require authentication
const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

// Role-based access rules
const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const allowedRoutes = roleBasedRoutes[user.role as Role];

    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    if (user.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

// Configuring the matcher to specify routes this middleware applies to
export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*", "/login", "/register"],
};
