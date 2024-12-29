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

  console.log("Middleware triggered for path:", pathname);

  const user = await getCurrentUser();

  console.log("User:", user);

  if (!user) {
    console.log("No user found. Redirecting to /login...");
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user?.role && roleBasedRoutes[user.role as Role]) {
    const allowedRoutes = roleBasedRoutes[user.role as Role];

    if (allowedRoutes.some((route) => pathname.match(route))) {
      console.log("User authorized for path:", pathname);

      return NextResponse.next();
    }

    if (user.role === "admin") {
      console.log(
        "Admin unauthorized for this path. Redirecting to /dashboard..."
      );

      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log("Unauthorized access. Redirecting to /...");

    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Default case. Redirecting to /login...");

  return NextResponse.redirect(new URL("/login", request.url));
}

// Configuring the matcher to specify routes this middleware applies to
export const config = {
  matcher: ["/user/:path*", "/dashboard/:path*", "/login", "/register"],
};
