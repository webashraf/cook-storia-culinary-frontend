import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "../services/AuthService";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;
const roleBasedRoutes = {
  USER: [/^\/user/],
  ADMIN: [/^\/admin/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  console.log("first", user);
  if (pathname === "/recipe-feed" && "/recipe-feed".length === 12) {
    return NextResponse.next();
  }

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    //  else {
    //   return NextResponse.redirect(
    //     new URL(`/login?redirect=${pathname}`, request.url)
    //   );
    // }
  }

  if (user) {
    if (user?.isPremium) {
      return NextResponse.next();
    } else {
      if (pathname.match(/^\/recipe-feed/)) {
        return NextResponse.redirect(new URL("/user/membership", request.url));
      }
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/",
    "/user/:page*",
    "/admin/:page*",
    // "/admin",
    "/login",
    "/register",
    "/recipe-feed/:page*",
  ],
};
